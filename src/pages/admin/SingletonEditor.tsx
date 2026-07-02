import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Generic singleton editor: reads the first row of a table (or creates one),
// exposes all its fields as editable inputs, and saves back.
export default function SingletonEditor({ table, title, fields }: {
  table: string; title: string;
  fields: { name: string; label: string; type?: "text" | "textarea" | "url" | "json" }[];
}) {
  const [row, setRow] = useState<any>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from(table).select("*").limit(1).maybeSingle();
      setRow(data);
      const init: Record<string, any> = {};
      fields.forEach(f => { const v = data?.[f.name]; init[f.name] = f.type === "json" ? JSON.stringify(v ?? {}, null, 2) : (v ?? ""); });
      setForm(init);
    })();
  }, [table]);

  const save = async () => {
    setBusy(true);
    const payload: Record<string, any> = {};
    fields.forEach(f => {
      if (f.type === "json") {
        try { payload[f.name] = JSON.parse(form[f.name] || "{}"); }
        catch { toast.error(`Invalid JSON in ${f.label}`); throw new Error("bad json"); }
      } else payload[f.name] = form[f.name] || null;
    });
    const q = row ? supabase.from(table).update(payload).eq("id", row.id) : supabase.from(table).insert(payload);
    const { error } = await q;
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">{title}</h1>
      <p className="mb-6 text-sm text-muted-foreground">These values appear on the public website.</p>
      <Card><CardContent className="grid gap-4 p-6">
        {fields.map(f => (
          <div key={f.name}>
            <Label>{f.label}</Label>
            {f.type === "textarea" || f.type === "json" ? (
              <Textarea rows={f.type === "json" ? 8 : 3} value={form[f.name] ?? ""} onChange={e => setForm({ ...form, [f.name]: e.target.value })} />
            ) : (
              <Input value={form[f.name] ?? ""} onChange={e => setForm({ ...form, [f.name]: e.target.value })} />
            )}
          </div>
        ))}
        <div><Button onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</Button></div>
      </CardContent></Card>
    </div>
  );
}
