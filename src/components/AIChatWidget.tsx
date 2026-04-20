import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type Msg = { role: "user" | "bot"; text: string };

const KB: { keywords: string[]; answer: string }[] = [
  { keywords: ["cas"], answer: "**CAS** stands for *Confirmation of Acceptance for Studies*. It is a unique reference number issued by your UK university once they accept you. You'll need it before applying for your visa. The CAS is valid for 6 months from the date issued." },
  { keywords: ["bank", "balance", "fund", "money", "maintenance"], answer: "You must show **maintenance funds** held in a bank account in your name (or a parent's name with consent letter) for a **continuous 28 days**:\n\n• London courses: **£1,334 × number of months** (max 9 months)\n• Outside London: **£1,023 × number of months** (max 9 months)\n\nPlus any unpaid tuition for year 1." },
  { keywords: ["ihs", "health", "surcharge", "nhs"], answer: "The **Immigration Health Surcharge (IHS)** gives you access to the UK's NHS healthcare during your stay. Students pay **£776 per year**. For a 12-month course you'd pay £776; for a 3-year course you'd pay £2,328. It's paid online during your application." },
  { keywords: ["tb", "tuberculosis", "test"], answer: "Yes — Indian applicants **must** complete a TB test at a UKVI-approved clinic before applying. The certificate is valid for 6 months. Approved centres include IOM clinics in major cities (Delhi, Mumbai, Chennai, Kolkata, Bengaluru, Hyderabad, etc.)." },
  { keywords: ["passport"], answer: "Your passport must be valid for the duration of your stay and have at least one blank page. Indian passports usually have an **8-character** passport number (1 letter + 7 digits)." },
  { keywords: ["english", "ielts", "language"], answer: "Most universities accept **IELTS UKVI**, **PTE Academic UKVI**, or **TOEFL iBT**. Your CAS will state if you're exempt (e.g. if you've studied in English-medium school for 5+ years)." },
  { keywords: ["fee", "cost", "price", "visa fee"], answer: "Current student visa fees:\n• Visa application: **£524** (from outside the UK)\n• IHS: **£776 per year**\n• Optional Priority service: **£500**\n\nTotal for a 1-year course (standard): around **£1,300**." },
  { keywords: ["time", "long", "duration", "processing"], answer: "Standard processing from India is usually **3 weeks** after biometrics. Priority service: **5 working days** (additional fee). You can apply up to **6 months before** your course starts." },
  { keywords: ["reject", "refus"], answer: "Common reasons for refusal: insufficient funds, funds not held 28 days, missing TB certificate, financial documents not in English, mismatch between CAS and personal details. Use our document checklist to avoid these." },
  { keywords: ["biometric", "brp", "vfs"], answer: "After applying online, book a **biometrics appointment** at a VFS Global centre in India (fingerprints + photo). Your **BRP** (Biometric Residence Permit) is collected in the UK after arrival — it's your ID card for staying in the UK." },
];

const SUGGESTED = [
  "What is CAS?",
  "How much bank balance is required?",
  "What is the IHS fee?",
  "Do Indian students need a TB test?",
];

const respond = (q: string) => {
  const lower = q.toLowerCase();
  const hit = KB.find((k) => k.keywords.some((kw) => lower.includes(kw)));
  return hit
    ? hit.answer
    : "I'm a guided assistant for the UK student visa application. Try asking about **CAS**, **bank balance**, **IHS fee**, **TB test**, **passport**, **English requirements**, **visa fee**, or **processing time**.";
};

export const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "👋 Hi! I'm your visa assistant. Ask me anything about your UK student visa application." },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, { role: "bot", text: respond(text) }]), 450);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-foreground shadow-lg hover:bg-primary-hover transition-all hover:scale-105"
        aria-label="Open visa assistant chat"
      >
        <Sparkles className="h-5 w-5" />
        <span className="hidden sm:inline font-medium">Ask Assistant</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-end sm:items-center sm:justify-end p-0 sm:p-5 animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-card rounded-t-2xl sm:rounded-xl shadow-2xl w-full sm:max-w-md h-[80vh] sm:h-[600px] flex flex-col animate-slide-up"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Visa assistant chat"
          >
            <header className="flex items-center justify-between border-b p-4 bg-gradient-trust text-primary-foreground rounded-t-2xl sm:rounded-t-xl">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <div>
                  <div className="font-semibold">Visa Assistant</div>
                  <div className="text-xs opacity-80">Scripted demo • answers in seconds</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="hover:bg-primary-foreground/10 p-1 rounded">
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-line ${
                      m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                    dangerouslySetInnerHTML={m.role === "bot" ? { __html: m.text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>") } : undefined}
                  >
                    {m.role === "user" ? m.text : null}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="border-t p-3 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs rounded-full border px-2.5 py-1 hover:bg-muted"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => { e.preventDefault(); send(input); }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question…"
                  className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Type your question"
                />
                <Button type="submit" size="icon" aria-label="Send"><Send className="h-4 w-4" /></Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
