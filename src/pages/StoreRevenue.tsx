import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSetCrumbs } from "@/components/Breadcrumbs";
import { Comparables, Notice, Provenance, ToolCopy, Unavailable } from "@/components/SalesToolParts";
import { gaEvent, trackCtaClick } from "@/lib/track";
import { useSession } from "@/lib/session";
import { ESTIMATOR_PATH, STORE, STORE_PATH } from "@/data/sales-tools-page.mjs";
import { fmtUnits, lookupStore, usd0, type StoreRevenue as Store, type ToolResult } from "@/lib/sales-tools";

/**
 * /tools/amazon-seller-revenue-calculator/ — a whole Amazon seller's monthly
 * revenue: Σ badge × buy box across its badged listings (the case studies'
 * method; the backend does the Keepa work).
 *
 * 🚨 Email-gated, and the BACKEND is the gate: one lookup per IP without an
 * account, then 401 `signup_required`. This page only reacts to it, sending
 * the reader through the site's existing /signup flow with `next` set back to
 * this page and the seller they asked for, so the lookup re-runs by itself
 * the moment they land back here signed in (AuthCallback → intent.next).
 */

export default function StoreRevenue() {
  useSetCrumbs(() => [{ label: STORE.crumb }], []);
  useEffect(() => { document.title = STORE.docTitle; }, []);

  const { signedIn } = useSession();
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(() => params.get("seller") ?? "");
  const [busy, setBusy] = useState(false);
  const [asked, setAsked] = useState("");
  const [result, setResult] = useState<ToolResult<Store> | null>(null);

  const run = async (input: string) => {
    if (!input.trim() || busy) return;
    setBusy(true);
    setAsked(input.trim());
    const r = await lookupStore(input);
    setResult(r);
    setBusy(false);
    gaEvent("tool_lookup", { tool: "store_revenue", outcome: r.kind, signed_in: signedIn ? "yes" : "no" });
    if (r.kind === "ok") setParams({ seller: r.data.seller.id }, { replace: true });
    else setParams({ seller: input.trim() }, { replace: true });
  };

  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    const s = params.get("seller");
    if (s) void run(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Where /signup and /login send the reader back to: here, same seller.
  const next = `${STORE_PATH}?seller=${encodeURIComponent(asked || q)}`;

  return (
    <main data-main>
      <div data-fba>
        <h1>{STORE.title}</h1>
        <p data-fba-lede dangerouslySetInnerHTML={{ __html: STORE.lede }} />

        <form data-fba-card data-st-form onSubmit={(e) => { e.preventDefault(); void run(q); }} aria-label="Look up a seller">
          <label data-fba-field>
            <span>Seller ID, storefront link, or one of its products</span>
            <div data-st-row>
              <input
                data-input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="A3C12G0C3DENHY or https://www.amazon.com/sp?seller=…"
                autoComplete="off"
                spellCheck={false}
                inputMode="url"
              />
              <button data-btn type="submit" disabled={busy || !q.trim()}>{busy ? "Adding it up…" : "Estimate revenue"}</button>
            </div>
          </label>
          <p data-fba-empty>
            US marketplace. {signedIn ? "Signed in: up to 20 store lookups a day." : "Your first lookup is free; a free account unlocks more."} A big store takes a few seconds.
          </p>
        </form>

        <div aria-live="polite">
          {result?.kind === "unavailable" && <Unavailable what="seller revenue calculator" />}
          {(result?.kind === "invalid" || result?.kind === "not_found" || result?.kind === "limited" || result?.kind === "busy") && (
            <Notice tone="warn">{result.message}</Notice>
          )}
          {result?.kind === "signup_required" && (
            <div data-st-gate role="status">
              <strong>You've used your free store lookup.</strong>
              <p>
                Create a free account to keep checking stores: up to 20 a day. Email only, or continue with Google, and we'll bring
                you straight back to this store's result. You'll also get one email when we publish a new case study, and can
                unsubscribe any time.
              </p>
              <div data-st-ctas>
                <Link
                  data-btn
                  to={`/signup?next=${encodeURIComponent(next)}`}
                  onClick={() => trackCtaClick("store_revenue_gate", "/signup")}
                >
                  Create a free account
                </Link>
                <Link data-btn data-variant="ghost" to={`/login?next=${encodeURIComponent(next)}`}>I have an account</Link>
              </div>
              <p data-fba-empty>
                Single products don't need an account: try the <Link to={ESTIMATOR_PATH}>Amazon sales estimator</Link>.
              </p>
            </div>
          )}
          {result?.kind === "ok" && <StoreResult s={result.data} />}
        </div>

        <aside data-fba-cta>
          <p>
            We publish the real numbers behind Amazon businesses like these: revenue, profit, margin and what it cost to start,
            with every figure sourced. One email when a new case study is out.
          </p>
          <Link data-btn to="/signup" onClick={() => trackCtaClick("store_revenue")}>Get emails on new case studies</Link>
        </aside>

        <ToolCopy page={STORE} />
      </div>
    </main>
  );
}

function StoreResult({ s }: { s: Store }) {
  const name = s.seller.name ?? s.seller.id;
  return (
    <section data-fba-card data-st-result aria-label="Result">
      <div data-st-product>
        <div>
          <a href={s.seller.url} target="_blank" rel="nofollow noopener noreferrer" data-st-title>{name}</a>
          <p data-fba-empty>
            {s.seller.id}
            {s.seller.businessName && s.seller.businessName !== name ? ` · ${s.seller.businessName}` : ""}
            {s.seller.country ? ` · ${s.seller.country}` : ""}
            {s.seller.rating != null && s.seller.ratingCount ? ` · ${s.seller.rating}% positive feedback (${s.seller.ratingCount.toLocaleString("en-US")} ratings)` : ""}
            {s.resolvedFrom ? ` · found from ${s.resolvedFrom.asin}` : ""}
          </p>
        </div>
      </div>

      <div data-st-stats>
        <div data-st-stat>
          <span>Revenue a month</span>
          <strong>{s.pricedListings ? `${usd0(s.revenue.lowCents)}–${usd0(s.revenue.highCents)}` : "Under the radar"}</strong>
          <em>{s.pricedListings ? "Σ Amazon's badge × price, a floor" : "No listing shows Amazon's badge"}</em>
        </div>
        <div data-st-stat>
          <span>Units a month</span>
          <strong>{s.pricedListings ? `${fmtUnits(s.units.low)}–${fmtUnits(s.units.high)}` : "—"}</strong>
          <em>Across listings with a badge</em>
        </div>
        <div data-st-stat>
          <span>Listings</span>
          <strong>{fmtUnits(s.catalogueSize)}</strong>
          <em>{fmtUnits(s.badgedListings)} with a badge{s.capped ? `, top ${s.pricedListings} priced` : ""}</em>
        </div>
      </div>

      {s.capped && (
        <p data-st-note data-st-capped>
          Capped: this store has {fmtUnits(s.badgedListings)} listings with a badge, and we priced the best-selling {s.cap}. The
          others each sell less than the ones counted, so the true total is higher than shown.
        </p>
      )}
      {s.catalogueSize > s.badgedListings && (
        <p data-fba-empty data-st-note>
          {fmtUnits(s.catalogueSize - s.badgedListings)} listings show no badge (under ~50 a month each) and are counted as zero.
        </p>
      )}

      {s.products.length > 0 && (
        <>
          <h3 data-fba-card-title data-st-sub>Best sellers</h3>
          <ol data-st-list>
            {s.products.slice(0, 15).map((p) => (
              <li key={p.asin}>
                <a href={`https://www.amazon.com/dp/${p.asin}`} target="_blank" rel="nofollow noopener noreferrer">{p.title ?? p.asin}</a>
                <span>
                  {p.label} bought · {usd0(p.priceCents)} · {usd0(p.revenueLowCents)}–{usd0(p.revenueHighCents)}/mo ·{" "}
                  <Link to={`${ESTIMATOR_PATH}?asin=${p.asin}`}>fees and profit</Link>
                </span>
              </li>
            ))}
          </ol>
        </>
      )}

      <Comparables items={s.comparables} />
      <Provenance retrievedAt={s.retrievedAt} />
    </section>
  );
}
