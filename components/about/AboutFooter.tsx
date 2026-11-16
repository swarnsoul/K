"use client";

import React from "react";

export function DesktopAboutFooter() {
  return (
    <footer
      className="relative w-[1440px] h-[420px] bg-transparent select-none"
      data-node-id="265:96"
    >
      {/* Handwritten Closing Quote in brand pink */}
      <div
        className="absolute left-[53px] top-[87px] w-[1000px]"
        data-node-id="265:95"
      >
        <p className="font-['Architects_Daughter'] font-normal text-[34px] leading-[54px] text-[#ee3f64]">
          A little bit of code, a lot of creativity, and countless dreams.
          <br />
          Thanks for reading my story.
        </p>
      </div>

      {/* 3 Hand-drawn Hearts */}
      <div
        className="absolute left-[1192px] top-[211px] w-[174px] h-[149px] pointer-events-none"
        data-node-id="265:119"
      >
        <img
          src="/assets/about/hearts.png"
          alt=""
          className="w-full h-full object-contain block"
        />
      </div>
    </footer>
  );
}

export function MobileAboutFooter() {
  return (
    <footer className="w-full px-6 py-16 flex flex-col items-center text-center select-none">
      <p className="font-['Architects_Daughter'] font-normal text-[22px] sm:text-[26px] leading-[36px] sm:leading-[42px] text-[#ee3f64] max-w-[600px]">
        A little bit of code, a lot of creativity, and countless dreams.
        <br />
        Thanks for reading my story.
      </p>

      <div className="w-[120px] h-[100px] mt-6 pointer-events-none">
        <img
          src="/assets/about/hearts.png"
          alt=""
          className="w-full h-full object-contain block"
        />
      </div>
    </footer>
  );
}
