import { createFileRoute } from "@tanstack/react-router";
import { Plus, Mail, Phone } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [
      { title: "Staff — Helix Lab" },
      { name: "description", content: "Lab personnel, shifts and credentials." },
    ],
  }),
  component: StaffPage,
});

const team = [
  { name: "Dr. Anika Rao", role: "Pathologist · Lead", dept: "Hematology", shift: "Day", status: "On duty", load: 24 },
  { name: "Dr. Kenji Watanabe", role: "Pathologist", dept: "Chemistry", shift: "Day", status: "On duty", load: 18 },
  { name: "Maya Singh", role: "Senior technologist", dept: "Microbiology", shift: "Day", status: "On duty", load: 31 },
  { name: "Tomas Becker", role: "Technologist", dept: "Molecular", shift: "Evening", status: "Off", load: 0 },
  { name: "Layla Haddad", role: "Phlebotomist", dept: "Collection", shift: "Day", status: "On duty", load: 42 },
  { name: "Ravi Krishnan", role: "QA officer", dept: "Quality", shift: "Day", status: "On duty", load: 9 },
];

function StaffPage() {
  return (
    <AppShell
      title="Staff & shifts"
      subtitle="Personnel directory, current duty roster and workload distribution."
      actions={<Button className="rounded-full"><Plus className="mr-1 h-4 w-4" />Add member</Button>}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {[
          { l: "On duty now", v: "18 / 24" },
          { l: "Pathologists", v: "6" },
          { l: "Technologists", v: "11" },
          { l: "Avg workload", v: "72%" },
        ].map((s) => (
          <div key={s.l} className="bento-card md:col-span-3">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
            <div className="mt-2 font-display text-3xl font-semibold">{s.v}</div>
          </div>
        ))}

        <div className="bento-card md:col-span-12">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Team</h3>
            <span className="text-xs text-muted-foreground">Updated 2 min ago</span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <div key={m.name} className="rounded-2xl border border-border bg-card p-4 transition hover:border-teal/40 hover:shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-brand font-display text-base font-semibold text-brand-foreground">
                    {m.name.split(" ").map((s) => s[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-base font-semibold leading-tight">{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.role}</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge variant="outline" className="rounded-full text-[10px]">{m.dept}</Badge>
                      <Badge variant="outline" className="rounded-full text-[10px]">{m.shift}</Badge>
                      <Badge className={`rounded-full text-[10px] ${m.status === "On duty" ? "bg-success/15 text-success hover:bg-success/15" : "bg-muted text-muted-foreground hover:bg-muted"}`}>{m.status}</Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Workload</span>
                    <span className="font-medium">{m.load} cases</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-teal" style={{ width: `${Math.min(m.load * 2.5, 100)}%` }} />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Mail className="h-3 w-3" />Message</span>
                  <span className="inline-flex items-center gap-1.5"><Phone className="h-3 w-3" />Call</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}