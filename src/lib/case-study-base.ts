import { createContext, useContext } from "react";

/**
 * Where the case study the reader is on lives. "/business" is the current
 * brand page; the previous long-form case study is kept at "/business2" and
 * provides that here, so the links inside it (to its own sections, its margin
 * page, its advertising page) stay inside it rather than jumping to the new one.
 */
export const CaseStudyBase = createContext<"/business" | "/business2">("/business");

export const useCaseStudyBase = () => useContext(CaseStudyBase);

/** A /business/… link moved onto `base`; anything else is returned as is. */
export const rebase = (href: string, base: string) =>
  base !== "/business" && href.startsWith("/business/") ? `${base}${href.slice("/business".length)}` : href;
