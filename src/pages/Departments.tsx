import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Seo from "@/components/site/Seo";
import { ArrowRight } from "lucide-react";
import { departments } from "@/data/seed";

export default function Departments() {
  return (
    <>
      <Seo title="Departments & Specialties" description="Explore all medical specialties at Mahajan Hospital & Eye Care Centre, Gurdaspur." />
      <PageHeader eyebrow="Specialties" title="Our Departments" subtitle="Comprehensive care across every major medical specialty." />
      <section className="container-x py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map(d => (
            <Card key={d.slug} className="group overflow-hidden pt-0 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="aspect-[4/3] overflow-hidden"><img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
              <CardContent className="p-5">
                <h3 className="font-display text-lg font-semibold">{d.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.description}</p>
                <Button asChild size="sm" className="mt-4"><Link to="/appointment">Book Appointment <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-white to-medical/5 py-14">
      <div className="container-x">
        {eyebrow && <div className="text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</div>}
        <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>}
      </div>
    </section>
  );
}
