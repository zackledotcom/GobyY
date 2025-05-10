import { motion } from "framer-motion";
import React from "react";

export default function SentinelSpinner() {
  return (
    <motion.div
      className="fixed top-4 right-4 z-50 w-4 h-4 rounded-full bg-cyan-400/30 blur-sm"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.6, 0.9, 0.6],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      title="Goby Sentinel Active"
    />
  );
}