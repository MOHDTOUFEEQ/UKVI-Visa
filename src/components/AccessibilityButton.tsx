import { Accessibility, RotateCcw } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const AccessibilityButton = () => {
  const { settings, update, reset } = useAccessibility();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="inline-flex items-center gap-1.5 rounded-md border bg-card px-2.5 py-1.5 text-xs font-medium hover:bg-muted"
          aria-label="Open accessibility settings"
        >
          <Accessibility className="h-4 w-4" aria-hidden /> Accessibility
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display">Accessibility settings</SheetTitle>
          <SheetDescription>Customise the interface to suit your needs. Changes save automatically.</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <section>
            <h3 className="text-sm font-semibold mb-2">Text size</h3>
            <div className="grid grid-cols-3 gap-2">
              {(["normal", "large", "xlarge"] as const).map((s) => (
                <Button
                  key={s}
                  variant={settings.textSize === s ? "default" : "outline"}
                  size="sm"
                  onClick={() => update("textSize", s)}
                >
                  {s === "normal" ? "Normal" : s === "large" ? "Large" : "Extra large"}
                </Button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold mb-2">Theme</h3>
            <div className="grid grid-cols-2 gap-2">
              {(["light", "dark"] as const).map((t) => (
                <Button
                  key={t}
                  variant={settings.theme === t ? "default" : "outline"}
                  size="sm"
                  onClick={() => update("theme", t)}
                >
                  {t === "light" ? "Light mode" : "Dark mode"}
                </Button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold mb-2">Contrast</h3>
            <div className="grid grid-cols-2 gap-2">
              {(["normal", "high"] as const).map((c) => (
                <Button
                  key={c}
                  variant={settings.contrast === c ? "default" : "outline"}
                  size="sm"
                  onClick={() => update("contrast", c)}
                >
                  {c === "normal" ? "Normal contrast" : "High contrast"}
                </Button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold">Reading & motion</h3>
            <ToggleRow id="dyslexic" label="Dyslexia-friendly font (Lexend)" checked={settings.dyslexic} onChange={(v) => update("dyslexic", v)} />
            <ToggleRow id="spaced" label="Increase line spacing" checked={settings.spaced} onChange={(v) => update("spaced", v)} />
            <ToggleRow id="motion" label="Reduce animations" checked={settings.reduceMotion} onChange={(v) => update("reduceMotion", v)} />
            <ToggleRow id="kbd" label="Keyboard navigation focus rings" checked={settings.keyboard} onChange={(v) => update("keyboard", v)} />
            <ToggleRow id="sr" label="Show screen reader hints" checked={settings.screenReaderHints} onChange={(v) => update("screenReaderHints", v)} />
          </section>

          <Button variant="ghost" onClick={reset} className="w-full">
            <RotateCcw className="h-4 w-4 mr-2" /> Reset to defaults
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const ToggleRow = ({ id, label, checked, onChange }: { id: string; label: string; checked: boolean; onChange: (v: boolean) => void }) => (
  <div className="flex items-center justify-between gap-4">
    <Label htmlFor={id} className="text-sm leading-snug">{label}</Label>
    <Switch id={id} checked={checked} onCheckedChange={onChange} />
  </div>
);
