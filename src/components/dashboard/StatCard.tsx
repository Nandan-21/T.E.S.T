import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    direction: "up" | "down";
    label: string;
  };
  severity?: "low" | "medium" | "high" | "critical";
  showRadial?: boolean;
  radialValue?: number;
  radialLabel?: string;
}

const severityColors = {
  low: "text-primary",
  medium: "text-warning",
  high: "text-warning",
  critical: "text-cyber-red",
};

const radialColors = {
  low: "#00bfff",
  medium: "#f97316",
  high: "#f97316",
  critical: "#ff3131",
};

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  severity = "low",
  showRadial,
  radialValue = 0,
  radialLabel,
}: StatCardProps) {
  const dashOffset = 100 - radialValue;

  return (
    <div className="bg-card border border-border p-6 rounded-2xl neo-glow-hover flex items-center justify-between group transition-all">
      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{label}</p>
          <h4 className="text-3xl font-bold font-technical text-foreground mt-1">
            {value}
            {severity && (
              <span className={cn("text-xl ml-0.5", severityColors[severity])}>
                {severity === "critical" || severity === "high" ? "+" : "%"}
              </span>
            )}
          </h4>
        </div>
        {trend && (
          <div
            className={cn(
              "flex items-center gap-2 text-xs",
              trend.direction === "down" ? "text-success" : "text-warning"
            )}
          >
            <span>{trend.value}</span>
            <span>{trend.label}</span>
          </div>
        )}
      </div>

      {showRadial ? (
        <div className="relative w-24 h-24">
          <svg className="w-full h-full radial-progress" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              fill="none"
              r="16"
              stroke="hsl(var(--border))"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              fill="none"
              r="16"
              stroke={radialColors[severity]}
              strokeDasharray={`${radialValue}, 100`}
              strokeLinecap="round"
              strokeWidth="3"
              style={{
                filter: `drop-shadow(0 0 8px ${radialColors[severity]}50)`,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-muted-foreground uppercase">
            {radialLabel}
          </div>
        </div>
      ) : (
        <Icon
          className={cn(
            "h-10 w-10 opacity-50 transition-opacity group-hover:opacity-70",
            severityColors[severity]
          )}
        />
      )}
    </div>
  );
}
