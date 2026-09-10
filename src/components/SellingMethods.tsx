import type { Profile } from "@/businesses/types";
import type { ResolvedMethod } from "@/businesses/selling-methods.mjs";
import { resolveSelling } from "@/businesses/selling-methods.mjs";

/**
 * Every way this business sells, ticked or not.
 *
 * ── 🚨 The present rows are the page; the rest are a list ────────────────
 * The taxonomy runs to twenty-odd methods and a given business uses five. A
 * row per method would be four screens of "no" with the findings buried in
 * them, so what a business DOES gets a row with its evidence, and what it does
 * not gets named on one line underneath.
 *
 * Named, not dropped. A method absent from the page entirely would be
 * indistinguishable from one nobody thought of, and the whole value of a
 * checklist is that it records the questions asked as well as the answers.
 *
 * ── Why "not checked" is its own line ────────────────────────────────────
 * Folding it into "not present" would be a lie of exactly the kind this page
 * exists to avoid, and it would corrupt any chart built on this field: a
 * method is counted against the businesses CHECKED for it, so an unchecked
 * answer has to stay separable from a negative one.
 */
export function SellingMethods({ profile }: { profile: Profile }) {
  const groups = resolveSelling(profile.selling);
  // Nothing answered anywhere — render nothing rather than a grid of shrugs.
  const anyAnswered = groups.some((g) => g.methods.some((m) => m.status !== "unchecked"));
  if (!anyAnswered) return null;

  return (
    <section data-selling="">
      {groups.map((group) => {
        const present = group.methods.filter((m) => m.status === "yes");
        const absent = group.methods.filter((m) => m.status === "no");
        const unchecked = group.methods.filter((m) => m.status === "unchecked");
        return (
          <div data-selling-group="" key={group.id}>
            <h3>
              {group.title}
              <span data-selling-blurb="">{group.blurb}</span>
            </h3>

            {present.length > 0 ? (
              <ul data-selling-list="">
                {present.map((m) => (
                  <MethodRow key={m.id} method={m} />
                ))}
              </ul>
            ) : (
              <p data-selling-none="">Nothing here is confirmed.</p>
            )}

            {absent.length > 0 && (
              <p data-selling-rest="">
                <span data-selling-rest-label="">Not present</span>
                {absent.map((m) => m.label).join(", ")}
              </p>
            )}
            {unchecked.length > 0 && (
              <p data-selling-rest="" data-unchecked="">
                <span data-selling-rest-label="">Not checked</span>
                {unchecked.map((m) => m.label).join(", ")}
              </p>
            )}
          </div>
        );
      })}
    </section>
  );
}

function MethodRow({ method }: { method: ResolvedMethod }) {
  return (
    <li data-flag={method.flag ? "" : undefined}>
      {/* The tick is decorative; the word beside it is what a screen reader
          reads, so the status never depends on a glyph rendering. */}
      <span data-selling-tick="" aria-hidden="true">
        ✓
      </span>
      <span data-selling-label="">
        <span data-visually-hidden="">Uses: </span>
        {method.label}
      </span>
      {method.note && <p data-selling-note="">{method.note}</p>}
    </li>
  );
}
