import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Header } from "@/components/layout/Header";
import { CyberButton } from "@/components/ui/cyber-button";
import { WorldMap } from "@/components/admin/WorldMap";
import { motion } from "framer-motion";
import {
  Globe,
  Users,
  AlertTriangle,
  Search,
  Filter,
  Radar,
  ExternalLink,
  Shield,
  Lock,
  Bell,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Total Scans Today", value: "1,284", icon: Radar },
  { label: "Phishing Alerts", value: "12", icon: AlertTriangle, alert: true },
  { label: "Active Users", value: "458", icon: Users },
  { label: "Data Protected", value: "4.2 TB", icon: Lock },
];

const users = [
  {
    initials: "AS",
    name: "Alice Smith",
    role: "Student • Univ-MIT",
    status: "Active",
    trust: "High Trust",
  },
  {
    initials: "RB",
    name: "Robert Brown",
    role: "External • Org-Beta",
    status: "RESTRICTED",
    trust: "Flagged Action",
    flagged: true,
  },
  {
    initials: "ML",
    name: "Maria Lopez",
    role: "Admin • T.E.S.T.",
    status: "Active",
  },
];

const activityLog = [
  {
    user: "asmith_MIT",
    status: "active",
    timestamp: "2026-11-24 14:15:02",
    ip: "192.168.1.104",
    action: "FILE_ACCESS: project_a.zip",
    actionType: "file",
    risk: "Low",
  },
  {
    user: "rbrown_EXT",
    status: "critical",
    timestamp: "2026-11-24 14:12:45",
    ip: "45.23.112.89",
    action: "UNAUTHORIZED_ACCESS_ATTEMPT: admin_db",
    actionType: "critical",
    risk: "Critical",
  },
  {
    user: "mlopez_TEST",
    status: "active",
    timestamp: "2026-11-24 13:58:33",
    ip: "10.0.4.52",
    action: "SYSTEM_SCAN_INITIATED",
    actionType: "system",
    risk: "None",
  },
  {
    user: "jsnow_STUDENT",
    status: "warning",
    timestamp: "2026-11-24 13:45:10",
    ip: "185.44.22.1",
    action: "LOGIN: Mismatching Location",
    actionType: "warning",
    risk: "Medium",
  },
];

const actionTypeStyles: Record<string, string> = {
  file: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  critical: "bg-cyber-red/20 text-cyber-red border-cyber-red/30",
  system: "bg-secondary text-muted-foreground border-border",
  warning: "bg-warning/10 text-warning border-warning/20",
};

const riskStyles: Record<string, string> = {
  Low: "text-muted-foreground",
  Critical: "text-cyber-red",
  None: "text-muted-foreground",
  Medium: "text-warning",
};

const statusStyles: Record<string, string> = {
  active: "bg-success",
  critical: "bg-cyber-red animate-ping",
  warning: "bg-warning",
};

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-card/50 sticky top-0 z-20 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <h2 className="text-xs font-technical font-bold text-muted-foreground uppercase tracking-[0.3em]">
              Operational Status
            </h2>
            <span className="text-[9px] font-medium text-primary uppercase tracking-widest hidden md:block">
              T.E.S.T. Admin Protocol
            </span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 bg-success/10 border border-success/20 rounded">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-[10px] font-bold text-success uppercase">
              System Nominal
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-technical text-muted-foreground">
              UTC 14:22:58
            </span>
          </div>
          <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-cyber-red rounded-full" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-background/50">
        <motion.div
          className="p-8 space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={cn(
                  "glass-panel p-6 rounded-xl flex items-center justify-between",
                  stat.alert && "border-l-4 border-l-cyber-red"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
                    {stat.label}
                  </p>
                  <h3
                    className={cn(
                      "text-3xl font-technical font-bold",
                      stat.alert ? "text-cyber-red" : "text-foreground"
                    )}
                  >
                    {stat.value}
                  </h3>
                </div>
                <stat.icon
                  className={cn(
                    "h-10 w-10 opacity-50",
                    stat.alert ? "text-cyber-red animate-pulse" : "text-primary"
                  )}
                />
              </motion.div>
            ))}
          </div>

          {/* Map & User Management */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Global Access Map */}
            <motion.div
              className="xl:col-span-2 glass-panel rounded-xl overflow-hidden flex flex-col h-[500px]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/30">
                <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  Global Access Attempts
                </h3>
                <div className="flex items-center gap-4 text-[10px]">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary" /> Authorized
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyber-red" /> Blocked
                  </span>
                </div>
              </div>
              <div className="flex-1 relative bg-background overflow-hidden">
                <WorldMap />
              </div>
            </motion.div>

            {/* User Management */}
            <motion.div
              className="glass-panel rounded-xl flex flex-col h-[500px]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="p-4 border-b border-border bg-secondary/30">
                <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  User Management
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {users.map((user, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary/40 transition-colors group",
                      user.flagged && "border-l-2 border-l-cyber-red"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-foreground">
                        {user.initials}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-foreground">{user.name}</p>
                        <p className="text-[10px] text-muted-foreground">{user.role}</p>
                      </div>
                      <button className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <span
                        className={cn(
                          "text-[9px] px-2 py-0.5 rounded",
                          user.flagged
                            ? "bg-cyber-red/10 text-cyber-red font-bold uppercase"
                            : "bg-secondary text-muted-foreground"
                        )}
                      >
                        {user.status}
                      </span>
                      {user.trust && (
                        <span
                          className={cn(
                            "text-[9px] px-2 py-0.5 rounded",
                            user.trust === "High Trust"
                              ? "bg-primary/10 text-primary"
                              : "bg-secondary text-muted-foreground"
                          )}
                        >
                          {user.trust}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <CyberButton variant="secondary" className="w-full">
                  View All Users
                </CyberButton>
              </div>
            </motion.div>
          </div>

          {/* Activity Monitor */}
          <motion.div
            className="glass-panel rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="p-4 border-b border-border bg-secondary/30 flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                User Activity Monitor
              </h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                  <input
                    className="bg-background border border-border text-[10px] rounded pl-8 pr-3 py-1.5 w-48 focus:ring-1 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground"
                    placeholder="Search events..."
                    type="text"
                  />
                </div>
                <button className="p-1.5 bg-secondary rounded hover:text-primary transition-colors border border-border">
                  <Filter className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-muted-foreground uppercase tracking-tighter border-b border-border">
                    <th className="px-6 py-4 font-bold">User / Identity</th>
                    <th className="px-6 py-4 font-bold">Timestamp</th>
                    <th className="px-6 py-4 font-bold">IP Address</th>
                    <th className="px-6 py-4 font-bold">Action Performed</th>
                    <th className="px-6 py-4 font-bold">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {activityLog.map((log, i) => (
                    <tr
                      key={i}
                      className={cn(
                        "hover:bg-secondary/20 transition-colors",
                        log.status === "critical" && "bg-cyber-red/5"
                      )}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-2 h-2">
                            <div
                              className={cn(
                                "w-2 h-2 rounded-full",
                                statusStyles[log.status]
                              )}
                            />
                          </div>
                          <span className="font-bold text-foreground">{log.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-technical">
                        {log.timestamp}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-technical">
                        {log.ip}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "px-2 py-1 rounded-md text-[10px] border",
                            actionTypeStyles[log.actionType]
                          )}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "text-[10px] font-bold uppercase",
                            riskStyles[log.risk]
                          )}
                        >
                          {log.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </DashboardLayout>
  );
}
