"""
Extracts the Chapter 99 overlays the tariff calculator applies, from the
USITC's own Chapter 99 PDF, into src/data/tariff/overlays.json.

Run by scripts/tariff/fetch-hts.mjs (which downloads the PDF and the HTS JSON
first); it can also be run on its own:

    python3 -m venv /tmp/v && /tmp/v/bin/pip install pypdf
    /tmp/v/bin/python scripts/tariff/extract-ch99.py <chapter99.pdf> <hts.json> <out.json>

Why Python: the notes only exist as a PDF, and pypdf reads it faithfully. The
repo has no PDF reader in node_modules and the calculator does not need one at
runtime: the output is plain JSON, committed.

What it reads, all from the U.S. notes to subchapter III of chapter 99:
  note 20   China Section 301 Lists 1, 2, 3 (+ the 11 note-20(g) items),
            4A (+ the 5 note-20(s)(ii) items), 4B (suspended), and the
            exclusions still in force: (vvv)(i)-(iv) and (www).
  note 31   China Section 301 four-year-review increases (9903.91.xx).
  note 52   The 2026 Section 301 forced-labour duties: what (b) exempts
            outright, what (c), (d), (e) and (j) exempt conditionally, per
            country where the exemption is per country.
  notes 16, 33, 37, 38, 39, 40, 41, 43
            Section 232 metals, autos, wood, trucks, semiconductors and
            pharmaceuticals; the quartz safeguard; drones. The calculator does
            NOT compute these: it only needs to know which codes they name, so
            it can say "this may apply, and we did not compute it" instead of
            showing a total that is silently wrong.

🚨 Every list is matched to its subdivision by anchor text. If USITC rewords
an anchor, the script stops (`die`) instead of writing a partial list.
"""
import json
import re
import sys

import pypdf

pdf_path, hts_path, out_path = sys.argv[1:4]


def die(msg):
    print(f"extract-ch99: {msg}", file=sys.stderr)
    sys.exit(1)


# ── Text ────────────────────────────────────────────────────────────────
reader = pypdf.PdfReader(pdf_path)
raw_lines = []
for page in reader.pages:
    raw_lines.extend((page.extract_text() or "").split("\n"))

m = re.search(r"Harmonized Tariff Schedule of the United States (Revision \d+ \(\d{4}\)|\(\d{4}\)[^\n]*)", "\n".join(raw_lines[:400]))
revision_label = m.group(1) if m else None

NOISE = re.compile(
    r"^(Harmonized Tariff Schedule of the United States|Annotated for Statistical Reporting Purposes|XXII$|99 - [IVX]+ - \d+|U\.S\. Notes \(con\.\)|=====)"
)
lines = [l.rstrip() for l in raw_lines if not NOISE.match(l.strip())]


def find(anchor, start=0):
    """Index of the first line at or after `start` that starts with `anchor`."""
    for i in range(start, len(lines)):
        if lines[i].startswith(anchor):
            return i
    die(f"anchor not found: {anchor!r}")


def block(a, b):
    return lines[a:b]


# ── Code tokenizer ──────────────────────────────────────────────────────
hts = json.load(open(hts_path))
VALID = set()
for r in hts:
    h = (r.get("htsno") or "").strip()
    if h:
        d = h.replace(".", "")
        # A line with no statistical breakdown exists only as its 10-digit
        # row ("3924.10.40.00"), so every prefix is a valid code too.
        for k in (4, 6, 8, 10):
            if len(d) >= k:
                VALID.add(d[:k])

CODE_SHAPES = [
    re.compile(r"\d{4}\.\d{2}\.\d{4}"),
    re.compile(r"\d{4}\.\d{2}\.\d{2}"),
    re.compile(r"\d{4}\.\d{2}"),
    re.compile(r"\d{4}"),
]


def split_run(s):
    """
    Split a run of concatenated codes ("2845.90.012845.40.00") into codes.

    The PDF prints the lists as tables whose cells come out glued together,
    and the codes are of mixed length (4, 6, 8 and 10 digits), so a regex
    cannot split them. A small DP picks the split that uses the most codes
    that really exist in the HTS, and the fewest that do not.
    """
    n = len(s)
    best = [None] * (n + 1)
    best[n] = (0, 0, [])
    for i in range(n - 1, -1, -1):
        for shape in CODE_SHAPES:
            mm = shape.match(s, i)
            if not mm:
                continue
            j = mm.end()
            if best[j] is None:
                continue
            tok = mm.group(0)
            unknown = 0 if tok.replace(".", "") in VALID else 1
            cand = (best[j][0] + unknown, best[j][1] + 1, [tok] + best[j][2])
            if best[i] is None or cand[:2] < best[i][:2]:
                best[i] = cand
    return best[0][2] if best[0] else None


RUN = re.compile(r"^[\d.]+$")
IN_PROSE = re.compile(r"(?<![\d.])(\d{4}\.\d{2}(?:\.\d{2}(?:\d{2})?)?)(?![\d])")


def codes_in(blk, prose=False):
    """Every code in a block: whole lines of glued codes, numbered one-per-line
    entries "(12) 8541.42.00", and, if `prose`, codes inside sentences."""
    out = []
    for l in blk:
        t = l.strip().replace(" ", "") if RUN.match(l.strip().replace(" ", "")) else l.strip()
        t = t.rstrip(".") if RUN.match(t) else t
        if RUN.match(t) and len(t) >= 4:
            parts = split_run(t)
            if parts is None:
                if prose:
                    out.extend(IN_PROSE.findall(t))
                    continue
                die(f"cannot split code run {t!r}")
            out.extend(parts)
            continue
        mm = re.match(r"^\(\d+\)\s+(\d{4}\.\d{2}\.\d{2}(?:\d{2})?)\s*$", l.strip())
        if mm:
            out.append(mm.group(1))
            continue
        if prose:
            out.extend(IN_PROSE.findall(l))
    return out


def norm(c):
    return c.replace(".", "")


def uniq(xs):
    seen, out = set(), []
    for x in xs:
        if x not in seen:
            seen.add(x)
            out.append(x)
    return out


def check_known(name, codes, max_unknown_share=0.08):
    unknown = [c for c in codes if norm(c) not in VALID]
    if codes and len(unknown) / len(codes) > max_unknown_share:
        die(f"{name}: {len(unknown)} of {len(codes)} codes are not in this HTS revision ({unknown[:8]}…): the parse is probably wrong")
    return unknown


# ── Note 20: China Section 301 lists ────────────────────────────────────
n20 = find("20. (a) For the purposes of heading 9903.88.01")
b_ = find("(b) Heading 9903.88.01 applies to all products of China", n20)
c_ = find("(c) For the purposes of heading 9903.88.02", b_)
d_ = find("(d) Heading 9903.88.02 applies to all products of China", c_)
e_ = find("(e) For the purposes of heading 9903.88.03", d_)
f_ = find("(f) Heading 9903.88.03 applies to all products of China", e_)
g_ = find("(g) For the purposes of heading 9903.88.04", f_)
h_ = find("(h) The U.S. Trade Representative determined", g_)
r_ = find("(r) For the purposes of heading 9903.88.15", h_)
s_ = find("(s) Heading 9903.88.15 applies to:", r_)
s2_ = find("(ii) the following products of China:", s_)
t_ = find("(t) For the purposes of heading 9903.88.16", s2_)
u_ = find("(u) Heading 9903.88.16 applies to:", t_)
v_ = find("(v) The U.S. Trade Representative determined", u_)

# The first lines of (b), (d), (f) are prose that cites headings; codes only
# start once the glued table does, so only whole-line runs are read (prose=False).
LIST1 = uniq(codes_in(block(b_, c_)))
LIST2 = uniq(codes_in(block(d_, e_)))
LIST3 = uniq(codes_in(block(f_, g_)))
LIST4A = uniq(codes_in(block(s_, s2_)))
LIST4B = uniq(codes_in(block(u_, v_)))
for name, L, lo in [("List 1", LIST1, 800), ("List 2", LIST2, 250), ("List 3", LIST3, 5000), ("List 4A", LIST4A, 2500), ("List 4B", LIST4B, 400)]:
    if len(L) < lo:
        die(f"{name}: only {len(L)} codes, expected at least {lo}")
    bad = [c for c in L if len(norm(c)) != 8]
    if bad:
        die(f"{name}: non-8-digit entries {bad[:5]}")


def partial_items(blk, heading):
    """note 20(g) / 20(s)(ii): "…provided for in [subheading] 9401.61.40, except
    for such seats provided for in statistical reporting number 9401.61.4001"."""
    text = " ".join(l.strip() for l in blk)
    items = re.split(r"(?:(?<=\s)|^)(\d{1,2})\.\s+(?=[A-Z])", text)
    out = []
    for k in range(1, len(items), 2):
        body = items[k + 1]
        mm = re.search(r"provided for in (?:\[subheading\] |subheading )?(\d{4}\.\d{2}\.\d{2})", body)
        if not mm:
            continue
        sub = mm.group(1)
        exc = re.findall(r"\d{4}\.\d{2}\.\d{4}", body[mm.end():])
        desc = re.split(r",? provided for in", body)[0].strip()
        out.append({"subheading": sub, "exceptStats": exc, "desc": desc, "heading": heading})
    return out


LIST3_PARTIAL = partial_items(block(g_ + 12, h_), "9903.88.04")
LIST4A_PARTIAL = partial_items(block(s2_ + 1, t_), "9903.88.15")
if len(LIST3_PARTIAL) != 11:
    die(f"note 20(g): {len(LIST3_PARTIAL)} items, expected 11")
if len(LIST4A_PARTIAL) != 5:
    die(f"note 20(s)(ii): {len(LIST4A_PARTIAL)} items, expected 5")

# Exclusions in force: (vvv)(i)-(iv) via 9903.88.69, (www) via 9903.88.70.
vvv = find("(vvv) (i) The U.S.Trade Representative determined")
vvv2 = find("(ii) The U.S. Trade Representative determined", vvv)
vvv3 = find("(iii) The U.S. Trade Representative determined", vvv2)
vvv4 = find("(iv) The U.S. Trade Representative determined", vvv3)
www = find("(www) The U.S. Trade Representative determined", vvv4)
end20 = find("(21)(a) Except as provided in notes 21(u)", www)


def exclusions(blk, sub, overrides, via, until):
    """Numbered exclusion items. Each names the 10-digit statistical numbers it
    covers; the product description is what a buyer must match."""
    text = "\n".join(l.strip() for l in blk)
    # Skip the preamble up to the first "(1) ".
    k = text.find("\n(1) ")
    if k < 0:
        die(f"exclusions {sub}: no item (1)")
    text = text[k + 1:]
    parts = re.split(r"\n\((\d+)\) ", "\n" + text)
    out = []
    expect = 1
    for i in range(1, len(parts), 2):
        num = int(parts[i])
        if num != expect:
            die(f"exclusions {sub}: item {num} after {expect - 1}")
        expect += 1
        body = re.sub(r"\s+", " ", parts[i + 1]).strip()
        stats = re.findall(r"\d{4}\.\d{2}\.\d{4}", body)
        if not stats:
            die(f"exclusions {sub}({num}): no statistical number in {body[:80]!r}")
        # Where an item names numbers by period ("… effective July 1, 2026"),
        # the numbers in force are the last group; earlier groups are history.
        cur = stats
        mm = list(re.finditer(r"described in statistical reporting numbers? ([^()]*?) effective ([A-Z][a-z]+ \d{1,2}, \d{4})\)?$", body))
        if mm:
            cur = re.findall(r"\d{4}\.\d{2}\.\d{4}", mm[-1].group(1))
        elif re.search(r"prior to|effective", body):
            last = re.findall(r"effective [A-Z][a-z]+ \d{1,2}, \d{4}", body)
            if last:
                tail = body[body.rfind("described in statistical reporting"):]
                cur = re.findall(r"\d{4}\.\d{2}\.\d{4}", tail) or stats
        desc = re.sub(r"\s*\(described in statistical reporting.*$", "", body).strip()
        if re.fullmatch(r"\d{4}\.\d{2}\.\d{4}", desc):
            desc = ""
        out.append({"id": f"{sub}({num})", "stats": uniq(cur), "desc": desc, "overrides": overrides, "via": via, "until": until})
    return out


EXCL = []
EXCL += exclusions(block(vvv, vvv2), "20(vvv)(i)", ["9903.88.01"], "9903.88.69", "2027-01-09")
EXCL += exclusions(block(vvv2, vvv3), "20(vvv)(ii)", ["9903.88.02"], "9903.88.69", "2027-01-09")
EXCL += exclusions(block(vvv3, vvv4), "20(vvv)(iii)", ["9903.88.03", "9903.88.04"], "9903.88.69", "2027-01-09")
EXCL += exclusions(block(vvv4, www), "20(vvv)(iv)", ["9903.88.15"], "9903.88.69", "2027-01-09")
EXCL += exclusions(block(www, end20), "20(www)", ["9903.88.02"], "9903.88.70", "2027-01-09")
if len(EXCL) < 150:
    die(f"only {len(EXCL)} exclusions; expected the ~178 USTR extended")

# ── Note 31: four-year-review increases ─────────────────────────────────
n31 = find("31. (a) As provided in headings 9903.91.01")
sub31 = {}
anchors31 = [
    ("9903.91.01", "(b) Heading 9903.91.01 applies", 25, "2024-09-27", None),
    ("9903.91.02", "(c) Heading 9903.91.02 applies", 50, "2024-09-27", None),
    ("9903.91.03", "(d) Heading 9903.91.03 applies", 100, "2024-09-27", None),
    ("9903.91.04", "(e) Heading 9903.91.04 applies", 25, "2025-01-01", "2025-12-31"),
    ("9903.91.05", "(i) Heading 9903.91.05 applies", 50, "2025-01-01", None),
    ("9903.91.06", "(g) Heading 9903.91.06 applies", 25, "2026-01-01", None),
    ("9903.91.07", "(h) Heading 9903.91.07 applies", 50, "2026-01-01", None),
    ("9903.91.08", "(i) Heading 9903.91.08 applies", 100, "2026-01-01", None),
    ("9903.91.11", "(j) Heading 9903.91.11 applies", 25, "2025-01-01", None),
]
pos = []
cur = n31
for h, a, rate, frm, to in anchors31:
    i = find(a, cur)
    pos.append((i, h, rate, frm, to))
    cur = i + 1
end31 = find("(k)", cur)
NOTE31 = []
for k, (i, h, rate, frm, to) in enumerate(pos):
    j = pos[k + 1][0] if k + 1 < len(pos) else end31
    blk = block(i, j)
    codes = codes_in(blk[1:], prose=False) + re.findall(r"\d{4}\.\d{2}\.\d{2}(?:\d{2})?", " ".join(blk))
    # Drop codes that are the subdivision's own prose about heading numbers.
    codes = uniq([c for c in codes if not c.startswith("9903.")])
    if not codes:
        die(f"note 31 {h}: no codes")
    NOTE31.append({"heading": h, "rate": rate, "from": frm, "until": to, "codes": codes})
# 9903.91.10 carves enteral syringes (9018.31.0080) out of 9903.91.03 before 2026.
NOTE31_CARVEOUTS = [{"heading": "9903.91.10", "overrides": "9903.91.03", "stats": ["9018.31.0080"], "until": "2025-12-31"}]

# ── Note 52: the 2026 forced-labour duties ──────────────────────────────
n52 = find("52.")
while not lines[n52 + 1].startswith("(a) Except as provided in headings 9903.05.85"):
    n52 = find("52.", n52 + 1)
a52 = n52 + 1
b52 = find("(b) As provided in heading 9903.05.86", a52)
c52 = find("(c) As provided in heading 9903.05.87", b52)
d52 = find("(d) As provided in heading 9903.05.88", c52)
e52 = find("(e) As provided in heading 9903.05.89", d52)
f52 = find("(f) As provided in heading 9903.05.90", e52)
g52 = find("(g) As provided in heading 9903.05.93", f52)
j52 = find("(j)", g52)
k52 = find("(k) As provided in headings 9903.05.38", j52)

N52_B = uniq(codes_in(block(b52 + 2, c52)))
check_known("note 52(b)", N52_B)
if len(N52_B) < 300:
    die(f"note 52(b): only {len(N52_B)} provisions")


def described_items(blk):
    """"(7) Other oil seeds … (classifiable in subheading 1207.99.03);" items."""
    text = " ".join(l.strip() for l in blk)
    out = []
    for mm in re.finditer(r"\((?:\d+|[A-Z])\)\s+(.*?)\(classifiable in subheading (\d{4}\.\d{2}\.\d{2})\)", text):
        out.append({"code": mm.group(2), "desc": mm.group(1).strip().rstrip(",;")})
    return out


N52_C = described_items(block(c52, d52))
if len(N52_C) < 14:
    die(f"note 52(c): {len(N52_C)} items")
N52_D = uniq(codes_in(block(d52 + 5, e52)))  # civil aircraft, on conditions
N52_E = uniq(codes_in(block(e52 + 4, f52)))  # pharmaceutical use
check_known("note 52(d)", N52_D, 0.2)
check_known("note 52(e)", N52_E, 0.2)

# (j): per-country lists. Each "(i) As provided in heading 9903.xx.xx, the
# duty imposed by heading(s) 9903.05.NN… shall not apply to articles the
# product of <Country> that are classifiable in the following provisions"
# is an outright exemption; "(ii) … the following particular articles" are
# described items, conditional.
COUNTRY_EXEMPT = {}
COUNTRY_DESCRIBED = {}
jtext_idx = [i for i in range(j52, k52) if re.match(r"^\((?:[0-9]+|i|ii|iii)\) As provided in heading 99", lines[i])]
for n, i in enumerate(jtext_idx):
    j = jtext_idx[n + 1] if n + 1 < len(jtext_idx) else k52
    head = " ".join(l.strip() for l in lines[i:i + 3])
    cm = re.search(r"(?:articles the product of|particular articles the product of|textiles or apparel the product of) (?:the |a member state of the )?([A-Z][A-Za-z ]+?)(?: that| shall|:)", head)
    if not cm:
        cm = re.search(r"the product of (?:the |a member state of the )?([A-Z][A-Za-z ]+?)[ :,]", head)
    if not cm:
        die(f"note 52(j): no country in {head[:120]!r}")
    country = cm.group(1).strip()
    blk = block(i, j)
    if "following particular articles" in head or "the following" in head and "classifiable in the following provisions" not in head:
        COUNTRY_DESCRIBED.setdefault(country, []).extend(described_items(blk))
    elif "textile or apparel" in head or "textiles or apparel" in head:
        COUNTRY_DESCRIBED.setdefault(country, []).append({"code": None, "desc": "Textile or apparel goods meeting the conditions of note 52(j) for this country"})
    else:
        codes = uniq(codes_in(blk[1:]))
        check_known(f"note 52(j) {country}", codes, 0.2)
        COUNTRY_EXEMPT.setdefault(country, []).extend(codes)

# Rates by country, straight from headings 9903.05.20–9903.05.84.
N52_COUNTRIES = []
for r in hts:
    h = r.get("htsno") or ""
    if not re.match(r"9903\.05\.(2\d|[3-7]\d|8[0-4])$", h):
        continue
    desc = re.sub(r"\s+", " ", r["description"])
    gen = r["general"]
    cm = re.search(r"articles the product of (?:the |a member state of the )?(.+?)(?:, with an ad valorem| , as provided| as provided|, as provided)", desc)
    if not cm:
        die(f"{h}: no country in {desc[:100]}")
    name = cm.group(1).strip().rstrip(",")
    am = re.search(r"\+ ?([\d.]+)%", gen)
    floor = re.search(r"less than ([\d.]+) percent", desc)
    atleast = re.search(r"equal to or greater than ([\d.]+) percent", desc)
    excepts = re.findall(r"9903\.0[56]\.\d{2}", desc.split("articles the product")[0])
    if am:
        kind, rate = "add", float(am.group(1))
    elif floor and re.fullmatch(r"[\d.]+%", gen.strip()):
        kind, rate = "floor", float(gen.strip().rstrip("%"))
    elif atleast:
        kind, rate = "floorNone", float(atleast.group(1))
    else:
        die(f"{h}: cannot read rate {gen!r}")
    N52_COUNTRIES.append({"heading": h, "country": name, "kind": kind, "rate": rate})

# ── Measures the calculator flags but does not compute ──────────────────
FLAG_NOTES = [
    ("16", "16. (a) Except as provided in headings 9903.82.01", "17. (a) Subheadings 9903.45.01",
     "Section 232: steel, aluminium and copper (and derivative articles)",
     "Applies to the full value when the metal is at least 15% of the article's weight (any weight for chapters 72, 73, 74 and 76). Rates run from 10% to 50% depending on origin and metal source. Where it applies, the 2026 note-52 duty does not."),
    ("33", "33. (a) Except as provided for in headings 9903.94.02", "35. [Compiler's note",
     "Section 232: passenger vehicles, light trucks and their parts",
     "25% on listed vehicles and parts, with country deals. Where it applies, the 2026 note-52 duty does not."),
    ("37", "37.", "38.", "Section 232: timber, lumber, upholstered furniture, kitchen cabinets and vanities",
     "10% on softwood lumber, 25% on upholstered wooden furniture and on kitchen cabinets and vanities, with country caps. Where it applies, the 2026 note-52 duty does not."),
    ("38", "38.", "39.", "Section 232: medium- and heavy-duty vehicles, buses and their parts",
     "10% to 25%. Where it applies, the 2026 note-52 duty does not."),
    ("39", "39.", "40.", "Section 232: semiconductors",
     "25% on semiconductor articles, with end-use exemptions. Where it applies, the 2026 note-52 duty does not."),
    ("40", "40.", "41.", "Section 232: pharmaceuticals",
     "Up to 100% on patented pharmaceuticals, with country caps and exemptions; generics excluded. Where it applies, the 2026 note-52 duty does not."),
    ("41", "41.", "43.", "Section 201 safeguard: quartz surface products",
     "25% within the quota, 50% above it."),
    ("43", "43.", "50.", "Section 232: unmanned aircraft (drones), their parts and components",
     "Up to 100% on drones and listed parts, with country caps. This one does NOT replace the 2026 note-52 duty."),
]
FLAGS = []
def note_start(a, after):
    """A note's first line: either the full anchor text, or a line that is
    just "37." (the notes from 37 on print their number on a line alone)."""
    for k in range(after, len(lines)):
        if lines[k].startswith(a) if len(a) > 4 else lines[k].strip() == a:
            return k
    die(f"note anchor not found: {a!r}")


for note, a, b, title, how in FLAG_NOTES:
    i = note_start(a, 0 if note == "16" else n31)
    jn = note_start(b, i + 1)
    blk = block(i, jn)
    codes = [c for c in uniq(codes_in(blk, prose=True)) if not c.startswith(("98", "99"))]
    # Prose also cites 4-digit headings ("heading 8702"). A flag is a prompt to
    # check, so a superset is the safe side.
    codes += [h for h in uniq(re.findall(r"(?:heading|headings) (\d{4})(?![\d.])", " ".join(blk))) if not h.startswith("99")]
    FLAGS.append({"note": note, "title": title, "how": how, "codes": uniq(codes)})

out = {
    "source": "USITC, Harmonized Tariff Schedule of the United States, Chapter 99, U.S. notes to subchapter III",
    "revision": revision_label,
    "s301": {
        "lists": [
            {"id": "1", "heading": "9903.88.01", "rate": 25, "codes": LIST1, "partial": []},
            {"id": "2", "heading": "9903.88.02", "rate": 25, "codes": LIST2, "partial": []},
            {"id": "3", "heading": "9903.88.03", "rate": 25, "codes": LIST3, "partial": LIST3_PARTIAL},
            {"id": "4A", "heading": "9903.88.15", "rate": 7.5, "codes": LIST4A, "partial": LIST4A_PARTIAL},
            {"id": "4B", "heading": "9903.88.16", "rate": 0, "suspended": True, "codes": LIST4B, "partial": []},
        ],
        "exclusions": EXCL,
        "note31": NOTE31,
        "note31Carveouts": NOTE31_CARVEOUTS,
    },
    "n52": {
        "countries": N52_COUNTRIES,
        "exemptAll": N52_B,
        "describedAll": N52_C,
        "aircraft": N52_D,
        "pharma": N52_E,
        "exemptByCountry": COUNTRY_EXEMPT,
        "describedByCountry": COUNTRY_DESCRIBED,
    },
    "flags": FLAGS,
}
json.dump(out, open(out_path, "w"), indent=None, separators=(",", ":"))
print(
    f"extract-ch99: {revision_label}; lists 1/2/3/4A/4B = {len(LIST1)}/{len(LIST2)}/{len(LIST3)}/{len(LIST4A)}/{len(LIST4B)}; "
    f"{len(EXCL)} exclusions; note 31 {sum(len(x['codes']) for x in NOTE31)} codes; note 52 {len(N52_COUNTRIES)} countries, "
    f"{len(N52_B)} exempt provisions, {sum(len(v) for v in COUNTRY_EXEMPT.values())} country exemptions; "
    + ", ".join(f"note {f['note']} {len(f['codes'])}" for f in FLAGS)
)
