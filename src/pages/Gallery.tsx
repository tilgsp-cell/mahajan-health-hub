import { useState } from "react";
import Seo from "@/components/site/Seo";
import { PageHeader } from "./Departments";
import { useGallery } from "@/hooks/useCms";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function Gallery() {
  const galleryItems = useGallery();
  const categories = ["All", ...Array.from(new Set(galleryItems.map(g => g.category)))];
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<string | null>(null);
  const items = cat === "All" ? galleryItems : galleryItems.filter(g => g.category === cat);

  return (
    <>
      <Seo title="Gallery" description="Photos of our hospital, doctors, facilities, health camps and events." />
      <PageHeader eyebrow="Moments" title="Gallery" />
      <section className="container-x py-16">
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-1.5 text-sm ${cat === c ? "border-primary bg-primary text-primary-foreground" : "bg-white hover:border-primary/50"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="columns-2 gap-4 space-y-4 md:columns-3 lg:columns-4">
          {items.map(g => (
            <button key={g.url} onClick={() => setOpen(g.url)} className="group block w-full overflow-hidden rounded-xl">
              <img src={g.url} alt={g.caption} loading="lazy" className="w-full transition group-hover:scale-105" />
            </button>
          ))}
        </div>
      </section>
      <Dialog open={!!open} onOpenChange={o => !o && setOpen(null)}>
        <DialogContent className="max-w-4xl">
          {open && <img src={open} alt="preview" className="w-full rounded-md" />}
        </DialogContent>
      </Dialog>
    </>
  );
}
