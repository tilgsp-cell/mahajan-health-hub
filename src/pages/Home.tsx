import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Stethoscope, ShieldCheck, HeartPulse, Star, MapPin, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Seo from "@/components/site/Seo";
import {
  useHero, useAbout, useDepartments, useDoctors, useFacilities,
  usePackages, useTestimonials, useBlogs, useFaqs, useSite,
} from "@/hooks/useCms";

const fade = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.5 } };

export default function Home() {
  const heroContent = useHero();
  const about = useAbout();
  const departments = useDepartments();
  const doctors = useDoctors();
  const facilities = useFacilities();
  const packages = usePackages();
  const testimonials = useTestimonials();
  const blogs = useBlogs();
  const faqs = useFaqs();
  const site = useSite();
  return (
    <>
      <Seo title="Advanced Healthcare with Compassion" description="Trusted by families across Gurdaspur for quality medical care and eye treatment. 24×7 Emergency at Mahajan Hospital." />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay muted loop playsInline poster={heroContent.poster}
        >
          <source src={heroContent.video_url} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/70 to-primary/50" />
        <div className="container-x relative flex min-h-[86vh] flex-col justify-center py-24 text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" /> Trusted since 2004 · Gurdaspur, Punjab
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              {heroContent.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">{heroContent.subheadline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/appointment">Book Appointment <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" className="bg-emergency text-white hover:bg-emergency/90">
                <a href={`tel:${site.emergency}`}><Phone className="mr-1 h-4 w-4" /> Emergency Care</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/5 text-white hover:bg-white/15 hover:text-white">
                <Link to="/doctors">Meet Our Doctors</Link>
              </Button>
            </div>
          </motion.div>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {heroContent.stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <div className="font-display text-2xl font-bold md:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-white/70">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20">
        <div className="container-x grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div {...fade}>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">About Us</div>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">{about.title}</h2>
            <p className="mt-4 text-muted-foreground">{about.description}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border bg-secondary/40 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-medical">Our Mission</div>
                <p className="mt-1 text-sm">{about.mission}</p>
              </div>
              <div className="rounded-xl border bg-secondary/40 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-medical">Our Vision</div>
                <p className="mt-1 text-sm">{about.vision}</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {about.stats.map(s => (
                <div key={s.label} className="rounded-lg border bg-white p-3 text-center">
                  <div className="font-display text-xl font-bold text-primary">{s.value}</div>
                  <div className="text-[11px] uppercase text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...fade} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80" alt="Hospital" className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="bg-secondary/40 py-20">
        <div className="container-x">
          <SectionHeader eyebrow="Specialties" title="Our Departments" subtitle="Comprehensive care across every major medical specialty." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {departments.slice(0, 8).map((d, i) => (
              <motion.div key={d.slug} {...fade} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <Card className="group overflow-hidden pt-0 transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-primary"><Stethoscope className="h-4 w-4" /><span className="text-xs font-semibold uppercase tracking-wider">Specialty</span></div>
                    <h3 className="mt-1 font-display text-lg font-semibold">{d.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{d.description}</p>
                    <Link to="/appointment" className="mt-3 inline-flex items-center text-sm font-semibold text-primary hover:underline">
                      Book Appointment <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline"><Link to="/departments">View All Departments</Link></Button>
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section className="py-20">
        <div className="container-x">
          <SectionHeader eyebrow="Our Team" title="Meet Our Doctors" subtitle="Experienced specialists dedicated to your family's health." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.slice(0, 3).map(d => (
              <Card key={d.slug} className="overflow-hidden pt-0 text-center">
                <div className="aspect-square overflow-hidden bg-secondary">
                  <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="font-display font-semibold">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.qualification}</div>
                  <div className="mt-1 text-xs font-semibold text-medical">{d.specialty}</div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{d.experience}</div>
                  <Button asChild size="sm" className="mt-3 w-full"><Link to="/appointment">Book</Link></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="bg-secondary/40 py-20">
        <div className="container-x">
          <SectionHeader eyebrow="Infrastructure" title="World-Class Facilities" subtitle="Modern equipment and dedicated units for every patient need." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {facilities.map(f => (
              <div key={f.title} className="group overflow-hidden rounded-xl border bg-white transition hover:shadow-md">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={f.image} alt={f.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <div className="font-display text-sm font-semibold">{f.title}</div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      {site.show_packages !== false && (
      <section className="py-20">
        <div className="container-x">
          <SectionHeader eyebrow="Preventive Care" title="Health Packages" subtitle="Curated screenings at affordable prices." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {packages.map(p => (
              <Card key={p.title} className="flex flex-col">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-medical"><HeartPulse className="h-4 w-4" /><span className="text-xs font-semibold uppercase tracking-wider">Package</span></div>
                  <h3 className="mt-2 font-display text-lg font-semibold">{p.title}</h3>
                  <div className="mt-3 font-display text-3xl font-bold text-primary">₹{p.price}</div>
                  <ul className="mt-4 flex-1 space-y-1.5 text-sm text-muted-foreground">
                    {p.features.map(f => <li key={f} className="flex gap-2"><span className="text-medical">✓</span>{f}</li>)}
                  </ul>
                  <Button asChild className="mt-5"><Link to="/appointment">Book Package</Link></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* TESTIMONIALS */}
      <section className="bg-primary/5 py-20">
        <div className="container-x">
          <SectionHeader eyebrow="Patient Voices" title="What Our Patients Say" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map(t => (
              <Card key={t.author}>
                <CardContent className="p-6">
                  <div className="flex gap-0.5 text-amber-500">
                    {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="mt-3 text-sm text-foreground/80">"{t.quote}"</p>
                  <div className="mt-4 font-semibold">— {t.author}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BLOGS */}
      {site.show_blogs !== false && (
      <section className="py-20">
        <div className="container-x">
          <SectionHeader eyebrow="Health Insights" title="Latest From Our Blog" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.slice(0, 3).map(b => (
              <Link key={b.slug} to={`/blogs/${b.slug}`} className="group overflow-hidden rounded-xl border bg-white transition hover:shadow-lg">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={b.cover} alt={b.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold group-hover:text-primary">{b.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{b.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline"><Link to="/blogs">Read All Articles</Link></Button>
          </div>
        </div>
      </section>
      )}


      {/* FAQ */}
      <section className="bg-secondary/40 py-20">
        <div className="container-x max-w-3xl">
          <SectionHeader eyebrow="Help" title="Frequently Asked Questions" />
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={String(i)}>
                <AccordionTrigger className="text-left font-display">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CONTACT + MAP */}
      <section className="py-20">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Visit Us" title="Get in Touch" />
            <div className="mt-6 space-y-4">
              <InfoRow icon={<MapPin className="h-5 w-5" />} title="Address">{site.address_line1}, {site.address_line2}</InfoRow>
              <InfoRow icon={<Phone className="h-5 w-5" />} title="Phone">{site.phone}</InfoRow>
              <InfoRow icon={<Mail className="h-5 w-5" />} title="Email">{site.email}</InfoRow>
              <InfoRow icon={<Clock className="h-5 w-5" />} title="Hours">OPD: Mon–Sat 9am–8pm · Emergency 24×7</InfoRow>
            </div>
            <Button asChild size="lg" className="mt-6"><Link to="/appointment">Book Appointment</Link></Button>
          </div>
          <div className="aspect-video overflow-hidden rounded-2xl border shadow-md">
            <iframe
              title="Mahajan Hospital Location"
              src="https://www.google.com/maps?q=Desh+Bhagat+Nagar+Gurdaspur&output=embed"
              width="100%" height="100%" style={{ border: 0 }} loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <motion.div {...fade} className="mx-auto max-w-2xl text-center">
      {eyebrow && <div className="text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</div>}
      <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}

function InfoRow({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 rounded-xl border bg-white p-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">{icon}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
