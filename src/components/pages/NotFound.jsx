import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8 max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
            <ApperIcon name="AlertTriangle" className="w-16 h-16 text-white" />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border-4 border-dashed border-primary/30 rounded-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-6xl font-bold gradient-text">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900">Page Not Found</h2>
          <p className="text-secondary leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to your CRM dashboard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button onClick={() => navigate("")} size="lg">
            <ApperIcon name="Home" className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            size="lg"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            Go Back
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-gray-400 space-y-2"
        >
          <p>Need help? Contact our support team</p>
          <div className="flex justify-center space-x-4">
            <button className="text-primary hover:text-blue-700 transition-colors">
              <ApperIcon name="Mail" className="w-4 h-4 inline mr-1" />
              Email
            </button>
            <button className="text-primary hover:text-blue-700 transition-colors">
              <ApperIcon name="Phone" className="w-4 h-4 inline mr-1" />
              Call
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;