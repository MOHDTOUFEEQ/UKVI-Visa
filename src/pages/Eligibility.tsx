import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

type Q = { id: string; question: string; options: { label: string; ok: boolean; note?: string }[] };

const QUESTIONS: Q[] = [
  {
    id: "course",
    question: "What level of course will you study in the UK?",
    options: [
      { label: "Undergraduate (Bachelor's)", ok: true },
      { label: "Postgraduate (Master's / PhD)", ok: true },
      { label: "Pre-sessional English / Foundation", ok: true, note: "Eligible — may need slightly higher funds." },
      { label: "Short course (under 6 months)", ok: false, note: "You may need a Standard Visitor visa instead." },
    ],
  },
  {
    id: "location",
    question: "Where will your course be based?",
    options: [
      { label: "London", ok: true, note: "London = £1,334/month maintenance funds." },
      { label: "Outside London", ok: true, note: "Outside London = £1,023/month maintenance funds." },
    ],
  },
  {
    id: "english",
    question: "Do you have proof of English proficiency?",
    options: [
      { label: "IELTS UKVI / PTE UKVI / TOEFL", ok: true },
      { label: "Exempt via CAS (medium of instruction)", ok: true },
      { label: "Not yet — still booking test", ok: false, note: "You'll need to complete this before applying." },
    ],
  },
  {
    id: "funds",
    question: "Have your maintenance funds been in your account for at least 28 days?",
    options: [
      { label: "Yes, more than 28 days", ok: true },
      { label: "Funds added in last 28 days", ok: false, note: "Wait until the 28-day window completes." },
      { label: "I'm not sure yet", ok: false, note: "Plan funding early — this is the most common refusal reason." },
    ],
  },
];

const Eligibility = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);
  const allOk = QUESTIONS.every((q) => q.options[answers[q.id]]?.ok);

  return (
    <PageLayout>
      <div className="container-page py-8 space-y-6">
        <Breadcrumbs items={[{ label: "Eligibility checker" }]} />
        <div>
          <h1 className="font-display">Quick eligibility check</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">A 4-question check to confirm you can apply for a UK Student Visa. Your answers stay on this device.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {QUESTIONS.map((q, qi) => (
              <Card key={q.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-2">
                    <span className="step-dot step-dot-current">{qi + 1}</span>
                    <span className="pt-1">{q.question}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const selected = answers[q.id] === oi;
                    return (
                      <button
                        key={oi}
                        onClick={() => setAnswers({ ...answers, [q.id]: oi })}
                        className={`w-full text-left rounded-md border p-3 transition-all ${
                          selected ? "border-primary bg-secondary/10 ring-2 ring-primary/20" : "hover:bg-muted"
                        }`}
                        aria-pressed={selected}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-medium">{opt.label}</span>
                          {selected && <CheckCircle2 className="h-5 w-5 text-primary" />}
                        </div>
                        {selected && opt.note && <p className="text-sm text-muted-foreground mt-1">{opt.note}</p>}
                      </button>
                    );
                  })}
                </CardContent>
              </Card>
            ))}

            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setSubmitted(true)} disabled={!allAnswered} size="lg">
                See my result
              </Button>
              <Button variant="ghost" onClick={() => { setAnswers({}); setSubmitted(false); }}>
                <RotateCcw className="h-4 w-4 mr-1.5" /> Reset
              </Button>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader><CardTitle className="text-lg">Your result</CardTitle></CardHeader>
              <CardContent>
                {!submitted && <p className="text-sm text-muted-foreground">Answer all 4 questions to see if you're eligible.</p>}
                {submitted && allOk && (
                  <div className="space-y-3 animate-scale-in">
                    <div className="badge-success w-fit"><CheckCircle2 className="h-4 w-4" /> Eligible to apply</div>
                    <p className="text-sm">Great news — you appear eligible to apply for a UK Student Visa. Start your application now and we'll guide you step by step.</p>
                    <Button asChild className="w-full"><Link to="/apply">Start application <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
                  </div>
                )}
                {submitted && !allOk && (
                  <div className="space-y-3 animate-scale-in">
                    <div className="badge-warning w-fit"><AlertCircle className="h-4 w-4" /> Check requirements</div>
                    <p className="text-sm">Some answers suggest you may not be ready yet. Don't worry — review the notes above and the items below before applying.</p>
                    <ul className="text-sm space-y-1.5 list-disc pl-5 text-muted-foreground">
                      <li>Wait until your funds have been held 28 days.</li>
                      <li>Book and complete an English test if needed.</li>
                      <li>Confirm course type with your university.</li>
                    </ul>
                    <Button asChild variant="outline" className="w-full"><Link to="/help">Visit help centre</Link></Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </PageLayout>
  );
};

export default Eligibility;
