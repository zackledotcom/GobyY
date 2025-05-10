import { motion } from "framer-motion";

export default function AmbientGlow() {
  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-blue-950 via-black to-indigo-900 opacity-10 bg-[length:400%_400%]"
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
      }}
      transition={{
        duration: 40,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}