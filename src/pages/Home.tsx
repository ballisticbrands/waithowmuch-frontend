import { useSetCrumbs } from "@/components/Breadcrumbs";

/** Intentionally empty for now — the real home page is a later pass. */
export default function Home() {
  useSetCrumbs(() => [{ label: "Home" }], []);
  return (
    <main data-main>
      <div data-empty>
        <p style={{ margin: 0 }}>Nothing here yet.</p>
        <p style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.875rem" }}>
          The ideas live under <strong>Data</strong> in the sidebar.
        </p>
      </div>
    </main>
  );
}
