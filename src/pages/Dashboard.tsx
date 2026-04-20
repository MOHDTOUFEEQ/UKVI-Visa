import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useApplication, STEPS } from "@/context/ApplicationContext";
import { CheckCircle2, Clock, FileText, ArrowRight, CalendarClock, Wallet } from "lucide-react";
import { calcMaintenance, calcIHS, VISA_FEE } from "@/lib/visa-data";

const Dashboard = () => {
  const { data, completedSteps } = useApplication();
  const pct = Math.round((completedSteps.length / STEPS.length) * 100);
  const next = STEPS.find((s) => !completedSteps.includes(s.n)) ?? STEPS[STEPS.length - 1];
  const months = parseInt(data.courseDuration || "12", 10);
  const maintenance = calcMaintenance(data.location, months);
  const ihs = calcIHS(months);
  const total = maintenance + ihs + VISA_FEE;

  const docCount = Object.values(data.docs).filter((s) => s === "uploaded").length;

  return (
    <PageLayout>
      <div className="container-page py-8 space-y-6">
        <Breadcrumbs items={[{ label: "Dashboard" }]} />

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display">Your application</h1>
            <p className="text-muted-foreground mt-1">Pick up where you left off. All your progress is saved on this device.</p>
          </div>
          <Button asChild size="lg">
            <Link to={`/apply/${next.slug}`}>Resume — {next.title} <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </Button>
        </div>

        {/* PROGRESS */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Application progress</span>
              <span className="text-2xl font-display text-primary">{pct}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Progress value={pct} className="h-3" />
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span><CheckCircle2 className="inline h-4 w-4 text-accent mr-1" /> {completedSteps.length} of {STEPS.length} steps complete</span>
              <span><Clock className="inline h-4 w-4 mr-1" /> Est. {Math.max(5, 20 - completedSteps.length * 2)} min remaining</span>
            </div>
            {pct < 100 && (
              <div className="highlight-info text-sm">
                ✨ {pct === 0 ? "You haven't started yet." : "You're making good progress."} Don't worry — you can edit anything later before submitting.
              </div>
            )}
          </CardContent>
        </Card>

        {/* WIDGETS */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4 text-secondary" /> Documents</CardTitle></CardHeader>
            <CardContent>
              <div className="text-3xl font-display text-primary">{docCount}<span className="text-base text-muted-foreground">/7</span></div>
              <p className="text-sm text-muted-foreground">documents uploaded</p>
              <Button asChild variant="link" className="px-0 h-auto mt-2"><Link to="/apply/documents">Manage documents →</Link></Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Wallet className="h-4 w-4 text-accent" /> Estimated cost</CardTitle></CardHeader>
            <CardContent>
              <div className="text-3xl font-display text-primary">£{total.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">visa + IHS + funds shown ({months} mo, {data.location === "london" ? "London" : "outside London"})</p>
              <Button asChild variant="link" className="px-0 h-auto mt-2"><Link to="/apply/finance">Update finance →</Link></Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><CalendarClock className="h-4 w-4 text-warning" /> Latest update</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm">UK Student Visa fee remains <strong>£524</strong>. IHS is <strong>£776/year</strong>.</p>
              <p className="text-xs text-muted-foreground mt-2">Always confirm with the official UKVI website before submitting.</p>
            </CardContent>
          </Card>
        </div>

        {/* STEP CHECKLIST */}
        <Card>
          <CardHeader><CardTitle>All steps</CardTitle></CardHeader>
          <CardContent>
            <ol className="grid sm:grid-cols-2 gap-2">
              {STEPS.map((s) => {
                const done = completedSteps.includes(s.n);
                const isNext = s.n === next.n;
                return (
                  <li key={s.n}>
                    <Link
                      to={`/apply/${s.slug}`}
                      className={`flex items-center gap-3 rounded-md border p-3 hover:bg-muted transition ${
                        isNext ? "border-primary bg-secondary/5" : ""
                      }`}
                    >
                      <span className={`step-dot ${done ? "step-dot-done" : isNext ? "step-dot-current" : "step-dot-todo"}`}>
                        {done ? <CheckCircle2 className="h-4 w-4" /> : s.n}
                      </span>
                      <span className="flex-1 text-sm font-medium">{s.title}</span>
                      {done && <span className="badge-success">Done</span>}
                      {isNext && !done && <span className="badge-warning">Next</span>}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
