import { motion } from "framer-motion";
import "../styles/BrandLogo.css";

function BrandLogo({ size = 40 }) {
  return (
    <motion.div
      className="brand-logo-wrapper"
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ width: size, height: size }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="brand-logo-svg"
      >
        {/* Hexagon casing */}
        <polygon
          points="50,5 90,28 90,72 50,95 10,72 10,28"
          fill="url(#logoGlow)"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Nested structure (Leaf / Nest theme) */}
        <path
          d="M50 25 L75 44 V70 H25 V44 Z"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M50 25 L50 70"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M35 50 L50 38 L65 50"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <defs>
          <linearGradient id="logoGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.2)" />
            <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

export default BrandLogo;