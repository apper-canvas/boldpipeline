import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { contactService } from "@/services/api/contactService";
import { dealService } from "@/services/api/dealService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Deals from "@/components/pages/Deals";
import QuickAddModal from "@/components/organisms/QuickAddModal";
import ContactRow from "@/components/molecules/ContactRow";
import SearchBar from "@/components/molecules/SearchBar";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";

const Contacts = () => {
const [contacts, setContacts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const [contactsData, dealsData] = await Promise.all([
        contactService.getAll(),
        dealService.getAll()
      ]);
      
      setContacts(contactsData);
      setDeals(dealsData);
    } catch (err) {
      setError("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const enrichContactsWithDeals = (contacts, deals) => {
    return contacts.map(contact => {
      const contactDeals = deals.filter(deal => deal.contactId === contact.Id);
      const activeDeals = contactDeals.filter(deal => !["Closed Won", "Closed Lost"].includes(deal.stage));
      const totalValue = contactDeals.reduce((sum, deal) => sum + deal.value, 0);
      
      return {
        ...contact,
        activeDeals: activeDeals.length,
        totalValue,
      };
    });
  };

  const filteredAndSortedContacts = () => {
    const enrichedContacts = enrichContactsWithDeals(contacts, deals);
    
    let filtered = enrichedContacts;
    
    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
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

  const displayContacts = filteredAndSortedContacts();
  
  if (contacts.length === 0) return <Empty icon="Users" title="No contacts yet" description="Add your first contact to start building relationships" />;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold gradient-text">Contacts</h1>
          <p className="text-secondary mt-1">Manage your customer relationships</p>
        </div>
<Button onClick={() => setIsModalOpen(true)}>
          <ApperIcon name="Plus" className="w-4 h-4" />
          Add Contact
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1">
          <SearchBar
            placeholder="Search contacts, companies, or emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
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
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-1">
                    Contact
                    <ApperIcon name={getSortIcon("name")} className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("company")}
                >
                  <div className="flex items-center gap-1">
                    Company
                    <ApperIcon name={getSortIcon("company")} className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("totalValue")}
                >
                  <div className="flex items-center gap-1">
                    Total Value
                    <ApperIcon name={getSortIcon("totalValue")} className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deals
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("lastContactDate")}
                >
                  <div className="flex items-center gap-1">
                    Last Contact
                    <ApperIcon name={getSortIcon("lastContactDate")} className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayContacts.length > 0 ? (
                displayContacts.map((contact, index) => (
                  <ContactRow
                    key={contact.Id}
                    contact={contact}
                    index={index}
                    onClick={() => {}}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <ApperIcon name="Search" className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">No contacts match your search</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
      
{displayContacts.length > 0 && (
        <div className="flex items-center justify-between text-sm text-secondary">
          <p>Showing {displayContacts.length} of {contacts.length} contacts</p>
        </div>
      )}

<QuickAddModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          // Refresh contacts after modal closes to show newly added contacts
          loadData();
        }} 
      />
    </div>
  );
};

export default Contacts;