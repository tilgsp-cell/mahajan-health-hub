import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type FieldDef =
  | { name: string; label: string; type: "text" | "textarea" | "number" | "url" | "email" | "date" }
  | { name: string; label: string; type: "switch" }
  | { name: string; label: string; type: "select"; options: string[] };

export default function CrudManager({
  table, title, fields, columns, orderable = false,
}: {
  table: string;
  title: string;
  fields: FieldDef[];
  columns: { key: string; label: string }[];
  orderable?: boolean;
}) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});

  const load = async () => {
    setLoading(true);
    const q = supabase.from(table).select("*");
    const { data, error } = orderable ? await q.order("sort_order", { ascending: true }) : await q.order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [table]);

  const openNew = () => {
    const empty: Record<string, any> = {};
    fields.forEach(f => { empty[f.name] = f.type === "switch" ? true : ""; });
    if (orderable) empty.sort_order = rows.length;
    setEditing(null); setForm(empty); setOpen(true);
  };
  const openEdit = (r: any) => { setEditing(r); setForm({ ...r }); setOpen(true); };

  const save = async () => {
    const payload = { ...form };
    fields.forEach(f => {
      if (f.type === "number") payload[f.name] = payload[f.name] === "" ? null : Number(payload[f.name]);
      if (payload[f.name] === "") payload[f.name] = null;
    });
    if (editing) {
      const { error } = await supabase.from(table).update(payload).eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success("Updated");
    } else {
      const { error } = await supabase.from(table).insert(payload);
      if (error) return toast.error(error.message);
      toast.success("Created");
    }
    setOpen(false); load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); load();
  };

  const togglePub = async (r: any) => {
    const { error } = await supabase.from(table).update({ is_published: !r.is_published }).eq("id", r.id);
    if (error) return toast.error(error.message);
    load();
  };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const onDragEnd = async (e: any) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = rows.findIndex(r => r.id === active.id);
    const newIndex = rows.findIndex(r => r.id === over.id);
    const next = arrayMove(rows, oldIndex, newIndex);
    setRows(next);
    await Promise.all(next.map((r, i) => supabase.from(table).update({ sort_order: i }).eq("id", r.id)));
    toast.success("Reordered");
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">Manage {title.toLowerCase()}.</p>
        </div>
        <Button onClick={openNew}><Plus className="mr-1 h-4 w-4" /> New</Button>
      </div>

      <Card><CardContent className="p-0">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No items yet. Click "New" to add one.</div>
        ) : orderable ? (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={rows.map(r => r.id)} strategy={verticalListSortingStrategy}>
              <div className="divide-y">
                {rows.map(r => (
                  <SortableRow key={r.id} row={r} columns={columns} onEdit={() => openEdit(r)} onDelete={() => remove(r.id)} onTogglePub={() => togglePub(r)} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <Table>
            <TableHeader><TableRow>{columns.map(c => <TableHead key={c.key}>{c.label}</TableHead>)}<TableHead>Published</TableHead><TableHead className="w-[100px]">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {rows.map(r => (
                <TableRow key={r.id}>
                  {columns.map(c => <TableCell key={c.key} className="max-w-xs truncate">{String(r[c.key] ?? "")}</TableCell>)}
                  <TableCell>{"is_published" in r ? <Switch checked={!!r.is_published} onCheckedChange={() => togglePub(r)} /> : "—"}</TableCell>
                  <TableCell><div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(r)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(r.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent></Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader><DialogTitle>{editing ? "Edit" : "New"} — {title}</DialogTitle></DialogHeader>
          <div className="grid gap-4">
            {fields.map(f => (
              <div key={f.name}>
                <Label>{f.label}</Label>
                {f.type === "textarea" ? (
                  <Textarea rows={4} value={form[f.name] ?? ""} onChange={e => setForm({ ...form, [f.name]: e.target.value })} />
                ) : f.type === "switch" ? (
                  <div className="mt-1"><Switch checked={!!form[f.name]} onCheckedChange={v => setForm({ ...form, [f.name]: v })} /></div>
                ) : f.type === "select" ? (
                  <select className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm" value={form[f.name] ?? ""} onChange={e => setForm({ ...form, [f.name]: e.target.value })}>
                    <option value="">—</option>
                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <Input type={f.type} value={form[f.name] ?? ""} onChange={e => setForm({ ...form, [f.name]: e.target.value })} />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SortableRow({ row, columns, onEdit, onDelete, onTogglePub }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: row.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.6 : 1 };
  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 p-3">
      <button {...attributes} {...listeners} className="cursor-grab text-muted-foreground"><GripVertical className="h-4 w-4" /></button>
      <div className="flex-1 truncate">{columns.map((c: any) => <span key={c.key} className="mr-4 text-sm"><span className="text-muted-foreground">{c.label}:</span> {String(row[c.key] ?? "")}</span>)}</div>
      {"is_published" in row && <Switch checked={!!row.is_published} onCheckedChange={onTogglePub} />}
      <Button size="icon" variant="ghost" onClick={onEdit}><Pencil className="h-4 w-4" /></Button>
      <Button size="icon" variant="ghost" onClick={onDelete}><Trash2 className="h-4 w-4 text-destructive" /></Button>
    </div>
  );
}
