import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "md",
  children, 
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full transition-all duration-200";
  
  const variants = {
    default: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800",
    primary: "bg-gradient-to-r from-primary to-blue-600 text-white shadow-sm",
    secondary: "bg-gradient-to-r from-secondary to-slate-600 text-white shadow-sm",
    success: "bg-gradient-to-r from-success to-green-600 text-white shadow-sm",
    warning: "bg-gradient-to-r from-warning to-amber-600 text-white shadow-sm",
    error: "bg-gradient-to-r from-error to-red-600 text-white shadow-sm",
    info: "bg-gradient-to-r from-info to-blue-600 text-white shadow-sm",
    lead: "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-sm",
    qualified: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm",
    proposal: "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm",
    negotiation: "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-sm",
    won: "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm",
    lost: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  return (
    <span
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;