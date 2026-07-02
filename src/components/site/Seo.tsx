import { Helmet } from "react-helmet-async";
import { ReactNode } from "react";

export default function Seo({ title, description, children }: { title: string; description?: string; children?: ReactNode }) {
  const full = `${title} | Mahajan Hospital & Eye Care Centre`;
  return (
    <Helmet>
      <title>{full}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={full} />
      {description && <meta property="og:description" content={description} />}
      {children}
    </Helmet>
  );
}
