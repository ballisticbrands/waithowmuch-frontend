import { META, indexShard, chainOf, shardUrl, type Shard, type Row } from "@/data/tariff.mjs";

/**
 * Loading the HTS for the tariff and landed-cost calculators.
 *
 * The page never loads the whole schedule. A code loads the one chapter file
 * it is in (a few to ~200 KB before gzip); a search by words loads the
 * description index once, on the first search, not on page load.
 */

const shards = new Map<string, Promise<Shard>>();

export function loadShard(ch: string): Promise<Shard> {
  let p = shards.get(ch);
  if (!p) {
    p = fetch(shardUrl(ch)).then((r) => {
      if (!r.ok) throw new Error(`chapter ${ch}: HTTP ${r.status}`);
      return r.json() as Promise<Shard>;
    });
    p.catch(() => shards.delete(ch));
    shards.set(ch, p);
  }
  return p;
}

export type SearchHit = { d: string; desc: string; path: string };
type Entry = SearchHit & { own: string; text: string };

let searchIndex: Promise<Entry[]> | null = null;

/** The description index: every leaf line of chapters 1–97 with the path of
 *  descriptions above it. Built once per page view. */
export function loadSearch(): Promise<Entry[]> {
  if (!searchIndex) {
    searchIndex = fetch(`${META.dataPath}search.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`search index: HTTP ${r.status}`);
        return r.json() as Promise<Array<[string, number, string]>>;
      })
      .then((raw) => {
        const pseudo = { rows: raw.map(([d, indent, desc]) => [d, indent, desc, "", "", ""] as [string, number, string, string, string, string]) };
        const { rows } = indexShard(pseudo);
        return rows.filter((r: Row) => r.leaf).map((r: Row) => {
          const chain = chainOf(pseudo, r);
          const path = chain.slice(0, -1).join(" › ");
          return { d: r.d, desc: r.desc, path, own: norm(r.desc), text: norm(chain.join(" ")) };
        });
      });
    searchIndex.catch(() => { searchIndex = null; });
  }
  return searchIndex;
}

const STOP = new Set(["of", "and", "the", "for", "with", "or", "a", "an", "in", "to", "other", "not", "made", "set"]);
const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}]+/gu, " ");
const stem = (w: string) => (w.length > 4 && w.endsWith("ies") ? `${w.slice(0, -3)}y` : w.length > 3 && w.endsWith("es") && /(ch|sh|x|ss)es$/.test(w) ? w.slice(0, -2) : w.length > 3 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w);

/**
 * Lines whose descriptions contain every word typed (plurals folded), the
 * line's own words counting for more than its headings'.
 */
export function searchHts(entries: Entry[], query: string, limit = 25): { hits: SearchHit[]; partial: boolean } {
  const words = norm(query).split(" ").filter((w) => w.length > 1 && !STOP.has(w)).map(stem);
  if (!words.length) return { hits: [], partial: false };
  const scored: Array<[number, number, Entry]> = [];
  for (const e of entries) {
    let score = 0;
    let matched = 0;
    for (const w of words) {
      if (e.own.includes(w)) { score += 3; matched += 1; } else if (e.text.includes(w)) { score += 1; matched += 1; }
    }
    if (!matched) continue;
    if (/^other\b/.test(e.own)) score -= 0.5;
    scored.push([matched, score - e.text.length / 2000, e]);
  }
  scored.sort((a, b) => b[0] - a[0] || b[1] - a[1]);
  /* Every word, if any line has them all; otherwise the lines that match
     most of them. The schedule names materials and uses, not products, so a
     "silicone spatula" is "kitchenware, of plastics". */
  const best = scored.length ? scored[0][0] : 0;
  return {
    hits: scored.filter((x) => x[0] === best).slice(0, limit).map(([, , e]) => ({ d: e.d, desc: e.desc, path: e.path.split(" › ").slice(-3).join(" › ") })),
    partial: best > 0 && best < words.length,
  };
}
