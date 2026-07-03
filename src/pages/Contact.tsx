import Seo from "@/components/site/Seo";
import { PageHeader } from "./Departments";
import { useSite } from "@/hooks/useCms";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const site = useSite();
  return (
    <>
      <Seo title="Contact Us" description="Reach Mahajan Hospital & Eye Care Centre in Gurdaspur." />
      <PageHeader eyebrow="Get in Touch" title="Contact Us" />
      <section className="container-x grid gap-8 py-16 lg:grid-cols-2">
        <div className="space-y-4">
          <Row icon={<MapPin />} title="Address">{site.address_line1}, {site.address_line2}</Row>
          <Row icon={<Phone />} title="Phone">{site.phone}</Row>
          <Row icon={<Mail />} title="Email">{site.email}</Row>
          <Row icon={<Clock />} title="Hours">OPD Mon–Sat 9am–8pm · Emergency 24×7</Row>
          <Button asChild size="lg"><Link to="/appointment">Book Appointment</Link></Button>
        </div>
        <div className="aspect-video overflow-hidden rounded-2xl border shadow-md">
          <iframe title="Map" src="https://www.google.com/maps?q=Desh+Bhagat+Nagar+Gurdaspur&output=embed" className="h-full w-full border-0" loading="lazy" />
        </div>
      </section>
    </>
  );
}

function Row({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <Card><CardContent className="flex gap-4 p-5">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">{icon}</div>
      <div><div className="font-semibold">{title}</div><div className="text-sm text-muted-foreground">{children}</div></div>
    </CardContent></Card>
  );
}
