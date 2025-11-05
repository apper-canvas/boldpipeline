import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const MetricCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendDirection, 
  className = "",
  gradient = "blue" 
}) => {
  const gradients = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600", 
    amber: "from-amber-500 to-amber-600",
    purple: "from-purple-500 to-purple-600",
    red: "from-red-500 to-red-600",
  };

  const trendColors = {
    up: "text-success",
    down: "text-error",
    flat: "text-gray-500",
  };

  return (
    <Card variant="premium" hover className={cn("p-6", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-secondary mb-2">{title}</p>
          <motion.p 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            {value}
          </motion.p>
          {trend && (
            <div className="flex items-center gap-1">
              <ApperIcon 
                name={trendDirection === "up" ? "TrendingUp" : trendDirection === "down" ? "TrendingDown" : "Minus"} 
                className={cn("w-4 h-4", trendColors[trendDirection])} 
              />
              <span className={cn("text-sm font-medium", trendColors[trendDirection])}>
                {trend}
              </span>
            </div>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-lg bg-gradient-to-br shadow-lg",
          gradients[gradient]
        )}>
          <ApperIcon name={icon} className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;