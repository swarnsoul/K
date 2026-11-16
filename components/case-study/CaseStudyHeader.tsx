"use client";

import React from "react";
import Link from "next/link";
import { DesktopNavbarContent, MobileHeader } from "@/components/Header";

export function CaseStudyHeader({
  projectTitle,
  accentColor = "#8364fc",
}: {
  projectTitle: string;
  accentColor?: string;
}) {
  return (
    <>
      {/* Desktop Navigation (>= 1280px) */}
      <header data-section="01_navbar" className="hidden xl:flex w-full justify-center pt-8 pb-4 relative z-50">
        <div className="w-[1440px] flex items-center justify-between px-[60px]">
          {/* Back link */}
          <Link
            href="/#work"
            className="group flex items-center gap-2 font-['Inter'] font-medium text-[15px] text-black/70 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc] rounded px-3 py-1.5 bg-white/70 hover:bg-white backdrop-blur-sm border border-black/10 rounded-full shadow-sm"
          >
            <span className="transition-transform group-hover:-translate-x-1 duration-200">←</span>
            <span>Back to Work</span>
          </Link>

          {/* Capsule Navbar */}
          <div className="relative">
            <DesktopNavbarContent />
          </div>

          {/* Breadcrumb Right */}
          <div className="font-['Inter'] font-semibold text-[14px] text-black/50 tracking-wider uppercase">
            {projectTitle}
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Header (< 1280px) */}
      <div className="xl:hidden w-full relative z-50">
        <MobileHeader />
        <div className="px-4 py-2 mt-14 flex items-center justify-between border-y border-black/5 bg-white/70 backdrop-blur-md">
          <Link
            href="/#work"
            className="flex items-center gap-1.5 text-xs font-semibold text-black/70 hover:text-black transition-colors"
          >
            <span>←</span>
            <span>All Projects</span>
          </Link>
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            {projectTitle}
          </span>
        </div>
      </div>
    </>
  );
}
