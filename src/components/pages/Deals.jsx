import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { dealService } from "@/services/api/dealService";
import { contactService } from "@/services/api/contactService";
import { format } from "date-fns";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("value");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterStage, setFilterStage] = useState("all");

  const loadData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const [dealsData, contactsData] = await Promise.all([
        dealService.getAll(),
        contactService.getAll()
      ]);
      
      setDeals(dealsData);
      setContacts(contactsData);
    } catch (err) {
      setError("Failed to load deals");
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
    }).format(amount);
  };

  const getContactName = (contactId) => {
    const contact = contacts.find(c => c.Id === contactId);
    return contact ? contact.name : "Unknown Contact";
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

  const stages = ["Lead", "Qualified", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];

  const filteredAndSortedDeals = () => {
    let filtered = deals;
    
    if (searchTerm) {
      filtered = filtered.filter(deal =>
        deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getContactName(deal.contactId).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStage !== "all") {
      filtered = filtered.filter(deal => deal.stage === filterStage);
    }
    
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === "expectedCloseDate") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return filtered;
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return "ArrowUpDown";
    return sortOrder === "asc" ? "ArrowUp" : "ArrowDown";
  };

  if (loading) return <Loading type="contacts" />;
  if (error) return <Error message={error} onRetry={loadData} />;

  const displayDeals = filteredAndSortedDeals();
  
  if (deals.length === 0) return <Empty icon="DollarSign" title="No deals yet" description="Create your first deal to start tracking opportunities" />;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold gradient-text">Deals</h1>
          <p className="text-secondary mt-1">Track all your sales opportunities</p>
        </div>
        <Button>
          <ApperIcon name="Plus" className="w-4 h-4" />
          Add Deal
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col lg:flex-row gap-4"
      >
        <div className="flex-1">
          <SearchBar
            placeholder="Search deals or contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Stages</option>
            {stages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
          <Button variant="outline" size="sm">
            <ApperIcon name="Filter" className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <ApperIcon name="Download" className="w-4 h-4" />
            Export
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("title")}
                >
                  <div className="flex items-center gap-1">
                    Deal
                    <ApperIcon name={getSortIcon("title")} className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("value")}
                >
                  <div className="flex items-center gap-1">
                    Value
                    <ApperIcon name={getSortIcon("value")} className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("probability")}
                >
                  <div className="flex items-center gap-1">
                    Probability
                    <ApperIcon name={getSortIcon("probability")} className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("expectedCloseDate")}
                >
                  <div className="flex items-center gap-1">
                    Expected Close
                    <ApperIcon name={getSortIcon("expectedCloseDate")} className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayDeals.length > 0 ? (
                displayDeals.map((deal, index) => (
                  <motion.tr
                    key={deal.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{deal.title}</div>
                        <div className="text-sm text-secondary">
                          Created {format(new Date(deal.createdAt), "MMM dd, yyyy")}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStageVariant(deal.stage)} size="sm">
                        {deal.stage}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {formatCurrency(deal.value)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2 max-w-[80px]">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-primary to-blue-600"
                            style={{ width: `${deal.probability}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-600 min-w-[40px]">
                          {deal.probability}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {getContactName(deal.contactId)}
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary">
                      {format(new Date(deal.expectedCloseDate), "MMM dd, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-secondary hover:text-gray-900 transition-colors">
                        <ApperIcon name="MoreHorizontal" className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <ApperIcon name="Search" className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">No deals match your search</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
      
      {displayDeals.length > 0 && (
        <div className="flex items-center justify-between text-sm text-secondary">
          <p>Showing {displayDeals.length} of {deals.length} deals</p>
          <p>
            Total value: {formatCurrency(displayDeals.reduce((sum, deal) => sum + deal.value, 0))}
          </p>
        </div>
      )}
    </div>
  );
};

export default Deals;