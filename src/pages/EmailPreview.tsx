import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Crown } from "lucide-react";
import { useApplication } from "@/context/ApplicationContext";

const EmailPreview = () => {
  const { data } = useApplication();
  const ref = data.referenceNumber || "UKVI-2026-123456";
  const name = data.fullName || "Applicant";

  return (
    <PageLayout>
      <div className="container-page py-8 max-w-3xl space-y-6">
        <Breadcrumbs items={[{ label: "Confirmation", href: "/apply/confirmation" }, { label: "Email preview" }]} />
        <h1 className="font-display">Email confirmation preview</h1>
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted border-b">
            <div className="text-xs text-muted-foreground space-y-0.5">
              <div><strong className="text-foreground">From:</strong> noreply@ukvi-prototype.gov.uk</div>
              <div><strong className="text-foreground">To:</strong> {data.email || "you@example.com"}</div>
              <div><strong className="text-foreground">Subject:</strong> UK Student Visa application — confirmation ({ref})</div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Crown className="h-5 w-5 text-saffron" />
              <span className="font-display font-semibold">UK Visas & Immigration</span>
            </div>
            <p>Dear {name},</p>
            <p>Thank you for submitting your UK Student Visa application. We have received your application and supporting documents.</p>
            <div className="rounded-md bg-secondary/10 border-l-4 border-secondary p-4 my-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Your reference number</div>
              <div className="font-display text-2xl text-primary">{ref}</div>
            </div>
            <p><strong>Next steps:</strong></p>
            <ol className="list-decimal pl-5 space-y-1.5 text-sm">
              <li>Book your biometrics appointment at a VFS Global centre.</li>
              <li>Bring your passport, this confirmation and the supporting documents you uploaded.</li>
              <li>Standard processing takes around 3 weeks after biometrics.</li>
            </ol>
            <p className="text-sm text-muted-foreground border-t pt-4 mt-4">This is a prototype email for an HCI coursework — it is not a real government communication.</p>
          </CardContent>
        </Card>
        <Button asChild variant="outline"><Link to="/apply/confirmation"><Mail className="h-4 w-4 mr-1.5" /> Back to confirmation</Link></Button>
      </div>
    </PageLayout>
  );
};

export default EmailPreview;
