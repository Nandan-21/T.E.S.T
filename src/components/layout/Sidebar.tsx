import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Shield, 
  MailSearch, 
  Terminal, 
  Cpu, 
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CyberButton } from "@/components/ui/cyber-button";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/scanner", label: "WVS Scanner", icon: Shield },
  { path: "/email-analyzer", label: "Email Analyzer", icon: MailSearch },
  { path: "/log-soc", label: "Log SOC", icon: Terminal },
  { path: "/ai-core", label: "AI Core", icon: Cpu },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-72 border-r border-border flex flex-col justify-between bg-sidebar shrink-0">
      <div className="p-6">
        <div className="flex items-start gap-3 mb-10">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center neo-glow border border-primary/30 shrink-0">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <div className="overflow-hidden">
            <h1 className="font-technical font-bold text-2xl tracking-tighter text-foreground leading-none">
              T.E.S.T.
            </h1>
            <p className="text-[9px] uppercase tracking-tight text-muted-foreground font-bold mt-1 leading-tight">
              Threat Evaluation & Security Tool
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-border">
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-primary">NODE STATUS</span>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            AI engine operating at 98.4% efficiency. No active breaches detected.
          </p>
        </div>
        <CyberButton className="w-full">
          <Zap className="h-4 w-4" />
          Upgrade Plan
        </CyberButton>
      </div>
    </aside>
  );
}
