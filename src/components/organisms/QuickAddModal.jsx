import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import { contactService } from "@/services/api/contactService";
import { dealService } from "@/services/api/dealService";

const QuickAddModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("contact");
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
  });
  const [dealData, setDealData] = useState({
    title: "",
    value: "",
    stage: "Lead",
    probability: "20",
    expectedCloseDate: "",
    contactId: "",
  });

const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await contactService.create({
        name_c: contactData.name,
        email_c: contactData.email,
        phone_c: contactData.phone,
        company_c: contactData.company,
        role_c: contactData.role,
        created_at_c: new Date().toISOString(),
        last_contact_date_c: new Date().toISOString(),
      });
      
      if (result) {
        toast.success("Contact added successfully!");
        setContactData({
          name: "",
          email: "",
          phone: "",
          company: "",
          role: "",
        });
        onClose();
      }
    } catch (error) {
      console.error("Error adding contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDealSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await dealService.create({
        title_c: dealData.title,
        value_c: parseFloat(dealData.value) || 0,
        stage_c: dealData.stage,
        probability_c: parseInt(dealData.probability) || 0,
        expected_close_date_c: dealData.expectedCloseDate,
        contact_id_c: parseInt(dealData.contactId) || 0,
        contact_name_c: dealData.contactName || "",
        created_at_c: new Date().toISOString(),
        updated_at_c: new Date().toISOString(),
      });
      
      if (result) {
        toast.success("Deal added successfully!");
        setDealData({
          title: "",
          value: "",
          stage: "Lead",
          probability: "20",
          expectedCloseDate: "",
          contactId: "",
        });
        onClose();
      }
    } catch (error) {
      console.error("Error adding deal:", error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "contact", label: "Contact", icon: "User" },
    { id: "deal", label: "Deal", icon: "DollarSign" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={onClose}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md"
            >
              <Card variant="premium" className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Add</h3>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <ApperIcon name="X" className="w-4 h-4" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-white text-primary shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <ApperIcon name={tab.icon} className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Contact Form */}
                {activeTab === "contact" && (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <Input
                      label="Full Name"
                      required
                      value={contactData.name}
                      onChange={(e) => setContactData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter full name"
                    />
                    <Input
                      label="Email"
                      type="email"
                      required
                      value={contactData.email}
                      onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email address"
                    />
                    <Input
                      label="Phone"
                      value={contactData.phone}
                      onChange={(e) => setContactData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter phone number"
                    />
                    <Input
                      label="Company"
                      value={contactData.company}
                      onChange={(e) => setContactData(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Enter company name"
                    />
                    <Input
                      label="Role"
                      value={contactData.role}
                      onChange={(e) => setContactData(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="Enter job title"
                    />
                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                        Cancel
                      </Button>
                      <Button type="submit" loading={loading} className="flex-1">
                        Add Contact
                      </Button>
                    </div>
                  </form>
                )}

                {/* Deal Form */}
                {activeTab === "deal" && (
                  <form onSubmit={handleDealSubmit} className="space-y-4">
                    <Input
                      label="Deal Title"
                      required
                      value={dealData.title}
                      onChange={(e) => setDealData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter deal title"
                    />
                    <Input
                      label="Value"
                      type="number"
                      required
                      value={dealData.value}
                      onChange={(e) => setDealData(prev => ({ ...prev, value: e.target.value }))}
                      placeholder="0"
                    />
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stage <span className="text-error ml-1">*</span>
                      </label>
                      <select
                        required
                        value={dealData.stage}
                        onChange={(e) => setDealData(prev => ({ ...prev, stage: e.target.value }))}
                        className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      >
                        <option value="Lead">Lead</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Proposal">Proposal</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Closed Won">Closed Won</option>
                        <option value="Closed Lost">Closed Lost</option>
                      </select>
                    </div>
                    <Input
                      label="Probability (%)"
                      type="number"
                      min="0"
                      max="100"
                      value={dealData.probability}
                      onChange={(e) => setDealData(prev => ({ ...prev, probability: e.target.value }))}
                      placeholder="20"
                    />
                    <Input
                      label="Expected Close Date"
                      type="date"
                      value={dealData.expectedCloseDate}
                      onChange={(e) => setDealData(prev => ({ ...prev, expectedCloseDate: e.target.value }))}
                    />
                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                        Cancel
                      </Button>
                      <Button type="submit" loading={loading} className="flex-1">
                        Add Deal
                      </Button>
                    </div>
                  </form>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuickAddModal;