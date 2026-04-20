import { useState } from "react";
import { StepShell } from "./StepShell";
import { useApplication } from "@/context/ApplicationContext";
import { calcIHS, VISA_FEE } from "@/lib/visa-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, CreditCard, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const StepPayment = () => {
  const { data, update } = useApplication();
  const [processing, setProcessing] = useState(false);
  const months = parseInt(data.courseDuration || "12", 10);
  const ihs = calcIHS(months);
  const total = VISA_FEE + ihs;

  const pay = () => {
    setProcessing(true);
    toast.loading("Processing payment…", { id: "pay" });
    setTimeout(() => {
      const ref = `UKVI-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      update({ paid: true, referenceNumber: ref, submittedAt: new Date().toISOString() });
      toast.success("Payment successful", { id: "pay" });
      setProcessing(false);
      window.location.assign("/apply/confirmation");
    }, 1500);
  };

  return (
    <StepShell step={10} title="Payment" description="Pay your visa fee and Immigration Health Surcharge to submit your application.">
      <Card>
        <CardHeader><CardTitle className="text-base">Fee breakdown</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b"><td className="py-2">UK Student Visa fee</td><td className="py-2 text-right">£{VISA_FEE}</td></tr>
              <tr className="border-b"><td className="py-2">Immigration Health Surcharge ({months} months)</td><td className="py-2 text-right">£{ihs.toLocaleString()}</td></tr>
              <tr className="font-display text-lg"><td className="py-3">Total</td><td className="py-3 text-right text-primary">£{total.toLocaleString()}</td></tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="card-trust space-y-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="h-4 w-4 text-accent" /> Your payment information is encrypted. This is a simulated payment for the prototype.
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="cardname">Cardholder name</Label>
            <Input id="cardname" defaultValue={`${data.fullName} ${data.surname}`.trim()} />
          </div>
          <div>
            <Label htmlFor="cardnum">Card number</Label>
            <Input id="cardnum" defaultValue="4242 4242 4242 4242" className="font-mono" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="exp">Expiry</Label>
              <Input id="exp" defaultValue="12/28" />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" defaultValue="123" />
            </div>
          </div>
        </div>

        <Button onClick={pay} disabled={processing} size="lg" className="w-full">
          {processing ? "Processing…" : <><CreditCard className="h-4 w-4 mr-2" /> Simulate payment of £{total.toLocaleString()}</>}
        </Button>

        {data.paid && (
          <div className="badge-success w-fit"><CheckCircle2 className="h-4 w-4" /> Payment received</div>
        )}
      </div>
    </StepShell>
  );
};

export default StepPayment;
