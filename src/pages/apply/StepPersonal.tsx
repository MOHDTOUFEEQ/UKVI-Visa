import { useState } from "react";
import { StepShell } from "./StepShell";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useApplication } from "@/context/ApplicationContext";
import { INDIAN_STATES, validators } from "@/lib/visa-data";
import { toast } from "sonner";

const StepPersonal = () => {
  const { data, update } = useApplication();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.singleNameOnly && !data.fullName.trim()) e.fullName = "Please enter your given name(s).";
    if (!data.singleNameOnly && !data.surname.trim()) e.surname = "Please enter your surname.";
    if (data.singleNameOnly && !data.fullName.trim()) e.fullName = "Please enter your single name as in passport.";
    if (!data.dob) e.dob = "Date of birth is required.";
    const em = validators.email(data.email); if (em !== true) e.email = em as string;
    const ph = validators.phoneIndia(data.phone); if (ph !== true) e.phone = ph as string;
    if (!data.addressLine1.trim()) e.addressLine1 = "Please enter your address.";
    const pc = validators.pincode(data.pincode); if (pc !== true) e.pincode = pc as string;
    if (!data.state) e.state = "Please choose your state.";
    setErrors(e);
    if (Object.keys(e).length) toast.error("Please fix the highlighted fields.");
    return Object.keys(e).length === 0;
  };

  return (
    <StepShell step={1} title="Personal details" description="Use the exact details as they appear on your passport." onNext={validate}>
      <div className="card-trust space-y-5">
        <div className="flex items-start gap-2 highlight-info text-sm">
          <span>Your name must match your passport exactly. We support single-name applicants and Indian naming conventions.</span>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="singleName" checked={data.singleNameOnly} onCheckedChange={(v) => update({ singleNameOnly: !!v })} />
          <Label htmlFor="singleName" className="text-sm">I have a single name only (no surname on passport)</Label>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField id="fullName" label={data.singleNameOnly ? "Single name (as in passport)" : "Given name(s)"} required example="Rahul Kumar" tooltip="Enter your first and middle names exactly as printed on your passport." error={errors.fullName}>
            <Input id="fullName" value={data.fullName} onChange={(e) => update({ fullName: e.target.value })} maxLength={60} />
          </FormField>
          {!data.singleNameOnly && (
            <FormField id="surname" label="Surname / Family name" required example="Sharma" tooltip="Your surname as in passport." error={errors.surname}>
              <Input id="surname" value={data.surname} onChange={(e) => update({ surname: e.target.value })} maxLength={40} />
            </FormField>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="hasMiddle" checked={data.hasMiddleName} onCheckedChange={(v) => update({ hasMiddleName: !!v, middleName: v ? data.middleName : "" })} />
          <Label htmlFor="hasMiddle" className="text-sm">I have a middle name (optional)</Label>
        </div>
        {data.hasMiddleName && (
          <FormField id="middle" label="Middle name" example="Kumar">
            <Input id="middle" value={data.middleName} onChange={(e) => update({ middleName: e.target.value })} maxLength={40} />
          </FormField>
        )}

        <div className="grid md:grid-cols-3 gap-4">
          <FormField id="dob" label="Date of birth" required error={errors.dob}>
            <Input id="dob" type="date" value={data.dob} onChange={(e) => update({ dob: e.target.value })} />
          </FormField>
          <FormField id="gender" label="Gender">
            <Select value={data.gender} onValueChange={(v) => update({ gender: v })}>
              <SelectTrigger id="gender"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other / Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          <FormField id="nat" label="Nationality">
            <Input id="nat" value={data.nationality} onChange={(e) => update({ nationality: e.target.value })} />
          </FormField>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField id="email" label="Email address" required example="rahul.sharma@gmail.com" tooltip="We'll send your confirmation here." error={errors.email}>
            <Input id="email" type="email" inputMode="email" value={data.email} onChange={(e) => update({ email: e.target.value })} />
          </FormField>
          <FormField id="phone" label="Indian mobile number" required example="9876543210" helper="10 digits, starting with 6, 7, 8 or 9. Don't include +91." error={errors.phone}>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-sm">+91</span>
              <Input id="phone" inputMode="numeric" value={data.phone} onChange={(e) => update({ phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} className="rounded-l-none" />
            </div>
          </FormField>
        </div>

        <h3 className="text-lg font-semibold pt-2">Address in India</h3>
        <FormField id="addr1" label="Address line 1" required example="Flat 12B, Lotus Apartments, MG Road" error={errors.addressLine1}>
          <Input id="addr1" value={data.addressLine1} onChange={(e) => update({ addressLine1: e.target.value })} />
        </FormField>
        <FormField id="addr2" label="Address line 2 (optional)">
          <Input id="addr2" value={data.addressLine2} onChange={(e) => update({ addressLine2: e.target.value })} />
        </FormField>
        <div className="grid md:grid-cols-3 gap-4">
          <FormField id="city" label="City" example="Bengaluru">
            <Input id="city" value={data.city} onChange={(e) => update({ city: e.target.value })} />
          </FormField>
          <FormField id="state" label="State" required error={errors.state}>
            <Select value={data.state} onValueChange={(v) => update({ state: v })}>
              <SelectTrigger id="state"><SelectValue placeholder="Select state" /></SelectTrigger>
              <SelectContent className="max-h-72">
                {INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <FormField id="pin" label="PIN code" required example="560001" helper="6-digit Indian PIN code." error={errors.pincode}>
            <Input id="pin" inputMode="numeric" value={data.pincode} onChange={(e) => update({ pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })} />
          </FormField>
        </div>
      </div>
    </StepShell>
  );
};

export default StepPersonal;
