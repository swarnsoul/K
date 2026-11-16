"use client";

import React from "react";

const TRAVEL_PHOTOS = [
  { id: 1, src: "/assets/about/travel-1.png", left: 77, top: 58, width: 188, height: 246, z: 1 },
  { id: 2, src: "/assets/about/travel-2.png", left: 238, top: 0, width: 245, height: 326, z: 2 },
  { id: 3, src: "/assets/about/travel-3.png", left: 0, top: 256, width: 272, height: 231, z: 3 },
  { id: 4, src: "/assets/about/travel-4.png", left: 207, top: 304, width: 307, height: 337, z: 4 },
  { id: 5, src: "/assets/about/travel-5.png", left: 465, top: 86, width: 204, height: 271, z: 2 },
  { id: 6, src: "/assets/about/travel-6.png", left: 424, top: 326, width: 218, height: 291, z: 5 },
  { id: 7, src: "/assets/about/travel-7.png", left: 57, top: 472, width: 178, height: 237, z: 6 },
];

export function DesktopTravelCollage() {
  return (
    <section
      className="relative w-[1440px] h-[800px] bg-transparent select-none"
      data-node-id="255:887"
    >
      {/* 7 Overlapping Photos Cluster */}
      <div
        className="absolute left-[151px] top-[45px] w-[669px] h-[709px]"
        data-node-id="255:885"
      >
        {TRAVEL_PHOTOS.map((photo) => (
          <div
            key={photo.id}
            className="absolute rounded-[16px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.14)] border border-black/5 transition-transform hover:scale-105 hover:z-20 duration-300"
            style={{
              left: `${photo.left}px`,
              top: `${photo.top}px`,
              width: `${photo.width}px`,
              height: `${photo.height}px`,
              zIndex: photo.z,
            }}
          >
            <img
              src={photo.src}
              alt="Travel photo"
              className="w-full h-full object-cover block"
            />
          </div>
        ))}
      </div>

      {/* Right side: Heading + Curved Arrow */}
      <div
        className="absolute left-[832px] top-[280px] w-[456px] h-[150px]"
        data-node-id="230:90"
      >
        <h2
          className="absolute left-[93px] top-[40px] font-['Architects_Daughter'] text-[34px] leading-[42px] text-black whitespace-nowrap"
          data-node-id="223:153"
        >
          Travelling all around
        </h2>
        <div
          className="absolute left-[12px] top-[30px] w-[134px] h-[103px] pointer-events-none"
          data-node-id="230:74"
        >
          <img
            src="/assets/about/arrow-travel.png"
            alt=""
            className="w-full h-full object-contain block"
          />
        </div>
      </div>
    </section>
  );
}

export function MobileTravelCollage() {
  return (
    <section className="w-full px-4 py-12 flex flex-col items-center select-none">
      {/* Heading & Arrow */}
      <div className="flex flex-col items-center mb-8 relative">
        <h2 className="font-['Architects_Daughter'] text-[28px] sm:text-[32px] text-black text-center">
          Travelling all around
        </h2>
        <div className="w-[80px] h-[60px] mt-2">
          <img
            src="/assets/about/arrow-travel.png"
            alt=""
            className="w-full h-full object-contain block rotate-45"
          />
        </div>
      </div>

      {/* 2-Column Responsive Photo Grid */}
      <div className="w-full max-w-[540px] grid grid-cols-2 gap-3 sm:gap-4">
        {TRAVEL_PHOTOS.map((photo) => (
          <div
            key={photo.id}
            className="aspect-[4/5] rounded-[14px] overflow-hidden shadow-md border border-black/5"
          >
            <img
              src={photo.src}
              alt="Travel photo"
              className="w-full h-full object-cover block"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
