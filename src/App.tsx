import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { RouteAnalytics } from "@/components/RouteAnalytics";
import Home from "@/pages/Home";
import Ideas, { MoreIdeas } from "@/pages/Ideas";
import Business from "@/pages/Business";
import Login from "@/pages/Login";
import AuthCallback from "@/pages/AuthCallback";
import { About, Privacy, Terms, HowWeResearch, NotFound } from "@/pages/Static";
import BusinessAttributes from "@/pages/BusinessAttributes";

/** Every content route is registered with AND without a trailing slash: the
 *  prerender writes directories, so the canonical URL has one, but inbound
 *  links routinely drop it. */
function Both({ path, element }: { path: string; element: React.ReactElement }) {
  return (
    <>
      <Route path={path} element={element} />
      <Route path={`${path}/`} element={element} />
    </>
  );
}

export default function App() {
  return (
    <Layout>
      <RouteAnalytics />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* The default collection IS /data/ — Ideas falls back to all-ideas
            when there is no :collection param. */}
        <Route path="/data" element={<Ideas />} />
        <Route path="/data/" element={<Ideas />} />
        {/* The old URL, kept so existing links and any indexed copy land on
            the canonical one rather than 404ing. */}
        <Route path="/data/all-ideas" element={<Navigate to="/data/" replace />} />
        <Route path="/data/all-ideas/" element={<Navigate to="/data/" replace />} />
        <Route path="/data/more-ideas" element={<MoreIdeas />} />
        <Route path="/data/more-ideas/" element={<MoreIdeas />} />
        <Route path="/data/:collection" element={<Ideas />} />
        <Route path="/data/:collection/" element={<Ideas />} />
        <Route path="/business/:slug" element={<Business />} />
        <Route path="/business/:slug/" element={<Business />} />
        {/* A profile is paginated: one section per URL, with the overview at
            the business root. An unknown section redirects to that root rather
            than 404ing — the business exists, only the section does not. */}
        <Route path="/business/:slug/:section" element={<Business />} />
        <Route path="/business/:slug/:section/" element={<Business />} />
        {Both({ path: "/login", element: <Login /> })}
        <Route path="/auth/callback" element={<AuthCallback />} />
        {Both({ path: "/how-we-research", element: <HowWeResearch /> })}
        {/* The reference behind the Sourcing / Catalogue / Differentiation ⓘ on
            every profile. A real route, not an anchor: the tooltips link to it
            in a new tab, and a 404 behind a "Learn more" is worse than no link. */}
        {Both({ path: "/business-attributes", element: <BusinessAttributes /> })}
        {Both({ path: "/about", element: <About /> })}
        {Both({ path: "/privacy", element: <Privacy /> })}
        {Both({ path: "/terms", element: <Terms /> })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
