import { useCallback } from "react";

type Props = {
  label: string;
  min: number;
  max: number;
  step: number;
  /** undefined = unbounded on that end. */
  valueMin?: number;
  valueMax?: number;
  onChange: (next: { min?: number; max?: number }) => void;
  format: (n: number) => string;
};

/**
 * Two-thumb range filter.
 *
 * 🚨 A thumb parked at an END of the track means UNBOUNDED, not "equal to the
 * end value". Sliding the top thumb to $500k has to mean "no upper limit" —
 * otherwise the control silently hides every business above the ceiling we
 * happened to pick, and the user has no way to express "and everything above".
 * That is why the handlers emit `undefined` at the bounds rather than the
 * bound value.
 */
export function RangeSlider({ label, min, max, step, valueMin, valueMax, onChange, format }: Props) {
  const lo = valueMin ?? min;
  const hi = valueMax ?? max;

  const pct = useCallback((n: number) => ((n - min) / (max - min)) * 100, [min, max]);

  const setLo = (n: number) => {
    // Never let the thumbs cross — clamp to one step below the upper thumb.
    const next = Math.min(n, hi - step);
    onChange({ min: next <= min ? undefined : next, max: valueMax });
  };
  const setHi = (n: number) => {
    const next = Math.max(n, lo + step);
    onChange({ min: valueMin, max: next >= max ? undefined : next });
  };

  return (
    <div data-filter>
      <span data-filter-label>{label}</span>
      <div data-slider>
        <div data-slider-track />
        <div data-slider-fill style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%`, top: "0.85rem" }} />
        <input
          type="range" min={min} max={max} step={step} value={lo}
          aria-label={`Minimum ${label}`}
          onChange={(e) => setLo(Number(e.target.value))}
        />
        <input
          type="range" min={min} max={max} step={step} value={hi}
          aria-label={`Maximum ${label}`}
          onChange={(e) => setHi(Number(e.target.value))}
        />
      </div>
      <span data-slider-value>
        {format(lo)} – {format(hi)}{hi >= max ? "+" : ""}
      </span>
    </div>
  );
}
