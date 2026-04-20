import { StepShell } from "./StepShell";
import { useApplication } from "@/context/ApplicationContext";
import { calcIHS, IHS_RATE_PER_YEAR } from "@/lib/visa-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const BENEFITS = [
  "Access NHS doctors and hospitals",
  "Free treatment in emergencies",
  "Maternity and mental health services",
  "Most prescriptions at standard NHS rates",
];

const StepIHS = () => {
  const { data, update } = useApplication();
  const months = parseInt(data.courseDuration || "12", 10);
  const ihs = calcIHS(months);

  return (
    <StepShell step={8} title="Immigration Health Surcharge (IHS)" description="The IHS gives you access to the UK's NHS healthcare during your stay.">
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Heart className="h-4 w-4 text-destructive" /> Why pay IHS?</CardTitle></CardHeader>
        <CardContent>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            {BENEFITS.map((b) => <li key={b} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> {b}</li>)}
          </ul>
        </CardContent>
      </Card>

      <div className="card-trust">
        <div className="text-sm text-muted-foreground">Calculated from your course duration:</div>
        <div className="grid sm:grid-cols-3 gap-3 mt-3">
          <Stat label="Course duration" value={`${months} months`} />
          <Stat label="Rate" value={`£${IHS_RATE_PER_YEAR}/yr`} />
          <Stat label="Total IHS due" value={`£${ihs.toLocaleString()}`} highlight />
        </div>
        <p className="text-xs text-muted-foreground mt-3">UKVI rounds course duration up to the nearest half year. The IHS is paid as part of your visa application.</p>

        <div className="mt-5">
          {data.ihsConfirmed ? (
            <div className="badge-success w-fit"><CheckCircle2 className="h-4 w-4" /> IHS amount confirmed</div>
          ) : (
            <Button onClick={() => { update({ ihsConfirmed: true }); toast.success("IHS amount acknowledged"); }}>I understand & confirm IHS amount</Button>
          )}
        </div>
      </div>
    </StepShell>
  );
};

const Stat = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className={`rounded-md border p-3 ${highlight ? "bg-primary text-primary-foreground border-primary" : "bg-card"}`}>
    <div className="text-xs uppercase tracking-wide opacity-80">{label}</div>
    <div className="font-display text-2xl mt-0.5">{value}</div>
  </div>
);

export default StepIHS;
