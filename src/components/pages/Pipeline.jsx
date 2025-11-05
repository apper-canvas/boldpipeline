import { motion } from "framer-motion";
import PipelineBoard from "@/components/organisms/PipelineBoard";

const Pipeline = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold gradient-text">Sales Pipeline</h1>
          <p className="text-secondary mt-1">Track deals through each stage of your process</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <PipelineBoard />
      </motion.div>
    </div>
  );
};

export default Pipeline;