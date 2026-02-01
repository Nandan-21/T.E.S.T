import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Header } from "@/components/layout/Header";
import { CyberButton } from "@/components/ui/cyber-button";
import { CyberInput } from "@/components/ui/cyber-input";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Globe, 
  Server, 
  Lock, 
  Code, 
  Database,
  Eye,
  FileWarning,
  RefreshCw,
  Download,
  ExternalLink,
  Zap
} from "lucide-react";

interface Vulnerability {
  id: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  title: string;
  description: string;
  location: string;
  recommendation: string;
}

const mockVulnerabilities: Vulnerability[] = [
  {
    id: "1",
    type: "XSS",
    severity: "critical",
    title: "Reflected Cross-Site Scripting (XSS)",
    description: "User input is reflected in the response without proper sanitization, allowing injection of malicious scripts.",
    location: "/search?q=<script>",
    recommendation: "Implement input validation and output encoding. Use Content-Security-Policy headers."
  },
  {
    id: "2",
    type: "SQLi",
    severity: "critical",
    title: "SQL Injection Vulnerability",
    description: "Database queries are constructed using unsanitized user input, potentially allowing data exfiltration.",
    location: "/api/users?id=1' OR '1'='1",
    recommendation: "Use parameterized queries or prepared statements. Never concatenate user input directly."
  },
  {
    id: "3",
    type: "SSL",
    severity: "high",
    title: "Outdated TLS Version",
    description: "Server supports TLS 1.0/1.1 which have known vulnerabilities and are deprecated.",
    location: "Server Configuration",
    recommendation: "Disable TLS 1.0 and 1.1. Enable only TLS 1.2 and 1.3."
  },
  {
    id: "4",
    type: "HEADERS",
    severity: "medium",
    title: "Missing Security Headers",
    description: "X-Frame-Options, X-Content-Type-Options, and Strict-Transport-Security headers are not set.",
    location: "HTTP Response Headers",
    recommendation: "Add security headers to prevent clickjacking and MIME-type attacks."
  },
  {
    id: "5",
    type: "INFO",
    severity: "low",
    title: "Server Version Disclosure",
    description: "Server banner reveals software version which aids attackers in identifying known vulnerabilities.",
    location: "Server: nginx/1.18.0",
    recommendation: "Configure server to hide version information in response headers."
  },
  {
    id: "6",
    type: "COOKIE",
    severity: "medium",
    title: "Insecure Cookie Configuration",
    description: "Session cookies are missing HttpOnly and Secure flags.",
    location: "Set-Cookie: session_id=abc123",
    recommendation: "Add HttpOnly, Secure, and SameSite attributes to all cookies."
  }
];

const scanStages = [
  { name: "DNS Resolution", icon: Globe, duration: 800 },
  { name: "Port Scanning", icon: Server, duration: 1200 },
  { name: "SSL/TLS Analysis", icon: Lock, duration: 1000 },
  { name: "XSS Detection", icon: Code, duration: 1500 },
  { name: "SQL Injection Testing", icon: Database, duration: 1800 },
  { name: "Header Analysis", icon: Eye, duration: 600 },
  { name: "Generating Report", icon: FileWarning, duration: 500 },
];

export default function ScannerPage() {
  const [targetUrl, setTargetUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(null);

  const startScan = () => {
    if (!targetUrl.trim()) return;
    
    setIsScanning(true);
    setScanComplete(false);
    setCurrentStage(0);
    setProgress(0);
    setVulnerabilities([]);
    setSelectedVuln(null);
  };

  useEffect(() => {
    if (!isScanning) return;

    const totalDuration = scanStages.reduce((sum, stage) => sum + stage.duration, 0);
    let elapsed = 0;

    const runStage = (stageIndex: number) => {
      if (stageIndex >= scanStages.length) {
        setIsScanning(false);
        setScanComplete(true);
        setVulnerabilities(mockVulnerabilities);
        setProgress(100);
        return;
      }

      setCurrentStage(stageIndex);
      const stageDuration = scanStages[stageIndex].duration;
      
      const progressInterval = setInterval(() => {
        elapsed += 50;
        const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
        setProgress(newProgress);
      }, 50);

      setTimeout(() => {
        clearInterval(progressInterval);
        runStage(stageIndex + 1);
      }, stageDuration);
    };

    runStage(0);
  }, [isScanning]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-500 bg-red-500/10 border-red-500/30";
      case "high": return "text-orange-500 bg-orange-500/10 border-orange-500/30";
      case "medium": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30";
      case "low": return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      default: return "text-muted-foreground bg-muted/10 border-border";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
      case "high":
        return <XCircle className="h-4 w-4" />;
      case "medium":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const criticalCount = vulnerabilities.filter(v => v.severity === "critical").length;
  const highCount = vulnerabilities.filter(v => v.severity === "high").length;
  const mediumCount = vulnerabilities.filter(v => v.severity === "medium").length;
  const lowCount = vulnerabilities.filter(v => v.severity === "low").length;

  return (
    <DashboardLayout>
      <Header title="WVS_SCANNER" subtitle="Web Vulnerability Scanner" />
      
      <main className="flex-1 overflow-y-auto cyber-grid">
        <motion.div 
          className="p-8 space-y-8 max-w-[1400px] mx-auto w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Scanner Input Section */}
          <motion.section 
            className="glass-card p-6 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Web Vulnerability Scanner</h2>
                <p className="text-sm text-muted-foreground">Initiate a deep surface audit on your web assets</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <CyberInput
                  placeholder="https://your-target-domain.com"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="h-14"
                  disabled={isScanning}
                />
              </div>
              <CyberButton 
                onClick={startScan} 
                disabled={isScanning || !targetUrl.trim()}
                className="h-14 px-8"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    START SCAN
                  </>
                )}
              </CyberButton>
            </div>

            {/* Scan Progress */}
            <AnimatePresence>
              {isScanning && (
                <motion.div 
                  className="mt-6 space-y-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-primary font-technical">
                      {scanStages[currentStage]?.name || "Complete"}
                    </span>
                    <span className="text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {scanStages.map((stage, index) => {
                      const StageIcon = stage.icon;
                      const isActive = index === currentStage;
                      const isComplete = index < currentStage;
                      
                      return (
                        <motion.div
                          key={stage.name}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                            isActive 
                              ? "bg-primary/20 border-primary/50 text-primary" 
                              : isComplete 
                                ? "bg-success/10 border-success/30 text-success"
                                : "bg-muted/10 border-border text-muted-foreground"
                          }`}
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <StageIcon className={`h-3 w-3 ${isActive ? "animate-pulse" : ""}`} />
                          {stage.name}
                          {isComplete && <CheckCircle2 className="h-3 w-3" />}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Results Section */}
          <AnimatePresence>
            {scanComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <motion.div 
                    className="glass-card p-4 rounded-xl border-red-500/30"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-red-500 font-bold uppercase">Critical</span>
                      <XCircle className="h-4 w-4 text-red-500" />
                    </div>
                    <p className="text-3xl font-bold text-red-500 mt-2">{criticalCount}</p>
                  </motion.div>
                  
                  <motion.div 
                    className="glass-card p-4 rounded-xl border-orange-500/30"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-orange-500 font-bold uppercase">High</span>
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                    </div>
                    <p className="text-3xl font-bold text-orange-500 mt-2">{highCount}</p>
                  </motion.div>
                  
                  <motion.div 
                    className="glass-card p-4 rounded-xl border-yellow-500/30"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-yellow-500 font-bold uppercase">Medium</span>
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    </div>
                    <p className="text-3xl font-bold text-yellow-500 mt-2">{mediumCount}</p>
                  </motion.div>
                  
                  <motion.div 
                    className="glass-card p-4 rounded-xl border-blue-400/30"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-blue-400 font-bold uppercase">Low</span>
                      <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    </div>
                    <p className="text-3xl font-bold text-blue-400 mt-2">{lowCount}</p>
                  </motion.div>
                </div>

                {/* Vulnerabilities List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <motion.section 
                    className="glass-card p-6 rounded-2xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-foreground">Detected Vulnerabilities</h3>
                      <CyberButton variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                        Export
                      </CyberButton>
                    </div>
                    
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                      {vulnerabilities.map((vuln, index) => (
                        <motion.div
                          key={vuln.id}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            selectedVuln?.id === vuln.id 
                              ? "border-primary bg-primary/5" 
                              : "border-border hover:border-primary/50 bg-muted/5"
                          }`}
                          onClick={() => setSelectedVuln(vuln)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span className={`px-2 py-1 rounded text-xs font-bold border ${getSeverityColor(vuln.severity)}`}>
                                {vuln.type}
                              </span>
                              <span className="text-sm font-medium text-foreground">{vuln.title}</span>
                            </div>
                            <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs uppercase font-bold ${getSeverityColor(vuln.severity)}`}>
                              {getSeverityIcon(vuln.severity)}
                              {vuln.severity}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{vuln.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>

                  {/* Vulnerability Details */}
                  <motion.section 
                    className="glass-card p-6 rounded-2xl"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="text-lg font-bold text-foreground mb-4">Vulnerability Details</h3>
                    
                    {selectedVuln ? (
                      <motion.div 
                        className="space-y-4"
                        key={selectedVuln.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${getSeverityColor(selectedVuln.severity)}`}>
                            {selectedVuln.severity.toUpperCase()}
                          </span>
                          <span className="text-xs text-muted-foreground">{selectedVuln.type}</span>
                        </div>
                        
                        <h4 className="text-xl font-bold text-foreground">{selectedVuln.title}</h4>
                        
                        <div className="space-y-3">
                          <div>
                            <span className="text-xs text-muted-foreground uppercase font-bold">Description</span>
                            <p className="text-sm text-foreground mt-1">{selectedVuln.description}</p>
                          </div>
                          
                          <div>
                            <span className="text-xs text-muted-foreground uppercase font-bold">Location</span>
                            <code className="block text-sm text-primary bg-primary/5 p-2 rounded mt-1 font-mono">
                              {selectedVuln.location}
                            </code>
                          </div>
                          
                          <div>
                            <span className="text-xs text-muted-foreground uppercase font-bold">Recommendation</span>
                            <p className="text-sm text-success mt-1">{selectedVuln.recommendation}</p>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <CyberButton variant="outline" size="sm" className="flex-1">
                            <ExternalLink className="h-4 w-4" />
                            Learn More
                          </CyberButton>
                          <CyberButton size="sm" className="flex-1">
                            <CheckCircle2 className="h-4 w-4" />
                            Mark Resolved
                          </CyberButton>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
                        Select a vulnerability to view details
                      </div>
                    )}
                  </motion.section>
                </div>

                {/* Scan Summary */}
                <motion.section 
                  className="glass-card p-6 rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Scan Complete</h3>
                      <p className="text-sm text-muted-foreground">
                        Target: <span className="text-primary">{targetUrl}</span> • 
                        Scanned at: {new Date().toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <CyberButton variant="outline" onClick={() => {
                        setScanComplete(false);
                        setVulnerabilities([]);
                        setSelectedVuln(null);
                      }}>
                        <RefreshCw className="h-4 w-4" />
                        New Scan
                      </CyberButton>
                      <CyberButton>
                        <Download className="h-4 w-4" />
                        Download Full Report
                      </CyberButton>
                    </div>
                  </div>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {!isScanning && !scanComplete && (
            <motion.section 
              className="glass-card p-12 rounded-2xl text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="p-6 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto mb-6">
                <Shield className="h-16 w-16 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Ready to Scan</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Enter a target URL above to initiate a comprehensive web vulnerability scan. 
                Detects XSS, SQL Injection, misconfigurations, and more.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-3 py-1.5 bg-muted/20 rounded-lg text-xs text-muted-foreground border border-border">XSS Detection</span>
                <span className="px-3 py-1.5 bg-muted/20 rounded-lg text-xs text-muted-foreground border border-border">SQL Injection</span>
                <span className="px-3 py-1.5 bg-muted/20 rounded-lg text-xs text-muted-foreground border border-border">SSL/TLS Analysis</span>
                <span className="px-3 py-1.5 bg-muted/20 rounded-lg text-xs text-muted-foreground border border-border">Header Security</span>
                <span className="px-3 py-1.5 bg-muted/20 rounded-lg text-xs text-muted-foreground border border-border">Port Scanning</span>
              </div>
            </motion.section>
          )}
        </motion.div>
      </main>
    </DashboardLayout>
  );
}
