import { useState, useMemo } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

const TERMS = [
  { term: "CAS", full: "Confirmation of Acceptance for Studies", def: "A unique reference number issued by your UK university confirming they've accepted you onto a course. Required before applying for your visa. Valid for 6 months." },
  { term: "BRP", full: "Biometric Residence Permit", def: "Your physical UK ID card collected after arrival. Confirms your right to study and stay. Carry it with you for opening bank accounts, etc." },
  { term: "IHS", full: "Immigration Health Surcharge", def: "An annual fee (£776/year for students) that gives you NHS healthcare access during your stay in the UK." },
  { term: "Maintenance funds", full: "Living cost requirement", def: "Money you must show in your bank account to prove you can support yourself: £1,334/month (London) or £1,023/month (outside London), capped at 9 months." },
  { term: "Visa vignette", full: "Sticker in your passport", def: "A 90-day entry visa sticker placed in your passport. After arriving in the UK, you collect your BRP for the rest of your stay." },
  { term: "Financial evidence", full: "Bank documents proving funds", def: "Official bank statement or letter showing the required maintenance funds have been held for at least 28 consecutive days." },
  { term: "TB certificate", full: "Tuberculosis test certificate", def: "Required for Indian applicants. Obtained from a UKVI-approved clinic (e.g. IOM). Valid for 6 months." },
  { term: "VFS", full: "Visa Facilitation Services", def: "The official partner that runs biometric appointment centres in India for UK visa applications." },
  { term: "ATAS", full: "Academic Technology Approval Scheme", def: "A certificate required for some sensitive postgraduate courses (mostly STEM). Your CAS will tell you if you need one." },
  { term: "Sponsor licence number", full: "University's UKVI ID", def: "A 10-character reference for your university, listed on your CAS — confirms they're a licensed sponsor." },
  { term: "28-day rule", full: "Funds holding period", def: "Maintenance funds must remain in the account at or above the required level for at least 28 consecutive days before you apply." },
  { term: "Priority service", full: "Faster visa processing", def: "Optional paid service (~£500) that processes your visa within 5 working days instead of 3 weeks." },
];

const Glossary = () => {
  const [q, setQ] = useState("");
  const filtered = useMemo(() =>
    TERMS.filter((t) => (t.term + t.full + t.def).toLowerCase().includes(q.toLowerCase())),
    [q]
  );
  return (
    <PageLayout>
      <div className="container-page py-8 space-y-6">
        <Breadcrumbs items={[{ label: "Glossary" }]} />
        <div>
          <h1 className="font-display">Visa terms — explained simply</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">Search for a term you've come across. We've translated UK visa jargon into plain English.</p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search e.g. CAS, BRP, funds…"
            className="pl-9"
            aria-label="Search glossary"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((t) => (
            <Card key={t.term}>
              <CardContent className="pt-6">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h3 className="font-display text-xl text-primary">{t.term}</h3>
                  <span className="text-sm text-muted-foreground">— {t.full}</span>
                </div>
                <p className="text-sm mt-2">{t.def}</p>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && <p className="text-muted-foreground">No matches. Try another keyword.</p>}
        </div>
      </div>
    </PageLayout>
  );
};

export default Glossary;
