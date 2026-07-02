import { Link, useParams } from "react-router-dom";
import Seo from "@/components/site/Seo";
import { PageHeader } from "./Departments";
import { blogs } from "@/data/seed";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function BlogList() {
  return (
    <>
      <Seo title="Health Blog" description="Health tips and articles from Mahajan Hospital." />
      <PageHeader eyebrow="Insights" title="Health Blog" />
      <section className="container-x py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map(b => (
            <Link key={b.slug} to={`/blogs/${b.slug}`} className="group overflow-hidden rounded-xl border bg-white transition hover:shadow-lg">
              <div className="aspect-[16/10] overflow-hidden"><img src={b.cover} alt={b.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" /></div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold group-hover:text-primary">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const b = blogs.find(x => x.slug === slug);
  if (!b) return <div className="container-x py-24 text-center"><h1 className="font-display text-2xl">Post not found</h1><Button asChild className="mt-4"><Link to="/blogs">Back to Blog</Link></Button></div>;
  return (
    <>
      <Seo title={b.title} description={b.excerpt} />
      <article className="container-x max-w-3xl py-16">
        <Link to="/blogs" className="text-sm text-primary hover:underline">← All articles</Link>
        <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">{b.title}</h1>
        <div className="mt-6 aspect-[16/9] overflow-hidden rounded-xl"><img src={b.cover} alt={b.title} className="h-full w-full object-cover" /></div>
        <p className="mt-6 text-lg leading-relaxed text-foreground/80">{b.body}</p>
        <Card className="mt-10"><CardContent className="p-6 text-center">
          <div className="font-display text-lg font-semibold">Need medical advice?</div>
          <Button asChild className="mt-3"><Link to="/appointment">Book an Appointment</Link></Button>
        </CardContent></Card>
      </article>
    </>
  );
}
