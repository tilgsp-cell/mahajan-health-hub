import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSite } from "@/hooks/useCms";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const site = useSite();

  const links = [
    { to: "/", label: "Home", show: true },
    { to: "/departments", label: "Departments", show: true },
    { to: "/doctors", label: "Doctors", show: true },
    { to: "/facilities", label: "Facilities", show: true },
    { to: "/health-packages", label: "Packages", show: site.show_packages !== false },
    { to: "/gallery", label: "Gallery", show: true },
    { to: "/blogs", label: "Blogs", show: site.show_blogs !== false },
    { to: "/contact", label: "Contact", show: true },
  ].filter(l => l.show);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-white/85 backdrop-blur">
      {/* Emergency top strip */}
      <div className="bg-emergency text-white">
        <div className="container-x flex h-9 items-center justify-center gap-3 text-xs md:text-sm">
          <a href="tel:+919056437662" className="flex items-center gap-2 font-semibold">
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">24×7 Emergency:</span>
            <span>+91 90564 37662</span>
          </a>
          <a href="tel:+919056437662" className="hidden font-medium underline-offset-2 hover:underline sm:inline">
            Call Now
          </a>
        </div>
      </div>

      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary font-display font-bold text-primary-foreground">M</div>
          <div className="leading-tight">
            <div className="font-display text-sm font-semibold">Mahajan Hospital</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">& Eye Care Centre</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-foreground/70 hover:text-primary"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link to="/appointment">Book Appointment</Link>
          </Button>
          <button className="lg:hidden" onClick={() => setOpen(v => !v)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t bg-white lg:hidden">
          <div className="container-x flex flex-col gap-1 py-3">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={() => setOpen(false)}
                className={({ isActive }) => `rounded-md px-3 py-2 text-sm ${isActive ? "bg-primary/10 text-primary" : "text-foreground/80"}`}>
                {l.label}
              </NavLink>
            ))}
            <Button asChild className="mt-2"><Link to="/appointment" onClick={() => setOpen(false)}>Book Appointment</Link></Button>
          </div>
        </div>
      )}
    </header>
  );
}
