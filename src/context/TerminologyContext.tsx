import { createContext, useContext, useState, ReactNode } from "react";

type Mode = "simple" | "legal";
const TerminologyContext = createContext<{ mode: Mode; setMode: (m: Mode) => void } | null>(null);

export const TerminologyProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>("simple");
  return (
    <TerminologyContext.Provider value={{ mode, setMode }}>{children}</TerminologyContext.Provider>
  );
};

export const useTerminology = () => {
  const ctx = useContext(TerminologyContext);
  if (!ctx) throw new Error("useTerminology must be inside provider");
  return ctx;
};

/** Render simple vs legal phrasing inline. */
export const Term = ({ simple, legal }: { simple: string; legal: string }) => {
  const { mode } = useTerminology();
  return <span title={mode === "simple" ? legal : simple}>{mode === "simple" ? simple : legal}</span>;
};
