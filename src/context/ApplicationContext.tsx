import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export type ApplicationData = {
  // personal
  fullName: string;
  hasMiddleName: boolean;
  middleName: string;
  surname: string;
  singleNameOnly: boolean;
  dob: string;
  gender: string;
  nationality: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  // passport
  passportNumber: string;
  passportIssue: string;
  passportExpiry: string;
  passportPlace: string;
  // education
  board: string;
  highestQualification: string;
  institution: string;
  graduationYear: string;
  englishTest: string;
  englishScore: string;
  // CAS
  casNumber: string;
  university: string;
  course: string;
  courseStart: string;
  courseDuration: string; // months
  tuitionFee: string;
  tuitionPaid: string;
  location: "london" | "outside-london";
  // financial
  bankName: string;
  bankBalance: string;
  fundsHeldDays: string;
  // documents (status flags)
  docs: Record<string, "pending" | "uploaded">;
  // TB / IHS
  tbCenter: string;
  tbDate: string;
  tbUploaded: boolean;
  ihsConfirmed: boolean;
  // payment
  paid: boolean;
  referenceNumber: string;
  submittedAt: string;
};

const initial: ApplicationData = {
  fullName: "", hasMiddleName: false, middleName: "", surname: "", singleNameOnly: false,
  dob: "", gender: "", nationality: "Indian", email: "", phone: "",
  addressLine1: "", addressLine2: "", city: "", state: "", pincode: "",
  passportNumber: "", passportIssue: "", passportExpiry: "", passportPlace: "",
  board: "", highestQualification: "", institution: "", graduationYear: "",
  englishTest: "", englishScore: "",
  casNumber: "", university: "", course: "", courseStart: "", courseDuration: "12",
  tuitionFee: "", tuitionPaid: "0", location: "london",
  bankName: "", bankBalance: "", fundsHeldDays: "",
  docs: {
    passport: "pending", cas: "pending", transcripts: "pending", bank: "pending",
    tb: "pending", english: "pending", photo: "pending",
  },
  tbCenter: "", tbDate: "", tbUploaded: false,
  ihsConfirmed: false,
  paid: false, referenceNumber: "", submittedAt: "",
};

type Ctx = {
  data: ApplicationData;
  update: (patch: Partial<ApplicationData>) => void;
  setDocStatus: (key: string, status: "pending" | "uploaded") => void;
  reset: () => void;
  completedSteps: number[];
  markStepComplete: (n: number) => void;
};

const ApplicationContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "ukvi:application";
const STEPS_KEY = "ukvi:steps";

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ApplicationData>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...initial, ...JSON.parse(raw) } : initial;
    } catch { return initial; }
  });
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem(STEPS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  // autosave (debounced via timeout)
  useEffect(() => {
    const t = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
    }, 400);
    return () => clearTimeout(t);
  }, [data]);

  useEffect(() => {
    try { localStorage.setItem(STEPS_KEY, JSON.stringify(completedSteps)); } catch {}
  }, [completedSteps]);

  const update = useCallback((patch: Partial<ApplicationData>) => {
    setData((d) => ({ ...d, ...patch }));
  }, []);

  const setDocStatus = useCallback((key: string, status: "pending" | "uploaded") => {
    setData((d) => ({ ...d, docs: { ...d.docs, [key]: status } }));
  }, []);

  const markStepComplete = useCallback((n: number) => {
    setCompletedSteps((s) => (s.includes(n) ? s : [...s, n].sort((a, b) => a - b)));
  }, []);

  const reset = () => {
    setData(initial);
    setCompletedSteps([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEPS_KEY);
    } catch {}
  };

  return (
    <ApplicationContext.Provider value={{ data, update, setDocStatus, reset, completedSteps, markStepComplete }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const ctx = useContext(ApplicationContext);
  if (!ctx) throw new Error("useApplication must be inside provider");
  return ctx;
};

export const STEPS = [
  { n: 1, slug: "personal", title: "Personal details" },
  { n: 2, slug: "passport", title: "Passport details" },
  { n: 3, slug: "education", title: "Education details" },
  { n: 4, slug: "cas", title: "CAS information" },
  { n: 5, slug: "finance", title: "Financial evidence" },
  { n: 6, slug: "documents", title: "Document upload" },
  { n: 7, slug: "tb-test", title: "TB test" },
  { n: 8, slug: "ihs", title: "IHS fee" },
  { n: 9, slug: "review", title: "Review" },
  { n: 10, slug: "payment", title: "Payment" },
  { n: 11, slug: "confirmation", title: "Confirmation" },
] as const;
