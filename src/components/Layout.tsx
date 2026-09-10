import { Link } from "react-router-dom";
import { TopBar, SideRail } from "./Nav";
import { CrumbProvider } from "./Breadcrumbs";
import { BRAND_NAME } from "@/data/site";
import { COLLECTIONS, collectionPath } from "@/data/collections.mjs";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CrumbProvider>
      <div data-shell>
        <TopBar />
        {/* The rail and the content are siblings in a row — content sits to the
            RIGHT of the navigation, not below it. */}
        <div data-body>
          <SideRail />
          <div data-content>
            {children}
            <footer data-footer>
              <div data-footer-inner>
                <p style={{ maxWidth: "44rem", margin: 0 }}>
                  {BRAND_NAME} publishes revenue and profit for real businesses. Unless a
                  profile says otherwise, the figures are{" "}
                  <strong style={{ color: "var(--foreground)" }}>estimates built from public information</strong>{" "}
                  — not the company's accounts. Every profile shows how its numbers were reached.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", marginTop: "1.25rem" }}>
                  {COLLECTIONS.map((c) => (
                    <Link key={c.slug} to={collectionPath(c.slug)}>{c.navLabel ?? c.title}</Link>
                  ))}
                  <Link to="/how-we-research/">How we research</Link>
                  <Link to="/about/">About</Link>
                  <Link to="/privacy/">Privacy</Link>
                  <Link to="/terms/">Terms</Link>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </CrumbProvider>
  );
}
