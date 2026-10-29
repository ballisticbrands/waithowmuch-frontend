import { Navigate, useParams } from "react-router-dom";
import Business from "@/pages/Business";
import Business2Route from "@/pages/Business2";
import { CaseStudyBase } from "@/lib/case-study-base";
import { onNewBrandPage } from "@/data/new-brand-page";

/** /business/<slug>/[<section>/]: the new brand page for a brand on it, the
 *  case study for every other brand. */
export function BusinessRoute() {
  const { slug = "" } = useParams();
  return onNewBrandPage(slug) ? <Business2Route /> : <Business />;
}

/** /business2/<slug>/[<section>/]: the previous case study of a brand that
 *  moved to the new page. Any other brand has only one page, at /business/. */
export function PreviousCaseStudyRoute() {
  const { slug = "", section } = useParams();
  if (!onNewBrandPage(slug)) {
    return <Navigate to={`/business/${encodeURIComponent(slug)}/${section ? `${section}/` : ""}${window.location.search}${window.location.hash}`} replace />;
  }
  return (
    <CaseStudyBase.Provider value="/business2">
      <Business />
    </CaseStudyBase.Provider>
  );
}
