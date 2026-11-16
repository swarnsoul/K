"use client";

import React, { useState } from "react";

export interface PolaroidPhoto {
  id: string | number;
  src?: string;
  caption?: string;
  alt?: string;
  initialRotate: number;
  swayDuration: number;
  swayDelay: number;
  swayAmplitude: number;
  leftPercent: number;
  topOffset?: number;
  cardWidth?: number;
  isBlank?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1ST ROPE: TRAVELLING (6 High-Resolution Original Photos Uploaded by User)
// ─────────────────────────────────────────────────────────────────────────────
export const TRAVEL_HANGING_PHOTOS: PolaroidPhoto[] = [
  {
    id: "travel-user-1",
    src: "/assets/about/travel-user-1.jpg",
    alt: "Lake sunset silhouette",
    caption: "Sunset at the lake",
    leftPercent: 3.5,
    initialRotate: -12.5,
    swayDuration: 4.8,
    swayDelay: 0.2,
    swayAmplitude: 1.8,
    cardWidth: 176,
    topOffset: 6,
  },
  {
    id: "travel-user-2",
    src: "/assets/about/travel-user-2.jpg",
    alt: "Mountain valley cliff",
    caption: "Mountain heights",
    leftPercent: 20.5,
    initialRotate: -14.0,
    swayDuration: 5.3,
    swayDelay: 0.9,
    swayAmplitude: 1.6,
    cardWidth: 178,
    topOffset: 16,
  },
  {
    id: "travel-user-3",
    src: "/assets/about/travel-user-3.jpg",
    alt: "Yellow flower tree & winter scarf",
    caption: "Winter blossoms",
    leftPercent: 37.5,
    initialRotate: 2.0,
    swayDuration: 4.4,
    swayDelay: 0.4,
    swayAmplitude: 1.5,
    cardWidth: 176,
    topOffset: 24,
  },
  {
    id: "travel-user-4",
    src: "/assets/about/travel-user-4.jpg",
    alt: "Fort balcony overlooking water",
    caption: "Fort serenity",
    leftPercent: 54.5,
    initialRotate: 4.0,
    swayDuration: 5.6,
    swayDelay: 1.1,
    swayAmplitude: 1.4,
    cardWidth: 178,
    topOffset: 25,
  },
  {
    id: "travel-user-5",
    src: "/assets/about/travel-user-5.jpg",
    alt: "Ocean sunset shoreline",
    caption: "Tides & whispers",
    leftPercent: 71.5,
    initialRotate: -16.0,
    swayDuration: 4.9,
    swayDelay: 0.6,
    swayAmplitude: 1.8,
    cardWidth: 180,
    topOffset: 18,
  },
  {
    id: "travel-user-6",
    src: "/assets/about/travel-user-6.jpg",
    alt: "Dusk reflections at lakeside",
    caption: "Dusk reflections",
    leftPercent: 88.5,
    initialRotate: 3.5,
    swayDuration: 5.1,
    swayDelay: 1.3,
    swayAmplitude: 1.5,
    cardWidth: 176,
    topOffset: 8,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 2ND ROPE: PAINTING & ART (6 Blank Polaroid Cards matching reference image)
// ─────────────────────────────────────────────────────────────────────────────
export const ART_BLANK_PHOTOS: PolaroidPhoto[] = [
  {
    id: "art-blank-1",
    isBlank: true,
    alt: "Artwork frame 1",
    caption: "",
    leftPercent: 3.5,
    initialRotate: -4.5,
    swayDuration: 4.7,
    swayDelay: 0.3,
    swayAmplitude: 1.6,
    cardWidth: 176,
    topOffset: 6,
  },
  {
    id: "art-blank-2",
    isBlank: true,
    alt: "Artwork frame 2",
    caption: "",
    leftPercent: 20.5,
    initialRotate: 15.0,
    swayDuration: 5.4,
    swayDelay: 0.8,
    swayAmplitude: 1.8,
    cardWidth: 178,
    topOffset: 16,
  },
  {
    id: "art-blank-3",
    isBlank: true,
    alt: "Artwork frame 3",
    caption: "",
    leftPercent: 37.5,
    initialRotate: 8.0,
    swayDuration: 4.5,
    swayDelay: 0.5,
    swayAmplitude: 1.5,
    cardWidth: 176,
    topOffset: 24,
  },
  {
    id: "art-blank-4",
    isBlank: true,
    alt: "Artwork frame 4",
    caption: "",
    leftPercent: 54.5,
    initialRotate: -3.5,
    swayDuration: 5.2,
    swayDelay: 1.0,
    swayAmplitude: 1.7,
    cardWidth: 178,
    topOffset: 25,
  },
  {
    id: "art-blank-5",
    isBlank: true,
    alt: "Artwork frame 5",
    caption: "",
    leftPercent: 71.5,
    initialRotate: 12.0,
    swayDuration: 4.9,
    swayDelay: 0.4,
    swayAmplitude: 1.5,
    cardWidth: 176,
    topOffset: 18,
  },
  {
    id: "art-blank-6",
    isBlank: true,
    alt: "Artwork frame 6",
    caption: "",
    leftPercent: 88.5,
    initialRotate: 6.5,
    swayDuration: 5.5,
    swayDelay: 1.2,
    swayAmplitude: 1.8,
    cardWidth: 178,
    topOffset: 8,
  },
];

// Backwards compatibility export
export const ART_HANGING_PHOTOS = ART_BLANK_PHOTOS;

// ─────────────────────────────────────────────────────────────────────────────
// FULL-WIDTH CLOTHESLINE ROPE TIER
// The rope touches the literal edges of the screen on both sides!
// ─────────────────────────────────────────────────────────────────────────────
interface ClotheslineTierProps {
  photos: PolaroidPhoto[];
  sectionTitle?: string;
  cursorKey?: string;
  ropeY?: number;
  height?: number;
  className?: string;
}

export function ClotheslineTier({
  photos,
  sectionTitle,
  cursorKey,
  ropeY = 28,
  height = 360,
  className = "",
}: ClotheslineTierProps) {
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  return (
    <div
      className={`relative w-full select-none overflow-visible ${className}`}
      style={{ height: `${height}px` }}
      data-cursor-key={cursorKey}
    >
      {/* ───────────────── EDGE-TOUCHING ROPE (Twisted Jute / Hemp Cord) ───────────────── */}
      {/* Extends -20px to 100% + 20px so rope touches and bleeds into the screen edges */}
      <div
        className="absolute left-0 w-full pointer-events-none z-[5] overflow-visible"
        style={{ top: `${ropeY}px` }}
      >
        <svg
          viewBox="0 0 1000 40"
          preserveAspectRatio="none"
          className="w-full h-[45px] overflow-visible drop-shadow-[0_6px_8px_rgba(0,0,0,0.14)]"
        >
          {/* Soft shadow line under the rope */}
          <path
            d="M -20 20 Q 500 44, 1020 22"
            fill="none"
            stroke="rgba(0,0,0,0.14)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Main rope cord (tan/brown fiber) */}
          <path
            d="M -20 16 Q 500 40, 1020 18"
            fill="none"
            stroke="#8F6438"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Highlight twisted strand */}
          <path
            d="M -20 15.5 Q 500 39.5, 1020 17.5"
            fill="none"
            stroke="#E0BC89"
            strokeWidth="1.6"
            strokeDasharray="5 7"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* Dark shade twisted strand */}
          <path
            d="M -20 16.5 Q 500 40.5, 1020 18.5"
            fill="none"
            stroke="#5C3B1A"
            strokeWidth="1.2"
            strokeDasharray="4 8"
            strokeDashoffset="3"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* ───────────────── HANGING POLAROID CARDS CONTAINER ───────────────── */}
      <div className="relative w-full max-w-[1440px] h-full mx-auto px-4 lg:px-6">
        {photos.map((photo, index) => {
          const isHovered = hoveredId === photo.id;
          const baseTop = ropeY + (photo.topOffset || 12);
          const cardW = photo.cardWidth || 176;

          return (
            <div
              key={photo.id}
              className="absolute transition-all duration-300"
              style={{
                left: `${photo.leftPercent}%`,
                top: `${baseTop}px`,
                width: `${cardW}px`,
                zIndex: isHovered ? 50 : 10 + index,
                transformOrigin: "50% 0px",
              }}
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Clothespin Clip (fastened right at the rope & top edge of card) */}
              <div
                className="absolute left-1/2 -translate-x-1/2 -top-[20px] w-[20px] h-[44px] z-30 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.28)] transition-transform duration-300 ease-out"
                style={{
                  transform: isHovered
                    ? "translateX(-50%) scale(1.1) translateY(-2px)"
                    : "translateX(-50%)",
                }}
              >
                <img
                  src="/assets/about/clothespin.svg"
                  alt=""
                  className="w-full h-full block"
                  draggable={false}
                />
              </div>

              {/* Polaroid Frame with Organic Pendulum Sway */}
              <div
                className="group relative w-full bg-[#FFFDF9] rounded-[3px] p-[10px] pb-[32px] border border-black/[0.08] cursor-pointer transition-all duration-400 ease-out"
                style={
                  {
                    "--rot": `${photo.initialRotate}deg`,
                    transformOrigin: "50% 0px",
                    transform: isHovered
                      ? "scale(1.08) rotate(0deg) translateY(-8px)"
                      : `rotate(${photo.initialRotate}deg)`,
                    boxShadow: isHovered
                      ? "0 24px 48px -6px rgba(0, 0, 0, 0.32), 0 8px 18px -2px rgba(0, 0, 0, 0.16)"
                      : "0 12px 26px -4px rgba(0, 0, 0, 0.20), 0 4px 10px -2px rgba(0, 0, 0, 0.10)",
                    animation: isHovered
                      ? "none"
                      : `polaroid-sway-${(index % 3) + 1} ${photo.swayDuration}s ease-in-out infinite alternate`,
                    animationDelay: `${photo.swayDelay}s`,
                  } as React.CSSProperties
                }
              >
                {/* Inner Photo Area */}
                {photo.isBlank ? (
                  /* ── Blank Polaroid Area (matching reference image media_1794846974652_51361075.jpg) ── */
                  <div className="relative w-full aspect-square bg-[#1B1B1E] rounded-[2px] overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.45)] flex flex-col items-center justify-center group-hover:bg-[#222226] transition-colors duration-300">
                    {/* Subtle inner dark gradient & soft canvas texture */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#26262B]/60 via-transparent to-black/80 pointer-events-none" />
                    
                    {/* Subtle artistic placeholder mark */}
                    <div className="relative z-10 flex flex-col items-center justify-center opacity-30 group-hover:opacity-75 transition-opacity duration-300">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#A0A0A8"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mb-1"
                      >
                        <path d="M12 19l7-7 3 3-7 7-3-3z" />
                        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                        <path d="M2 2l7.586 7.586" />
                        <circle cx="11" cy="11" r="2" />
                      </svg>
                      <span className="font-['Architects_Daughter'] text-[9px] tracking-wider text-[#A0A0A8] uppercase">
                        Art Canvas
                      </span>
                    </div>
                  </div>
                ) : (
                  /* ── Travel Photo Area (Real High-Res Photo) ── */
                  <div className="relative w-full aspect-square bg-[#EAE6DF] rounded-[2px] overflow-hidden shadow-[inset_0_0_2px_rgba(0,0,0,0.25)]">
                    <img
                      src={photo.src}
                      alt={photo.alt || ""}
                      className="w-full h-full object-cover block transition-transform duration-500 ease-out group-hover:scale-105"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5 pointer-events-none" />
                  </div>
                )}

                {/* Polaroid Bottom Margin: Handwritten Caption or Blank Canvas Margin */}
                <div className="mt-[10px] text-center px-1 overflow-hidden min-h-[18px]">
                  {photo.isBlank ? (
                    <p className="font-['Architects_Daughter'] text-[12px] leading-[16px] text-transparent group-hover:text-black/60 tracking-[-0.2px] truncate select-none transition-colors duration-300">
                      Artwork coming soon
                    </p>
                  ) : (
                    <p className="font-['Architects_Daughter'] text-[13px] leading-[17px] text-[#2C2A29] tracking-[-0.2px] truncate select-none">
                      {photo.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes polaroid-sway-1 {
          0% {
            transform: rotate(calc(var(--rot) - 1.8deg));
          }
          100% {
            transform: rotate(calc(var(--rot) + 1.8deg));
          }
        }
        @keyframes polaroid-sway-2 {
          0% {
            transform: rotate(calc(var(--rot) + 2.0deg));
          }
          100% {
            transform: rotate(calc(var(--rot) - 1.6deg));
          }
        }
        @keyframes polaroid-sway-3 {
          0% {
            transform: rotate(calc(var(--rot) - 1.5deg));
          }
          100% {
            transform: rotate(calc(var(--rot) + 2.1deg));
          }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMBINED TWO-TIER FULL-WIDTH CLOTHESLINE SHOWCASE
// Matches user reference image media_1794846974652_51361075.jpg
// 1st Rope: Travelling photos (edges touching the screen)
// 2nd Rope: Painting / Art (Blank Polaroids, edges touching the screen)
// ─────────────────────────────────────────────────────────────────────────────
export function HangingClothesline({
  photos = TRAVEL_HANGING_PHOTOS,
  sectionTitle,
  cursorKey,
  className = "",
  rope1Y = 28,
  rope2Y = 360,
  containerHeight = 720,
}: {
  photos?: PolaroidPhoto[];
  sectionTitle?: string;
  cursorKey?: string;
  className?: string;
  rope1Y?: number;
  rope2Y?: number;
  containerHeight?: number;
}) {
  return (
    <div className={`w-full ${className}`}>
      <ClotheslineTier
        photos={photos}
        sectionTitle={sectionTitle}
        cursorKey={cursorKey}
        ropeY={rope1Y}
        height={containerHeight}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RESPONSIVE MOBILE CLOTHESLINE
// Smooth horizontal scroll view with edge-touching rope & clothespins for mobile
// ─────────────────────────────────────────────────────────────────────────────
export function MobileHangingClothesline({
  photos,
  sectionTitle,
  cursorKey,
}: {
  photos: PolaroidPhoto[];
  sectionTitle: string;
  cursorKey?: string;
}) {
  return (
    <div
      className="w-full select-none overflow-x-auto pb-6 px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      data-cursor-key={cursorKey}
    >
      <div className="relative min-w-[960px] h-[340px]">
        {/* Full-width curved rope spanning edge to edge */}
        <div className="absolute left-0 top-[24px] w-full pointer-events-none">
          <svg viewBox="0 0 960 40" preserveAspectRatio="none" className="w-full h-[26px]">
            <path d="M -10 14 Q 480 30, 970 18" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="3" />
            <path d="M -10 12 Q 480 28, 970 16" fill="none" stroke="#8F6438" strokeWidth="2.5" />
            <path d="M -10 11.5 Q 480 27.5, 970 15.5" fill="none" stroke="#E0BC89" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.85" />
          </svg>
        </div>

        {/* Polaroid Cards */}
        {photos.map((photo, i) => {
          const topOffset = photo.topOffset || 12;

          return (
            <div
              key={photo.id}
              className="absolute transition-transform duration-300"
              style={{
                left: `${photo.leftPercent}%`,
                top: `${24 + topOffset}px`,
                width: "140px",
                transformOrigin: "50% 0px",
                transform: `rotate(${photo.initialRotate}deg)`,
                zIndex: 10 + i,
              }}
            >
              {/* Clothespin */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-[16px] w-[16px] h-[34px] z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
                <img src="/assets/about/clothespin.svg" alt="" className="w-full h-full block" />
              </div>

              {/* Polaroid card */}
              <div className="bg-[#FFFDF9] rounded-[3px] p-[8px] pb-[22px] border border-black/[0.08] shadow-[0_10px_20px_rgba(0,0,0,0.16)]">
                {photo.isBlank ? (
                  <div className="w-full aspect-square bg-[#1B1B1E] rounded-[2px] flex items-center justify-center">
                    <span className="font-['Architects_Daughter'] text-[9px] text-[#A0A0A8]">Art Canvas</span>
                  </div>
                ) : (
                  <div className="w-full aspect-square bg-[#EAE6DF] rounded-[1px] overflow-hidden">
                    <img src={photo.src} alt={photo.alt || ""} className="w-full h-full object-cover block" />
                  </div>
                )}
                <p className="mt-[6px] font-['Architects_Daughter'] text-[11px] text-[#2C2A29] text-center truncate">
                  {photo.isBlank ? "Coming soon" : photo.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
