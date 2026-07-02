import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Seo from "@/components/site/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" />
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="font-display text-7xl font-bold text-primary">404</div>
        <h1 className="mt-3 font-display text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Button asChild className="mt-6"><Link to="/">Back to Home</Link></Button>
      </div>
    </>
  );
}
