import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { CyberButton } from "@/components/ui/cyber-button";
import { Shield, Home, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 cyber-grid opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyber-red/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-cyber-red/10 border border-cyber-red/20">
            <AlertTriangle className="h-16 w-16 text-cyber-red" />
          </div>
        </div>

        <h1 className="text-8xl font-black text-foreground font-technical tracking-tighter mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Access Denied
        </h2>
        
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The requested resource could not be located within the T.E.S.T. security perimeter. 
          This incident has been logged.
        </p>

        <div className="flex gap-4 justify-center">
          <Link to="/">
            <CyberButton>
              <Home className="h-4 w-4" />
              Return to Command Center
            </CyberButton>
          </Link>
          <Link to="/login">
            <CyberButton variant="outline">
              <Shield className="h-4 w-4" />
              Re-authenticate
            </CyberButton>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
