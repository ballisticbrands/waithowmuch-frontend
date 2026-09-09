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
 */
export function Provenance({
  method,
  confidence,
}: {
  method: ResearchMethod;
  confidence?: "LOW" | "MEDIUM" | "HIGH" | null;
}) {
  return (
    <span data-provenance data-method={method}>
      {METHOD_LABEL[method] ?? method}
      {confidence ? ` · ${confidence.toLowerCase()} confidence` : ""}
    </span>
  );
}
