import { motion } from "framer-motion";

// Wraps a route's page element so every route gets a consistent, subtle
// enter/exit transition without needing to modify each page component.
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ width: "100%", minHeight: "100%" }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
