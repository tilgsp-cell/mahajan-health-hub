import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Seo from "@/components/site/Seo";

export default function AdminLogin() {
  const { user, isAdmin, loading } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  if (!loading && user && isAdmin) return <Navigate to="/admin" replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Signed in");
    nav("/admin");
  };

  return (
    <>
      <Seo title="Admin Login" />
      <div className="grid min-h-screen place-items-center bg-gradient-to-br from-primary/10 via-white to-medical/5 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground">M</div>
              <h1 className="mt-3 font-display text-2xl font-semibold">Admin Login</h1>
              <p className="text-sm text-muted-foreground">Mahajan Hospital CMS</p>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <div><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" /></div>
              <div><Label>Password</Label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" /></div>
              <Button type="submit" className="w-full" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
