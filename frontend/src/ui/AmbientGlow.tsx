export default function AmbientGlow({ duration = 20 }: { duration?: number }) {
  const animationProps = {
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
    },
    transition: {
      duration,
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