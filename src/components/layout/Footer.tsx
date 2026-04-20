import { Lock, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="mt-16 border-t bg-primary text-primary-foreground">
    <div className="container-page py-10 grid gap-8 md:grid-cols-4">
      <div>
        <div className="font-display text-lg font-semibold mb-2">UKVI Student Visa</div>
        <p className="text-sm opacity-80">A culturally adapted prototype to guide Indian students through the UK student visa application process.</p>
      </div>
      <div>
        <div className="font-semibold mb-2 text-sm uppercase tracking-wide">Apply</div>
        <ul className="space-y-1.5 text-sm opacity-90">
          <li><Link to="/eligibility" className="hover:underline">Check eligibility</Link></li>
          <li><Link to="/dashboard" className="hover:underline">My dashboard</Link></li>
          <li><Link to="/apply/personal" className="hover:underline">Resume application</Link></li>
        </ul>
      </div>
      <div>
        <div className="font-semibold mb-2 text-sm uppercase tracking-wide">Support</div>
        <ul className="space-y-1.5 text-sm opacity-90">
          <li><Link to="/help" className="hover:underline">Help centre</Link></li>
          <li><Link to="/glossary" className="hover:underline">Glossary</Link></li>
          <li><Link to="/feedback" className="hover:underline">Give feedback</Link></li>
        </ul>
      </div>
      <div>
        <div className="font-semibold mb-2 text-sm uppercase tracking-wide">Trust & security</div>
        <ul className="space-y-2 text-sm opacity-90">
          <li className="flex items-center gap-2"><Lock className="h-4 w-4" /> Your data is encrypted</li>
          <li className="flex items-center gap-2"><Shield className="h-4 w-4" /> Official-style interface</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-primary-foreground/20">
      <div className="container-page py-4 text-xs opacity-70 flex flex-wrap justify-between gap-2">
        <div>© Prototype — HCI Coursework. Not a real government service.</div>
        <div>Built for educational/research purposes.</div>
      </div>
    </div>
  </footer>
);
