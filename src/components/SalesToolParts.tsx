import { Link } from "react-router-dom";
import { businessPath } from "@/data/site";
import { ATTRIBUTION, FBA_PATH, type ToolPage } from "@/data/sales-tools-page.mjs";
import { readAt, type Comparable } from "@/lib/sales-tools";

/** Shared pieces of the two Keepa-backed tools (pages/SalesEstimator.tsx and
 *  pages/StoreRevenue.tsx). Layout reuses the FBA calculator's data-fba-*. */

/** The words under the tool — the same strings the prerender emits. */
export function ToolCopy({ page }: { page: ToolPage }) {
  return (
    <div data-prose data-fba-copy>
      {page.sections.map((s) => (
        <section key={s.id} id={s.id}>
          <h2>{s.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: s.html }} />
        </section>
      ))}
      <section id="faq">
        <h2>Frequently asked questions</h2>
        {page.faq.map((x) => (
          <div key={x.q} data-fba-faq>
            <h3>{x.q}</h3>
            <p dangerouslySetInnerHTML={{ __html: x.a }} />
          </div>
        ))}
      </section>
      <section id="related">
        <h2>Related</h2>
        <ul>{page.related.map((r) => <li key={r.href}><Link to={r.href}>{r.label}</Link></li>)}</ul>
      </section>
    </div>
  );
}

const MATCH: Record<Comparable["matchedOn"], string> = {
  asin: "sells this product",
  brand: "same brand",
  seller: "same seller",
  revenue: "similar monthly revenue",
};

export function Comparables({ items }: { items: Comparable[] }) {
  if (!items.length) return null;
  return (
    <div data-st-comparables>
      <h3 data-fba-card-title>Businesses in our database</h3>
      <ul>
        {items.map((c) => (
          <li key={c.slug}>
            <Link to={businessPath(c.slug)}>{c.name}</Link>
            <span>
              {MATCH[c.matchedOn]}
              {c.latestMonthlyRevenue ? ` · $${Math.round(Number(c.latestMonthlyRevenue)).toLocaleString("en-US")}/mo` : ""}
            </span>
          </li>
        ))}
      </ul>
      <p data-fba-empty>Each one is a full case study: revenue, profit, margin and how the numbers were reached.</p>
    </div>
  );
}

export function Provenance({ retrievedAt }: { retrievedAt: string }) {
  return (
    <p data-st-provenance>
      Read {readAt(retrievedAt)}. <span dangerouslySetInnerHTML={{ __html: ATTRIBUTION }} />
    </p>
  );
}

/** Shown when the backend is not deployed, has no Keepa key, or is down. */
export function Unavailable({ what }: { what: string }) {
  return (
    <div data-st-notice role="status">
      <strong>The {what} is temporarily unavailable.</strong>
      <p>
        We couldn't reach the sales data just now. Please try again in a little while. In the meantime the{" "}
        <Link to={FBA_PATH}>FBA fee calculator</Link> works without it.
      </p>
    </div>
  );
}

export function Notice({ children, tone }: { children: React.ReactNode; tone?: "warn" }) {
  return <div data-st-notice data-tone={tone} role="status">{children}</div>;
}
