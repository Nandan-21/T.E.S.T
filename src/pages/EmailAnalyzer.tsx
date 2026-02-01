import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Header } from "@/components/layout/Header";
import { ThreatGauge } from "@/components/dashboard/ThreatGauge";
import { ForensicEvidence } from "@/components/dashboard/ForensicEvidence";
import { AIAnnotation } from "@/components/dashboard/AIAnnotation";
import { CyberButton } from "@/components/ui/cyber-button";
import { Zap, Mail, Code, BookOpen, Clock, Link2Off, AlertTriangle, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const sampleEmail = `From: info@paypaI-secure.com
Subject: Urgent: Your account has been suspended!
Dear Customer, we noticed unusual activity on your account. To prevent permanent suspension, please click the link below within 2 hours to verify your identity. Failure to comply will result in account deletion.
http://verify-secure-login-392.com/paypaI/login`;

const forensicItems = [
  {
    status: "fail" as const,
    title: "SPF/DKIM Mismatch",
    description: "The sender's IP is not authorized to send mail for paypaI.com.",
  },
  {
    status: "pass" as const,
    title: "Encryption Check",
    description: "Email was sent over a secure TLS connection.",
  },
  {
    status: "warning" as const,
    title: "Brand Hijacking",
    description: "AI identified 4 logo variants commonly used in phishing scams.",
  },
];

export default function EmailAnalyzer() {
  const [emailContent, setEmailContent] = useState(sampleEmail);
  const [deepHeaderScan, setDeepHeaderScan] = useState(false);
  const [ocrDetection, setOcrDetection] = useState(true);
  const [activeTab, setActiveTab] = useState<"body" | "headers">("body");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <DashboardLayout>
      <Header title="EMAIL_PHISHING_ANALYZER" subtitle="AI-Driven Analysis" />

      <main className="flex-1 overflow-y-auto cyber-grid">
        <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
          {/* Page Header */}
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-widest">
              <a href="/" className="hover:text-primary transition-colors">
                Modules
              </a>
              <span>›</span>
              <span className="text-primary">Email Phishing Analyzer</span>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-black text-foreground font-technical tracking-tighter uppercase">
                  Phishing Analyzer
                </h1>
                <p className="text-muted-foreground mt-1 max-w-xl">
                  Deep AI-driven forensic inspection and behavioral analysis for students and small organizations.
                </p>
              </div>
              <CyberButton variant="outline">
                <BookOpen className="h-4 w-4" />
                View Analysis Docs
              </CyberButton>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6 flex-1">
            {/* Left Column - Email Input */}
            <motion.div
              className="flex-[3] flex flex-col gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="glass-panel rounded-xl overflow-hidden flex flex-col flex-1 min-h-[500px] relative">
                {/* Tabs */}
                <div className="flex border-b border-border bg-secondary/30">
                  <button
                    onClick={() => setActiveTab("body")}
                    className={`px-6 py-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                      activeTab === "body"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Mail className="h-4 w-4" />
                    Email Body
                  </button>
                  <button
                    onClick={() => setActiveTab("headers")}
                    className={`px-6 py-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                      activeTab === "headers"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Code className="h-4 w-4" />
                    Technical Headers
                  </button>
                </div>

                {/* Textarea */}
                <div className="relative flex-1">
                  <div className="absolute inset-x-0 top-1/2 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-30 pointer-events-none" />
                  <textarea
                    className="w-full h-full bg-transparent border-none focus:ring-0 p-8 text-muted-foreground font-technical text-sm leading-relaxed placeholder:text-muted-foreground/50 resize-none"
                    placeholder="Paste email content here for analysis..."
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                  />
                </div>

                {/* Controls */}
                <div className="p-4 border-t border-border bg-secondary/30 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          deepHeaderScan
                            ? "bg-primary border-primary"
                            : "border-muted-foreground group-hover:border-primary"
                        }`}
                        onClick={() => setDeepHeaderScan(!deepHeaderScan)}
                      >
                        {deepHeaderScan && (
                          <div className="w-3 h-3 bg-primary-foreground rounded-sm" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">
                        Deep Header Scan
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          ocrDetection
                            ? "bg-primary border-primary"
                            : "border-muted-foreground group-hover:border-primary"
                        }`}
                        onClick={() => setOcrDetection(!ocrDetection)}
                      >
                        {ocrDetection && (
                          <div className="w-3 h-3 bg-primary-foreground rounded-sm" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">
                        OCR Link Detection
                      </span>
                    </label>
                  </div>

                  <CyberButton onClick={handleAnalyze} disabled={isAnalyzing}>
                    <Zap className="h-4 w-4" />
                    {isAnalyzing ? "ANALYZING..." : "RUN AI ANALYSIS"}
                  </CyberButton>
                </div>
              </div>

              {/* AI Annotations */}
              <div className="flex flex-col gap-3">
                <h3 className="text-foreground text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                  AI Annotations (3 Flagged Points)
                </h3>

                <AIAnnotation
                  severity="critical"
                  icon={Clock}
                  title="Sense of Urgency detected"
                  quote="...please click the link below within 2 hours..."
                  description="Psychological Manipulation: Phishers use tight deadlines to bypass your critical thinking skills. This is a classic tactic to induce panic."
                />

                <AIAnnotation
                  severity="warning"
                  icon={Link2Off}
                  title="Homograph Domain Attack"
                  quote="paypaI.com (The 'l' is an uppercase 'I')"
                  description="Technical Detection: The sender domain uses visually similar characters to mimic a legitimate brand. Actual destination:"
                  highlight="verify-secure-login-392.com"
                />
              </div>
            </motion.div>

            {/* Right Column - Analysis Results */}
            <motion.div
              className="flex-1 flex flex-col gap-6 min-w-[320px]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Threat Gauge */}
              <ThreatGauge percentage={86} label="High Risk" severity="critical" />

              {/* Sub Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 p-3 rounded-lg border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">
                    Sender Reputation
                  </p>
                  <p className="text-cyber-red font-technical text-lg font-bold">Critical</p>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">
                    Link Safety
                  </p>
                  <p className="text-warning font-technical text-lg font-bold">Suspicious</p>
                </div>
              </div>

              {/* Forensic Evidence */}
              <ForensicEvidence items={forensicItems} />

              {/* Pro Tip */}
              <div className="mt-auto bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 rounded-xl p-6">
                <p className="text-xs font-bold text-primary mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  PRO TIP
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  You can automatically block this sender across your organization with one click.
                </p>
                <CyberButton variant="secondary" className="w-full">
                  Blacklist Sender Domain
                </CyberButton>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
