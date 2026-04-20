import { StepShell } from "./StepShell";
import { useApplication } from "@/context/ApplicationContext";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MapPin, Upload } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const TB_CENTRES = [
  "IOM Delhi — Defence Colony",
  "IOM Mumbai — Bandra West",
  "IOM Chennai — T. Nagar",
  "IOM Kolkata — Park Street",
  "IOM Bengaluru — MG Road",
  "IOM Hyderabad — Banjara Hills",
  "IOM Cochin — MG Road",
  "IOM Jalandhar — GT Road",
];

const StepTB = () => {
  const { data, update } = useApplication();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.tbCenter) e.tbCenter = "Please select your test centre.";
    if (!data.tbDate) e.tbDate = "Please enter the test date.";
    if (!data.tbUploaded) e.tbUploaded = "Please upload your TB certificate.";
    setErrors(e);
    if (Object.keys(e).length) { toast.error("Please complete TB test details."); return false; }
    return true;
  };

  return (
    <StepShell step={7} title="TB test" description="Tuberculosis (TB) testing is mandatory for Indian applicants applying for stays over 6 months." onNext={validate}>
      <div className="highlight-info text-sm">
        Only tests from <strong>UKVI-approved clinics</strong> (operated by IOM in India) are accepted. Certificate is valid for 6 months.
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><MapPin className="h-4 w-4 text-secondary" /> Approved test centres in India</CardTitle></CardHeader>
        <CardContent>
          <ul className="grid sm:grid-cols-2 gap-1.5 text-sm">
            {TB_CENTRES.map((c) => <li key={c} className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-accent" /> {c}</li>)}
          </ul>
          <p className="text-xs text-muted-foreground mt-3">More centres available — full list on the official UKVI website.</p>
        </CardContent>
      </Card>

      <div className="card-trust space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <FormField id="tbcenter" label="Test centre attended" required error={errors.tbCenter}>
            <Select value={data.tbCenter} onValueChange={(v) => update({ tbCenter: v })}>
              <SelectTrigger id="tbcenter"><SelectValue placeholder="Select centre" /></SelectTrigger>
              <SelectContent>{TB_CENTRES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </FormField>
          <FormField id="tbdate" label="Date of test" required helper="Must be within last 6 months." error={errors.tbDate}>
            <Input id="tbdate" type="date" value={data.tbDate} onChange={(e) => update({ tbDate: e.target.value })} />
          </FormField>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">TB certificate</div>
          {data.tbUploaded ? (
            <div className="rounded-md border border-accent/40 bg-accent/10 p-4 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-accent animate-tick" />
              <div className="flex-1 text-sm"><strong>Certificate uploaded.</strong> tb-certificate.pdf</div>
              <Button size="sm" variant="ghost" onClick={() => update({ tbUploaded: false })}>Remove</Button>
            </div>
          ) : (
            <button
              onClick={() => {
                toast.loading("Uploading certificate…", { id: "tb" });
                setTimeout(() => { update({ tbUploaded: true }); toast.success("TB certificate uploaded", { id: "tb" }); }, 800);
              }}
              className="w-full rounded-md border-2 border-dashed p-8 text-center hover:bg-muted transition"
            >
              <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <div className="text-sm font-medium">Click to upload TB certificate</div>
              <div className="text-xs text-muted-foreground mt-1">PDF · max 6MB</div>
            </button>
          )}
          {errors.tbUploaded && <p className="field-error">{errors.tbUploaded}</p>}
        </div>
      </div>
    </StepShell>
  );
};

export default StepTB;
