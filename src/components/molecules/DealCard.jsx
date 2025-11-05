import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import { format } from "date-fns";
import React from "react";
import { cn } from "@/utils/cn";

const DealCard = ({ deal, onClick, draggable = true, ...props }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStageVariant = (stage) => {
    const variants = {
      Lead: "lead",
      Qualified: "qualified", 
      Proposal: "proposal",
      Negotiation: "negotiation",
      "Closed Won": "won",
      "Closed Lost": "lost",
    };
    return variants[stage] || "default";
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 80) return "text-success";
    if (probability >= 60) return "text-warning";
    if (probability >= 40) return "text-amber-600";
    return "text-gray-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={draggable ? "pipeline-card" : ""}
      {...props}
    >
      <Card 
        variant="elevated" 
        hover 
        onClick={onClick}
        className="p-4 space-y-3 cursor-pointer"
      >
        <div className="flex items-start justify-between">
<h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
            {deal.title_c || deal.Name}
          </h3>
          <Badge variant={getStageVariant(deal.stage_c || deal.stage)} size="sm">
            {deal.stage_c || deal.stage}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
<span className="text-2xl font-bold gradient-text">
              {formatCurrency(deal.value_c || deal.value || 0)}
            </span>
            <div className="flex items-center gap-1">
              <ApperIcon name="Target" className={cn("w-3 h-3", getProbabilityColor(deal.probability_c || deal.probability || 0))} />
              <span className={cn("text-xs font-medium", getProbabilityColor(deal.probability_c || deal.probability || 0))}>
                {deal.probability_c || deal.probability || 0}%
              </span>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
animate={{ width: `${deal.probability_c || deal.probability || 0}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={cn(
                "h-2 rounded-full bg-gradient-to-r",
                (deal.probability_c || deal.probability || 0) >= 80 ? "from-success to-green-600" :
                (deal.probability_c || deal.probability || 0) >= 60 ? "from-warning to-amber-600" :
                (deal.probability_c || deal.probability || 0) >= 40 ? "from-amber-500 to-amber-600" :
                "from-gray-400 to-gray-500"
              )}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-secondary">
          <div className="flex items-center gap-1">
            <ApperIcon name="User" className="w-3 h-3" />
<span className="truncate">{deal.contact_name_c || deal.contactName}</span>
          </div>
          <div className="flex items-center gap-1">
            <ApperIcon name="Calendar" className="w-3 h-3" />
            <span>{format(new Date(deal.expected_close_date_c || deal.expectedCloseDate || new Date()), "MMM dd")}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default DealCard;