import "./DragIndicator.css";
import { motion } from "framer-motion";

const DragIndicator = ({ hidden }) => {
  if (hidden) return null; // hide once user interacted

  return (
    <motion.div
      className="drag-indicator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="drag-arrows">
        <span>←</span>
        <span>→</span>
      </div>
      <p>Drag to explore</p>
    </motion.div>
  );
};

export default DragIndicator;
