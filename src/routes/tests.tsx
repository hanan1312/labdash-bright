import { createFileRoute } from "@tanstack/react-router";
import { Plus, FlaskConical, Beaker, Microscope, Dna, HeartPulse } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/tests")({
  head: () => ({
    meta: [
      { title: "Test Catalog — Helix Lab" },
      { name: "description", content: "Test menu, panels and reference ranges." },
    ],
  }),
  component: TestsPage,
});

const departments = [
  { name: "Hematology", icon: Beaker, count: 38, tests: ["CBC + Diff", "ESR", "Reticulocyte count", "Coagulation profile"] },
  { name: "Chemistry", icon: FlaskConical, count: 64, tests: ["Lipid panel", "Liver function", "Renal function", "HbA1c"] },
  { name: "Microbiology", icon: Microscope, count: 27, tests: ["Urine culture", "Blood culture", "Stool C&S", "MRSA screen"] },
  { name: "Molecular", icon: Dna, count: 19, tests: ["PCR SARS-CoV-2", "HPV genotyping", "BCR-ABL", "JAK2"] },
  { name: "Immunology", icon: HeartPulse, count: 22, tests: ["ANA", "Thyroid antibodies", "Allergen panel", "Celiac panel"] },
];

const popular = [
  { code: "CBC-001", name: "Complete Blood Count + Diff", tat: "45m", price: "$24", sample: "EDTA whole blood" },
  { code: "LIP-220", name: "Lipid panel (full)", tat: "1h 20m", price: "$32", sample: "Serum, fasting" },
  { code: "TFT-310", name: "Thyroid function (TSH/T3/T4)", tat: "2h", price: "$48", sample: "Serum" },
  { code: "HBA-150", name: "HbA1c", tat: "1h", price: "$28", sample: "EDTA whole blood" },
  { code: "VIT-D25", name: "Vitamin D, 25-Hydroxy", tat: "4h", price: "$58", sample: "Serum" },
  { code: "PCR-SAR", name: "PCR SARS-CoV-2", tat: "3h", price: "$72", sample: "Nasopharyngeal swab" },
];

function TestsPage() {
  return (
    <AppShell
      title="Test catalog"
      subtitle="Browse the complete test menu by department, with TAT, sample type and pricing."
      actions={<Button className="rounded-full"><Plus className="mr-1 h-4 w-4" />Add test</Button>}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {departments.map((d, i) => (
          <div key={d.name} className={`bento-card ${i === 0 ? "md:col-span-4" : i === 1 ? "md:col-span-4" : i === 2 ? "md:col-span-4" : "md:col-span-6"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-soft text-teal">
                  <d.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-base font-semibold">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.count} tests available</div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">Open →</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {d.tests.map((t) => (
                <span key={t} className="rounded-full border border-border bg-secondary/40 px-2.5 py-1 text-xs text-muted-foreground">{t}</span>
              ))}
            </div>
          </div>
        ))}

        <div className="bento-card md:col-span-12">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Most ordered tests</h3>
            <span className="text-xs text-muted-foreground">Updated hourly</span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {popular.map((p) => (
              <div key={p.code} className="rounded-xl border border-border bg-card p-4 transition hover:border-teal/40 hover:shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="font-mono text-[10px] tracking-wider text-muted-foreground">{p.code}</div>
                  <Badge variant="outline" className="rounded-full text-[10px]">TAT {p.tat}</Badge>
                </div>
                <div className="mt-2 font-display text-base font-semibold leading-snug">{p.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">Sample · {p.sample}</div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-lg font-semibold text-foreground">{p.price}</span>
                  <Button size="sm" variant="outline" className="h-8 rounded-full text-xs">Order</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}