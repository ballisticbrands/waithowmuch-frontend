import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Business from "@/pages/Business";
import Login from "@/pages/Login";
import AuthCallback from "@/pages/AuthCallback";
import { About, Privacy, Terms, NotFound } from "@/pages/Static";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Both shapes: the prerender writes directories, so the canonical URL
            has a trailing slash, but inbound links from Reddit and elsewhere
            routinely drop it. */}
        <Route path="/business/:slug" element={<Business />} />
        <Route path="/business/:slug/" element={<Business />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
