import React from "react";
import { motion } from "framer-motion";

export default function GlassPanel({ title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="mb-6 p-4 rounded-2xl border border-white/10 bg-white/5 shadow-inner shadow-black/20 backdrop-blur"
    >
      <h2 className="text-sm font-semibold mb-3 text-white/70">{title}</h2>
      <div>{children}</div>
    </motion.section>
  );
}