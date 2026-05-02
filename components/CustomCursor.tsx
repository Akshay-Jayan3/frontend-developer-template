"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports hover (ignore touch devices)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements like links or buttons
      const clickable = target.tagName.toLowerCase() === 'a' || 
                        target.tagName.toLowerCase() === 'button' ||
                        target.closest('a') || 
                        target.closest('button');
      setIsHovered(!!clickable);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference"
      animate={{
        // Center the cursor based on its size
        x: mousePosition.x - (isHovered ? 24 : 8),
        y: mousePosition.y - (isHovered ? 24 : 8),
        width: isHovered ? 48 : 16,
        height: isHovered ? 48 : 16,
      }}
      transition={{
        type: "tween",
        ease: "backOut",
        duration: 0.15,
      }}
    />
  );
}
