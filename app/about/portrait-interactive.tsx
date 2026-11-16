"use client";

import React, { useState } from "react";

interface PortraitInteractiveProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function PortraitInteractive({
  className = "size-[337px]",
  style,
}: PortraitInteractiveProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative rounded-[20px] border border-solid border-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.6)] overflow-hidden cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc] select-none ${className}`}
      style={style}
      tabIndex={0}
      role="button"
      aria-label="Portrait of Kanak. Hover, tap, or focus to view alternate expression."
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={() => setIsHovered((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsHovered((prev) => !prev);
        }
      }}
      data-figma-id="230:87"
      data-name="Component 27"
      data-cursor-key="about-portrait"
      data-state={isHovered ? "hover" : "default"}
    >
      {/* Default variant (node 230:80, image 27) */}
      <img
        src="/assets/about/portrait.png"
        alt="Kanak portrait"
        className={`absolute inset-0 size-full object-cover pointer-events-none rounded-[20px] transition-opacity duration-200 ease-in-out ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
        data-figma-id="230:80"
        data-name="image 27"
      />

      {/* Hover variant (node 230:82, image 28) */}
      <img
        src="/assets/about/portrait-hover.png"
        alt="Kanak portrait alternate expression"
        className={`absolute inset-0 size-full object-fill pointer-events-none rounded-[20px] transition-opacity duration-200 ease-in-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        data-figma-id="230:82"
        data-name="image 28"
      />
    </div>
  );
}
