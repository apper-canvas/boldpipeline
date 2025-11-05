import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className, 
  type = "text",
  label,
  error,
  required,
  ...props 
}, ref) => {
  const baseClasses = "w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder-gray-400";
  
  const errorClasses = error ? "border-error focus:ring-error" : "";

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        className={cn(
          baseClasses,
          errorClasses,
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;