import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Seo from "@/components/site/Seo";
import { departments as staticDepartments, doctors as staticDoctors, site } from "@/data/seed";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MapPin, Clock } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  phone: z.string().trim().min(10, "Enter a valid phone").max(20),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  department: z.string().max(100).optional(),
  doctor: z.string().max(100).optional(),
  preferred_date: z.string().max(50).optional(),
  message: z.string().max(1000).optional(),
  honeypot: z.string().max(0).optional(),
});
type FormValues = z.infer<typeof schema>;

export default function Appointment() {
  const [depts, setDepts] = useState<{ name: string; slug: string }[]>(staticDepartments);
  const [docs, setDocs] = useState<{ name: string; slug: string }[]>(staticDoctors);

  useEffect(() => {
    supabase.from("departments").select("name,slug").eq("is_published", true).order("sort_order").then(({ data }) => data?.length && setDepts(data));
    supabase.from("doctors").select("name,slug").eq("is_published", true).order("sort_order").then(({ data }) => data?.length && setDocs(data));
  }, []);

  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { honeypot: "" } });
  const submitting = form.formState.isSubmitting;

  const onSubmit = async (v: FormValues) => {
    if (v.honeypot) return; // bot
    const { error } = await supabase.from("appointments").insert({
      name: v.name, phone: v.phone, email: v.email || null,
      department: v.department || null, doctor: v.doctor || null,
      preferred_date: v.preferred_date || null, message: v.message || null,
      status: "new",
    });
    if (error) {
      // If table missing yet, at least confirm to the user their intent
      console.error(error);
      toast.error("Could not submit right now. Please call us: " + site.phone);
      return;
    }
    toast.success("Appointment request received. We will call you shortly.");
    form.reset({ honeypot: "" });
  };

  return (
    <>
      <Seo title="Book an Appointment" description="Book an appointment with our specialists at Mahajan Hospital & Eye Care Centre, Gurdaspur." />
      <section className="bg-gradient-to-br from-primary/5 via-white to-medical/5 py-16">
        <div className="container-x">
          <h1 className="font-display text-4xl font-bold">Book an Appointment</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">Fill in your details and our team will confirm your appointment shortly.</p>
        </div>
      </section>
      <section className="container-x -mt-8 grid gap-6 pb-20 lg:grid-cols-[2fr,1fr]">
        <Card>
          <CardContent className="p-6 md:p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
              <input tabIndex={-1} autoComplete="off" className="hidden" {...form.register("honeypot")} />
              <Field label="Full Name *" error={form.formState.errors.name?.message}>
                <Input {...form.register("name")} placeholder="Your name" />
              </Field>
              <Field label="Phone *" error={form.formState.errors.phone?.message}>
                <Input {...form.register("phone")} placeholder="+91 …" />
              </Field>
              <Field label="Email" error={form.formState.errors.email?.message}>
                <Input {...form.register("email")} type="email" placeholder="you@example.com" />
              </Field>
              <Field label="Preferred Date">
                <Input {...form.register("preferred_date")} type="date" />
              </Field>
              <Field label="Department">
                <Select onValueChange={v => form.setValue("department", v)}>
                  <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                  <SelectContent>{depts.map(d => <SelectItem key={d.slug} value={d.name}>{d.name}</SelectItem>)}</SelectContent>
                </Select>
              </Field>
              <Field label="Doctor">
                <Select onValueChange={v => form.setValue("doctor", v)}>
                  <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                  <SelectContent>{docs.map(d => <SelectItem key={d.slug} value={d.name}>{d.name}</SelectItem>)}</SelectContent>
                </Select>
              </Field>
              <div className="md:col-span-2">
                <Field label="Message">
                  <Textarea {...form.register("message")} rows={4} placeholder="Share symptoms or preferred time…" />
                </Field>
              </div>
              <div className="md:col-span-2 flex gap-2">
                <Button type="submit" size="lg" disabled={submitting}>{submitting ? "Sending…" : "Request Appointment"}</Button>
                <Button asChild variant="outline" size="lg"><a href={`tel:${site.emergency}`}><Phone className="mr-1 h-4 w-4"/>Call {site.phone}</a></Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card><CardContent className="p-5"><div className="flex gap-3"><MapPin className="h-5 w-5 text-primary shrink-0" /><div><div className="font-semibold">Address</div><div className="text-sm text-muted-foreground">{site.address_line1}<br/>{site.address_line2}</div></div></div></CardContent></Card>
          <Card><CardContent className="p-5"><div className="flex gap-3"><Phone className="h-5 w-5 text-primary shrink-0" /><div><div className="font-semibold">Phone</div><div className="text-sm text-muted-foreground">{site.phone}</div></div></div></CardContent></Card>
          <Card><CardContent className="p-5"><div className="flex gap-3"><Clock className="h-5 w-5 text-primary shrink-0" /><div><div className="font-semibold">OPD Hours</div><div className="text-sm text-muted-foreground">Mon–Sat 9am–8pm · Emergency 24×7</div></div></div></CardContent></Card>
        </div>
      </section>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5 block text-sm">{label}</Label>
      {children}
      {error && <div className="mt-1 text-xs text-destructive">{error}</div>}
    </div>
  );
}
