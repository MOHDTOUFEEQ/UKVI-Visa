import { useTerminology } from "@/context/TerminologyContext";
import { BookOpen } from "lucide-react";

export const TerminologyToggle = () => {
  const { mode, setMode } = useTerminology();
  return (
    <div
      className="inline-flex items-center rounded-md border bg-card p-0.5 text-xs"
      role="group"
      aria-label="Language style"
    >
      <BookOpen className="h-3.5 w-3.5 mx-1.5 text-muted-foreground" aria-hidden />
      <button
        onClick={() => setMode("simple")}
        className={`px-2.5 py-1 rounded ${mode === "simple" ? "bg-primary text-primary-foreground" : "text-foreground"}`}
        aria-pressed={mode === "simple"}
      >
        Simple
      </button>
      <button
        onClick={() => setMode("legal")}
        className={`px-2.5 py-1 rounded ${mode === "legal" ? "bg-primary text-primary-foreground" : "text-foreground"}`}
        aria-pressed={mode === "legal"}
      >
        Legal
      </button>
    </div>
  );
};
