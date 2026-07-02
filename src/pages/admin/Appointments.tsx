import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Download } from "lucide-react";

const STATUSES = ["new", "contacted", "scheduled", "closed"];
const color: Record<string, string> = { new: "bg-primary", contacted: "bg-amber-500", scheduled: "bg-medical", closed: "bg-slate-500" };

export default function Appointments() {
  const [rows, setRows] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<any | null>(null);

  const load = async () => {
    const { data, error } = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows(data || []);
  };
  useEffect(() => { load(); }, []);

  const filtered = filter === "all" ? rows : rows.filter(r => r.status === filter);

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Updated"); load(); if (open?.id === id) setOpen({ ...open, status });
  };

  const csv = () => {
    const headers = ["created_at","name","phone","email","department","doctor","preferred_date","status","message"];
    const lines = [headers.join(","), ...filtered.map(r => headers.map(h => `"${String(r[h] ?? "").replace(/"/g, '""')}"`).join(","))];
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "appointments.csv"; a.click();
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Appointments</h1>
          <p className="text-sm text-muted-foreground">{rows.length} total requests</p>
        </div>
        <Button variant="outline" onClick={csv}><Download className="mr-1 h-4 w-4" /> Export CSV</Button>
      </div>

      <div className="mb-3 flex gap-2">
        {["all", ...STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${filter === s ? "border-primary bg-primary text-primary-foreground" : "bg-white"}`}>
            {s}
          </button>
        ))}
      </div>

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Date</TableHead><TableHead>Name</TableHead><TableHead>Phone</TableHead>
            <TableHead>Department</TableHead><TableHead>Doctor</TableHead><TableHead>Status</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {filtered.map(r => (
              <TableRow key={r.id} className="cursor-pointer" onClick={() => setOpen(r)}>
                <TableCell className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</TableCell>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell>{r.phone}</TableCell>
                <TableCell>{r.department || "—"}</TableCell>
                <TableCell>{r.doctor || "—"}</TableCell>
                <TableCell><Badge className={color[r.status] + " text-white"}>{r.status}</Badge></TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && <TableRow><TableCell colSpan={6} className="p-8 text-center text-muted-foreground">No appointments</TableCell></TableRow>}
          </TableBody>
        </Table>
      </CardContent></Card>

      <Sheet open={!!open} onOpenChange={o => !o && setOpen(null)}>
        <SheetContent className="w-full sm:max-w-md">
          {open && <>
            <SheetHeader><SheetTitle>Appointment Details</SheetTitle></SheetHeader>
            <div className="mt-4 space-y-3 text-sm">
              <Row label="Name" value={open.name} />
              <Row label="Phone" value={<a className="text-primary" href={`tel:${open.phone}`}>{open.phone}</a>} />
              <Row label="Email" value={open.email || "—"} />
              <Row label="Department" value={open.department || "—"} />
              <Row label="Doctor" value={open.doctor || "—"} />
              <Row label="Preferred Date" value={open.preferred_date || "—"} />
              <Row label="Message" value={open.message || "—"} />
              <Row label="Submitted" value={new Date(open.created_at).toLocaleString()} />
              <div>
                <div className="mb-1 font-medium">Status</div>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map(s => (
                    <button key={s} onClick={() => setStatus(open.id, s)}
                      className={`rounded-full border px-3 py-1 text-xs capitalize ${open.status === s ? "border-primary bg-primary text-white" : "bg-white"}`}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          </>}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="flex gap-3 border-b pb-2"><div className="w-28 text-muted-foreground">{label}</div><div className="flex-1">{value}</div></div>;
}
