import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BRAND_NAME } from "@/data/site";
import { collectionPath } from "@/data/collections.mjs";

function Page({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: title }]} />
      <main data-main>
        <div data-prose>
          <h1 style={{ fontSize: "1.875rem", fontWeight: 700, marginBottom: "1.25rem" }}>{title}</h1>
          {children}
        </div>
      </main>
    </>
  );
}

/** Placeholder — the real methodology write-up comes later, but the link from
 *  every profile's researched-profile notice has to land somewhere real. */
export function HowWeResearch() {
  return (
    <Page title="How we research">
      <div data-notice style={{ marginBottom: "1.5rem" }}>
        <div><strong>Placeholder.</strong> A full methodology write-up is still to come.</div>
      </div>
      <p>
        Almost every profile on {BRAND_NAME} is a <strong>researched profile</strong>. Nobody
        from the business wrote it. We gather what is publicly visible, work the
        economics out ourselves, and publish the result with the sources attached.
      </p>
      <h2>Where the numbers come from</h2>
      <ul>
        <li>Marketplace listings, pricing, review velocity and catalogue size</li>
        <li>Public advertising libraries</li>
        <li>Social footprints — follower counts, posting history, engagement</li>
        <li>Company filings and registrations where they exist</li>
      </ul>
      <h2>What the labels mean</h2>
      <ul>
        <li><strong>Researched</strong> — modelled by us from public information. Treat as an estimate.</li>
        <li><strong>Owner-reported</strong> — the owner gave us the figures. We have not checked them.</li>
        <li><strong>Interview</strong> — the owner gave the figures on the record.</li>
        <li><strong>Verified</strong> — read from a connected account rather than estimated.</li>
      </ul>
      <h2>Where we are likely to be wrong</h2>
      <p>
        Estimates go wrong in predictable ways: a business selling through
        channels we cannot see will look smaller than it is, and one running
        heavy discounts will look more profitable. Margins are the softest
        figure on any page — costs are the hardest thing to observe from outside.
      </p>
      <p>
        If a profile is wrong and it is yours, email hello@waithowmuch.com and we
        will correct or remove it.
      </p>
      <p><Link to={collectionPath("all-ideas")}>Browse all ideas →</Link></p>
    </Page>
  );
}

export function About() {
  return (
    <Page title={`About ${BRAND_NAME}`}>
      <p>
        {BRAND_NAME} publishes what businesses actually make — revenue, profit and
        margin for companies most people have never heard of.
      </p>
      <p>
        Most of these figures are estimates, built from public information rather
        than the company's accounts, and we do not pretend otherwise. Every
        profile says how its numbers were reached and links to the sources behind
        them, so you can judge them rather than taking our word for it.
      </p>
      <p><Link to="/how-we-research/">How we research →</Link></p>
    </Page>
  );
}

export function Privacy() {
  return (
    <Page title="Privacy">
      <p>
        If you create an account we store your email address, and — if you arrived
        from a link carrying campaign parameters — where you came from. That is
        it. No password, no name, no payment method.
      </p>
      <p>
        We use Google Analytics and Microsoft Clarity to understand how the site
        is used. Neither is given your email address.
      </p>
      <p>To have your account and its data deleted, email hello@waithowmuch.com.</p>
    </Page>
  );
}

export function Terms() {
  return (
    <Page title="Terms">
      <p>{BRAND_NAME} is provided as-is, for information only.</p>
      <p>
        Figures on this site are estimates unless a profile explicitly states
        otherwise. They are not audited, not endorsed by the businesses described,
        and must not be relied on for any investment, acquisition or lending
        decision.
      </p>
      <p>
        If you are an owner and believe a profile is wrong, email
        hello@waithowmuch.com and we will correct or remove it.
      </p>
    </Page>
  );
}

export function NotFound() {
  return (
    <Page title="Not found">
      <p>Nothing here.</p>
      <p><Link to={collectionPath("all-ideas")}>All ideas →</Link></p>
    </Page>
  );
}
