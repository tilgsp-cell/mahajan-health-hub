import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import JsonLd from "./JsonLd";
import FloatingWhatsApp from "./FloatingWhatsApp";

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
