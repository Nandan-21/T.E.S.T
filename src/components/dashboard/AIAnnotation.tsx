import { Clock, Link2Off, AlertTriangle, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIAnnotationProps {
  severity: "critical" | "warning" | "info";
  icon?: LucideIcon;
  title: string;
  quote: string;
  description: string;
  highlight?: string;
}

const severityConfig = {
  critical: {
    container: "bg-cyber-red/10 border-cyber-red/30 hover:bg-cyber-red/15",
    iconBg: "bg-cyber-red/20",
    titleColor: "text-cyber-red",
    icon: Clock,
  },
  warning: {
    container: "bg-warning/10 border-warning/30 hover:bg-warning/15",
    iconBg: "bg-warning/20",
    titleColor: "text-warning",
    icon: Link2Off,
  },
  info: {
    container: "bg-primary/10 border-primary/30 hover:bg-primary/15",
    iconBg: "bg-primary/20",
    titleColor: "text-primary",
    icon: AlertTriangle,
  },
};

export function AIAnnotation({
  severity,
  icon,
  title,
  quote,
  description,
  highlight,
}: AIAnnotationProps) {
  const config = severityConfig[severity];
  const Icon = icon || config.icon;

  return (
    <div
      className={cn(
        "border rounded-lg p-4 flex gap-4 transition-all",
        config.container
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
          config.iconBg
        )}
      >
        <Icon className={cn("h-5 w-5", config.titleColor)} />
      </div>

      <div>
        <h4 className={cn("text-sm font-bold", config.titleColor)}>{title}</h4>
        <p className="text-muted-foreground text-xs mt-1 italic">"{quote}"</p>
        <p className="text-muted-foreground/70 text-xs mt-2">
          {description}
          {highlight && (
            <>
              {" "}
              <code className={cn("text-xs", config.titleColor)}>{highlight}</code>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
