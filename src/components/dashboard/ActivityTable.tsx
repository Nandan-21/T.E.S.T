import { cn } from "@/lib/utils";
import { CyberButton } from "@/components/ui/cyber-button";

interface ActivityItem {
  timestamp: string;
  asset: string;
  assetSub?: string;
  module: string;
  moduleColor: string;
  severity: "critical" | "high" | "clean" | "optimal" | "low";
  status: string;
  action: string;
}

interface ActivityTableProps {
  items: ActivityItem[];
  title: string;
  onViewAll?: () => void;
}

const severityConfig = {
  critical: { color: "text-cyber-red", dot: "bg-cyber-red animate-pulse" },
  high: { color: "text-warning", dot: "bg-warning" },
  clean: { color: "text-success", dot: "bg-success" },
  optimal: { color: "text-success", dot: "bg-success" },
  low: { color: "text-muted-foreground", dot: "bg-muted-foreground" },
};

const moduleColors: Record<string, string> = {
  "WVS SCAN": "bg-primary/10 text-primary border-primary/20",
  "EMAIL ANALYZER": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "LOG SOC": "bg-primary/10 text-primary border-primary/20",
  "AI CORE": "bg-primary/10 text-primary border-primary/20",
};

export function ActivityTable({ items, title, onViewAll }: ActivityTableProps) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
          <span className="w-1 h-6 bg-primary rounded-full" />
          {title}
        </h3>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
          >
            View All History
            <span className="text-xs">→</span>
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-secondary/30 text-muted-foreground text-[10px] uppercase tracking-widest font-bold">
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Asset / Target</th>
              <th className="px-6 py-4">Module</th>
              <th className="px-6 py-4">Severity</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item, index) => {
              const config = severityConfig[item.severity];

              return (
                <tr
                  key={index}
                  className={cn(
                    "hover:bg-secondary/20 transition-colors",
                    item.severity === "critical" && "bg-cyber-red/5"
                  )}
                >
                  <td className="px-6 py-4 text-xs font-technical text-muted-foreground">
                    {item.timestamp}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-foreground text-sm font-medium">{item.asset}</p>
                    {item.assetSub && (
                      <p className="text-[10px] text-muted-foreground">{item.assetSub}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-2 py-0.5 text-[10px] font-bold rounded uppercase border",
                        moduleColors[item.module] || "bg-primary/10 text-primary border-primary/20"
                      )}
                    >
                      {item.module}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("flex items-center gap-1 text-xs font-bold uppercase", config.color)}>
                      <span className={cn("w-2 h-2 rounded-full", config.dot)} />
                      {item.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">{item.status}</td>
                  <td className="px-6 py-4 text-right">
                    <CyberButton variant="secondary" size="sm">
                      {item.action}
                    </CyberButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
