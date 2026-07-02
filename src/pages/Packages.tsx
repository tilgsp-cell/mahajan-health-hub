import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Seo from "@/components/site/Seo";
import { PageHeader } from "./Departments";
import { packages } from "@/data/seed";
import { HeartPulse } from "lucide-react";

export default function Packages() {
  return (
    <>
      <Seo title="Health Packages" description="Preventive health screenings at Mahajan Hospital." />
      <PageHeader eyebrow="Preventive Care" title="Health Packages" />
      <section className="container-x py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map(p => (
            <Card key={p.title} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-medical"><HeartPulse className="h-4 w-4" /><span className="text-xs font-semibold uppercase tracking-wider">Package</span></div>
                <h3 className="mt-2 font-display text-xl font-semibold">{p.title}</h3>
                <div className="mt-3 font-display text-4xl font-bold text-primary">₹{p.price}</div>
                <ul className="mt-4 flex-1 space-y-1.5 text-sm text-muted-foreground">
                  {p.features.map(f => <li key={f} className="flex gap-2"><span className="text-medical">✓</span>{f}</li>)}
                </ul>
                <Button asChild className="mt-5"><Link to="/appointment">Book Package</Link></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
