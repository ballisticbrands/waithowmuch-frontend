import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSetCrumbs } from "@/components/Breadcrumbs";
import { ImportCalculator, usePublished } from "@/components/ImportCalculator";
import { landedCostCalculatorBootstrap } from "@/lib/bootstrap";
import { trackCtaClick } from "@/lib/track";
import {
  TITLE, DOC_TITLE, LEDE, PRIVACY_LINE, FAQ, RELATED, sections,
} from "@/data/landed-cost-calculator-page.mjs";
import { SOURCE_LINE } from "@/data/tariff-calculator-page.mjs";
import { businessPath } from "@/data/site";

/**
 * /tools/landed-cost-calculator/ — the tariff calculator plus freight,
 * insurance, the broker, moulds and the trip to Amazon: cost per unit landed.
 * Same engine and component as the tariff calculator; the words under it come
 * from data/landed-cost-calculator-page.mjs, which the prerender emits too.
 */
const SECTIONS = sections(businessPath);

export default function LandedCostCalculator() {
  useSetCrumbs(() => [{ label: "Landed cost calculator" }], []);
  useEffect(() => { document.title = DOC_TITLE; }, []);
  const published = usePublished(landedCostCalculatorBootstrap()?.businesses ?? null);

  return (
    <main data-main>
      <div data-fba>
        <h1>{TITLE}</h1>
        <p data-fba-lede dangerouslySetInnerHTML={{ __html: LEDE }} />
        <p data-fba-source>{SOURCE_LINE} {PRIVACY_LINE}</p>

        <ImportCalculator variant="landed" published={published} defaultPreset="ototo-spatula" />

        <aside data-fba-cta>
          <p>
            We publish the real unit economics of Amazon businesses, tariffs and freight included, with every figure
            sourced. One email when a new case study is out.
          </p>
          <Link data-btn to="/signup" onClick={() => trackCtaClick("landed_cost_calculator")}>Get emails on new case studies</Link>
        </aside>

        <div data-prose data-fba-copy>
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id}>
              <h2>{s.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: s.html }} />
            </section>
          ))}
          <section id="faq">
            <h2>Frequently asked questions</h2>
            {FAQ.map((x) => (
              <div key={x.q} data-fba-faq>
                <h3>{x.q}</h3>
                <p dangerouslySetInnerHTML={{ __html: x.a }} />
              </div>
            ))}
          </section>
          <section id="related">
            <h2>Related reading</h2>
            <ul>{RELATED.map((r) => <li key={r.href}><Link to={r.href}>{r.label}</Link></li>)}</ul>
          </section>
        </div>
      </div>
    </main>
  );
}
