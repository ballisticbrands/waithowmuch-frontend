import { Link } from "react-router-dom";
import type { ResearchMethod } from "@/lib/api";

const LEAD: Record<ResearchMethod, string> = {
  RESEARCHED: "Researched profile",
  SELF_REPORTED: "Owner-reported profile",
  INTERVIEW: "Interview profile",
  VERIFIED: "Verified profile",
};

const BODY: Record<ResearchMethod, string> = {
  RESEARCHED:
    "Nobody from this business wrote this page. We built it from public information and worked the numbers out ourselves, so treat every figure as a careful estimate rather than a fact.",
  SELF_REPORTED:
    "The figures here came from the owner and we have not independently checked them.",
  INTERVIEW:
    "The owner gave these figures on the record. We have not audited them.",
  VERIFIED:
    "The figures here were read from a connected account rather than estimated.",
};

/**
 * Sits directly under the business name, above the numbers — deliberately
 * before a reader reaches the figures rather than as a footnote after them.
 * The whole credibility of a research product rests on the reader knowing
 * which kind of number they are looking at *while* they look at it.
 */
export function ResearchedNotice({ method }: { method: ResearchMethod }) {
  return (
    <div data-notice>
      <div>
        <strong>{LEAD[method] ?? "Researched profile"}</strong> — {BODY[method] ?? BODY.RESEARCHED}{" "}
        <Link to="/how-we-research/" style={{ color: "var(--accent)", whiteSpace: "nowrap" }}>
          How we research →
        </Link>
      </div>
    </div>
  );
}
