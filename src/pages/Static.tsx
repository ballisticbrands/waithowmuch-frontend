import { BRAND_NAME } from "@/data/site";

const WRAP = { maxWidth: "40rem" } as const;
const H1 = { fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" } as const;
const P = { marginBottom: "0.875rem", color: "var(--muted-foreground)" } as const;

export function About() {
  return (
    <div style={WRAP}>
      <h1 style={H1}>About {BRAND_NAME}</h1>
      <p style={P}>
        {BRAND_NAME} publishes what businesses actually make. Revenue, profit,
        margin — for companies most people have never heard of.
      </p>
      <p style={P}>
        <strong>Most of these figures are estimates.</strong> They are modelled
        from public information: marketplace data, ad libraries, social
        footprints, pricing and public filings. They are not the company's
        books, and we do not pretend otherwise — every profile carries a label
        saying how its numbers were arrived at, and links to the sources behind
        them.
      </p>
      <p style={P}>
        Where a figure is confirmed by an owner, or read from a connected
        account, the profile says that too. The distinction is the point.
      </p>
    </div>
  );
}

export function Privacy() {
  return (
    <div style={WRAP}>
      <h1 style={H1}>Privacy</h1>
      <p style={P}>
        If you create an account we store your email address, and — if you
        arrived from a link with campaign parameters — where you came from. That
        is it.
      </p>
      <p style={P}>
        We use Google Analytics and Microsoft Clarity to understand how the site
        is used. Neither is given your email address.
      </p>
      <p style={P}>
        To have your account and its data deleted, email hello@waithowmuch.com.
      </p>
    </div>
  );
}

export function Terms() {
  return (
    <div style={WRAP}>
      <h1 style={H1}>Terms</h1>
      <p style={P}>
        {BRAND_NAME} is provided as-is, for information only.
      </p>
      <p style={P}>
        <strong>Figures on this site are estimates unless a profile explicitly
        states otherwise.</strong> They are not audited, not endorsed by the
        businesses described, and must not be relied on for any investment,
        acquisition or lending decision.
      </p>
      <p style={P}>
        If you are an owner and believe a profile is wrong, email
        hello@waithowmuch.com and we will correct or remove it.
      </p>
    </div>
  );
}

export function NotFound() {
  return <div data-empty>Nothing here.</div>;
}
