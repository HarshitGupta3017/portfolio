"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setHasMoved(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button") || target.closest(".interactive") || target.closest("input") || target.closest("textarea")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", updateHoverState);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", updateHoverState);
    };
  }, []);

  // Hide default cursor generally via CSS
  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  if (!hasMoved) return null;

  return (
    <>
      {/* Core cursor dot with subtle glow */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#00ff41] z-[100] pointer-events-none"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.3 }}
        style={{
          boxShadow: isHovering
            ? "0 0 12px #00ff41, 0 0 20px rgba(0,255,65,0.4)"
            : "0 0 6px #00ff41, 0 0 10px rgba(0,255,65,0.3)"
        }}
      />

      {/* Outer ring - smaller and more subtle */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-[#00ff41]/50 z-[99] pointer-events-none hidden md:block"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "rgba(0,255,65,0.8)" : "rgba(0,255,65,0.5)",
          opacity: isHovering ? 1 : 0.7,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
      />

      {/* Large subtle glow - significantly reduced */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#00ff41]/6 to-[#00f0ff]/3 z-[98] pointer-events-none hidden md:block"
        animate={{
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          scale: isHovering ? 1.2 : 1,
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 35, mass: 0.8 }}
      />
    </>
  );
}
