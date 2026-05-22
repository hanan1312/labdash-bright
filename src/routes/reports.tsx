import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, Send, Eye, CheckCircle2, Clock } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Helix Lab" },
      { name: "description", content: "Verify, sign and dispatch lab reports." },
    ],
  }),
  component: ReportsPage,
});

const reports = [
  { id: "RPT-2410-1182", patient: "Amelia Hart", panel: "CBC + Differential", status: "Awaiting verification", time: "Now", flag: "Normal" },
  { id: "RPT-2410-1181", patient: "Marco Rivas", panel: "Cardiac markers", status: "Awaiting verification", time: "4m", flag: "Critical" },
  { id: "RPT-2410-1180", patient: "Priya Desai", panel: "HbA1c", status: "Verified", time: "12m", flag: "Normal" },
  { id: "RPT-2410-1179", patient: "Diego Alvarez", panel: "Vitamin D", status: "Dispatched", time: "1h", flag: "Normal" },
  { id: "RPT-2410-1178", patient: "Hana Okabe", panel: "Liver function", status: "Verified", time: "1h", flag: "Abnormal" },
];

function ReportsPage() {
  return (
    <AppShell
      title="Reports & verification"
      subtitle="Validate, sign and deliver patient reports across channels."
      actions={<Button className="rounded-full"><Send className="mr-1 h-4 w-4" />Bulk dispatch</Button>}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {[
          { l: "Awaiting verification", v: "37", icon: Clock, tone: "bg-warning/15 text-warning" },
          { l: "Verified today", v: "412", icon: CheckCircle2, tone: "bg-success/15 text-success" },
          { l: "Dispatched", v: "388", icon: Send, tone: "bg-teal/15 text-teal" },
          { l: "Critical flagged", v: "6", icon: FileText, tone: "bg-destructive/10 text-destructive" },
        ].map((s) => (
          <div key={s.l} className="bento-card md:col-span-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</span>
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.tone}`}>
                <s.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 font-display text-3xl font-semibold">{s.v}</div>
          </div>
        ))}

        <div className="bento-card md:col-span-8">
          <h3 className="font-display text-lg font-semibold">Verification queue</h3>
          <ul className="mt-4 space-y-2.5">
            {reports.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-3 transition hover:border-teal/40">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-soft text-teal">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground">{r.id}</span>
                    <Badge variant="outline" className={`rounded-full text-[10px] ${r.flag === "Critical" ? "border-destructive/40 text-destructive" : r.flag === "Abnormal" ? "border-warning/50 text-warning" : "border-success/40 text-success"}`}>{r.flag}</Badge>
                  </div>
                  <div className="mt-0.5 text-sm font-semibold">{r.patient} · <span className="font-normal text-muted-foreground">{r.panel}</span></div>
                </div>
                <span className="text-xs text-muted-foreground">{r.time}</span>
                <Badge variant="outline" className="rounded-full text-[10px]">{r.status}</Badge>
                <div className="flex gap-1">
                  <button className="rounded-full p-2 text-muted-foreground hover:bg-secondary"><Eye className="h-4 w-4" /></button>
                  <button className="rounded-full p-2 text-muted-foreground hover:bg-secondary"><Download className="h-4 w-4" /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bento-card md:col-span-4">
          <h3 className="font-display text-lg font-semibold">Delivery channels</h3>
          <p className="text-xs text-muted-foreground">Last 24 hours</p>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { c: "Patient portal", v: 248, p: 64 },
              { c: "Email (PDF)", v: 112, p: 29 },
              { c: "SMS link", v: 18, p: 5 },
              { c: "Physical pickup", v: 10, p: 2 },
            ].map((c) => (
              <li key={c.c}>
                <div className="flex items-center justify-between">
                  <span>{c.c}</span>
                  <span className="text-xs text-muted-foreground">{c.v}</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full gradient-brand" style={{ width: `${c.p * 1.5}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}