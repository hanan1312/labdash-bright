import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Plus,
  TestTubeDiagonal,
  Clock,
  ShieldCheck,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Helix Lab" },
      { name: "description", content: "Real-time medical lab operations overview." },
    ],
  }),
  component: DashboardPage,
});

const kpis = [
  { label: "Samples today", value: "1,284", delta: "+12.4%", icon: TestTubeDiagonal, tone: "bg-teal/15 text-teal" },
  { label: "Avg TAT", value: "2h 41m", delta: "-8m", icon: Clock, tone: "bg-mint/20 text-primary" },
  { label: "QC pass rate", value: "99.2%", delta: "+0.3%", icon: ShieldCheck, tone: "bg-success/15 text-success" },
  { label: "Pending reports", value: "37", delta: "-14", icon: Activity, tone: "bg-warning/15 text-warning" },
];

const queue = [
  { id: "ACC-9821", patient: "Amelia Hart", test: "CBC + Differential", priority: "Urgent", status: "Running", time: "12m" },
  { id: "ACC-9820", patient: "Leo Marshall", test: "Lipid Panel", priority: "Routine", status: "Queued", time: "24m" },
  { id: "ACC-9819", patient: "Priya Desai", test: "HbA1c", priority: "Routine", status: "Verified", time: "—" },
  { id: "ACC-9818", patient: "Marco Rivas", test: "Thyroid (TSH/T3/T4)", priority: "STAT", status: "Running", time: "4m" },
  { id: "ACC-9817", patient: "Hana Okabe", test: "Liver Function", priority: "Routine", status: "Queued", time: "31m" },
];

const instruments = [
  { name: "Cobas 8000", load: 78, status: "Online" },
  { name: "Sysmex XN-1000", load: 54, status: "Online" },
  { name: "Architect i2000", load: 92, status: "High load" },
  { name: "GeneXpert", load: 22, status: "Idle" },
];

function DashboardPage() {
  return (
    <AppShell
      title="Operations overview"
      subtitle="Live snapshot of accessions, instrument load, turnaround time and QC across the lab."
      actions={
        <>
          <Button variant="outline" className="rounded-full">Export</Button>
          <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-1 h-4 w-4" /> New accession
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {/* KPI row */}
        {kpis.map((k) => (
          <div key={k.label} className="bento-card md:col-span-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {k.label}
              </span>
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${k.tone}`}>
                <k.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-semibold tracking-tight text-foreground">{k.value}</span>
              <span className="text-xs font-medium text-success">{k.delta}</span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full gradient-brand" style={{ width: `${50 + (kpis.indexOf(k) + 1) * 10}%` }} />
            </div>
          </div>
        ))}

        {/* Throughput chart */}
        <div className="bento-card md:col-span-8">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Throughput · last 24h</h3>
              <p className="text-xs text-muted-foreground">Samples processed per hour, segmented by department</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Hematology</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-teal" /> Chemistry</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-mint" /> Micro</span>
            </div>
          </div>
          <div className="mt-6 flex h-56 items-end gap-2">
            {Array.from({ length: 24 }).map((_, i) => {
              const h = 30 + Math.abs(Math.sin(i / 1.7)) * 70;
              const m = 18 + Math.abs(Math.cos(i / 2.3)) * 40;
              const c = 12 + Math.abs(Math.sin(i / 3.1)) * 28;
              return (
                <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
                  <div className="flex w-full flex-col-reverse overflow-hidden rounded-md">
                    <div className="w-full bg-primary" style={{ height: `${h}px` }} />
                    <div className="w-full bg-teal" style={{ height: `${m}px` }} />
                    <div className="w-full bg-mint" style={{ height: `${c}px` }} />
                  </div>
                  {i % 4 === 0 && <span className="text-[10px] text-muted-foreground">{i}:00</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Critical alerts */}
        <div className="bento-card md:col-span-4 bg-gradient-to-br from-card to-brand-soft/40">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Critical values</h3>
            <Badge className="rounded-full bg-destructive/10 text-destructive hover:bg-destructive/15">3 active</Badge>
          </div>
          <ul className="mt-4 space-y-3">
            {[
              { p: "Marco Rivas", t: "Potassium 6.8 mmol/L", time: "2m ago" },
              { p: "Sara Klein", t: "Troponin I 4.2 ng/mL", time: "9m ago" },
              { p: "Yuki Tanaka", t: "Hgb 6.1 g/dL", time: "21m ago" },
            ].map((a) => (
              <li key={a.p} className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-foreground">{a.p}</div>
                  <div className="truncate text-xs text-muted-foreground">{a.t}</div>
                </div>
                <span className="text-[11px] text-muted-foreground">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sample queue */}
        <div className="bento-card md:col-span-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Active sample queue</h3>
              <p className="text-xs text-muted-foreground">Live accessions in process</p>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Button>
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 font-medium">Accession</th>
                  <th className="px-4 py-2.5 font-medium">Patient</th>
                  <th className="px-4 py-2.5 font-medium">Test</th>
                  <th className="px-4 py-2.5 font-medium">Priority</th>
                  <th className="px-4 py-2.5 font-medium">Status</th>
                  <th className="px-4 py-2.5 font-medium text-right">ETA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {queue.map((q) => (
                  <tr key={q.id} className="transition hover:bg-secondary/40">
                    <td className="px-4 py-3 font-mono text-xs text-foreground">{q.id}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{q.patient}</td>
                    <td className="px-4 py-3 text-muted-foreground">{q.test}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={`rounded-full text-[10px] ${q.priority === "STAT" ? "border-destructive/40 text-destructive" : q.priority === "Urgent" ? "border-warning/50 text-warning" : "border-border text-muted-foreground"}`}>
                        {q.priority}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs ${q.status === "Verified" ? "text-success" : q.status === "Running" ? "text-teal" : "text-muted-foreground"}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${q.status === "Verified" ? "bg-success" : q.status === "Running" ? "bg-teal animate-pulse" : "bg-muted-foreground"}`} />
                        {q.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-muted-foreground">{q.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Instrument load */}
        <div className="bento-card md:col-span-4">
          <h3 className="font-display text-lg font-semibold">Instruments</h3>
          <p className="text-xs text-muted-foreground">Real-time analyzer load</p>
          <ul className="mt-4 space-y-4">
            {instruments.map((i) => (
              <li key={i.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{i.name}</span>
                  <span className="text-xs text-muted-foreground">{i.load}%</span>
                </div>
                <Progress value={i.load} className="mt-2 h-1.5" />
                <div className="mt-1 text-[11px] text-muted-foreground">{i.status}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* QC */}
        <div className="bento-card md:col-span-5 bg-primary text-primary-foreground">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary-foreground/70">
            <ShieldCheck className="h-3.5 w-3.5" /> Quality control
          </div>
          <div className="mt-3 font-display text-4xl font-semibold tracking-tight">99.2%</div>
          <p className="mt-1 text-sm text-primary-foreground/70">Westgard rule compliance · last 7 days</p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { l: "Levey-Jennings", v: "On target" },
              { l: "Bias", v: "0.4σ" },
              { l: "CV%", v: "1.8" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-white/5 p-3 backdrop-blur">
                <div className="text-[10px] uppercase text-primary-foreground/60">{s.l}</div>
                <div className="mt-1 font-display text-lg font-semibold">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently verified */}
        <div className="bento-card md:col-span-7">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Recently verified</h3>
            <span className="flex items-center gap-1.5 text-xs text-success">
              <TrendingUp className="h-3.5 w-3.5" /> 24% faster than yesterday
            </span>
          </div>
          <ul className="mt-4 space-y-3">
            {[
              { n: "Priya Desai", t: "HbA1c", v: "5.4%", r: "Normal" },
              { n: "Diego Alvarez", t: "Vitamin D", v: "32 ng/mL", r: "Normal" },
              { n: "Eun-ji Park", t: "Cortisol AM", v: "18 µg/dL", r: "Normal" },
              { n: "Hassan Idris", t: "PSA", v: "1.2 ng/mL", r: "Normal" },
            ].map((r) => (
              <li key={r.n} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-soft text-teal">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{r.n}</div>
                    <div className="text-xs text-muted-foreground">{r.t}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-sm font-semibold text-foreground">{r.v}</div>
                  <div className="text-[11px] text-success">{r.r}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
