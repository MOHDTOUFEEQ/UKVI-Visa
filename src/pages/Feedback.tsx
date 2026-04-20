import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const Stars = ({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) => (
  <div>
    <Label className="block mb-1.5 text-sm">{label}</Label>
    <div className="flex gap-1" role="radiogroup" aria-label={label}>
      {[1,2,3,4,5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${n} star`}
          aria-checked={value === n}
          role="radio"
          className="p-1"
        >
          <Star className={`h-7 w-7 transition ${n <= value ? "fill-saffron text-saffron" : "text-muted-foreground"}`} />
        </button>
      ))}
    </div>
  </div>
);

const Feedback = () => {
  const [ease, setEase] = useState(0);
  const [clarity, setClarity] = useState(0);
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ease || !clarity) { toast.error("Please rate both ease of use and clarity."); return; }
    setSubmitted(true);
    toast.success("Thank you for your feedback!");
  };

  return (
    <PageLayout>
      <div className="container-page py-8 max-w-2xl space-y-6">
        <Breadcrumbs items={[{ label: "Feedback" }]} />
        <div>
          <h1 className="font-display">Tell us how we did</h1>
          <p className="text-muted-foreground mt-2">Your feedback helps us improve the service for future students.</p>
        </div>

        {submitted ? (
          <Card className="text-center animate-scale-in">
            <CardContent className="pt-10 pb-10">
              <CheckCircle2 className="h-12 w-12 text-accent mx-auto" />
              <h2 className="font-display mt-4">Thank you!</h2>
              <p className="text-muted-foreground mt-2">Your response has been recorded.</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader><CardTitle>Quick feedback</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={submit} className="space-y-6">
                <Stars value={ease} onChange={setEase} label="How easy was the application to use?" />
                <Stars value={clarity} onChange={setClarity} label="How clear were the instructions?" />
                <div>
                  <Label htmlFor="comments" className="block mb-1.5 text-sm">Suggestions (optional)</Label>
                  <Textarea id="comments" value={comments} onChange={(e) => setComments(e.target.value)} rows={4} placeholder="What worked well? What could be better?" maxLength={1000} />
                  <p className="field-helper">{comments.length}/1000</p>
                </div>
                <Button type="submit" size="lg">Submit feedback</Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default Feedback;
