import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import { cn } from "@/utils/cn";

const SearchBar = ({ 
  placeholder = "Search...", 
  onSearch, 
  className = "",
  value: controlledValue,
  onChange: controlledOnChange,
}) => {
  const [internalValue, setInternalValue] = useState("");
  
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    
    if (isControlled) {
      controlledOnChange?.(e);
    } else {
      setInternalValue(newValue);
    }
    
    onSearch?.(newValue);
  };

  const handleClear = () => {
    if (isControlled) {
      controlledOnChange?.({ target: { value: "" } });
    } else {
      setInternalValue("");
    }
    onSearch?.("");
  };

  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="pl-10 pr-10"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
        >
          <ApperIcon name="X" className="h-4 w-4 text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;