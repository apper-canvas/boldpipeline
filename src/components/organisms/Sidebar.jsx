import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose }) => {
  const navigationItems = [
    {
      name: "Dashboard",
      path: "",
      icon: "BarChart3",
      description: "Overview and metrics"
    },
    {
      name: "Contacts",
      path: "contacts",
      icon: "Users",
      description: "Manage your contacts"
    },
    {
      name: "Pipeline",
      path: "pipeline",
      icon: "Target",
      description: "Track deal progress"
    },
    {
      name: "Deals",
      path: "deals",
      icon: "DollarSign",
      description: "All deal records"
    }
  ];

  // Desktop sidebar (static)
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 z-40">
      <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
        <div className="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-900"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <ApperIcon
                      name={item.icon}
                      className={cn(
                        "mr-3 h-5 w-5 transition-colors",
                        isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"
                      )}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className={cn(
                        "text-xs mt-0.5",
                        isActive ? "text-blue-100" : "text-gray-500"
                      )}>
                        {item.description}
                      </div>
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );

  // Mobile sidebar (overlay with transform)
  const MobileSidebar = () => (
    <div className="lg:hidden">
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-40",
          !isOpen && "pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="BarChart3" className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold gradient-text">Pipeline Pro</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name="X" className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-5 px-2 space-y-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-900"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <ApperIcon
                    name={item.icon}
                    className={cn(
                      "mr-3 h-5 w-5",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"
                    )}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className={cn(
                      "text-xs mt-0.5",
                      isActive ? "text-blue-100" : "text-gray-500"
                    )}>
                      {item.description}
                    </div>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </motion.div>
    </div>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;