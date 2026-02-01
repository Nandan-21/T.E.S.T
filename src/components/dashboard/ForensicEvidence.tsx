import { XCircle, CheckCircle, AlertTriangle, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

interface EvidenceItem {
  status: "pass" | "fail" | "warning";
  title: string;
  description: string;
}

interface ForensicEvidenceProps {
  items: EvidenceItem[];
}

const statusConfig = {
  pass: { icon: CheckCircle, color: "text-success" },
  fail: { icon: XCircle, color: "text-cyber-red" },
  warning: { icon: AlertTriangle, color: "text-warning" },
};

export function ForensicEvidence({ items }: ForensicEvidenceProps) {
  return (
    <div className="glass-panel rounded-xl p-6">
      <h4 className="text-foreground text-sm font-bold mb-4 flex items-center gap-2">
        <FlaskConical className="h-5 w-5 text-primary" />
        Forensic Evidence
      </h4>

      <ul className="space-y-4">
        {items.map((item, index) => {
          const config = statusConfig[item.status];
          const Icon = config.icon;

          return (
            <li key={index} className="flex items-start gap-3">
              <Icon className={cn("h-4 w-4 mt-0.5", config.color)} />
              <div>
                <p className="text-xs text-foreground font-medium">{item.title}</p>
                <p className="text-[10px] text-muted-foreground">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
