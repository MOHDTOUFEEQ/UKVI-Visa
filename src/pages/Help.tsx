import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Wallet, Clock, AlertTriangle, ListChecks } from "lucide-react";

const FAQS = [
  {
    icon: FileText,
    category: "Documents",
    items: [
      { q: "What documents do I need?", a: "Passport, CAS letter, academic transcripts, bank statement (28 days), TB certificate, English test result, and a passport-size photograph. Some courses also need ATAS." },
      { q: "Do my documents need to be in English?", a: "Yes. Documents in another language must be officially translated, certified by the translator with their contact details, and submitted alongside the original." },
      { q: "What format should my uploads be?", a: "PDF, JPG or PNG. Maximum 6MB per file. Make sure the documents are clear, full-page, and not blurred." },
    ],
  },
  {
    icon: Wallet,
    category: "Financial requirements",
    items: [
      { q: "How much money do I need to show?", a: "£1,334/month for London or £1,023/month for outside London (max 9 months) — plus any unpaid tuition for the first year. Use our calculator on the Finance step." },
      { q: "Whose bank account can I use?", a: "Yours, or a parent/legal guardian's. If using a parent's, you must include a consent letter and proof of relationship (e.g. birth certificate)." },
      { q: "Why is the 28-day rule important?", a: "The required amount must stay in the account continuously for 28 days. If it dips below even once, you must restart the 28-day clock." },
    ],
  },
  {
    icon: Clock,
    category: "Processing time",
    items: [
      { q: "How long does it take?", a: "Standard processing from India is around 3 weeks after biometrics. Priority service processes within 5 working days for an extra fee (~£500)." },
      { q: "When can I apply?", a: "Up to 6 months before your course start date. Apply early to allow time for biometrics and processing." },
    ],
  },
  {
    icon: AlertTriangle,
    category: "Common mistakes",
    items: [
      { q: "Top reasons for refusal", a: "Insufficient funds, funds not held for 28 days, missing TB certificate, untranslated documents, mismatched names between passport and CAS, expired English test." },
      { q: "What if my CAS has an error?", a: "Contact your university immediately — only they can correct or reissue your CAS. Don't apply with incorrect details." },
    ],
  },
  {
    icon: ListChecks,
    category: "Application steps",
    items: [
      { q: "Can I save and resume?", a: "Yes. Your progress is saved automatically on this device. Return any time within the next 30 days to continue." },
      { q: "Can I edit details after submitting a step?", a: "Yes — until you complete the final payment, every step can be edited from the Review page." },
    ],
  },
];

const Help = () => (
  <PageLayout>
    <div className="container-page py-8 space-y-6">
      <Breadcrumbs items={[{ label: "Help centre" }]} />
      <div>
        <h1 className="font-display">Help centre</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Answers to the most common questions. Can't find what you need? Use the assistant in the bottom-right.</p>
      </div>

      <div className="space-y-4">
        {FAQS.map(({ icon: I, category, items }) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <I className="h-5 w-5 text-secondary" /> {category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {items.map((item, i) => (
                  <AccordionItem key={i} value={`${category}-${i}`}>
                    <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </PageLayout>
);

export default Help;
