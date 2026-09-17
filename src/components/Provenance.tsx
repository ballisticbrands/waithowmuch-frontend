import { METHOD_LABEL } from "@/lib/format";
import type { ResearchMethod } from "@/lib/api";

/**
 * Says where a number came from.
 *
 * Deliberately prominent rather than fine print: this site publishes figures
 * nobody handed us, and the difference between "we modelled this from public
 * data" and "we read it off a connected account" is the difference between an
 * estimate and a fact. Hiding that distinction is how a research site loses
 * the only thing it has.
 *
 * The row's `confidence` is deliberately NOT shown: "low confidence" beside a
 * figure reads as a warning about that business rather than as the ordinary
 * state of a researched estimate, which every figure here already is.
 */
export function Provenance({ method }: { method: ResearchMethod }) {
  return (
    <span data-provenance data-method={method}>
      {METHOD_LABEL[method] ?? method}
    </span>
  );
}
