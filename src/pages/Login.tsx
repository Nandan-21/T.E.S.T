import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CyberButton } from "@/components/ui/cyber-button";
import { CyberInput } from "@/components/ui/cyber-input";
import { Shield, Mail, Lock, Eye, EyeOff, Terminal, LogIn } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdminMode) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden bg-background ${isAdminMode ? 'admin-mode' : ''}`}>
      {/* Hidden Admin Toggle - Bottom Right Corner */}
      <button
        onClick={() => setIsAdminMode(!isAdminMode)}
        className="fixed bottom-4 right-4 z-50 opacity-[0.03] hover:opacity-20 transition-opacity cursor-crosshair p-2"
        title="Toggle Admin Mode"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={isAdminMode ? "text-destructive" : "text-foreground"}
        >
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2"/>
          <path d="M12 20v2"/>
          <path d="m4.93 4.93 1.41 1.41"/>
          <path d="m17.66 17.66 1.41 1.41"/>
          <path d="M2 12h2"/>
          <path d="M20 12h2"/>
          <path d="m6.34 17.66-1.41 1.41"/>
          <path d="m19.07 4.93-1.41 1.41"/>
        </svg>
      </button>

      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 cyber-grid opacity-40" />
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] ${isAdminMode ? 'bg-destructive/10' : 'bg-primary/10'} rounded-full blur-[120px] transition-colors duration-500`} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 w-full max-w-[440px] mx-auto px-6 py-12 min-h-screen flex flex-col justify-center">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={`inline-flex items-center justify-center p-3 rounded-xl ${isAdminMode ? 'bg-destructive/10 border-destructive/20' : 'bg-primary/10 border-primary/20'} border mb-4 transition-colors duration-300`}>
            <Shield className={`h-8 w-8 ${isAdminMode ? 'text-destructive' : 'text-primary'} transition-colors duration-300`} />
          </div>
          <h4 className={`${isAdminMode ? 'text-destructive' : 'text-primary'} font-technical font-bold tracking-[0.3em] uppercase text-lg mb-0 transition-colors duration-300`}>
            T.E.S.T.
          </h4>
          <p className="text-muted-foreground font-technical text-[10px] uppercase tracking-[0.15em] mb-4">
            Threat Evaluation & Security Tool
          </p>
          <h1 className="text-foreground text-3xl font-bold tracking-tight">
            {isAdminMode ? "Admin Console Access" : "Customer Access"}
          </h1>
        </motion.div>

        <motion.div
          className={`glass-panel rounded-xl p-8 shadow-2xl relative overflow-hidden ${isAdminMode ? 'border-destructive/20' : ''} transition-colors duration-300`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Status Badge */}
          <div className="absolute top-0 right-0 p-4">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${isAdminMode ? 'bg-destructive/10 border-destructive/20' : 'bg-primary/10 border-primary/20'} border transition-colors duration-300`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isAdminMode ? 'bg-destructive' : 'bg-primary'} opacity-75 transition-colors duration-300`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isAdminMode ? 'bg-destructive' : 'bg-primary'} transition-colors duration-300`} />
              </span>
              <span className={`text-[10px] font-bold ${isAdminMode ? 'text-destructive' : 'text-primary'} uppercase tracking-wider transition-colors duration-300`}>
                AI-Shield Active
              </span>
            </div>
          </div>

          <form className="space-y-6 pt-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-muted-foreground text-xs font-bold uppercase tracking-widest ml-1">
                Institutional Email
              </label>
              <CyberInput
                type="email"
                icon={Mail}
                placeholder="name@organization.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={isAdminMode ? '[&:focus-within]:border-destructive/50 [&:focus-within]:shadow-[inset_0_0_8px_rgba(255,49,49,0.2),0_0_12px_rgba(255,49,49,0.1)]' : ''}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
                  Password
                </label>
                <a
                  href="#"
                  className={`${isAdminMode ? 'text-destructive/70 hover:text-destructive' : 'text-primary/70 hover:text-primary'} text-[11px] font-bold uppercase tracking-wider transition-colors`}
                >
                  Forgot?
                </a>
              </div>
              <CyberInput
                type={showPassword ? "text" : "password"}
                icon={Lock}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={isAdminMode ? '[&:focus-within]:border-destructive/50 [&:focus-within]:shadow-[inset_0_0_8px_rgba(255,49,49,0.2),0_0_12px_rgba(255,49,49,0.1)]' : ''}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />
            </div>

            {isAdminMode ? (
              <CyberButton 
                type="submit" 
                className="w-full bg-destructive hover:bg-destructive/90 text-white"
              >
                <Terminal className="h-4 w-4 mr-2" />
                Initialize Root Access
              </CyberButton>
            ) : (
              <CyberButton type="submit" className="w-full">
                <LogIn className="h-4 w-4 mr-2" />
                Authorize Session
              </CyberButton>
            )}
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground text-sm">
              New operative?{" "}
              <Link
                to="/signup"
                className={`${isAdminMode ? 'text-destructive' : 'text-primary'} font-bold hover:underline underline-offset-4 ml-1 transition-colors`}
              >
                Create Account
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-all cursor-default">
              <Shield className="h-5 w-5" />
              <span className="text-[10px] font-technical uppercase tracking-tighter">
                ISO 27001
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-all cursor-default">
              <Lock className="h-5 w-5" />
              <span className="text-[10px] font-technical uppercase tracking-tighter">
                E2E AES-256
              </span>
            </div>
          </div>
          <div className="flex gap-4 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <span className="text-border">•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <span className="text-border">•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Support
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
