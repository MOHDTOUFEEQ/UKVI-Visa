import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type AccessibilitySettings = {
  textSize: "normal" | "large" | "xlarge";
  contrast: "normal" | "high";
  theme: "light" | "dark";
  dyslexic: boolean;
  spaced: boolean;
  reduceMotion: boolean;
  keyboard: boolean;
  screenReaderHints: boolean;
};

const defaults: AccessibilitySettings = {
  textSize: "normal",
  contrast: "normal",
  theme: "light",
  dyslexic: false,
  spaced: false,
  reduceMotion: false,
  keyboard: false,
  screenReaderHints: false,
};

type Ctx = {
  settings: AccessibilitySettings;
  update: <K extends keyof AccessibilitySettings>(k: K, v: AccessibilitySettings[K]) => void;
  reset: () => void;
};

const AccessibilityContext = createContext<Ctx | null>(null);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const raw = localStorage.getItem("ukvi:a11y");
      return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
    } catch {
      return defaults;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", settings.theme === "dark");
    root.classList.toggle("a11y-large", settings.textSize === "large");
    root.classList.toggle("a11y-xlarge", settings.textSize === "xlarge");
    root.classList.toggle("a11y-high-contrast", settings.contrast === "high");
    root.classList.toggle("a11y-dyslexic", settings.dyslexic);
    root.classList.toggle("a11y-spaced", settings.spaced);
    root.classList.toggle("a11y-reduce-motion", settings.reduceMotion);
    root.classList.toggle("a11y-keyboard", settings.keyboard);
    try { localStorage.setItem("ukvi:a11y", JSON.stringify(settings)); } catch {}
  }, [settings]);

  const update: Ctx["update"] = (k, v) => setSettings((s) => ({ ...s, [k]: v }));
  const reset = () => setSettings(defaults);

  return (
    <AccessibilityContext.Provider value={{ settings, update, reset }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return ctx;
};
