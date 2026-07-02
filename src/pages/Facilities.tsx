import Seo from "@/components/site/Seo";
import { PageHeader } from "./Departments";
import { facilities } from "@/data/seed";

export default function Facilities() {
  return (
    <>
      <Seo title="Facilities" description="Modern healthcare facilities at Mahajan Hospital." />
      <PageHeader eyebrow="Infrastructure" title="World-Class Facilities" />
      <section className="container-x py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map(f => (
            <div key={f.title} className="group overflow-hidden rounded-xl border bg-white transition hover:shadow-md">
              <div className="aspect-[4/3] overflow-hidden"><img src={f.image} alt={f.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
              <div className="p-5"><div className="font-display font-semibold">{f.title}</div><p className="mt-1 text-sm text-muted-foreground">{f.description}</p></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
