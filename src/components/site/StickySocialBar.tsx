import { Facebook, Instagram, Youtube } from "lucide-react";
import { useSite } from "@/hooks/useCms";

export default function StickySocialBar() {
  const site = useSite();
  const links = [
    { icon: Facebook, href: site.socials.facebook, label: "Facebook", bg: "bg-[#1877F2]" },
    { icon: Instagram, href: site.socials.instagram, label: "Instagram", bg: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]" },
    { icon: Youtube, href: site.socials.youtube, label: "YouTube", bg: "bg-[#FF0000]" },
  ];

  return (
    <div className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 flex-col md:flex">
      {links.map(({ icon: Icon, href, label, bg }) =>
        href ? (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className={`group flex items-center ${bg} text-white transition-all duration-300 hover:pr-4`}
            style={{ borderRadius: "8px 0 0 8px" }}
          >
            <span className="grid h-10 w-10 place-items-center">
              <Icon className="h-5 w-5" />
            </span>
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-[120px] group-hover:pr-2">
              {label}
            </span>
          </a>
        ) : null
      )}
    </div>
  );
}
