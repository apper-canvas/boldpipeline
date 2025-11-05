import { motion } from "framer-motion";

const Loading = ({ className = "", type = "dashboard" }) => {
  const renderSkeleton = () => {
    switch (type) {
      case "pipeline":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-12 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-lg animate-pulse"></div>
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-32 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ))}
          </div>
        );
      case "contacts":
        return (
          <div className="space-y-4">
            <div className="h-12 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-lg animate-pulse"></div>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-16 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        );
      case "dashboard":
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-lg animate-pulse"></div>
              <div className="h-80 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto p-6">
        <div className="text-center mb-8 space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 mx-auto"
          >
            <svg className="w-full h-full text-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h3 className="text-xl font-semibold gradient-text">Loading Pipeline Pro</h3>
            <p className="text-secondary text-sm">Preparing your CRM dashboard...</p>
          </motion.div>
        </div>
        {renderSkeleton()}
      </div>
    </motion.div>
  );
};

export default Loading;