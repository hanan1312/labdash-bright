import { createFileRoute } from "@tanstack/react-router";
import { Plus, Filter, Phone, Mail, MoreHorizontal } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/patients")({
  head: () => ({
    meta: [
      { title: "Patients — Helix Lab" },
      { name: "description", content: "Patient registry and case history." },
    ],
  }),
  component: PatientsPage,
});

const patients = [
  { id: "MRN-04821", name: "Amelia Hart", age: 34, sex: "F", phone: "+1 415 555 0102", email: "amelia.h@mail.com", visits: 12, last: "Today", status: "Active" },
  { id: "MRN-04820", name: "Leo Marshall", age: 52, sex: "M", phone: "+1 415 555 0145", email: "leo.m@mail.com", visits: 4, last: "2d ago", status: "Active" },
  { id: "MRN-04819", name: "Priya Desai", age: 29, sex: "F", phone: "+1 415 555 0188", email: "priya.d@mail.com", visits: 7, last: "5d ago", status: "Follow-up" },
  { id: "MRN-04818", name: "Marco Rivas", age: 61, sex: "M", phone: "+1 415 555 0167", email: "marco.r@mail.com", visits: 21, last: "Today", status: "Critical" },
  { id: "MRN-04817", name: "Hana Okabe", age: 41, sex: "F", phone: "+1 415 555 0173", email: "hana.o@mail.com", visits: 3, last: "1w ago", status: "Active" },
  { id: "MRN-04816", name: "Diego Alvarez", age: 47, sex: "M", phone: "+1 415 555 0119", email: "diego.a@mail.com", visits: 9, last: "3d ago", status: "Active" },
];

function PatientsPage() {
  return (
    <AppShell
      title="Patients"
      subtitle="Unified registry with case history, contacts and active orders."
      actions={
        <>
          <Button variant="outline" className="rounded-full"><Filter className="mr-1 h-4 w-4" />Filter</Button>
          <Button className="rounded-full"><Plus className="mr-1 h-4 w-4" />New patient</Button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {[
          { l: "Total registered", v: "12,481" },
          { l: "Active this week", v: "1,938" },
          { l: "Follow-ups due", v: "84" },
          { l: "Critical", v: "6" },
        ].map((s) => (
          <div key={s.l} className="bento-card md:col-span-3">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
            <div className="mt-2 font-display text-3xl font-semibold">{s.v}</div>
          </div>
        ))}

        <div className="bento-card md:col-span-12">
          <div className="flex flex-wrap items-center gap-3">
            <Input placeholder="Search by name, MRN, phone…" className="h-10 max-w-sm rounded-full bg-secondary/50" />
            <div className="ml-auto flex gap-2 text-xs">
              {["All", "Active", "Follow-up", "Critical", "Inactive"].map((t, i) => (
                <button key={t} className={`rounded-full border px-3 py-1.5 transition ${i === 0 ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:bg-secondary"}`}>{t}</button>
              ))}
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">MRN</th>
                  <th className="px-4 py-3 font-medium">Patient</th>
                  <th className="px-4 py-3 font-medium">Age / Sex</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Visits</th>
                  <th className="px-4 py-3 font-medium">Last visit</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {patients.map((p) => (
                  <tr key={p.id} className="transition hover:bg-secondary/40">
                    <td className="px-4 py-3 font-mono text-xs">{p.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-soft font-semibold text-teal">
                          {p.name.split(" ").map((s) => s[0]).join("")}
                        </div>
                        <span className="font-medium text-foreground">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.age} · {p.sex}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground"><Phone className="h-3 w-3" />{p.phone}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground"><Mail className="h-3 w-3" />{p.email}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.visits}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.last}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={`rounded-full text-[10px] ${p.status === "Critical" ? "border-destructive/40 text-destructive" : p.status === "Follow-up" ? "border-warning/50 text-warning" : "border-success/40 text-success"}`}>
                        {p.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary"><MoreHorizontal className="h-4 w-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}