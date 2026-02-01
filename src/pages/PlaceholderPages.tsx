import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Header } from "@/components/layout/Header";
import { CyberButton } from "@/components/ui/cyber-button";
import { motion } from "framer-motion";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  subtitle?: string;
}

export function PlaceholderPage({ title, subtitle }: PlaceholderPageProps) {
  return (
    <DashboardLayout>
      <Header title={title} subtitle={subtitle} />
      
      <main className="flex-1 overflow-y-auto cyber-grid">
        <motion.div 
          className="h-full flex flex-col items-center justify-center gap-6 p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="p-6 rounded-full bg-primary/10 border border-primary/20">
            <Construction className="h-16 w-16 text-primary" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {title} Module
            </h2>
            <p className="text-muted-foreground max-w-md">
              This module is currently under development. The T.E.S.T. security team is working on advanced features for this section.
            </p>
          </div>
          <CyberButton variant="outline">
            Request Early Access
          </CyberButton>
        </motion.div>
      </main>
    </DashboardLayout>
  );
}

export function ScannerPage() {
  return <PlaceholderPage title="WVS_SCANNER" subtitle="Web Vulnerability Scanner" />;
}

export function LogSOCPage() {
  return <PlaceholderPage title="LOG_SOC" subtitle="Security Operations Center" />;
}

export function AICorePage() {
  return <PlaceholderPage title="AI_CORE" subtitle="Machine Learning Engine" />;
}
