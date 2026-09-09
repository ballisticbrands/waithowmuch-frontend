import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useSession, signOut } from "@/lib/session";
import { BRAND_NAME } from "@/data/site";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, signedIn } = useSession();
  return (
    <div data-shell>
      <header data-topbar>
        <div data-topbar-inner>
          <Link data-wordmark to="/">
            <Logo />
            <span>{BRAND_NAME}</span>
          </Link>
          <nav style={{ marginLeft: "auto", display: "flex", gap: "1rem", alignItems: "center", fontSize: "0.875rem" }}>
            <Link to="/about">About</Link>
            {signedIn ? (
              <>
                <span style={{ color: "var(--muted-foreground)" }}>{user?.email}</span>
                <button data-btn data-variant="ghost" onClick={signOut}>Sign out</button>
              </>
            ) : (
              <Link data-btn to="/login">Sign in</Link>
            )}
          </nav>
        </div>
      </header>

      <main data-main>{children}</main>

      <footer data-footer>
        <p>
          {BRAND_NAME} publishes revenue and profit figures for real businesses.
          Unless a profile says otherwise, figures are <strong>estimates modelled
          from public data</strong> — not the company's books.
        </p>
        <p style={{ marginTop: "0.75rem", display: "flex", gap: "1rem" }}>
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </p>
      </footer>
    </div>
  );
}
