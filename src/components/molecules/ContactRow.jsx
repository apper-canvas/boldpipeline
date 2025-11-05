import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { format } from "date-fns";

const ContactRow = ({ contact, onClick, index = 0 }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
    >
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
<div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {(contact.name_c || contact.Name || "U").split(" ").map(n => n[0]).join("").toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{contact.name_c || contact.Name}</div>
            <div className="text-sm text-secondary">{contact.email_c}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">{contact.company_c}</div>
        <div className="text-sm text-secondary">{contact.role_c}</div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
<div className="flex items-center gap-1">
          <ApperIcon name="Phone" className="w-4 h-4 text-secondary" />
          {contact.phone_c}
        </div>
      </td>
      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
        {contact.totalValue > 0 ? formatCurrency(contact.totalValue) : "—"}
      </td>
      <td className="px-6 py-4">
        <Badge variant={contact.activeDeals > 0 ? "success" : "secondary"} size="sm">
          {contact.activeDeals} active
        </Badge>
      </td>
<td className="px-6 py-4 text-sm text-secondary">
        {contact.last_contact_date_c ? format(new Date(contact.last_contact_date_c), "MMM dd, yyyy") : "Never"}
      </td>
      <td className="px-6 py-4 text-right">
        <button className="text-secondary hover:text-gray-900 transition-colors">
          <ApperIcon name="MoreHorizontal" className="w-4 h-4" />
        </button>
      </td>
    </motion.tr>
  );
};

export default ContactRow;