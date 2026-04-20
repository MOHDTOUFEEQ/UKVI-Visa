import { useState } from "react";
import { StepShell } from "./StepShell";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/ui/input";
import { useApplication } from "@/context/ApplicationContext";
import { validators } from "@/lib/visa-data";
import { toast } from "sonner";

const StepPassport = () => {
  const { data, update } = useApplication();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    const p = validators.passport(data.passportNumber); if (p !== true) e.passportNumber = p as string;
    if (!data.passportIssue) e.passportIssue = "Please enter the issue date.";
    if (!data.passportExpiry) e.passportExpiry = "Please enter the expiry date.";
    if (data.passportExpiry && new Date(data.passportExpiry) < new Date()) e.passportExpiry = "Passport must not be expired.";
    if (!data.passportPlace.trim()) e.passportPlace = "Please enter place of issue.";
    setErrors(e);
    if (Object.keys(e).length) toast.error("Please correct the passport details.");
    return Object.keys(e).length === 0;
  };

  return (
    <StepShell step={2} title="Passport details" description="Indian passports usually have 8 characters: 1 letter followed by 7 digits." onNext={validate}>
      <div className="card-trust space-y-5">
        <div className="highlight-info text-sm">💡 Tip: have your passport open in front of you. The number is on the personal info page.</div>

        <FormField id="pnum" label="Passport number" required example="A1234567" tooltip="Indian passport: 1 letter followed by 7 digits. Letters are case-insensitive." error={errors.passportNumber}>
          <Input
            id="pnum"
            value={data.passportNumber}
            onChange={(e) => update({ passportNumber: e.target.value.toUpperCase().slice(0, 8) })}
            maxLength={8}
            className="font-mono tracking-wider"
            placeholder="A1234567"
          />
        </FormField>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField id="pissue" label="Issue date" required error={errors.passportIssue}>
            <Input id="pissue" type="date" value={data.passportIssue} onChange={(e) => update({ passportIssue: e.target.value })} />
          </FormField>
          <FormField id="pexp" label="Expiry date" required helper="Must be valid for the duration of your stay." error={errors.passportExpiry}>
            <Input id="pexp" type="date" value={data.passportExpiry} onChange={(e) => update({ passportExpiry: e.target.value })} />
          </FormField>
        </div>

        <FormField id="pplace" label="Place of issue" required example="Bengaluru" error={errors.passportPlace}>
          <Input id="pplace" value={data.passportPlace} onChange={(e) => update({ passportPlace: e.target.value })} />
        </FormField>

        <div className="highlight-warning text-sm">
          ⚠️ <strong>Common mistake:</strong> Make sure your name on passport exactly matches Step 1. Even small differences can delay your application.
        </div>
      </div>
    </StepShell>
  );
};

export default StepPassport;
