import { Link } from "react-router-dom";
import { ArrowRight, Clock, ShieldCheck, FileCheck2, Calculator, Sparkles, Lock, BadgeCheck, GraduationCap } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";

const features = [
  { icon: FileCheck2, title: "Document checklist", desc: "Know exactly what to prepare — passport, CAS, transcripts, bank statement, TB certificate." },
  { icon: Calculator, title: "Cost & funds calculator", desc: "Auto-calculate maintenance funds and IHS fee based on your course location & duration." },
  { icon: Sparkles, title: "Plain-English mode", desc: "Switch between legal and simple English. Tooltips explain every term." },
  { icon: ShieldCheck, title: "Save & resume", desc: "Your progress is saved automatically on this device. Come back any time." },
];

const trustBadges = [
  { icon: Lock, label: "Encrypted transfer" },
  { icon: BadgeCheck, label: "Official-style guidance" },
  { icon: ShieldCheck, label: "Privacy first" },
];

const Index = () => (
  <PageLayout>
    {/* HERO */}
    <section className="bg-gradient-trust text-primary-foreground border-saffron-top">
      <div className="container-page py-12 md:py-20 grid md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-3 space-y-5 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-medium border border-primary-foreground/20">
            <GraduationCap className="h-3.5 w-3.5" /> For Indian students applying to UK universities
          </div>
          <h1 className="font-display">Apply for your UK Student Visa with confidence.</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            A guided, culturally adapted application service. Clear instructions, document examples, automatic fund calculations and a friendly assistant — all in one place.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="bg-saffron text-saffron-foreground hover:bg-saffron/90 font-semibold">
              <Link to="/apply">Start application <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/eligibility">Check eligibility first</Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-4 text-sm opacity-90">
            <div className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> Avg. completion ~ 20 minutes</div>
            {trustBadges.map(({ icon: I, label }) => (
              <div key={label} className="flex items-center gap-1.5"><I className="h-4 w-4" /> {label}</div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="rounded-xl bg-card text-card-foreground p-6 shadow-2xl border border-primary-foreground/10">
            <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Quick preview</div>
            <h3 className="font-display text-xl mt-1 text-foreground">Your visa checklist</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                "Valid Indian passport (8 chars)",
                "CAS letter from UK university",
                "Bank statement — funds held 28 days",
                "TB test certificate (UKVI approved)",
                "English proficiency proof",
                "Academic transcripts",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <BadgeCheck className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-md bg-secondary/10 border border-secondary/20 p-3 text-xs text-foreground">
              💡 New to this? Use the <Link to="/glossary" className="font-medium text-primary underline">glossary</Link> to understand UK visa terms.
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* HOW IT HELPS */}
    <section className="container-page py-14">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="font-display">Designed around you.</h2>
        <p className="text-muted-foreground mt-2">Built using Human-Computer Interaction principles to reduce confusion, prevent errors and build trust at every step.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map(({ icon: I, title, desc }) => (
          <div key={title} className="card-trust">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary/10 text-secondary mb-3">
              <I className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1.5">{desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* QUICK ACTIONS */}
    <section className="bg-surface-sunken py-14">
      <div className="container-page grid md:grid-cols-3 gap-4">
        <ActionCard to="/eligibility" title="Am I eligible?" desc="2-minute check covering course, funds and English." cta="Check now" />
        <ActionCard to="/dashboard" title="My application" desc="Resume where you left off and see your progress." cta="Open dashboard" />
        <ActionCard to="/help" title="Get help" desc="Common questions, glossary, and a chat assistant." cta="Visit help centre" />
      </div>
    </section>
  </PageLayout>
);

const ActionCard = ({ to, title, desc, cta }: { to: string; title: string; desc: string; cta: string }) => (
  <Link to={to} className="card-trust group block">
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-sm text-muted-foreground mt-1">{desc}</p>
    <div className="mt-4 inline-flex items-center text-sm font-medium text-primary group-hover:underline">
      {cta} <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </div>
  </Link>
);

export default Index;
