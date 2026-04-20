import { StepShell } from "./StepShell";
import { useApplication } from "@/context/ApplicationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Upload, FileText, AlertTriangle, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const DOCS = [
  { key: "passport", title: "Passport", why: "Identity verification — bio page must be clear and readable.", format: "PDF, JPG, PNG · max 6MB", mistakes: "Blurry photo, missing edges, glare on plastic page." },
  { key: "cas", title: "CAS letter", why: "Proves university acceptance.", format: "PDF · max 6MB", mistakes: "Submitting offer letter instead of CAS." },
  { key: "transcripts", title: "Academic transcripts", why: "Confirms qualifications stated in your CAS.", format: "PDF · all pages, max 6MB", mistakes: "Missing translation; only certificate without marksheet." },
  { key: "bank", title: "Bank statement", why: "Shows maintenance funds held 28+ days.", format: "PDF on official bank letterhead", mistakes: "Screenshots, missing bank stamp/seal, balance under threshold." },
  { key: "tb", title: "TB test certificate", why: "Mandatory for Indian applicants.", format: "PDF from UKVI-approved clinic", mistakes: "Test from non-approved clinic; expired (over 6 months old)." },
  { key: "english", title: "English test result", why: "Proves language proficiency.", format: "PDF · official test report form", mistakes: "Wrong test type — must be UKVI-approved (e.g. IELTS UKVI)." },
  { key: "photo", title: "Passport photograph", why: "Recent photo for visa records.", format: "JPG · 35×45mm, plain background", mistakes: "Wearing glasses, smiling, low resolution." },
];

const StepDocuments = () => {
  const { data, setDocStatus } = useApplication();
  const [previewKey, setPreviewKey] = useState<string | null>(null);
  const uploaded = Object.values(data.docs).filter((s) => s === "uploaded").length;

  const simulateUpload = (key: string) => {
    toast.loading("Uploading…", { id: key });
    setTimeout(() => {
      setDocStatus(key, "uploaded");
      toast.success(`${DOCS.find((d) => d.key === key)?.title} uploaded`, { id: key });
    }, 700);
  };

  return (
    <StepShell step={6} title="Document upload" description={`Upload your supporting documents. ${uploaded} of ${DOCS.length} done — you can come back later.`}>
      <div className="highlight-info text-sm">
        🔒 Your documents are encrypted in transit. Common file types: PDF, JPG, PNG (max 6MB each).
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {DOCS.map((doc) => {
          const status = data.docs[doc.key];
          const done = status === "uploaded";
          return (
            <Card key={doc.key} className={done ? "border-accent/40" : ""}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center gap-2"><FileText className="h-4 w-4 text-secondary" /> {doc.title}</span>
                  {done ? (
                    <span className="badge-success animate-tick"><CheckCircle2 className="h-3.5 w-3.5" /> Uploaded</span>
                  ) : (
                    <span className="badge-pending">Pending</span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p><strong>Why:</strong> {doc.why}</p>
                <p className="text-muted-foreground"><strong>Format:</strong> {doc.format}</p>
                <div className="rounded bg-warning/10 border-l-4 border-warning text-xs p-2 flex gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning-foreground shrink-0" />
                  <span><strong>Common mistake:</strong> {doc.mistakes}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button size="sm" variant={done ? "outline" : "default"} onClick={() => simulateUpload(doc.key)}>
                    <Upload className="h-3.5 w-3.5 mr-1.5" /> {done ? "Replace" : "Upload"}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setPreviewKey(doc.key)}>
                    <Eye className="h-3.5 w-3.5 mr-1.5" /> See sample
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!previewKey} onOpenChange={(o) => !o && setPreviewKey(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{DOCS.find((d) => d.key === previewKey)?.title} — sample</DialogTitle>
          </DialogHeader>
          <div className="aspect-[4/5] bg-muted rounded border flex items-center justify-center text-muted-foreground text-sm p-6 text-center">
            <div>
              <FileText className="h-12 w-12 mx-auto mb-2 opacity-40" />
              Sample document preview placeholder.<br />Your uploaded file will be shown here.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </StepShell>
  );
};

export default StepDocuments;
