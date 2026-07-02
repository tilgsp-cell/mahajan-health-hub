import Seo from "@/components/site/Seo";
import { PageHeader } from "./Departments";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/seed";

export default function FAQ() {
  return (
    <>
      <Seo title="FAQ" description="Frequently asked questions about Mahajan Hospital." />
      <PageHeader eyebrow="Help" title="Frequently Asked Questions" />
      <section className="container-x max-w-3xl py-16">
        <Accordion type="single" collapsible>
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={String(i)}>
              <AccordionTrigger className="text-left font-display">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
