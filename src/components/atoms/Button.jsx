import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-blue-600 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-primary shadow-md hover:shadow-lg",
    secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 hover:from-gray-200 hover:to-gray-300 focus:ring-gray-500 border border-gray-300",
    outline: "border-2 border-primary text-primary hover:bg-gradient-to-r hover:from-primary hover:to-blue-600 hover:text-white focus:ring-primary",
    ghost: "text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-900 focus:ring-gray-500",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:from-red-700 hover:to-red-800 focus:ring-red-500 shadow-md hover:shadow-lg",
    success: "bg-gradient-to-r from-success to-green-600 text-white hover:from-green-700 hover:to-green-800 focus:ring-green-500 shadow-md hover:shadow-lg",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
    xl: "px-8 py-4 text-lg gap-3",
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        disabled && "transform-none hover:scale-100",
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;