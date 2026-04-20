import { useState } from "react";
import { StepShell } from "./StepShell";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApplication } from "@/context/ApplicationContext";
import { EDU_BOARDS, ENGLISH_TESTS } from "@/lib/visa-data";
import { toast } from "sonner";

const StepEducation = () => {
  const { data, update } = useApplication();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.board) e.board = "Please select your education board.";
    if (!data.highestQualification) e.highestQualification = "Required.";
    if (!data.institution.trim()) e.institution = "Required.";
    if (!data.englishTest) e.englishTest = "Please select your English test.";
    setErrors(e);
    if (Object.keys(e).length) toast.error("Please complete your education details.");
    return Object.keys(e).length === 0;
  };

  return (
    <StepShell step={3} title="Education details" description="Tell us about your most recent qualification and English language proficiency." onNext={validate}>
      <div className="card-trust space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <FormField id="board" label="Education board / system" required tooltip="Indian boards or international equivalents." error={errors.board}>
            <Select value={data.board} onValueChange={(v) => update({ board: v })}>
              <SelectTrigger id="board"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>{EDU_BOARDS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
            </Select>
          </FormField>
          <FormField id="qual" label="Highest qualification" required example="B.Tech, B.Com, 12th Standard" error={errors.highestQualification}>
            <Input id="qual" value={data.highestQualification} onChange={(e) => update({ highestQualification: e.target.value })} />
          </FormField>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <FormField id="inst" label="Institution / College" required example="Anna University, Chennai" error={errors.institution}>
            <Input id="inst" value={data.institution} onChange={(e) => update({ institution: e.target.value })} />
          </FormField>
          <FormField id="gradyr" label="Year of completion" example="2023">
            <Input id="gradyr" inputMode="numeric" value={data.graduationYear} onChange={(e) => update({ graduationYear: e.target.value.replace(/\D/g, "").slice(0,4) })} />
          </FormField>
        </div>
        <h3 className="text-lg font-semibold pt-2">English proficiency</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <FormField id="etest" label="Test taken" required tooltip="UKVI-approved test (SELT) or MOI exemption via your CAS." error={errors.englishTest}>
            <Select value={data.englishTest} onValueChange={(v) => update({ englishTest: v })}>
              <SelectTrigger id="etest"><SelectValue placeholder="Select test" /></SelectTrigger>
              <SelectContent>{ENGLISH_TESTS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </FormField>
          <FormField id="escore" label="Overall score" example="IELTS 6.5">
            <Input id="escore" value={data.englishScore} onChange={(e) => update({ englishScore: e.target.value })} />
          </FormField>
        </div>
        <div className="highlight-info text-sm">📌 Most UK universities require IELTS overall 6.0–6.5 with no band below 5.5/6.0. Check your CAS for the exact requirement.</div>
      </div>
    </StepShell>
  );
};

export default StepEducation;
