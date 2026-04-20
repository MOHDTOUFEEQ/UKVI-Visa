import { Link, NavLink } from "react-router-dom";
import { Crown, Menu, X } from "lucide-react";
import { useState } from "react";
import { TerminologyToggle } from "@/components/TerminologyToggle";
import { AccessibilityButton } from "@/components/AccessibilityButton";

const nav = [
  { to: "/", label: "Home" },
  { to: "/eligibility", label: "Eligibility" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/glossary", label: "Glossary" },
  { to: "/help", label: "Help" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <div className="gov-banner">
        <div className="container-page flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-saffron text-saffron-foreground">
              <Crown className="h-5 w-5" aria-hidden />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg font-bold">UK Visas & Immigration</div>
              <div className="text-xs opacity-80">Student visa application service</div>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <TerminologyToggle />
            <AccessibilityButton />
          </div>
          <button
            className="md:hidden p-2"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <nav className="bg-card border-b" aria-label="Primary">
        <div className={`container-page ${open ? "block" : "hidden"} md:block`}>
          <ul className="flex flex-col md:flex-row md:items-center md:gap-1 py-2">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-secondary/10 text-primary border-b-2 border-saffron md:border-b-2"
                        : "text-foreground hover:bg-muted"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="md:hidden flex gap-2 mt-2 px-4 pb-2">
              <TerminologyToggle />
              <AccessibilityButton />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
