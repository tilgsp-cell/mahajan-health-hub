import { Helmet } from "react-helmet-async";
import { site, doctors, faqs } from "@/data/seed";

export default function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": ["MedicalClinic", "LocalBusiness"],
      name: site.name,
      telephone: site.phone,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address_line1,
        addressLocality: "Gurdaspur",
        addressRegion: "Punjab",
        postalCode: "143521",
        addressCountry: "IN",
      },
      openingHours: "Mo-Sa 09:00-20:00",
      medicalSpecialty: ["Ophthalmology", "Pediatrics", "Gynecology", "Orthopedics", "General Medicine"],
    },
    ...doctors.map(d => ({
      "@context": "https://schema.org",
      "@type": "Physician",
      name: d.name,
      medicalSpecialty: d.specialty,
      image: d.image,
    })),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}
