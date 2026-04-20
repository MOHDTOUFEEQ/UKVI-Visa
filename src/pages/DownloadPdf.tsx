import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer, Crown } from "lucide-react";
import { useApplication } from "@/context/ApplicationContext";
import { calcMaintenance, calcIHS, VISA_FEE } from "@/lib/visa-data";

const Row = ({ label, value }: { label: string; value: string }) => (
  <tr className="border-b last:border-0"><td className="py-2 pr-4 text-sm text-muted-foreground w-1/3">{label}</td><td className="py-2 text-sm font-medium">{value || "—"}</td></tr>
);

const DownloadPdf = () => {
  const { data } = useApplication();
  const ref = data.referenceNumber || "UKVI-2026-123456";
  const months = parseInt(data.courseDuration || "12", 10);
  const total = calcMaintenance(data.location, months) + calcIHS(months) + VISA_FEE;

  return (
    <PageLayout>
      <div className="container-page py-8 max-w-3xl space-y-6 print:py-0">
        <div className="print:hidden">
          <Breadcrumbs items={[{ label: "Confirmation", href: "/apply/confirmation" }, { label: "Download PDF" }]} />
          <h1 className="font-display mt-4">Download your application summary</h1>
          <p className="text-muted-foreground mt-1">Use your browser's print dialog to save as PDF.</p>
          <div className="flex gap-2 mt-4">
            <Button onClick={() => window.print()}><Printer className="h-4 w-4 mr-1.5" /> Print / save PDF</Button>
            <Button asChild variant="outline"><Link to="/apply/confirmation">Back</Link></Button>
          </div>
        </div>

        <Card className="border-t-4 border-saffron print:shadow-none print:border-saffron">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <Crown className="h-5 w-5 text-saffron" />
                <span className="font-display font-semibold">UK Visas & Immigration</span>
              </div>
              <span className="text-xs text-muted-foreground">Application Summary</span>
            </div>
            <CardTitle className="font-display text-2xl mt-2">Reference: {ref}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h3 className="text-base font-semibold mb-2">Personal details</h3>
              <table className="w-full"><tbody>
                <Row label="Full name" value={`${data.fullName}${data.middleName ? " " + data.middleName : ""} ${data.surname}`.trim()} />
                <Row label="Date of birth" value={data.dob} />
                <Row label="Nationality" value={data.nationality} />
                <Row label="Email" value={data.email} />
                <Row label="Phone" value={data.phone ? `+91 ${data.phone}` : ""} />
                <Row label="Address" value={[data.addressLine1, data.city, data.state, data.pincode].filter(Boolean).join(", ")} />
              </tbody></table>
            </section>
            <section>
              <h3 className="text-base font-semibold mb-2">Passport</h3>
              <table className="w-full"><tbody>
                <Row label="Passport number" value={data.passportNumber} />
                <Row label="Issue date" value={data.passportIssue} />
                <Row label="Expiry date" value={data.passportExpiry} />
              </tbody></table>
            </section>
            <section>
              <h3 className="text-base font-semibold mb-2">Course & university</h3>
              <table className="w-full"><tbody>
                <Row label="University" value={data.university} />
                <Row label="Course" value={data.course} />
                <Row label="Start date" value={data.courseStart} />
                <Row label="Duration" value={`${data.courseDuration} months`} />
                <Row label="CAS number" value={data.casNumber} />
              </tbody></table>
            </section>
            <section>
              <h3 className="text-base font-semibold mb-2">Fees paid</h3>
              <table className="w-full"><tbody>
                <Row label="Visa fee" value={`£${VISA_FEE}`} />
                <Row label="IHS fee" value={`£${calcIHS(months).toLocaleString()}`} />
                <Row label="Total estimate" value={`£${total.toLocaleString()}`} />
              </tbody></table>
            </section>
            <p className="text-xs text-muted-foreground border-t pt-4">Prototype document for educational use only.</p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default DownloadPdf;
