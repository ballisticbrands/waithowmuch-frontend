import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Ideas, { MoreIdeas } from "@/pages/Ideas";
import Business from "@/pages/Business";
import Login from "@/pages/Login";
import AuthCallback from "@/pages/AuthCallback";
import { About, Privacy, Terms, HowWeResearch, NotFound } from "@/pages/Static";

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data/more-ideas" element={<MoreIdeas />} />
        <Route path="/data/more-ideas/" element={<MoreIdeas />} />
        <Route path="/data/:collection" element={<Ideas />} />
        <Route path="/data/:collection/" element={<Ideas />} />
        <Route path="/business/:slug" element={<Business />} />
        <Route path="/business/:slug/" element={<Business />} />
        {Both({ path: "/login", element: <Login /> })}
        <Route path="/auth/callback" element={<AuthCallback />} />
        {Both({ path: "/how-we-research", element: <HowWeResearch /> })}
        {Both({ path: "/about", element: <About /> })}
        {Both({ path: "/privacy", element: <Privacy /> })}
        {Both({ path: "/terms", element: <Terms /> })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
