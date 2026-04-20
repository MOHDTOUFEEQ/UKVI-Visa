import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useApplication, STEPS } from "@/context/ApplicationContext";
import { toast } from "sonner";

type Props = {
  step: number;
  title: string;
  description?: string;
  children: ReactNode;
  onNext?: () => boolean | void; // return false to block
  nextLabel?: string;
};

export const StepShell = ({ step, title, description, children, onNext, nextLabel }: Props) => {
  const navigate = useNavigate();
  const { markStepComplete } = useApplication();

  const prev = STEPS[step - 2];
  const next = STEPS[step];

  const handleNext = () => {
    if (onNext) {
      const ok = onNext();
      if (ok === false) return;
    }
    markStepComplete(step);
    if (next) {
      toast.success(`Step ${step} complete`);
      navigate(`/apply/${next.slug}`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Step {step} of {STEPS.length}</div>
        <h1 className="font-display text-3xl mt-1">{title}</h1>
        {description && <p className="text-muted-foreground mt-2 max-w-2xl">{description}</p>}
      </header>

      <div className="space-y-5">{children}</div>

      <nav className="flex flex-wrap items-center justify-between gap-3 border-t pt-5">
        {prev ? (
          <Button asChild variant="outline">
            <Link to={`/apply/${prev.slug}`}><ArrowLeft className="h-4 w-4 mr-1.5" /> Back</Link>
          </Button>
        ) : <div />}
        <div className="flex gap-2">
          <Button asChild variant="ghost"><Link to="/dashboard">Save & exit</Link></Button>
          {next && (
            <Button onClick={handleNext}>
              {nextLabel ?? `Continue to ${next.title}`} <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          )}
          {!next && (
            <Button onClick={handleNext}>
              <CheckCircle2 className="h-4 w-4 mr-1.5" /> Finish
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
};
