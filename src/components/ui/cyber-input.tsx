import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface CyberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  rightIcon?: React.ReactNode;
}

const CyberInput = React.forwardRef<HTMLInputElement, CyberInputProps>(
  ({ className, type, icon: Icon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative flex items-center group">
        {Icon && (
          <Icon className="absolute left-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        )}
        <input
          type={type}
          className={cn(
            "flex h-14 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all font-light",
            Icon && "pl-12",
            rightIcon && "pr-12",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-4">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);
CyberInput.displayName = "CyberInput";

export { CyberInput };
