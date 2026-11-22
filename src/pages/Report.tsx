import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { apiFetch, ApiError } from "@/lib/api";
import { gaEvent } from "@/lib/track";
import { useSession } from "@/lib/session";
import { useAuth, type ReportAsk } from "@/pages/Login";
import type { SignupIntent } from "@/lib/signup-intent";
import { GoogleSignIn } from "@/components/GoogleSignIn";
import { Turnstile } from "@/components/Turnstile";
import { PlatformIcon } from "@/components/PlatformIcon";
import { useSetCrumbs } from "@/components/Breadcrumbs";
import { TABS } from "@/businesses/brand-tabs.mjs";
import {
  SOURCE, PATH, TITLE, HERO, INPUT_ERRORS, BUILDING, POPUP, PLANS, PLAN_NOTE, DEFAULT_PLAN, SENT,
  type ReportPlan,
} from "@/data/report-page.mjs";

/**
 * /report/ — a free WaitHowMuch report on any Amazon store, by email.
 *
 * The visitor pastes a store or product; the page shows the newest brand page
 * (pages/Business2.tsx) for it with its REAL name and product photos and every
 * figure blurred and "building", under a popup that asks for an email (or
 * Google) and a plan: Free, or the $99 team verdict (selected by default,
 * nothing charged now).
 *
 * 🚨 No figure on this page is real. The API's report-header returns a name
 * and photos only (no Keepa revenue work for anonymous visitors); every
 * number is a placeholder under a blur, and the report itself is researched
 * by hand after the request.
 *
 * The request (store + plan) goes to the API with the magic-link request or
 * the Google sign-in, or straight to POST /v1/reports when already signed in.
 * It is recorded as a ReportRequest row; the User row gets signupSource
 * "report_page". `?requested=1` is where the magic link (intent.next) and
 * Google land: the "on its way" state.
 */

type Header = {
  kind: "seller" | "asin" | "brand_store";
  name: string | null;
  products: Array<{ asin: string; title: string | null; imageUrl: string | null }>;
  amazonUrl: string | null;
};
type HeaderState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ok"; header: Header }
  /** The API could not read the store (Keepa off, busy, not found): the page
   *  still works, with a generic name and no photos. */
  | { kind: "unknown" }
  | { kind: "invalid"; message: string };

export default function Report() {
  const [params, setParams] = useSearchParams();
  const store = params.get("store")?.trim() ?? "";
  const requested = params.get("requested") === "1";
  const doneVerdict = params.get("plan") === "verdict_99";

  useSetCrumbs(() => [{ label: "Free report" }], []);
  useEffect(() => { document.title = TITLE; }, []);

  const [state, setState] = useState<HeaderState>({ kind: "idle" });
  useEffect(() => {
    if (!store) {
      setState({ kind: "idle" });
      return;
    }
    let cancelled = false;
    setState({ kind: "loading" });
    apiFetch<Header>(`/v1/tools/report-header?store=${encodeURIComponent(store)}`)
      .then((header) => {
        if (cancelled) return;
        setState({ kind: "ok", header });
        gaEvent("report_lookup", { outcome: "ok", input_kind: header.kind });
      })
      .catch((err) => {
        if (cancelled) return;
        const reason = err instanceof ApiError && err.code === "invalid_store" ? String(err.body?.reason ?? "invalid") : null;
        if (reason && reason !== "brand_store_url") {
          setState({ kind: "invalid", message: INPUT_ERRORS[reason as keyof typeof INPUT_ERRORS] ?? INPUT_ERRORS.invalid });
          gaEvent("report_lookup", { outcome: "invalid", reason });
        } else {
          setState({ kind: "unknown" });
          gaEvent("report_lookup", { outcome: err instanceof ApiError ? err.code : "error" });
        }
      });
    return () => { cancelled = true; };
  }, [store]);

  const ask = (input: string) => setParams({ store: input.trim() });
  const reset = () => setParams({});
  const header = state.kind === "ok" ? state.header : null;
  const showGate = !!store && state.kind !== "invalid" && state.kind !== "loading";

  return (
    <main data-main data-report style={{ padding: "0.75rem 0.75rem 2rem" }}>
      {(!store || state.kind === "invalid") && (
        <StoreForm initial={store} error={state.kind === "invalid" ? state.message : null} onAsk={ask} />
      )}

      <div className="relative" aria-hidden={showGate || !store ? true : undefined}>
        <ReportPreview header={header} loading={state.kind === "loading"} placeholder={!store || state.kind === "invalid"} />
      </div>

      {showGate && (
        requested
          ? <Done verdict={doneVerdict} onAnother={reset} />
          : <Gate store={store} name={header?.name ?? null} onChangeStore={reset} />
      )}
    </main>
  );
}

// ─── The store input ─────────────────────────────────────────────────

function StoreForm({ initial, error, onAsk }: { initial: string; error: string | null; onAsk: (s: string) => void }) {
  const [q, setQ] = useState(initial);
  return (
    <section className="mx-auto mb-4 max-w-[46rem] rounded-2xl border border-[color:var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow)] sm:p-7">
      <h1 className="m-0 text-2xl font-extrabold tracking-tight sm:text-3xl">{HERO.h1}</h1>
      {HERO.lines.map((l) => <p key={l} className="mb-0 mt-2 text-[color:var(--muted-foreground)]">{l}</p>)}
      <form
        className="mt-4 flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => { e.preventDefault(); if (q.trim()) onAsk(q); }}
      >
        <input
          data-input aria-label={HERO.placeholder} placeholder={HERO.placeholder}
          value={q} onChange={(e) => setQ(e.target.value)} className="min-w-0 flex-1"
        />
        <button data-btn type="submit" disabled={!q.trim()}>{HERO.button}</button>
      </form>
      {error && <p role="alert" className="mb-0 mt-2 text-sm text-[color:var(--destructive,#b42318)]">{error}</p>}
    </section>
  );
}

// ─── The gate ────────────────────────────────────────────────────────

function Gate({ store, name, onChangeStore }: { store: string; name: string | null; onChangeStore: () => void }) {
  const { signedIn } = useSession();
  const auth = useAuth();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<ReportPlan>(DEFAULT_PLAN);
  const [planChanged, setPlanChanged] = useState(false);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => { dialog.current?.focus(); }, []);

  const report: ReportAsk = { input: store, plan };
  const done = `${PATH}?${new URLSearchParams({ store, requested: "1", plan })}`;
  // Read at submit time (GoogleSignIn keeps the latest callback in a ref).
  const intent = (): SignupIntent => ({ source: SOURCE, next: done });
  const sent = (method: string) => gaEvent("report_request", { plan, method, plan_changed: planChanged ? "yes" : "no" });

  const choose = (p: ReportPlan) => {
    setPlan(p);
    setPlanChanged(true);
  };

  async function signedInRequest() {
    setBusy(true);
    setError(null);
    try {
      await apiFetch("/v1/reports", { method: "POST", body: JSON.stringify(report) });
      sent("signed_in");
      navigate(done);
    } catch {
      setError("Could not send the request. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-[rgba(15,15,30,0.35)] px-4 py-6 sm:items-center">
      <div
        ref={dialog} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="report-gate-title"
        className="w-full max-w-[44rem] rounded-2xl border border-[color:var(--border)] bg-[var(--card)] p-5 shadow-2xl outline-none sm:p-7"
        style={{ outline: "none" }}
      >
        <h2 id="report-gate-title" className="m-0 text-2xl font-extrabold tracking-tight">{signedIn ? POPUP.signedInTitle : POPUP.title}</h2>
        {name && <p className="mb-0 mt-1 text-sm text-[color:var(--muted-foreground)]">Report on <strong className="text-[color:var(--foreground)]">{name}</strong></p>}

        {/* 1 — the plans, as big as the signup below them. */}
        <h3 className="mb-3 mt-5 text-lg font-bold">{POPUP.plansHeading}</h3>
        <div role="radiogroup" aria-label={POPUP.plansHeading} className="grid gap-3 sm:grid-cols-2">
          {PLANS.map((p) => {
            const on = plan === p.key;
            return (
              <button
                key={p.key} type="button" role="radio" aria-checked={on} onClick={() => choose(p.key)}
                data-report-plan={p.key}
                className={`relative rounded-xl border-2 p-4 text-left transition-colors ${
                  on ? "border-[color:var(--accent)] bg-[var(--accent-tint)]" : "border-[color:var(--border)] bg-[var(--card)] hover:border-[color:var(--muted-foreground)]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border-2 ${on ? "border-[color:var(--accent)]" : "border-[color:var(--border)]"}`}
                >
                  {on && <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />}
                </span>
                <span className="block pr-8 text-2xl font-extrabold tracking-tight">{p.title}</span>
                {p.lines.map((l) => <span key={l} className="mt-2 block text-sm leading-relaxed text-[color:var(--muted-foreground)]">{l}</span>)}
              </button>
            );
          })}
        </div>
        <p className="mb-0 mt-3 rounded-lg bg-[var(--surface)] px-3 py-2 text-sm">{PLAN_NOTE}</p>

        {/* 2 — where to send it. */}
        <h3 className="mb-3 mt-6 text-lg font-bold">{POPUP.signupHeading}</h3>
        {signedIn ? (
          <button data-btn type="button" className="w-full" disabled={busy} onClick={() => void signedInRequest()}>
            {busy ? "Sending…" : POPUP.signedInButton}
          </button>
        ) : auth.sent ? (
          <div className="rounded-xl border border-[color:var(--border)] bg-[var(--surface)] p-4">
            <p className="m-0 font-semibold">{SENT.emailTitle}</p>
            <p className="mb-0 mt-1 text-sm">{SENT.emailText}</p>
          </div>
        ) : (
          <>
            <form
              className="flex flex-col gap-2 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                sent("magic_link");
                void auth.requestLink(email, intent(), report);
              }}
            >
              <input
                data-input type="email" required autoComplete="email" aria-label="Email"
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="min-w-0 flex-1"
              />
              {/* Disabled until the challenge reports back, as on /signup. */}
              <button data-btn type="submit" data-signup-source={SOURCE} disabled={auth.busy || !email || auth.turnstileToken === null}>
                {auth.busy ? "Sending…" : POPUP.emailButton}
              </button>
            </form>
            <div className="mt-3 flex justify-center">
              <GoogleSignIn text="continue_with" onCredential={(cred) => { sent("google"); void auth.google(cred, intent(), report); }} />
            </div>
            <div className="mt-2 flex justify-center"><Turnstile onToken={auth.setTurnstileToken} /></div>
          </>
        )}
        {(auth.error || error) && <p role="alert" className="mb-0 mt-2 text-sm text-[color:var(--destructive,#b42318)]">{auth.error ?? error}</p>}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--border)] pt-4 text-sm">
          <button type="button" onClick={onChangeStore} className="text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]">{POPUP.changeStore}</button>
          <Link to={POPUP.caseStudies.href} className="font-semibold">{POPUP.caseStudies.text}</Link>
        </div>
      </div>
    </div>
  );
}

function Done({ verdict, onAnother }: { verdict: boolean; onAnother: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-[rgba(15,15,30,0.35)] px-4 py-6 sm:items-center">
      <div role="dialog" aria-modal="true" aria-labelledby="report-done-title" className="w-full max-w-[34rem] rounded-2xl border border-[color:var(--border)] bg-[var(--card)] p-6 shadow-2xl sm:p-7">
        <h2 id="report-done-title" className="m-0 text-2xl font-extrabold tracking-tight">{SENT.doneTitle}</h2>
        <p className="mb-0 mt-2">{SENT.doneText}</p>
        {verdict && <p className="mb-0 mt-3 rounded-lg bg-[var(--surface)] px-3 py-2 text-sm">{SENT.doneVerdict}</p>}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--border)] pt-4 text-sm">
          <button type="button" onClick={onAnother} className="text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]">Get a report on another store</button>
          <Link to={POPUP.caseStudies.href} className="font-semibold">{POPUP.caseStudies.text}</Link>
        </div>
      </div>
    </div>
  );
}

// ─── The blurred dashboard ───────────────────────────────────────────
//
// Laid out like pages/Business2.tsx (header, fact row, side menu, revenue /
// profit card, three mini stats, product strip), drawn from scratch: that
// page renders a researched brand's data modules, which a store nobody has
// researched does not have. Figures are fixed placeholders ("8"s) under a
// blur, so even the page source holds no number that could pass for real.

/** A placeholder figure, blurred and unselectable. */
function Blur({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span data-report-blur aria-hidden="true" className={`select-none ${className}`}>{children}</span>;
}

/** A deterministic wobbly series from the store's name, so the chart's shape
 *  is stable per store but says nothing about it. */
function wiggle(seed: string, n: number): number[] {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const out: number[] = [];
  let v = 0.45;
  for (let i = 0; i < n; i++) {
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    v = Math.min(0.92, Math.max(0.12, v + ((h >>> 0) / 2 ** 32 - 0.42) * 0.22));
    out.push(v);
  }
  return out;
}

function FakeChart({ seed, color }: { seed: string; color: string }) {
  const pts = useMemo(() => wiggle(seed, 13), [seed]);
  const W = 600, H = 180;
  const xy = pts.map((v, i) => [(i / (pts.length - 1)) * W, H - v * H] as const);
  const line = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="block h-[180px] w-full" aria-hidden="true">
      {[0.25, 0.5, 0.75].map((f) => <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="var(--border)" strokeDasharray="4 4" />)}
      <path d={`${line} L${W},${H} L0,${H} Z`} fill={color} opacity="0.12" data-report-area />
      <path d={line} fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" pathLength={1} data-report-line />
    </svg>
  );
}

/** "Building report… Estimating revenue", cycling. */
function Building() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setI((x) => (x + 1) % BUILDING.length), 1600);
    return () => window.clearInterval(t);
  }, []);
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-tint)] px-3 py-1 text-xs font-semibold text-[color:var(--accent)]" role="status">
      <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
      Building report · {BUILDING[i]}…
    </span>
  );
}

function ReportPreview({ header, loading, placeholder }: { header: Header | null; loading: boolean; placeholder: boolean }) {
  const name = placeholder ? "Your store" : header?.name ?? (loading ? "…" : "This store");
  const photos = (header?.products ?? []).filter((p) => p.imageUrl);
  const seed = header?.name ?? name;
  const groups = useMemo(() => {
    const g: Array<{ group: string | null; labels: string[] }> = [];
    for (const t of TABS) {
      const last = g[g.length - 1];
      if (last && last.group === t.group) last.labels.push(t.label);
      else g.push({ group: t.group, labels: [t.label] });
    }
    return g;
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[var(--card)] shadow-[var(--shadow)]">
      {/* Header: the real name and photos. */}
      <div className="flex flex-wrap items-center gap-3 px-4 pb-3 pt-4 sm:px-6">
        {photos[0] ? (
          <img src={photos[0].imageUrl!} alt="" className="h-10 w-10 rounded-lg border border-[color:var(--border)] bg-white object-contain p-0.5" />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-tint)] font-bold text-[color:var(--accent)]">{name[0]}</div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="m-0 text-xl font-bold tracking-tight">{name}</span>
            <span title="Sells on Amazon" className="flex h-6 w-6 items-center justify-center rounded-md bg-[#ff9900] text-white">
              <PlatformIcon platform="AMAZON" />
            </span>
          </div>
          <div className="text-sm text-[color:var(--muted-foreground)]">amazon.com · WaitHowMuch report</div>
        </div>
        <div className="ml-auto"><Building /></div>
      </div>

      {/* Fact row. */}
      <div className="flex items-stretch divide-x divide-[color:var(--border)] overflow-x-auto border-y border-[color:var(--border)]">
        {[
          ["Niche", <Blur key="n">Toys &amp; Games</Blur>],
          ["Amazon rating", <Blur key="r">★ 4.8 · 8,888 reviews</Blur>],
          ["Best seller rank", <Blur key="b">#8,888 in Toys</Blur>],
          ["Social", <Blur key="s">88.8K · 8.8K/mo</Blur>],
        ].map(([label, value]) => (
          <div key={label as string} className="flex shrink-0 flex-col justify-center gap-1 px-4 py-2.5 sm:px-6">
            <span className="text-[11px] font-medium uppercase tracking-wide text-[color:var(--muted-foreground)]">{label}</span>
            <span className="text-sm font-semibold">{value}</span>
          </div>
        ))}
      </div>

      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Side menu, inert. */}
        <nav aria-hidden="true" className="hidden border-r border-[color:var(--border)] lg:block">
          <div className="space-y-4 p-3">
            {groups.map((g, i) => (
              <div key={i} className={`space-y-0.5 ${g.group === "Build your own" ? "border-t border-[color:var(--border)] pt-4" : ""}`}>
                {g.group && <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">{g.group}</div>}
                {g.labels.map((l, j) => (
                  <div key={l} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium ${i === 0 && j === 0 ? "bg-[var(--accent-tint)] text-[color:var(--accent)]" : "text-[color:var(--muted-foreground)]"}`}>
                    <span className="h-4 w-4 rounded border-2 border-current opacity-60" />
                    {l}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </nav>

        <div className="min-w-0 space-y-5 bg-[var(--surface)] p-4 sm:p-6">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_240px]">
            <section className="overflow-hidden rounded-xl border border-[color:var(--border)] bg-[var(--card)]">
              <div className="flex border-b border-[color:var(--border)]">
                {["Revenue", "Profit"].map((l, i) => (
                  <div key={l} className={`-mb-px min-w-0 flex-1 border-b-2 px-4 py-3 ${i === 0 ? "border-[color:var(--accent)] bg-white" : "border-transparent bg-[var(--surface)]"}`}>
                    <div className="text-xs font-medium text-[color:var(--muted-foreground)]">{l}</div>
                    <div className="mt-0.5 text-xl font-bold tracking-tight"><Blur>$88,888</Blur></div>
                  </div>
                ))}
              </div>
              <div className="p-4 sm:p-5">
                <div className="mb-2 text-xs text-[color:var(--muted-foreground)]">Monthly · estimated</div>
                <Blur className="block"><FakeChart seed={seed} color="var(--series-revenue)" /></Blur>
              </div>
            </section>
            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1 xl:grid-rows-3">
              {[
                ["Margin", "88.8%", "Profit ÷ revenue"],
                ["Ad spend", "$8,888", "Amazon Ads · monthly"],
                ["To launch your own", "$8,888", "Estimated"],
              ].map(([label, value, sub]) => (
                <section key={label} className="rounded-xl border border-[color:var(--border)] bg-[var(--card)] p-4">
                  <div className="text-xs font-medium text-[color:var(--muted-foreground)]">{label}</div>
                  <div className="mt-1 text-2xl font-bold tracking-tight"><Blur>{value}</Blur></div>
                  <div className="mt-1 text-xs text-[color:var(--muted-foreground)]">{sub}</div>
                </section>
              ))}
            </div>
          </div>

          {/* Products: real photos, blurred figures. */}
          <section className="rounded-xl border border-[color:var(--border)] bg-[var(--card)] p-4 sm:p-5">
            <h2 className="m-0 mb-3 text-[15px] font-semibold">Best sellers</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {(photos.length ? photos : Array.from({ length: 6 }, () => null)).slice(0, 6).map((p, i) => (
                <div key={p?.asin ?? i} className="rounded-lg border border-[color:var(--border)] p-2">
                  {p ? (
                    <img src={p.imageUrl!} alt={p.title ?? ""} loading="lazy" className="aspect-square w-full rounded bg-white object-contain" />
                  ) : (
                    <div className="aspect-square w-full animate-pulse rounded bg-[var(--muted)]" />
                  )}
                  {p?.title && <div className="mt-1.5 line-clamp-2 text-xs">{p.title}</div>}
                  <div className="mt-1 text-sm font-semibold"><Blur>$8,888/mo</Blur></div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
