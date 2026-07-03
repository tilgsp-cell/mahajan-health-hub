import { Link } from "react-router-dom";
import { Phone, Facebook, Instagram, Youtube, MapPin, Clock } from "lucide-react";
import { useSite } from "@/hooks/useCms";
import mashoorBanoLogo from "@/assets/mashoorbano-logo.png.asset.json";

export default function Footer() {
  const site = useSite();
  return (
    <footer className="mt-20 bg-slate-900 text-slate-200">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground font-display font-bold">M</div>
            <div className="font-display text-lg font-semibold text-white">Mahajan Hospital</div>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            {site.address_line1}, {site.address_line2}
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> {site.phone}</div>
            <div className="flex items-center gap-2 text-emergency"><Clock className="h-4 w-4" /> 24×7 Emergency Available</div>
          </div>
        </div>

        <div>
          <div className="font-display font-semibold text-white">Quick Links</div>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              ["About", "/#about"],
              ["Departments", "/departments"],
              ["Doctors", "/doctors"],
              ["Gallery", "/gallery"],
              ["Blogs", "/blogs"],
              ["Contact", "/contact"],
            ].map(([l, h]) => (
              <li key={l}><Link to={h} className="hover:text-white">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display font-semibold text-white">Address</div>
          <p className="mt-3 flex gap-2 text-sm text-slate-400">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Near Normal School,<br/>Desh Bhagat Nagar,<br/>Gurdaspur, Punjab 143521</span>
          </p>
        </div>

        <div>
          <div className="font-display font-semibold text-white">Follow Us</div>
          <div className="mt-3 flex gap-3">
            <a href={site.socials.facebook} className="grid h-9 w-9 place-items-center rounded-full bg-slate-800 hover:bg-primary" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
            <a href={site.socials.instagram} className="grid h-9 w-9 place-items-center rounded-full bg-slate-800 hover:bg-primary" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
            <a href={site.socials.youtube} className="grid h-9 w-9 place-items-center rounded-full bg-slate-800 hover:bg-primary" aria-label="YouTube"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-950">
        <div className="container-x flex flex-col items-center gap-2 py-6 text-center text-xs text-slate-400 md:flex-row md:justify-between md:text-left">
          <div>© {new Date().getFullYear()} Mahajan Hospital & Eye Care Centre. All rights reserved.</div>
          <div className="flex flex-col items-center gap-2 md:items-end">
            <a href="https://mashoorbano.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
              <img
                src={mashoorBanoLogo.url}
                alt="MashoorBano Digital Agency"
                className="h-12 w-12 rounded-full ring-1 ring-slate-700 transition group-hover:ring-primary"
                loading="lazy"
              />
              <span className="text-slate-300">Website developed by <span className="font-semibold text-white group-hover:underline">MashoorBano</span></span>
            </a>
            <div>Atharv Aryan • +91 78147 18340 • Mashoorbano.com</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
