import { useState, useMemo } from "react";
import { StepShell } from "./StepShell";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/ui/input";
import { useApplication } from "@/context/ApplicationContext";
import { calcMaintenance } from "@/lib/visa-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const StepFinance = () => {
  const { data, update } = useApplication();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const months = parseInt(data.courseDuration || "12", 10);
  const required = useMemo(() => {
    const maintenance = calcMaintenance(data.location, months);
    const tuitionRemaining = Math.max(0, parseInt(data.tuitionFee || "0", 10) - parseInt(data.tuitionPaid || "0", 10));
    return { maintenance, tuitionRemaining, total: maintenance + tuitionRemaining };
  }, [data.location, months, data.tuitionFee, data.tuitionPaid]);

  const balance = parseInt(data.bankBalance || "0", 10);
  const days = parseInt(data.fundsHeldDays || "0", 10);
  const balanceOk = balance >= required.total;
  const daysOk = days >= 28;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.bankName.trim()) e.bankName = "Required.";
    if (balance <= 0) e.bankBalance = "Please enter your current balance in INR equivalent of £.";
    if (!data.fundsHeldDays) e.fundsHeldDays = "Please enter how many days the funds have been held.";
    setErrors(e);
    if (Object.keys(e).length) { toast.error("Please complete your financial details."); return false; }
    if (!balanceOk || !daysOk) toast.warning("Funds may not meet UKVI requirements — review the breakdown.");
    return true;
  };

  const cap = Math.min(months, 9);
  const rate = data.location === "london" ? 1334 : 1023;

  return (
    <StepShell step={5} title="Financial evidence" description="Show that you can support yourself in the UK. Funds must have been held for at least 28 days." onNext={validate}>
      <Card>
        <CardHeader><CardTitle className="text-base">Funds calculator</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <Stat label="Living costs" value={`£${required.maintenance.toLocaleString()}`} sub={`${cap} mo × £${rate}`} />
            <Stat label="Unpaid tuition" value={`£${required.tuitionRemaining.toLocaleString()}`} sub="from your CAS step" />
            <Stat label="Total required" value={`£${required.total.toLocaleString()}`} sub="held for 28 days" highlight />
          </div>

          {/* Visual breakdown */}
          <div className="space-y-1.5 pt-2">
            <div className="text-xs text-muted-foreground">Distribution</div>
            <div className="flex h-3 rounded-full overflow-hidden border">
              {required.total > 0 && (
                <>
                  <div className="bg-secondary" style={{ width: `${(required.maintenance / required.total) * 100}%` }} title="Maintenance" />
                  <div className="bg-accent" style={{ width: `${(required.tuitionRemaining / required.total) * 100}%` }} title="Tuition" />
                </>
              )}
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span><span className="inline-block w-2 h-2 rounded-full bg-secondary mr-1" /> Maintenance</span>
              <span><span className="inline-block w-2 h-2 rounded-full bg-accent mr-1" /> Tuition</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="card-trust space-y-5">
        <FormField id="bank" label="Bank name" required example="State Bank of India" error={errors.bankName}>
          <Input id="bank" value={data.bankName} onChange={(e) => update({ bankName: e.target.value })} />
        </FormField>
        <div className="grid md:grid-cols-2 gap-4">
          <FormField id="bal" label="Current available balance (£)" required helper="Convert from INR using today's rate." error={errors.bankBalance}>
            <Input id="bal" inputMode="numeric" value={data.bankBalance} onChange={(e) => update({ bankBalance: e.target.value.replace(/\D/g, "") })} />
          </FormField>
          <FormField id="days" label="Days funds have been held" required example="35" helper="Must be 28+ continuous days at or above the required amount." error={errors.fundsHeldDays}>
            <Input id="days" inputMode="numeric" value={data.fundsHeldDays} onChange={(e) => update({ fundsHeldDays: e.target.value.replace(/\D/g, "") })} />
          </FormField>
        </div>

        <div className={`rounded-md p-4 border-l-4 text-sm ${balanceOk && daysOk ? "border-l-accent bg-accent/10" : "border-l-warning bg-warning/10"}`}>
          {balanceOk && daysOk ? (
            <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-accent mt-0.5" /> <span>Looks good — your funds meet the UKVI requirement.</span></div>
          ) : (
            <div className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-warning-foreground mt-0.5" /><span>
              {!balanceOk && <>Your balance (£{balance.toLocaleString()}) is below the required £{required.total.toLocaleString()}. </>}
              {!daysOk && <>Funds must be held for 28+ days (currently {days || 0}).</>}
              <br /><strong>Don't worry</strong> — you can update this later before submitting.
            </span></div>
          )}
        </div>
      </div>
    </StepShell>
  );
};

const Stat = ({ label, value, sub, highlight }: { label: string; value: string; sub?: string; highlight?: boolean }) => (
  <div className={`rounded-md border p-3 ${highlight ? "bg-primary text-primary-foreground border-primary" : "bg-card"}`}>
    <div className="text-xs uppercase tracking-wide opacity-80">{label}</div>
    <div className="font-display text-2xl mt-0.5">{value}</div>
    {sub && <div className="text-xs opacity-80">{sub}</div>}
  </div>
);

export default StepFinance;
