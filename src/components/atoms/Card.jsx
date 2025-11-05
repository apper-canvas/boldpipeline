import React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({ 
  className, 
  variant = "default",
  hover = false,
  children, 
  ...props 
}, ref) => {
  const baseClasses = "bg-white rounded-lg border border-gray-200 transition-all duration-200";
  
  const variants = {
    default: "shadow-sm",
    elevated: "shadow-md",
    premium: "shadow-lg bg-gradient-to-br from-white to-gray-50",
    glass: "glass-effect shadow-lg",
  };

  const hoverClasses = hover ? "card-hover cursor-pointer" : "";

  return (
    <div
      className={cn(
        baseClasses,
        variants[variant],
        hoverClasses,
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;