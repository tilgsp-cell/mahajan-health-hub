import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Seo from "@/components/site/Seo";
import { PageHeader } from "./Departments";
import { doctors } from "@/data/seed";
import { Clock } from "lucide-react";

export default function Doctors() {
  return (
    <>
      <Seo title="Our Doctors" description="Meet the experienced specialists at Mahajan Hospital & Eye Care Centre." />
      <PageHeader eyebrow="Team" title="Meet Our Doctors" subtitle="Specialists committed to your family's health." />
      <section className="container-x py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map(d => (
            <Card key={d.slug} className="overflow-hidden pt-0">
              <div className="aspect-[4/3] overflow-hidden bg-secondary"><img src={d.image} alt={d.name} className="h-full w-full object-cover" loading="lazy" /></div>
              <CardContent className="p-5">
                <div className="font-display text-lg font-semibold">{d.name}</div>
                <div className="text-sm text-muted-foreground">{d.qualification}</div>
                <div className="mt-1 text-sm font-semibold text-medical">{d.specialty}</div>
                <div className="mt-1 text-xs text-muted-foreground">{d.experience}</div>
                <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground"><Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" />{d.timings}</div>
                <Button asChild size="sm" className="mt-4 w-full"><Link to="/appointment">Book Appointment</Link></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
