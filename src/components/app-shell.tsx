import { ReactNode } from "react";
import { Bell, Search } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:px-8">
            <SidebarTrigger className="-ml-1" />
            <div className="hidden md:flex md:flex-1 md:items-center md:gap-2">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search patients, samples, accession #…"
                  className="h-10 rounded-full border-border bg-secondary/50 pl-9 pr-4 text-sm"
                />
              </div>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button className="relative rounded-full p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-warning" />
              </button>
              <div className="flex items-center gap-2.5 rounded-full border border-border bg-card pl-1 pr-3 py-1">
                <div className="flex h-7 w-7 items-center justify-center rounded-full gradient-brand text-[11px] font-semibold text-brand-foreground">
                  DR
                </div>
                <div className="hidden text-left leading-tight sm:block">
                  <div className="text-xs font-semibold text-foreground">Dr. Rao</div>
                  <div className="text-[10px] text-muted-foreground">Pathologist</div>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-[34px]">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>
                )}
              </div>
              {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}