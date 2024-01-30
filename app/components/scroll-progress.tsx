import React from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

const ScrollProgress = ({ className }: { className?: string }) => {
  const { scrollYProgress } = useScroll();

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center origin-left transform -translate-y-1/2 pointer-events-none",
        className
      )}
    >
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="w-full h-1 max-w-4xl bg-white"
        initial={{ originX: 0.5 }}
      />
    </div>
  );
};

export default ScrollProgress;
