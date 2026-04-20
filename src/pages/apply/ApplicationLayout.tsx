import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useApplication, STEPS } from "@/context/ApplicationContext";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Save, Clock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const ApplicationLayout = () => {
  const { completedSteps } = useApplication();
  const { pathname } = useLocation();
  const current = STEPS.find((s) => pathname.endsWith(s.slug));
  const pct = Math.round((completedSteps.length / STEPS.length) * 100);

  return (
    <PageLayout>
      <div className="container-page py-6 space-y-4">
        <Breadcrumbs items={[{ label: "Application", href: "/dashboard" }, { label: current?.title ?? "Step" }]} />

        {/* Sticky progress */}
        <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 bg-background/95 backdrop-blur border-b">
          <div className="flex items-center justify-between gap-4 mb-1.5">
            <div className="text-xs text-muted-foreground flex items-center gap-3 flex-wrap">
              <span><strong className="text-foreground">Step {current?.n} of {STEPS.length}</strong> · {current?.title}</span>
              <span className="hidden sm:inline-flex items-center gap-1"><Clock className="h-3 w-3" /> ~20 min total</span>
              <span className="hidden md:inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Auto-saved on this device</span>
            </div>
            <button
              onClick={() => toast.success("Draft saved", { description: "Your progress is stored on this device." })}
              className="text-xs inline-flex items-center gap-1 rounded border px-2 py-1 hover:bg-muted"
            >
              <Save className="h-3 w-3" /> Save draft
            </button>
          </div>
          <Progress value={pct} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-[260px,1fr] gap-6">
          {/* Step sidebar */}
          <aside className="lg:sticky lg:top-24 self-start">
            <nav aria-label="Application steps" className="rounded-lg border bg-card p-2">
              <ol className="space-y-0.5">
                {STEPS.map((s) => {
                  const done = completedSteps.includes(s.n);
                  return (
                    <li key={s.n}>
                      <NavLink
                        to={`/apply/${s.slug}`}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition ${
                            isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span className={`step-dot ${done ? "step-dot-done" : isActive ? "step-dot-current" : "step-dot-todo"}`}>
                              {done ? <CheckCircle2 className="h-4 w-4" /> : s.n}
                            </span>
                            <span className="flex-1 truncate">{s.title}</span>
                          </>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ol>
            </nav>
            <div className="mt-3 highlight-info text-xs">
              💡 You can return to any step at any time.
            </div>
          </aside>

          {/* Step content */}
          <div className="min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ApplicationLayout;
