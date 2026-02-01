import { LucideIcon } from "lucide-react";
import { CyberButton } from "@/components/ui/cyber-button";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  actionLabel: string;
  onAction?: () => void;
  inputPlaceholder?: string;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  variant?: "input" | "dropzone";
}

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  actionLabel,
  onAction,
  inputPlaceholder,
  inputValue,
  onInputChange,
  variant = "input",
}: QuickActionCardProps) {
  return (
    <div className="bg-card border border-border p-8 rounded-2xl neo-glow-hover relative overflow-hidden group transition-all">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="h-20 w-20 text-primary" />
      </div>

      <div className="relative z-10">
        <h5 className="text-foreground text-xl font-bold mb-2">{title}</h5>
        <p className="text-muted-foreground text-sm mb-6 max-w-sm">{description}</p>

        <div className="flex gap-3">
          {variant === "input" ? (
            <>
              <input
                className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground"
                placeholder={inputPlaceholder}
                value={inputValue}
                onChange={(e) => onInputChange?.(e.target.value)}
              />
              <CyberButton onClick={onAction}>{actionLabel}</CyberButton>
            </>
          ) : (
            <>
              <div className="flex-1 border-2 border-dashed border-border rounded-lg flex items-center justify-center p-2 bg-background/50">
                <span className="text-muted-foreground text-xs font-medium">
                  {inputPlaceholder}
                </span>
              </div>
              <CyberButton variant="secondary" onClick={onAction}>
                {actionLabel}
              </CyberButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
