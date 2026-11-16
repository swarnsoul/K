import React from "react";
import { DesktopHeader, MobileHeader, FooterFloatingNav } from "@/components/Header";
import { DesktopHero, MobileHero } from "@/components/Hero";
import { DesktopProjects, MobileProjects } from "@/components/Projects";
import { DesktopProcess, MobileProcess } from "@/components/Process";
import { DesktopTools, MobileTools } from "@/components/Tools";
import { DesktopSocial, MobileSocial } from "@/components/Social";
import { DesktopContactFooter, MobileContactFooter } from "@/components/ContactFooter";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-transparent [overflow-x:clip]">
      {/* =========================================================================
          DESKTOP CANVAS (>= 1280px: 1280px, 1440px, 1680px, 1920px, 2560px)
          Exact pixel-perfect Figma "Desktop - 9" implementation (node 140:671).
          Fixed 1440px width canvas, centered.
          Zero canvas edge, zero grey side bands, zero shadow.
          ========================================================================= */}
      <div className="hidden xl:flex w-full justify-center">
        <div
          className="w-[1440px] relative shrink-0 bg-transparent flex flex-col items-center [overflow-x:clip]"
          data-node-id="140:671"
        >
          {/* Floating Navigation Header (120px) */}
          <DesktopHeader />

          {/* Section 1: Hero (849px) */}
          <DesktopHero />

          {/* Section 2: Projects (Pinned left + Stacking project frames) */}
          <DesktopProjects />

          {/* Section 3: Process / Philosophy (850px) */}
          <DesktopProcess />

          {/* Section 4: Design Companions / Tools (629px) */}
          <DesktopTools />

          {/* Section 5: Social / Connect (526px) */}
          <DesktopSocial />

          {/* Section 6: Contact & Footer (709px) */}
          <DesktopContactFooter />

          {/* Floating Navigation Bar: appears specifically when reaching the footer */}
          <FooterFloatingNav />

        </div>
      </div>

      {/* =========================================================================
          RESPONSIVE MOBILE & TABLET LAYOUT (< 1280px: 360, 390, 768, 1024)
          Fluid container with zero horizontal overflow.
          ========================================================================= */}
      <div className="xl:hidden w-full flex flex-col bg-transparent">
        <MobileHeader />
        <MobileHero />
        <MobileProjects />
        <MobileProcess />
        <MobileTools />
        <MobileSocial />
        <MobileContactFooter />
      </div>
    </main>
  );
}
