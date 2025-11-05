import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  icon = "Database",
  title = "No data found", 
  description = "There's nothing to display right now",
  actionLabel = "Add New",
  onAction,
  className = "" 
}) => {
  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 5 }
  };

  const containerVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
      className={`min-h-[400px] flex items-center justify-center ${className}`}
    >
      <div className="text-center space-y-6 max-w-md mx-auto p-6">
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center shadow-lg"
        >
          <ApperIcon name={icon} className="w-12 h-12 text-primary" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <h3 className="text-2xl font-bold gradient-text">
            {title}
          </h3>
          <p className="text-secondary leading-relaxed">
            {description}
          </p>
        </motion.div>

        {onAction && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAction}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            {actionLabel}
          </motion.button>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center space-x-2"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5, 
                delay: i * 0.2 
              }}
              className="w-2 h-2 bg-gradient-to-r from-primary to-blue-600 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Empty;