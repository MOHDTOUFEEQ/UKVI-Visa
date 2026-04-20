import { ReactNode } from "react";
import { Info, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";

type Props = {
  id: string;
  label: string;
  tooltip?: string;
  example?: string;
  helper?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

export const FormField = ({ id, label, tooltip, example, helper, error, required, children }: Props) => (
  <div className="space-y-1.5">
    <div className="flex items-center gap-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-destructive" aria-label="required">*</span>}
      </Label>
      {tooltip && (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="text-muted-foreground hover:text-primary" aria-label={`Help: ${label}`}>
                <Info className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">{tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
    {children}
    {example && !error && (
      <p className="field-helper text-xs">
        <span className="font-medium">Example:</span> {example}
      </p>
    )}
    {helper && !error && <p className="field-helper">{helper}</p>}
    {error && (
      <p className="field-error" role="alert">
        <AlertCircle className="h-4 w-4" /> {error}
      </p>
    )}
  </div>
);
