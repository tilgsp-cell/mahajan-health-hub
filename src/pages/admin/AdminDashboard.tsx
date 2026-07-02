import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, UserRound, Inbox, FileText } from "lucide-react";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ appts: 0, docs: 0, depts: 0, blogs: 0 });

  useEffect(() => {
    (async () => {
      const q = async (t: string) => {
        const { count } = await supabase.from(t).select("*", { count: "exact", head: true });
        return count || 0;
      };
      setCounts({
        appts: await q("appointments"),
        docs: await q("doctors"),
        depts: await q("departments"),
        blogs: await q("blogs"),
      });
    })();
  }, []);

  const cards = [
    { label: "New Appointments", value: counts.appts, icon: Inbox, color: "bg-primary/10 text-primary" },
    { label: "Doctors", value: counts.docs, icon: UserRound, color: "bg-medical/10 text-medical" },
    { label: "Departments", value: counts.depts, icon: Building2, color: "bg-amber-100 text-amber-700" },
    { label: "Blog Posts", value: counts.blogs, icon: FileText, color: "bg-rose-100 text-rose-700" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Dashboard</h1>
      <p className="text-sm text-muted-foreground">Overview of your hospital website content.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(c => (
          <Card key={c.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`grid h-12 w-12 place-items-center rounded-xl ${c.color}`}><c.icon className="h-5 w-5" /></div>
              <div>
                <div className="font-display text-2xl font-bold">{c.value}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-6"><CardContent className="p-6">
        <h2 className="font-display text-lg font-semibold">Quick tips</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
          <li>All content is editable from the sidebar menu.</li>
          <li>Toggle "Published" on any item to hide it from the public site.</li>
          <li>Use drag & drop on Departments, Doctors, Gallery and FAQ to reorder.</li>
          <li>New appointment requests appear in the Appointments inbox in real time.</li>
        </ul>
      </CardContent></Card>
    </div>
  );
}
