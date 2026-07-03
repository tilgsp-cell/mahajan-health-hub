import { NavLink, Outlet, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, Settings, Image as ImageIcon, Info, Building2, UserRound,
  Wrench, Package, Star, FileText, HelpCircle, Inbox, Search, LogOut,
  Facebook, Instagram, Youtube,
} from "lucide-react";
import Seo from "@/components/site/Seo";
import { useSite } from "@/hooks/useCms";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/site", label: "Site Settings", icon: Settings },
  { to: "/admin/hero", label: "Hero", icon: ImageIcon },
  { to: "/admin/about", label: "About", icon: Info },
  { to: "/admin/departments", label: "Departments", icon: Building2 },
  { to: "/admin/doctors", label: "Doctors", icon: UserRound },
  { to: "/admin/facilities", label: "Facilities", icon: Wrench },
  { to: "/admin/packages", label: "Health Packages", icon: Package },
  { to: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/admin/testimonials", label: "Testimonials", icon: Star },
  { to: "/admin/blogs", label: "Blogs", icon: FileText },
  { to: "/admin/faqs", label: "FAQ", icon: HelpCircle },
  { to: "/admin/appointments", label: "Appointments", icon: Inbox },
  { to: "/admin/seo", label: "SEO", icon: Search },
];

export default function AdminLayout() {
  const { loading, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="grid min-h-screen place-items-center text-muted-foreground">Loading…</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center p-6 text-center">
        <div>
          <h1 className="font-display text-2xl font-semibold">Access denied</h1>
          <p className="mt-2 text-muted-foreground">Your account is not an admin.</p>
          <Button className="mt-4" onClick={() => supabase.auth.signOut().then(() => navigate("/admin/login"))}>Sign out</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen grid-cols-[240px_1fr] bg-secondary/30">
      <Seo title="Admin" />
      <aside className="border-r bg-white">
        <div className="flex h-16 items-center gap-2 border-b px-4">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground">M</div>
          <div className="font-display font-semibold">Mahajan CMS</div>
        </div>
        <nav className="flex flex-col gap-0.5 p-3">
          {nav.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end}
              className={({ isActive }) => `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-primary/10 text-primary" : "text-foreground/70 hover:bg-secondary"}`}>
              <n.icon className="h-4 w-4" /> {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-2 border-t p-3">
          <div className="mb-2 truncate text-xs text-muted-foreground">{user.email}</div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => supabase.auth.signOut().then(() => navigate("/admin/login"))}>
            <LogOut className="mr-1 h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>
      <main className="min-w-0 p-6">
        <Outlet />
      </main>
    </div>
  );
}
