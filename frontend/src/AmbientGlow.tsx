import React from "react";
import { motion } from "framer-motion";
import "./AmbientGlow.css";

export default function AmbientGlow() {
  const animationProps = {
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
    },
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  };

  return (
    <motion.div
      className="ambient-glow"
      aria-hidden="true"
      {...animationProps}
    />
  );
}