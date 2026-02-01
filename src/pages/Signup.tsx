import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CyberButton } from "@/components/ui/cyber-button";
import { CyberInput } from "@/components/ui/cyber-input";
import { Shield, User, Building2, Mail, Lock, Eye, EyeOff, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: "Weak", color: "bg-cyber-red" };
  if (score <= 2) return { score: 2, label: "Fair", color: "bg-warning" };
  if (score <= 3) return { score: 3, label: "Strong", color: "bg-primary" };
  return { score: 4, label: "Resistant", color: "bg-primary" };
}

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 cyber-grid opacity-40" />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <Shield className="h-10 w-10 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-foreground text-xl font-technical font-bold tracking-widest leading-none">
              T.E.S.T.
            </h2>
            <span className="text-[10px] text-primary/70 font-technical uppercase tracking-[0.2em] mt-0.5">
              Threat Evaluation & Security Tool
            </span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              Academy
            </a>
          </nav>
          <div className="h-6 w-[1px] bg-border hidden md:block" />
          <span className="text-muted-foreground text-sm">
            Already a member?{" "}
            <Link to="/login" className="text-primary font-bold ml-1">
              Log In
            </Link>
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          className="glass-panel w-full max-w-[560px] rounded-xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/5 border border-primary/20">
                <Shield className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-foreground font-technical text-3xl md:text-4xl font-bold mb-3">
              Initialize Identity
            </h1>
            <p className="text-muted-foreground text-base">
              Secure your presence within the Threat Evaluation & Security Tool network.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-muted-foreground text-xs font-bold uppercase tracking-widest px-1">
                  Full Name
                </label>
                <CyberInput
                  type="text"
                  icon={User}
                  placeholder="e.g., Alex Rivers"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-muted-foreground text-xs font-bold uppercase tracking-widest px-1">
                  Role / Org
                </label>
                <CyberInput
                  type="text"
                  icon={Building2}
                  placeholder="e.g., Security Lead"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-muted-foreground text-xs font-bold uppercase tracking-widest px-1">
                Secure Email
              </label>
              <CyberInput
                type="email"
                icon={Mail}
                placeholder="name@organization.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-muted-foreground text-xs font-bold uppercase tracking-widest px-1">
                Neural Key (Password)
              </label>
              <CyberInput
                type={showPassword ? "text" : "password"}
                icon={Lock}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

              {/* Password Strength Indicator */}
              <div className="mt-2 px-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">
                    Entropy Score
                  </span>
                  <span
                    className={cn(
                      "text-[10px] uppercase font-bold tracking-widest",
                      password.length > 0 ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {password.length > 0 ? strength.label : "—"}
                  </span>
                </div>
                <div className="flex gap-1.5 h-1.5 w-full">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={cn(
                        "flex-1 rounded-full transition-all",
                        password.length > 0 && level <= strength.score
                          ? strength.color
                          : "bg-secondary"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <CyberButton type="submit" className="w-full h-14 text-base">
                Initialize T.E.S.T. Account
                <Zap className="h-5 w-5" />
              </CyberButton>
            </div>

            <p className="text-[11px] text-muted-foreground text-center px-4 leading-relaxed">
              By proceeding, you verify your identity and agree to the{" "}
              <a
                href="#"
                className="text-muted-foreground/70 underline hover:text-primary transition-colors"
              >
                T.E.S.T. Protocols
              </a>{" "}
              and AI Data Handling policies.
            </p>
          </form>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-xs">
          <div className="flex items-center gap-6">
            <span>©  T.E.S.T. AI Defense</span>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Engagement
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Sanctum
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="uppercase tracking-widest text-[10px]">Neural Link Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
