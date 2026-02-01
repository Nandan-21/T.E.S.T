import { cn } from "@/lib/utils";

interface ThreatGaugeProps {
  percentage: number;
  label: string;
  severity: "low" | "medium" | "high" | "critical";
}

const severityConfig = {
  low: { color: "text-success", bgColor: "text-success/20" },
  medium: { color: "text-warning", bgColor: "text-warning/20" },
  high: { color: "text-warning", bgColor: "text-warning/20" },
  critical: { color: "text-cyber-red", bgColor: "text-cyber-red/20" },
};

export function ThreatGauge({ percentage, label, severity }: ThreatGaugeProps) {
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="glass-panel rounded-xl p-8 flex flex-col items-center text-center">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">
        Threat Probability
      </p>

      <div className="relative w-48 h-48 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full gauge-gradient opacity-20 blur-xl" />
        
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-border"
            cx="50%"
            cy="50%"
            fill="transparent"
            r="45%"
            stroke="currentColor"
            strokeWidth="8"
          />
          <circle
            className={cn("transition-all duration-1000", severityConfig[severity].color)}
            cx="50%"
            cy="50%"
            fill="transparent"
            r="45%"
            stroke="currentColor"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            strokeWidth="12"
            style={{
              filter: "drop-shadow(0 0 10px currentColor)",
            }}
          />
        </svg>

        <div className="absolute flex flex-col items-center">
          <span className="text-5xl font-technical font-black text-foreground">
            {percentage}%
          </span>
          <span
            className={cn(
              "text-[10px] font-bold tracking-widest uppercase",
              severityConfig[severity].color
            )}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
