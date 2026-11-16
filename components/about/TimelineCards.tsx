"use client";

import React from "react";

interface TimelineCardData {
  id: number;
  desktop: {
    left: number;
    top: number;
    width: number;
    height: number;
    rotation: number;
    tapeWidth: number;
    tapeTop: number;
    imageW: number;
    imageH: number;
  };
  mobileRotation: number;
  bg: string;
  text: React.ReactNode;
  image: string;
}

const TIMELINE_CARDS: TimelineCardData[] = [
  {
    id: 1,
    desktop: {
      left: 783,
      top: 24, // 584 - 560
      width: 374,
      height: 225,
      rotation: -2.4,
      tapeWidth: 72,
      tapeTop: -17,
      imageW: 118,
      imageH: 97,
    },
    mobileRotation: -1.8,
    bg: "#ede6d6",
    text: "I always dreamed of becoming an engineer from IIT.",
    image: "/assets/about/card-1.png",
  },
  {
    id: 2,
    desktop: {
      left: 254,
      top: 228, // 788 - 560
      width: 421,
      height: 257,
      rotation: 2.1,
      tapeWidth: 81,
      tapeTop: -19,
      imageW: 134,
      imageH: 117,
    },
    mobileRotation: 1.6,
    bg: "#f9d2d2",
    text: (
      <>
        I prepared for <span className="text-[#ee3f64]">JEE</span> with all my heart.
      </>
    ),
    image: "/assets/about/card-2.png",
  },
  {
    id: 3,
    desktop: {
      left: 793,
      top: 312, // 872 - 560
      width: 517,
      height: 332,
      rotation: -1.8,
      tapeWidth: 100,
      tapeTop: -23,
      imageW: 206,
      imageH: 205,
    },
    mobileRotation: -1.5,
    bg: "#c4ecff",
    text: (
      <>
        I couldn&apos;t pursue engineering at IIT, so I chose to study{" "}
        <span className="text-[#ee3f64]">Data Science at IIT Madras</span> instead.
      </>
    ),
    image: "/assets/about/card-3.png",
  },
  {
    id: 4,
    desktop: {
      left: 189,
      top: 595, // 1155 - 560
      width: 499,
      height: 308,
      rotation: 2.3,
      tapeWidth: 96,
      tapeTop: -23,
      imageW: 170,
      imageH: 153,
    },
    mobileRotation: 1.7,
    bg: "#d4f9da",
    text: (
      <>
        It was an online technical program. I knew it would give me time to explore my
        interests and build <span className="text-[#1fad4e]">new skills.</span>
      </>
    ),
    image: "/assets/about/card-4.png",
  },
  {
    id: 5,
    desktop: {
      left: 781,
      top: 694, // 1254 - 560
      width: 518,
      height: 337,
      rotation: -2.0,
      tapeWidth: 100,
      tapeTop: -23,
      imageW: 186,
      imageH: 219,
    },
    mobileRotation: -1.6,
    bg: "#e8d7fd",
    text: (
      <>
        Along with studies, I was always passionate about{" "}
        <span className="text-[#8364fc]">painting and sketching</span>.
      </>
    ),
    image: "/assets/about/card-5.png",
  },
  {
    id: 6,
    desktop: {
      left: 183,
      top: 978, // 1538 - 560
      width: 510,
      height: 292,
      rotation: 2.2,
      tapeWidth: 87,
      tapeTop: -20,
      imageW: 206,
      imageH: 137,
    },
    mobileRotation: 1.5,
    bg: "#f9d2d2",
    text: (
      <>
        In my first year, alongside my degree, I started working as a{" "}
        <span className="text-[#ee3f64]">graphic designer.</span>
      </>
    ),
    image: "/assets/about/card-6.png",
  },
  {
    id: 7,
    desktop: {
      left: 773,
      top: 1063, // 1623 - 560
      width: 519,
      height: 340,
      rotation: -2.1,
      tapeWidth: 100,
      tapeTop: -23,
      imageW: 179,
      imageH: 200,
    },
    mobileRotation: -1.7,
    bg: "#f1d5ef",
    text: (
      <>
        While working in graphic design, I discovered the world of UI/UX design. I took a
        UI/UX course alongside my degree and{" "}
        <span className="text-[#ee3f64]">learned everything step by step.</span>
      </>
    ),
    image: "/assets/about/card-7.png",
  },
  {
    id: 8,
    desktop: {
      left: 183,
      top: 1337, // 1897 - 560
      width: 513,
      height: 320,
      rotation: 2.0,
      tapeWidth: 99,
      tapeTop: -23,
      imageW: 195,
      imageH: 169,
    },
    mobileRotation: 1.8,
    bg: "#c4ecff",
    text: (
      <>
        After building my skills, I started applying for internships—but landed a{" "}
        <span className="text-[#ee3f64]">full-time UI/UX job instead.</span>
      </>
    ),
    image: "/assets/about/card-8.png",
  },
  {
    id: 9,
    desktop: {
      left: 759,
      top: 1466, // 2026 - 560
      width: 455,
      height: 298,
      rotation: -1.9,
      tapeWidth: 88,
      tapeTop: -20,
      imageW: 141,
      imageH: 159,
    },
    mobileRotation: -1.5,
    bg: "#f8f2e3",
    text: (
      <>
        Since then, I&apos;ve been designing apps, websites, and growing as a{" "}
        <span className="text-[#ee3f64]">Product &amp; UI/UX designer.</span>
      </>
    ),
    image: "/assets/about/card-9.png",
  },
];

export function DesktopTimelineCards() {
  return (
    <section className="relative w-[1440px] h-[1820px] bg-transparent select-none">
      {TIMELINE_CARDS.map((card) => {
        const { left, top, width, height, rotation, tapeWidth, tapeTop, imageW, imageH } =
          card.desktop;

        return (
          <div
            key={card.id}
            className="absolute rounded-[16px] shadow-[0px_4px_16px_rgba(0,0,0,0.06)] border border-black/5 p-6 flex flex-row items-center justify-between gap-4 transition-transform hover:scale-[1.01] duration-200"
            style={{
              left: `${left}px`,
              top: `${top}px`,
              width: `${width}px`,
              minHeight: `${height}px`,
              transform: `rotate(${rotation}deg)`,
              backgroundColor: card.bg,
            }}
            data-node-id={`desktop-card-${card.id}`}
          >
            {/* Masking tape strip */}
            <div
              className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
              style={{
                top: `${tapeTop}px`,
                width: `${tapeWidth}px`,
              }}
            >
              <img
                src="/assets/about/tape.png"
                alt=""
                className="w-full h-auto object-contain block drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]"
              />
            </div>

            {/* Handwritten Text */}
            <div className="flex-1 pr-2">
              <p className="font-['Architects_Daughter'] text-[21px] leading-[33px] text-[#222222]">
                {card.text}
              </p>
            </div>

            {/* Illustration / Photo Asset */}
            <div
              className="shrink-0 flex items-center justify-center"
              style={{ width: `${imageW}px`, height: `${imageH}px` }}
            >
              <img
                src={card.image}
                alt=""
                className="w-full h-full object-contain block"
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}

export function MobileTimelineCards() {
  return (
    <section className="w-full px-4 py-8 flex flex-col items-center gap-10 select-none">
      {TIMELINE_CARDS.map((card) => {
        return (
          <div
            key={card.id}
            className="relative w-full max-w-[460px] rounded-[16px] shadow-[0px_4px_14px_rgba(0,0,0,0.06)] border border-black/5 p-5 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{
              transform: `rotate(${card.mobileRotation}deg)`,
              backgroundColor: card.bg,
            }}
            data-node-id={`mobile-card-${card.id}`}
          >
            {/* Masking tape strip */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-[76px] pointer-events-none">
              <img
                src="/assets/about/tape.png"
                alt=""
                className="w-full h-auto object-contain block drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]"
              />
            </div>

            {/* Handwritten Text */}
            <div className="w-full text-center sm:text-left">
              <p className="font-['Architects_Daughter'] text-[18px] sm:text-[20px] leading-[29px] sm:leading-[31px] text-[#222222]">
                {card.text}
              </p>
            </div>

            {/* Illustration / Photo Asset */}
            <div className="shrink-0 w-[140px] h-[120px] flex items-center justify-center mt-2 sm:mt-0">
              <img
                src={card.image}
                alt=""
                className="max-w-full max-h-full object-contain block"
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
