import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919056437662?text=Hello%20Mahajan%20Hospital%2C%20I%20would%20like%20to%20book%20an%20appointment."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl ring-4 ring-[#25D366]/20 transition hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
      <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
    </a>
  );
}
