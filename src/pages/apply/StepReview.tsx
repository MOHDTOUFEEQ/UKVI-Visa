import { Link } from "react-router-dom";
import { StepShell } from "./StepShell";
import { useApplication } from "@/context/ApplicationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, CheckCircle2, AlertCircle } from "lucide-react";

const Section = ({ title, href, items }: { title: string; href: string; items: { label: string; value: string }[] }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-base">{title}</CardTitle>
      <Link to={href} className="text-sm text-primary hover:underline inline-flex items-center gap-1"><Edit2 className="h-3.5 w-3.5" /> Edit</Link>
    </CardHeader>
    <CardContent>
      <dl className="divide-y text-sm">
        {items.map((it) => (
          <div key={it.label} className="grid grid-cols-3 gap-2 py-2">
            <dt className="text-muted-foreground">{it.label}</dt>
            <dd className="col-span-2 font-medium">{it.value || <span className="text-warning-foreground">— missing</span>}</dd>
          </div>
        ))}
      </dl>
    </CardContent>
  </Card>
);

const StepReview = () => {
  const { data } = useApplication();
  const docCount = Object.values(data.docs).filter((s) => s === "uploaded").length;

  return (
    <StepShell step={9} title="Review your application" description="Check every section before payment. You can edit anything from here.">
      <div className="highlight-info text-sm">📋 Take a moment to verify all details. After payment, changes will require a new application.</div>

      <Section title="Personal" href="/apply/personal" items={[
        { label: "Name", value: `${data.fullName}${data.middleName ? " " + data.middleName : ""} ${data.surname}`.trim() },
        { label: "Date of birth", value: data.dob },
        { label: "Email", value: data.email },
        { label: "Phone", value: data.phone ? `+91 ${data.phone}` : "" },
        { label: "Address", value: [data.addressLine1, data.city, data.state, data.pincode].filter(Boolean).join(", ") },
      ]} />

      <Section title="Passport" href="/apply/passport" items={[
        { label: "Number", value: data.passportNumber },
        { label: "Issued", value: data.passportIssue },
        { label: "Expires", value: data.passportExpiry },
      ]} />

      <Section title="Education" href="/apply/education" items={[
        { label: "Board", value: data.board },
        { label: "Qualification", value: data.highestQualification },
        { label: "Institution", value: data.institution },
        { label: "English test", value: `${data.englishTest}${data.englishScore ? " — " + data.englishScore : ""}` },
      ]} />

      <Section title="Course (CAS)" href="/apply/cas" items={[
        { label: "CAS number", value: data.casNumber },
        { label: "University", value: data.university },
        { label: "Course", value: data.course },
        { label: "Start date", value: data.courseStart },
        { label: "Duration", value: `${data.courseDuration} months` },
        { label: "Location", value: data.location === "london" ? "London" : "Outside London" },
      ]} />

      <Section title="Financial evidence" href="/apply/finance" items={[
        { label: "Bank", value: data.bankName },
        { label: "Balance", value: data.bankBalance ? `£${parseInt(data.bankBalance).toLocaleString()}` : "" },
        { label: "Funds held", value: data.fundsHeldDays ? `${data.fundsHeldDays} days` : "" },
      ]} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base">Documents</CardTitle>
          <Link to="/apply/documents" className="text-sm text-primary hover:underline inline-flex items-center gap-1"><Edit2 className="h-3.5 w-3.5" /> Edit</Link>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            {docCount === 7 ? (
              <span className="badge-success"><CheckCircle2 className="h-3.5 w-3.5" /> All 7 documents uploaded</span>
            ) : (
              <span className="badge-warning"><AlertCircle className="h-3.5 w-3.5" /> {docCount} of 7 documents uploaded</span>
            )}
          </div>
        </CardContent>
      </Card>
    </StepShell>
  );
};

export default StepReview;
