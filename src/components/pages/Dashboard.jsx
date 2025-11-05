import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import MetricCard from "@/components/molecules/MetricCard";
import DealCard from "@/components/molecules/DealCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { dealService } from "@/services/api/dealService";
import { contactService } from "@/services/api/contactService";
import { activityService } from "@/services/api/activityService";
import { format } from "date-fns";

const Dashboard = () => {
  const [deals, setDeals] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const [dealsData, contactsData, activitiesData] = await Promise.all([
        dealService.getAll(),
        contactService.getAll(),
        activityService.getAll()
      ]);
      
      setDeals(dealsData);
      setContacts(contactsData);
      setActivities(activitiesData);
    } catch (err) {
      setError("Failed to load dashboard data");
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

  const calculateMetrics = () => {
    const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
    const activeDeals = deals.filter(deal => !["Closed Won", "Closed Lost"].includes(deal.stage));
    const wonDeals = deals.filter(deal => deal.stage === "Closed Won");
    const conversionRate = deals.length > 0 ? Math.round((wonDeals.length / deals.length) * 100) : 0;
    
    return {
      totalValue,
      activeDeals: activeDeals.length,
      wonDeals: wonDeals.length,
      conversionRate,
      totalContacts: contacts.length,
    };
  };

  const getRecentActivities = () => {
    return activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);
  };

  const getTopDeals = () => {
    return deals
      .filter(deal => !["Closed Won", "Closed Lost"].includes(deal.stage))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  };

  const getActivityIcon = (type) => {
    const icons = {
      call: "Phone",
      email: "Mail",
      meeting: "Calendar",
      note: "FileText",
    };
    return icons[type] || "Activity";
  };

  const getActivityColor = (type) => {
    const colors = {
      call: "text-blue-600",
      email: "text-green-600",
      meeting: "text-purple-600",
      note: "text-amber-600",
    };
    return colors[type] || "text-gray-600";
  };

  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadData} />;

  const metrics = calculateMetrics();
  const recentActivities = getRecentActivities();
  const topDeals = getTopDeals();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold gradient-text">Dashboard</h1>
          <p className="text-secondary mt-1">Welcome back! Here's your pipeline overview.</p>
        </div>
        <div className="text-sm text-secondary">
          {format(new Date(), "EEEE, MMMM do, yyyy")}
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <MetricCard
          title="Total Pipeline Value"
          value={formatCurrency(metrics.totalValue)}
          icon="DollarSign"
          gradient="green"
          trend="+12%"
          trendDirection="up"
        />
        <MetricCard
          title="Active Deals"
          value={metrics.activeDeals.toString()}
          icon="Target"
          gradient="blue"
          trend="+5 this week"
          trendDirection="up"
        />
        <MetricCard
          title="Deals Won"
          value={metrics.wonDeals.toString()}
          icon="Trophy"
          gradient="amber"
          trend="+3 this month"
          trendDirection="up"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${metrics.conversionRate}%`}
          icon="TrendingUp"
          gradient="purple"
          trend="+2% vs last month"
          trendDirection="up"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Deals */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Top Deals</h2>
            <ApperIcon name="MoreHorizontal" className="w-4 h-4 text-secondary" />
          </div>
          <div className="space-y-3">
            {topDeals.length > 0 ? (
              topDeals.map((deal, index) => (
                <motion.div
                  key={deal.Id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <DealCard deal={deal} draggable={false} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <ApperIcon name="Target" className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">No active deals</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
            <ApperIcon name="MoreHorizontal" className="w-4 h-4 text-secondary" />
          </div>
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.Id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="p-4 flex items-start space-x-3"
                >
                  <div className={`p-2 rounded-lg bg-gray-50 ${getActivityColor(activity.type)}`}>
                    <ApperIcon name={getActivityIcon(activity.type)} className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 font-medium">
                      {activity.description}
                    </p>
                    <p className="text-xs text-secondary mt-1">
                      {format(new Date(activity.timestamp), "MMM dd, h:mm a")}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <ApperIcon name="Activity" className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">No recent activities</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;