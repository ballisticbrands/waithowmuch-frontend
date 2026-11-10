import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSetCrumbs } from "@/components/Breadcrumbs";
import { ImportCalculator } from "@/components/ImportCalculator";
import { trackCtaClick } from "@/lib/track";
import {
  H1, TAGLINE, DOC_TITLE, LEDE, SOURCE_LINE, PRIVACY_LINE, FAQ, RELATED, sections,
} from "@/data/tariff-calculator-page.mjs";
import { businessPath } from "@/data/site";

/**
 * /tools/tariff-calculator/ — US import duty for one HTS line: the General
 * rate, the China Section 301 lists and exclusions, the 2026 Section 301 duty
 * of note 52 by country, MPF and HMF. The engine is data/tariff.mjs; the words
 * under it come from data/tariff-calculator-page.mjs, which the prerender
 * emits too.
 */
const SECTIONS = sections(businessPath);

export default function TariffCalculator() {
  useSetCrumbs(() => [{ label: "Tariff calculator" }], []);
  useEffect(() => { document.title = DOC_TITLE; }, []);

  return (
    <main data-main>
      <div data-fba>
        <h1>{H1}</h1>
        <p data-fba-tagline>{TAGLINE}</p>

        <ImportCalculator variant="tariff" />

        <p data-fba-source>{SOURCE_LINE} {PRIVACY_LINE}</p>
        <p data-fba-lede dangerouslySetInnerHTML={{ __html: LEDE }} />

        <aside data-fba-cta>
          <p>
            We publish the real unit economics of Amazon businesses, tariffs and freight included, with every figure
            sourced. One email when a new case study is out.
          </p>
          <Link data-btn to="/signup" onClick={() => trackCtaClick("tariff_calculator")}>Get emails on new case studies</Link>
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
