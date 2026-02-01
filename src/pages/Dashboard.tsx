import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityTable } from "@/components/dashboard/ActivityTable";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { Radar, TrendingDown, AlertTriangle, Shield, Mail } from "lucide-react";
import { motion } from "framer-motion";

const activityData = [
  {
    timestamp: "2026-11-20 14:23:01",
    asset: "dev.test-tool.io",
    assetSub: "192.168.1.1",
    module: "WVS SCAN",
    moduleColor: "primary",
    severity: "critical" as const,
    status: "Completed",
    action: "REPORTS",
  },
  {
    timestamp: "2026-11-20 13:45:12",
    asset: "Internal Mail Server",
    assetSub: "Exchange-Hub-01",
    module: "EMAIL ANALYZER",
    moduleColor: "purple",
    severity: "clean" as const,
    status: "Filtered",
    action: "DETAILS",
  },
  {
    timestamp: "2026-11-20 11:10:44",
    asset: "staging-api.v3",
    assetSub: "AWS-EC2-Instance",
    module: "LOG SOC",
    moduleColor: "primary",
    severity: "high" as const,
    status: "Processing",
    action: "MONITOR",
  },
  {
    timestamp: "2026-11-20 09:15:22",
    asset: "customer-db-primary",
    assetSub: "DB-CLUSTER-01",
    module: "AI CORE",
    moduleColor: "primary",
    severity: "optimal" as const,
    status: "Scanning",
    action: "LIVE VIEW",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Header title="SYSTEM_OVERVIEW" />

      <main className="flex-1 overflow-y-auto cyber-grid">
        <motion.div
          className="p-8 space-y-8 max-w-[1400px] mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Unified Threat Overview */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
                <span className="w-1 h-6 bg-primary rounded-full" />
                Unified Threat Overview
              </h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-secondary/50 rounded-full text-xs text-muted-foreground border border-border">
                  Real-time Syncing
                </span>
                <span className="px-3 py-1 bg-success/10 text-success rounded-full text-xs border border-success/20">
                  Secure
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                label="Overall Risk Score"
                value="24.8"
                icon={Radar}
                trend={{ value: "-5%", direction: "down", label: "from last 24h" }}
                severity="low"
                showRadial
                radialValue={24.8}
                radialLabel="LOW"
              />
              <StatCard
                label="Active Threats"
                value="12"
                icon={AlertTriangle}
                trend={{ value: "!", direction: "up", label: "2 critical alerts pending" }}
                severity="high"
                showRadial
                radialValue={65}
                radialLabel="HIGH"
              />
              <StatCard
                label="AI Core Confidence"
                value="98.2"
                icon={Radar}
                trend={{ value: "✓", direction: "down", label: "Optimization optimal" }}
                severity="low"
                showRadial
                radialValue={98.2}
                radialLabel="PEAK"
              />
            </div>
          </motion.section>

          {/* Quick Actions */}
          <motion.section variants={itemVariants}>
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6 text-foreground">
              <span className="w-1 h-6 bg-primary rounded-full" />
              Quick Actions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <QuickActionCard
                title="Web Vulnerability Scan"
                description="Initiate a deep surface audit on your web assets. Detects XSS, SQLi, and misconfigurations."
                icon={Shield}
                actionLabel="START SCAN"
                inputPlaceholder="https://your-app.com"
                variant="input"
              />
              <QuickActionCard
                title="AI Email Header Analysis"
                description="Paste email headers to detect spoofing, phishing signatures, and malicious origin relays."
                icon={Mail}
                actionLabel="ANALYZE"
                inputPlaceholder="Drag & drop raw header file here"
                variant="dropzone"
              />
            </div>
          </motion.section>

          {/* Activity Table */}
          <motion.section variants={itemVariants}>
            <ActivityTable
              title="Recent Activity & Scan History"
              items={activityData}
              onViewAll={() => console.log("View all")}
            />
          </motion.section>

          {/* Footer */}
          <motion.footer
            variants={itemVariants}
            className="py-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success" />
                <span className="text-xs text-muted-foreground font-technical">
                  ENCRYPTED_LINK_ESTABLISHED
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                © 2024 T.E.S.T. Cyber Systems. All rights reserved.
              </div>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Documentation
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Support API
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Status
              </a>
            </div>
          </motion.footer>
        </motion.div>
      </main>
    </DashboardLayout>
  );
}

