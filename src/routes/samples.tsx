import { createFileRoute } from "@tanstack/react-router";
import { Plus, QrCode, ScanLine, Thermometer } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/samples")({
  head: () => ({
    meta: [
      { title: "Samples — Helix Lab" },
      { name: "description", content: "Specimen tracking and chain of custody." },
    ],
  }),
  component: SamplesPage,
});

const stages = [
  { name: "Collected", count: 312, color: "bg-muted-foreground" },
  { name: "In transit", count: 47, color: "bg-warning" },
  { name: "Received", count: 198, color: "bg-teal" },
  { name: "Processing", count: 84, color: "bg-primary" },
  { name: "Reported", count: 643, color: "bg-success" },
];

const samples = [
  { id: "S-2410-9821", type: "EDTA Whole Blood", patient: "Amelia Hart", coll: "08:42", temp: "4°C", stage: "Processing" },
  { id: "S-2410-9820", type: "Serum (SST)", patient: "Leo Marshall", coll: "08:38", temp: "RT", stage: "Received" },
  { id: "S-2410-9819", type: "Urine", patient: "Priya Desai", coll: "08:30", temp: "RT", stage: "Reported" },
  { id: "S-2410-9818", type: "Plasma (Citrate)", patient: "Marco Rivas", coll: "08:24", temp: "4°C", stage: "Processing" },
  { id: "S-2410-9817", type: "NP Swab", patient: "Hana Okabe", coll: "08:15", temp: "-20°C", stage: "In transit" },
  { id: "S-2410-9816", type: "Stool", patient: "Diego Alvarez", coll: "08:02", temp: "4°C", stage: "Collected" },
];

function SamplesPage() {
  return (
    <AppShell
      title="Specimen tracking"
      subtitle="Real-time chain-of-custody from phlebotomy to verified report."
      actions={
        <>
          <Button variant="outline" className="rounded-full"><ScanLine className="mr-1 h-4 w-4" />Scan</Button>
          <Button className="rounded-full"><Plus className="mr-1 h-4 w-4" />Accession</Button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="bento-card md:col-span-12">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Pipeline · today</h3>
            <span className="text-xs text-muted-foreground">1,284 total specimens</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
            {stages.map((s) => (
              <div key={s.name} className="rounded-xl border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${s.color}`} />
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">{s.name}</span>
                </div>
                <div className="mt-2 font-display text-3xl font-semibold">{s.count}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full">
            {stages.map((s) => (
              <div key={s.name} className={s.color} style={{ flexGrow: s.count }} />
            ))}
          </div>
        </div>

        <div className="bento-card md:col-span-8">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Active specimens</h3>
            <Button variant="ghost" size="sm" className="text-xs">View all</Button>
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Sample ID</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Patient</th>
                  <th className="px-4 py-3 font-medium">Collected</th>
                  <th className="px-4 py-3 font-medium">Storage</th>
                  <th className="px-4 py-3 font-medium">Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {samples.map((s) => (
                  <tr key={s.id} className="transition hover:bg-secondary/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <QrCode className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="font-mono text-xs">{s.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{s.type}</td>
                    <td className="px-4 py-3 font-medium">{s.patient}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.coll}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Thermometer className="h-3 w-3" />{s.temp}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="rounded-full text-[10px]">{s.stage}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bento-card md:col-span-4">
          <h3 className="font-display text-lg font-semibold">Cold chain</h3>
          <p className="text-xs text-muted-foreground">Storage units · live temperature</p>
          <ul className="mt-4 space-y-3">
            {[
              { n: "Freezer A", t: "-82.4°C", target: "-80°C", ok: true },
              { n: "Freezer B", t: "-21.0°C", target: "-20°C", ok: true },
              { n: "Fridge 1", t: "4.2°C", target: "4°C", ok: true },
              { n: "Fridge 2", t: "8.1°C", target: "4°C", ok: false },
            ].map((u) => (
              <li key={u.n} className={`flex items-center justify-between rounded-xl border p-3 ${u.ok ? "border-border" : "border-destructive/40 bg-destructive/5"}`}>
                <div>
                  <div className="text-sm font-semibold">{u.n}</div>
                  <div className="text-xs text-muted-foreground">target {u.target}</div>
                </div>
                <div className={`font-display text-lg font-semibold ${u.ok ? "text-foreground" : "text-destructive"}`}>{u.t}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}