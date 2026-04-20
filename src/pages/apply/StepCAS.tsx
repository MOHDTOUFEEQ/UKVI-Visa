import { useState } from "react";
import { StepShell } from "./StepShell";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApplication } from "@/context/ApplicationContext";
import { validators } from "@/lib/visa-data";
import { toast } from "sonner";
import { Term } from "@/context/TerminologyContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const StepCAS = () => {
  const { data, update } = useApplication();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    const c = validators.cas(data.casNumber); if (c !== true) e.casNumber = c as string;
    if (!data.university.trim()) e.university = "Required.";
    if (!data.course.trim()) e.course = "Required.";
    if (!data.courseStart) e.courseStart = "Required.";
    setErrors(e);
    if (Object.keys(e).length) toast.error("Please complete your CAS details.");
    return Object.keys(e).length === 0;
  };

  return (
    <StepShell step={4} title="CAS information" description="Your Confirmation of Acceptance for Studies (CAS) — issued by your UK university." onNext={validate}>
      <Card className="border-l-4 border-l-secondary">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4" /> What is a <Term simple="university acceptance reference" legal="CAS" />?</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>The <strong>CAS (Confirmation of Acceptance for Studies)</strong> is a unique reference number your UK university gives you once they have offered you a place and you have accepted.</p>
          <p>It is valid for <strong>6 months</strong> from the date issued. You can only use it for one visa application.</p>
          <div className="rounded-md border bg-muted p-3 text-xs font-mono">
            Sample CAS:  <span className="text-primary font-bold">E4B12345678ABCDE</span><br />
            Sponsor:     <span className="text-primary">University of Manchester (LICENCE-12345)</span><br />
            Course:      <span className="text-primary">MSc Data Science</span> (12 months)
          </div>
        </CardContent>
      </Card>

      <div className="card-trust space-y-5">
        <FormField id="cas" label="CAS number" required example="E4B12345678ABCDE" tooltip="Found on your CAS letter from the university. 14–18 letters and digits." error={errors.casNumber}>
          <Input id="cas" value={data.casNumber} onChange={(e) => update({ casNumber: e.target.value.toUpperCase() })} maxLength={20} className="font-mono tracking-wide" />
        </FormField>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField id="uni" label="University name" required example="University of Manchester" error={errors.university}>
            <Input id="uni" value={data.university} onChange={(e) => update({ university: e.target.value })} />
          </FormField>
          <FormField id="course" label="Course title" required example="MSc Data Science" error={errors.course}>
            <Input id="course" value={data.course} onChange={(e) => update({ course: e.target.value })} />
          </FormField>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <FormField id="cstart" label="Course start date" required error={errors.courseStart}>
            <Input id="cstart" type="date" value={data.courseStart} onChange={(e) => update({ courseStart: e.target.value })} />
          </FormField>
          <FormField id="cdur" label="Course duration (months)" tooltip="Total length of the course in months." example="12">
            <Select value={data.courseDuration} onValueChange={(v) => update({ courseDuration: v })}>
              <SelectTrigger id="cdur"><SelectValue /></SelectTrigger>
              <SelectContent>
                {[6, 9, 12, 15, 18, 24, 36, 48].map((n) => <SelectItem key={n} value={String(n)}>{n} months</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <FormField id="loc" label="Course location" tooltip="Affects maintenance fund requirement." required>
            <Select value={data.location} onValueChange={(v) => update({ location: v as "london" | "outside-london" })}>
              <SelectTrigger id="loc"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="london">Inside London</SelectItem>
                <SelectItem value="outside-london">Outside London</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField id="tfee" label="Total tuition fee (£)" example="22000">
            <Input id="tfee" inputMode="numeric" value={data.tuitionFee} onChange={(e) => update({ tuitionFee: e.target.value.replace(/\D/g, "") })} />
          </FormField>
          <FormField id="tpaid" label="Tuition already paid (£)" helper="Deposits paid to your university so far.">
            <Input id="tpaid" inputMode="numeric" value={data.tuitionPaid} onChange={(e) => update({ tuitionPaid: e.target.value.replace(/\D/g, "") })} />
          </FormField>
        </div>
      </div>
    </StepShell>
  );
};

export default StepCAS;
