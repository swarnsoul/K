"use client";

import React from "react";

export function DesktopAboutHero() {
  return (
    <section className="relative w-[1440px] h-[560px] bg-transparent select-none">
      {/* "About Me" Heading */}
      <h1
        className="absolute left-1/2 -translate-x-1/2 top-[148px] font-['Architects_Daughter'] font-normal text-[46px] leading-[55px] text-black text-center whitespace-nowrap"
        data-node-id="223:125"
      >
        About Me
      </h1>

      {/* Portrait Polaroid */}
      <div
        className="absolute left-[240px] top-[250px] w-[393px] h-[393px] -rotate-[3.5deg] drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-transform hover:-rotate-[1deg] duration-300"
        data-node-id="223:143"
      >
        <img
          src="/assets/about/portrait.png"
          alt="Kanak portrait"
          className="w-full h-full object-contain block"
        />
      </div>

      {/* Intro Sticky Note */}
      <div
        className="absolute left-[700px] top-[320px] w-[350px] bg-[#cde8ff] rounded-[16px] p-6 shadow-[0px_4px_14px_rgba(0,0,0,0.08)] border border-black/5 rotate-[1.8deg]"
        data-node-id="243:820"
      >
        <p
          className="font-['Architects_Daughter'] font-normal text-[26px] leading-[36px] text-black"
          data-node-id="230:91"
        >
          Hi again! I’m Kanak &amp; here is my story
        </p>
      </div>

      {/* Hand-drawn curved arrow pointing to Card 1 */}
      <div
        className="absolute left-[990px] top-[430px] w-[128px] h-[141px] pointer-events-none"
        data-node-id="243:821"
      >
        <img
          src="/assets/about/arrow-intro.png"
          alt=""
          className="w-full h-full object-contain block"
        />
      </div>
    </section>
  );
}

export function MobileAboutHero() {
  return (
    <section className="w-full pt-6 pb-4 px-4 flex flex-col items-center select-none">
      {/* "About Me" Heading */}
      <h1 className="font-['Architects_Daughter'] font-normal text-[36px] sm:text-[42px] text-black text-center mb-6">
        About Me
      </h1>

      {/* Portrait Polaroid */}
      <div className="w-[280px] sm:w-[340px] aspect-square -rotate-[3deg] drop-shadow-[0_6px_16px_rgba(0,0,0,0.12)] mb-8">
        <img
          src="/assets/about/portrait.png"
          alt="Kanak portrait"
          className="w-full h-full object-contain block"
        />
      </div>

      {/* Intro Sticky Note */}
      <div className="w-full max-w-[340px] bg-[#cde8ff] rounded-[16px] p-5 shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-black/5 rotate-[1.5deg] relative">
        <p className="font-['Architects_Daughter'] font-normal text-[22px] sm:text-[24px] leading-[32px] text-black text-center">
          Hi again! I’m Kanak &amp; here is my story
        </p>
        <div className="absolute -bottom-10 right-4 w-[60px] h-[70px] pointer-events-none">
          <img
            src="/assets/about/arrow-intro.png"
            alt=""
            className="w-full h-full object-contain block"
          />
        </div>
      </div>
    </section>
  );
}
