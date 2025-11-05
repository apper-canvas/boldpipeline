import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`min-h-[400px] flex items-center justify-center ${className}`}
    >
      <div className="text-center space-y-6 max-w-md mx-auto p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center"
        >
          <ApperIcon name="AlertTriangle" className="w-10 h-10 text-error" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h3 className="text-xl font-semibold text-gray-900">
            Oops! Something went wrong
          </h3>
          <p className="text-secondary text-sm leading-relaxed">
            {message}
          </p>
        </motion.div>

        {onRetry && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
            Try Again
          </motion.button>
        )}

        <div className="text-xs text-gray-400 space-y-1">
          <p>If this problem persists, please contact support</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Error;