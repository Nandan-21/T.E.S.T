import { Bell, Settings, Search, Activity, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { CyberButton } from "@/components/ui/cyber-button";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showAuthLinks?: boolean;
}

export function Header({ title, subtitle, showAuthLinks = true }: HeaderProps) {
  return (
    <header className="h-20 border-b border-border flex items-center justify-between px-8 bg-background/80 backdrop-blur-xl sticky top-0 z-20 shrink-0">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold font-technical tracking-tight text-foreground flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          {title}
        </h2>
        {subtitle && (
          <>
            <div className="h-4 w-[1px] bg-border mx-2" />
            <span className="text-xs text-primary uppercase tracking-widest font-medium">
              {subtitle}
            </span>
          </>
        )}
        <div className="h-4 w-[1px] bg-border mx-2" />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            className="bg-secondary/50 border border-border rounded-full pl-10 pr-4 py-1.5 text-sm w-64 focus:ring-1 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground"
            placeholder="Search threats, logs, nodes..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary border border-border transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary border border-border transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>

        <div className="h-10 w-[1px] bg-border" />

        {showAuthLinks && (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <CyberButton variant="outline" size="sm">
                <LogIn className="h-4 w-4" />
                Login
              </CyberButton>
            </Link>
            <Link to="/signup">
              <CyberButton size="sm">
                <UserPlus className="h-4 w-4" />
                Sign Up
              </CyberButton>
            </Link>
          </div>
        )}

        <div className="h-10 w-[1px] bg-border" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-foreground leading-none">Admin_User</p>
            <p className="text-[10px] text-primary font-technical uppercase tracking-widest mt-1">
              Tier: Enterprise
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
              <span className="text-primary font-bold text-sm">AU</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
