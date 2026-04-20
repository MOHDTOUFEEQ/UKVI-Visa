import { Link } from "react-router-dom";
import { StepShell } from "./StepShell";
import { useApplication } from "@/context/ApplicationContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, Mail, LayoutDashboard, Clock } from "lucide-react";
import { useEffect } from "react";

const StepConfirmation = () => {
  const { data, update, markStepComplete } = useApplication();

  useEffect(() => {
    if (!data.referenceNumber) {
      const ref = `UKVI-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      update({ referenceNumber: ref, paid: true, submittedAt: new Date().toISOString() });
    }
    markStepComplete(11);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ref = data.referenceNumber || "UKVI-2026-123456";

  return (
    <StepShell step={11} title="Application submitted" description="Congratulations — your visa application has been received.">
      <Card className="border-l-4 border-l-accent text-center">
        <CardContent className="pt-10 pb-10 space-y-3">
          <div className="mx-auto h-16 w-16 rounded-full bg-accent/15 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-accent animate-tick" />
          </div>
          <h2 className="font-display">Application submitted successfully</h2>
          <div className="inline-block rounded-md bg-secondary/10 border border-secondary/20 px-4 py-2 mt-2">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Your reference number</div>
            <div className="font-display text-2xl text-primary">{ref}</div>
          </div>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">Save this reference. You'll need it for biometrics and any communication with UKVI.</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2"><Clock className="h-5 w-5 text-secondary" /> What happens next?</h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm">
            <li>Book a biometrics appointment at a VFS Global centre near you (within 14 days).</li>
            <li>Bring your passport, this reference number, and the original supporting documents.</li>
            <li>Standard processing takes around <strong>3 weeks</strong> after biometrics.</li>
            <li>You'll receive a decision letter and a 90-day vignette in your passport.</li>
          </ol>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-3 gap-3">
        <Button asChild variant="outline" className="h-auto py-4">
          <Link to="/download" className="flex flex-col items-center gap-1.5">
            <Download className="h-5 w-5" />
            <span>Download PDF summary</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4">
          <Link to="/email-preview" className="flex flex-col items-center gap-1.5">
            <Mail className="h-5 w-5" />
            <span>View confirmation email</span>
          </Link>
        </Button>
        <Button asChild className="h-auto py-4">
          <Link to="/dashboard" className="flex flex-col items-center gap-1.5">
            <LayoutDashboard className="h-5 w-5" />
            <span>Back to dashboard</span>
          </Link>
        </Button>
      </div>

      <div className="text-center pt-2">
        <Button asChild variant="link"><Link to="/feedback">Tell us how your experience was →</Link></Button>
      </div>
    </StepShell>
  );
};

export default StepConfirmation;
