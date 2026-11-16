"use client";

import React from "react";

const ART_PHOTOS = [
  { id: 1, src: "/assets/about/art-1.png", left: 64, top: 0, width: 195, height: 331, z: 1 },
  { id: 2, src: "/assets/about/art-2.png", left: 239, top: 157, width: 196, height: 348, z: 2 },
  { id: 3, src: "/assets/about/art-3.png", left: 0, top: 292, width: 196, height: 348, z: 3 },
  { id: 4, src: "/assets/about/art-4.png", left: 180, top: 408, width: 196, height: 348, z: 4 },
];

export function DesktopArtCollage() {
  return (
    <section
      className="relative w-[1440px] h-[756px] bg-transparent select-none"
      data-node-id="257:888"
    >
      {/* Left side: Heading + Curved Arrow */}
      <div
        className="absolute left-[215px] top-[305px] w-[500px] h-[150px]"
        data-node-id="257:898"
      >
        <h2
          className="font-['Architects_Daughter'] text-[34px] leading-[42px] text-black whitespace-nowrap inline-block"
          data-node-id="257:899"
        >
          Contemporary Artist
        </h2>
        <div
          className="absolute left-[340px] top-[10px] w-[134px] h-[103px] pointer-events-none"
          data-node-id="257:900"
        >
          <img
            src="/assets/about/arrow-art.png"
            alt=""
            className="w-full h-full object-contain block"
          />
        </div>
      </div>

      {/* Right side: 4 Artwork Photos Cluster */}
      <div
        className="absolute left-[789px] top-0 w-[435px] h-[756px]"
        data-node-id="259:68"
      >
        {ART_PHOTOS.map((photo) => (
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
              alt="Artwork photo"
              className="w-full h-full object-cover block"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export function MobileArtCollage() {
  return (
    <section className="w-full px-4 py-12 flex flex-col items-center select-none">
      {/* Heading & Arrow */}
      <div className="flex flex-col items-center mb-8 relative">
        <h2 className="font-['Architects_Daughter'] text-[28px] sm:text-[32px] text-black text-center">
          Contemporary Artist
        </h2>
        <div className="w-[80px] h-[60px] mt-2">
          <img
            src="/assets/about/arrow-art.png"
            alt=""
            className="w-full h-full object-contain block"
          />
        </div>
      </div>

      {/* 2-Column Responsive Photo Grid */}
      <div className="w-full max-w-[540px] grid grid-cols-2 gap-3 sm:gap-4">
        {ART_PHOTOS.map((photo) => (
          <div
            key={photo.id}
            className="aspect-[3/5] rounded-[14px] overflow-hidden shadow-md border border-black/5"
          >
            <img
              src={photo.src}
              alt="Artwork photo"
              className="w-full h-full object-cover block"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
