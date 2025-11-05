import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ onMenuToggle, onQuickAdd }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
    // In a real app, this would trigger a global search
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name="Menu" className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="BarChart3" className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold gradient-text hidden sm:block">
              Pipeline Pro
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
          <SearchBar
            placeholder="Search contacts, deals, or companies..."
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="primary"
            size="sm"
            onClick={onQuickAdd}
            className="hidden sm:flex"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            Quick Add
          </Button>
          
          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative">
            <ApperIcon name="Bell" className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-error to-red-600 rounded-full"></span>
          </button>

          <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <ApperIcon name="User" className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden mt-4">
        <SearchBar
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </motion.header>
  );
};

export default Header;