import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { RouteAnalytics } from "@/components/RouteAnalytics";
import Home from "@/pages/Home";
import Ideas, { MoreIdeas } from "@/pages/Ideas";
import Business from "@/pages/Business";
import Business2 from "@/pages/Business2";
import Login, { Signup } from "@/pages/Login";
import AuthCallback from "@/pages/AuthCallback";
import { About, Privacy, Terms, HowWeResearch, NotFound } from "@/pages/Static";
import { BlogIndex, BlogPost, GlossaryIndex, GlossaryTerm } from "@/pages/Blog";
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
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/blog/:slug/" element={<BlogPost />} />
        <Route path="/glossary" element={<GlossaryIndex />} />
        <Route path="/glossary/" element={<GlossaryIndex />} />
        <Route path="/glossary/:slug" element={<GlossaryTerm />} />
        <Route path="/glossary/:slug/" element={<GlossaryTerm />} />
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
        {/* The brand page redrawn as a research dashboard — a prototype beside
            /business/, on the same data. Not prerendered, and noindex. */}
        {Both({ path: "/business2/:slug", element: <Business2 /> })}
        {Both({ path: "/login", element: <Login /> })}
        {Both({ path: "/signup", element: <Signup /> })}
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
