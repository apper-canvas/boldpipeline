import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import DealCard from "@/components/molecules/DealCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { dealService } from "@/services/api/dealService";
import { stageService } from "@/services/api/stageService";

const PipelineBoard = () => {
  const [deals, setDeals] = useState([]);
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [draggedDeal, setDraggedDeal] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const [dealsData, stagesData] = await Promise.all([
        dealService.getAll(),
        stageService.getAll()
      ]);
      
      setDeals(dealsData);
      setStages(stagesData);
    } catch (err) {
      setError("Failed to load pipeline data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStageDeals = (stageName) => {
    return deals.filter(deal => deal.stage === stageName);
  };

  const getStageValue = (stageName) => {
    return getStageDeals(stageName).reduce((total, deal) => total + deal.value, 0);
  };

  const handleDragStart = (e, deal) => {
    setDraggedDeal(deal);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, targetStage) => {
    e.preventDefault();
    
    if (!draggedDeal || draggedDeal.stage === targetStage) {
      setDraggedDeal(null);
      return;
    }

    try {
      const updatedDeal = await dealService.update(draggedDeal.Id, {
        ...draggedDeal,
        stage: targetStage,
        updatedAt: new Date().toISOString()
      });

      setDeals(prev => prev.map(deal => 
        deal.Id === draggedDeal.Id ? updatedDeal : deal
      ));

      toast.success(`Deal moved to ${targetStage}`);
    } catch (err) {
      toast.error("Failed to update deal");
    } finally {
      setDraggedDeal(null);
    }
  };

  const getStageColor = (stage) => {
    const colors = {
      Lead: "border-purple-500",
      Qualified: "border-blue-500",
      Proposal: "border-amber-500", 
      Negotiation: "border-orange-500",
      "Closed Won": "border-green-500",
      "Closed Lost": "border-red-500",
    };
    return colors[stage] || "border-gray-300";
  };

  if (loading) return <Loading type="pipeline" />;
  if (error) return <Error message={error} onRetry={loadData} />;
  if (deals.length === 0) return <Empty icon="Target" title="No deals in pipeline" description="Start by adding your first deal to track progress" />;

  return (
    <div className="h-full">
      <div className="flex space-x-6 overflow-x-auto pb-6">
        {stages.map((stage) => {
          const stageDeals = getStageDeals(stage.name);
          const stageValue = getStageValue(stage.name);
          
          return (
            <div
              key={stage.name}
              className="flex-shrink-0 w-80"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.name)}
            >
              <div className={`stage-header rounded-lg p-4 mb-4 ${getStageColor(stage.name)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                    <p className="text-sm text-secondary">
                      {stageDeals.length} deals • {formatCurrency(stageValue)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <ApperIcon name="MoreHorizontal" className="w-4 h-4 text-secondary" />
                  </div>
                </div>
              </div>

              <div className="space-y-3 min-h-[200px]">
                {stageDeals.map((deal, index) => (
                  <motion.div
                    key={deal.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, deal)}
                  >
                    <DealCard deal={deal} />
                  </motion.div>
                ))}
                
                {stageDeals.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <ApperIcon name="Target" className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Drop deals here</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineBoard;