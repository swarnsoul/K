"use client";

import React, { useEffect } from "react";
import { ScrollProgressBar } from "./ScrollProgressBar";
import Link from "next/link";
import { DesktopNavbarContent, MobileHeader, FooterFloatingNav } from "@/components/Header";
import { DesktopContactFooter, MobileContactFooter } from "@/components/ContactFooter";
import CirqellHiFiScreens from "./CirqellHiFiScreens";

export function CirqellPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          }
        });
      },
      { threshold: 0.02, rootMargin: "50px 0px 50px 0px" }
    );

    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  return (
    <div className="w-full min-h-screen bg-transparent [overflow-x:clip] select-none text-[#111111] font-['Almarena_Neue',sans-serif]">
      {/* ─── Reading Progress Bar ─── */}
      <ScrollProgressBar />

      {/* ─── Persistent Navigation Header (Visible all over the page) ─── */}
      <header
        data-section="01_navbar"
        className="fixed top-3 sm:top-4 xl:top-5 left-0 w-full z-50 flex items-center justify-center pointer-events-none transition-all duration-300"
      >
        <div className="hidden xl:flex items-center justify-center w-full pointer-events-auto">
          <DesktopNavbarContent />
        </div>
        <div className="xl:hidden w-full px-4 pointer-events-auto">
          <MobileHeader />
        </div>
      </header>

      {/* Header Spacer: preserves exact initial canvas flow */}
      <div className="w-full h-[90px] xl:h-[120px]" aria-hidden="true" />

      {/* ─── Main 1440px Canvas Container (sections stacked directly without arbitrary vertical gaps) ─── */}
      <main className="w-full flex flex-col items-center">
        <div className="w-full max-w-[1440px] flex flex-col items-center">

          {/* ───────────────── 1. HERO INTRO (Frame 87, 443:358) ───────────────── */}
          <section
            data-section="02_hero_intro"
            className="w-full max-w-[1440px] min-h-[560px] xl:min-h-[636px] flex flex-col items-end pr-5 sm:pr-10 xl:pr-[81px] pt-8 sm:pt-14 xl:pt-[104px] pb-10 xl:pb-[104px]"
            aria-label="Hero Overview"
          >
            <div data-reveal className="w-full max-w-[953px] flex flex-col gap-[24px] xl:gap-[36px]">
              <span className="font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black uppercase tracking-normal">
                Cirqell Mobile Application
              </span>

              <h1 className="font-['Almarena_Neue',sans-serif] font-medium text-[26px] sm:text-[30px] leading-[36px] sm:leading-[40px] text-black">
                A voice-first platform for intentional, paid conversations between creators and their audience.
              </h1>

              <p className="font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black">
                Cirqell moves creator-audience interaction beyond passive comments and unread DMs. It lets creators set their own call rates and availability, and lets users discover nearby, verified creators and talk to them in real time through private, consent-based voice calls.
              </p>

              {/* Discipline Tags — 2 distinct rows as in Figma Frame 97 */}
              <div className="flex flex-col gap-[9px] w-full max-w-[693px]">
                <div className="flex flex-wrap gap-[8px] items-center">
                  {["Product Strategy", "UX Research", "Information Architecture", "Interaction Design"].map((tag) => (
                    <span
                      key={tag}
                      className="border border-black border-solid rounded-[200px] px-[14px] py-[3px] sm:py-[4px] font-['Almarena_Neue',sans-serif] font-normal text-[14px] sm:text-[16px] leading-[27px] sm:leading-[35px] text-black whitespace-nowrap bg-transparent transition-all duration-200 hover:scale-105 hover:bg-[#002f82]/5 hover:border-[#002f82] cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-[8px] items-center">
                  {["UI Design", "Prototyping", "Design System"].map((tag) => (
                    <span
                      key={tag}
                      className="border border-black border-solid rounded-[200px] px-[14px] py-[3px] sm:py-[4px] font-['Almarena_Neue',sans-serif] font-normal text-[14px] sm:text-[16px] leading-[27px] sm:leading-[35px] text-black whitespace-nowrap bg-transparent transition-all duration-200 hover:scale-105 hover:bg-[#002f82]/5 hover:border-[#002f82] cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta details */}
              <p className="font-['Almarena_Neue',sans-serif] font-normal text-[14px] sm:text-[16px] leading-[25px] text-black">
                Product Designer | 4 Months | Mobile App (iOS &amp; Android) | Solo Project
              </p>
            </div>
          </section>

          {/* ───────────────── 2. HERO BANNER MOCKUP (Frame 88, 443:106) ───────────────── */}
          <section
            data-section="03_hero_banner"
            className="w-full max-w-[1440px] min-h-[460px] xl:h-[566px] flex items-center justify-center px-4 sm:px-8 xl:px-[61px] py-[20px] xl:py-[24px]"
            aria-label="Cirqell Hero Preview"
          >
            <div className="group relative w-full max-w-[1318px] h-[380px] sm:h-[480px] xl:h-[542px] rounded-[24px] sm:rounded-[30px] bg-[rgba(0,39,109,0.09)] overflow-hidden flex items-center justify-center transition-shadow duration-500 hover:shadow-xl">
              {/* Giant Ghost Brand Title - Exactly Centered and Contained within Box */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[120px] sm:top-[140px] xl:top-[140.5px] -translate-y-1/2 pointer-events-none select-none z-0 flex items-center justify-center w-full">
                <span className="font-['Almarena_Neue',sans-serif] font-extrabold text-[clamp(50px,13vw,190px)] leading-none tracking-[clamp(8px,3.5vw,50px)] text-[#00276d] opacity-20 uppercase whitespace-nowrap text-center">
                  CIQELL
                </span>
              </div>

              {/* 3D Phone Mockup - Rigidly Centered in the Middle */}
              <div className="z-10 w-[220px] sm:w-[280px] xl:w-[335px] h-[90%] sm:h-[95%] xl:h-[596px] relative xl:absolute xl:top-[152px] xl:left-1/2 xl:-translate-x-1/2 flex items-end justify-center pointer-events-none">
                <div className="w-full h-full flex items-end justify-center animate-float-slow transition-transform duration-500 ease-out group-hover:scale-[1.03] pointer-events-auto">
                  <img
                    src="/assets/case-studies/cirqell/imgInflucrushPhoneWallpaper1.png"
                    alt="Cirqell Phone Mockup"
                    className="w-full h-full object-cover object-top drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ───────────────── 3. DESIGN PROCESS TIMELINE (Frame 89, 443:110) ───────────────── */}
          <section
            data-section="04_design_process"
            className="w-full max-w-[1440px] px-4 sm:px-8 xl:px-[60px] py-[20px] xl:py-[39px]"
            aria-label="Design Process"
          >
            <div data-reveal className="w-full max-w-[1320px] mx-auto min-h-[720px] xl:min-h-[759px] h-auto rounded-[24px] bg-[rgba(0,47,130,0.13)] p-6 sm:p-10 xl:p-[56px] flex flex-col gap-[15px] shadow-sm overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <h2 className="font-['Almarena_Neue',sans-serif] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Design Process
              </h2>
              <p className="font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[851px]">
                From discovery to validation, every phase informed the next ensuring design decisions were driven by user needs, product strategy, and long-term scalability rather than visual execution alone.
              </p>

              {/* Timeline Container without any scrollbar */}
              <div className="w-full pt-[20px] xl:pt-[40px] pb-6 flex justify-center overflow-x-auto xl:overflow-x-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="min-w-[929px] w-[929px] h-[480px] relative shrink-0">
                  {/* Month Headers */}
                  <div className="h-[28px] relative w-full font-['Almarena_Neue',sans-serif] font-medium text-[12px] leading-[16px] tracking-[1.2px] text-[#9e9b94]">
                    <div className="absolute left-0 top-0 w-[98.8px] text-center">Jan</div>
                    <div className="absolute left-[197.6px] top-0 w-[98.8px] text-center">Feb</div>
                    <div className="absolute left-[395.2px] top-0 w-[98.8px] text-center">March</div>
                    <div className="absolute left-[592.8px] top-0 w-[98.8px] text-center">April</div>
                    <div className="absolute left-[790.4px] top-0 w-[98.8px] text-center">May</div>
                  </div>

                  {/* Vertical Lines */}
                  <div className="relative w-full h-[443px] pt-[8px]">
                    <div className="absolute left-[47px] top-0 w-px h-[443px] bg-[#c8c5be]" />
                    <div className="absolute left-[237px] top-0 w-px h-[443px] bg-[#c8c5be]" />
                    <div className="absolute left-[444.6px] top-0 w-px h-[443px] bg-[#c8c5be]" />
                    <div className="absolute left-[647px] top-0 w-px h-[443px] bg-[#c8c5be]" />
                    <div className="absolute left-[840.4px] top-0 w-px h-[443px] bg-[#c8c5be]" />

                    {/* Stepped Pills along the timeline */}
                    {/* 1. Research */}
                    <div data-reveal data-reveal-delay="1" className="absolute left-[23.5px] top-[0.5px] w-[148px] h-[66px] flex items-center justify-center">
                      <div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[22px] py-[12px] font-['Almarena_Neue',sans-serif] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md hover:border hover:border-[#002f82]/20 cursor-pointer">
                        Research
                      </div>
                    </div>

                    {/* 2. Problem Framing */}
                    <div data-reveal data-reveal-delay="2" className="absolute left-[98.5px] top-[75.5px] w-[155px] h-[65px] flex items-center justify-center">
                      <div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[18px] py-[12px] font-['Almarena_Neue',sans-serif] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md hover:border hover:border-[#002f82]/20 cursor-pointer">
                        Problem Framing
                      </div>
                    </div>

                    {/* 3. Information Architecture */}
                    <div data-reveal data-reveal-delay="3" className="absolute left-[238.5px] top-[161.5px] w-[199px] h-[65px] flex items-center justify-center">
                      <div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[20px] py-[12px] font-['Almarena_Neue',sans-serif] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md hover:border hover:border-[#002f82]/20 cursor-pointer">
                        Information Architecture
                      </div>
                    </div>

                    {/* 4. Wireframing */}
                    <div data-reveal data-reveal-delay="4" className="absolute left-[403.5px] top-[226.5px] w-[122px] h-[66px] flex items-center justify-center">
                      <div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[20px] py-[12px] font-['Almarena_Neue',sans-serif] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md hover:border hover:border-[#002f82]/20 cursor-pointer">
                        Wireframing
                      </div>
                    </div>

                    {/* 5. High-Fidelity Design */}
                    <div data-reveal data-reveal-delay="5" className="absolute left-[479.5px] top-[303.5px] w-[168px] h-[66px] flex items-center justify-center">
                      <div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[18px] py-[12px] font-['Almarena_Neue',sans-serif] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md hover:border hover:border-[#002f82]/20 cursor-pointer">
                        High-Fidelity Design
                      </div>
                    </div>

                    {/* 6. Prototype & Evaluation */}
                    <div data-reveal data-reveal-delay="6" className="absolute left-[505.5px] top-[369.5px] w-[193px] h-[65px] flex items-center justify-center">
                      <div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[16px] py-[12px] font-['Almarena_Neue',sans-serif] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md hover:border hover:border-[#002f82]/20 cursor-pointer">
                        Prototype &amp; Evaluation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ───────────────── 4. KEY APP SCREENS WITH STICKY NOTES (Frame 99, 443:167) ───────────────── */}
          <section
            data-section="05_overview_screens"
            className="w-full max-w-[1440px] px-4 sm:px-8 xl:px-[81px] py-[30px] xl:py-[47px] flex items-center justify-center overflow-visible"
            aria-label="Key App Screens"
          >
            {/* 3 Phone Screens side by side from Figma node 752:982 with rotated sticky notes */}
            <div className="flex flex-col xl:flex-row items-center justify-center gap-[60px] xl:gap-[80px] shrink-0 pt-4 pb-12">
              {/* Phone 1 + Sticky Note 1 (Blue) */}
              <div data-reveal data-reveal-delay="1" className="relative shrink-0 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2">
                <div
                  className="w-[288.8px] h-[535.1px] relative overflow-hidden"
                  data-node-id="466:5312"
                  data-name="Influcrush (10) 1"
                >
                  <img
                    src="/assets/case-studies/cirqell/imgInflucrush101.png"
                    alt="Link your Facebook"
                    className="absolute h-full left-[-88.18%] max-w-none top-0 w-[471.53%] pointer-events-none select-none"
                    draggable={false}
                  />
                </div>
                {/* Rotated Sticky Note 1 (Blue, Group 36, 752:983) */}
                <div className="absolute top-[375px] -right-[40px] z-20 flex-none rotate-[-15.28deg] pointer-events-auto">
                  <div className="relative bg-[#b6e8ff] border-[0.693px] border-[rgba(138,56,245,0.1)] border-solid rounded-[5.2px] shadow-[1.733px_2.599px_10.396px_rgba(0,0,0,0.18)] p-3 w-[187px] min-h-[229px] flex flex-col justify-center transition-all duration-300 hover:scale-105 hover:rotate-[-10deg] hover:shadow-[4px_8px_24px_rgba(0,0,0,0.22)] cursor-pointer">
                    {/* Yellow Tape */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[55px] h-[24px] bg-[#ffd54f] opacity-75 rounded-[1.7px] shadow-[0px_0.866px_2.6px_rgba(0,0,0,0.15)] pointer-events-none" />
                    <div className="font-['Architects_Daughter'] flex flex-col gap-[8px] text-[11.9px] leading-[16.6px]">
                      <p className="text-[#ee3f64] text-center">
                        Users need a reliable way to establish identity and build trust before interacting with other people.
                      </p>
                      <div className="text-[#3d2b0e]">
                        <p className="mb-0">Integrated Facebook account verification to simplify onboarding and add an additional layer of profile authenticity.</p>
                        <p className="mb-0 font-bold mt-1">Key benefits:</p>
                        <ul className="list-disc pl-[17.85px]">
                          <li>Simplified onboarding</li>
                          <li>Greater profile credibility</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone 2 + Sticky Note 2 (Green) */}
              <div data-reveal data-reveal-delay="2" className="relative shrink-0 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2">
                <div
                  className="w-[288.8px] h-[535.1px] relative overflow-hidden"
                  data-node-id="752:980"
                  data-name="Influcrush (10) 2"
                >
                  <img
                    src="/assets/case-studies/cirqell/imgInflucrush101.png"
                    alt="Near By You Map"
                    className="absolute h-full left-[-185.83%] max-w-none top-[-0.05%] w-[471.53%] pointer-events-none select-none"
                    draggable={false}
                  />
                </div>
                {/* Rotated Sticky Note 2 (Green, Group 37, 752:1001) */}
                <div className="absolute top-[375px] -right-[40px] z-20 flex-none rotate-[-15.28deg] pointer-events-auto">
                  <div className="relative bg-[#caffcf] border-[0.693px] border-[rgba(138,56,245,0.1)] border-solid rounded-[5.2px] shadow-[1.733px_2.599px_10.396px_rgba(0,0,0,0.18)] p-3 w-[187px] min-h-[229px] flex flex-col justify-center transition-all duration-300 hover:scale-105 hover:rotate-[-10deg] hover:shadow-[4px_8px_24px_rgba(0,0,0,0.22)] cursor-pointer">
                    {/* Yellow Tape */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[55px] h-[24px] bg-[#ffd54f] opacity-75 rounded-[1.7px] shadow-[0px_0.866px_2.6px_rgba(0,0,0,0.15)] pointer-events-none" />
                    <div className="font-['Architects_Daughter'] flex flex-col gap-[8px] text-[11.9px] leading-[16.6px]">
                      <p className="text-[#ee3f64] text-center">
                        Users struggle to discover relevant people around them, especially those they could connect with in real life.
                      </p>
                      <div className="text-[#3d2b0e]">
                        <p className="mb-0">Introduced an interactive, location-based discovery map to help users explore and find people nearby.</p>
                        <p className="mb-0 font-bold mt-1">Key benefits:</p>
                        <ul className="list-disc pl-[17.85px]">
                          <li>Nearby people discovery</li>
                          <li>Location-based connections</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone 3 + Sticky Note 3 (Purple) */}
              <div data-reveal data-reveal-delay="3" className="relative shrink-0 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2">
                <div
                  className="w-[288.8px] h-[535.1px] relative overflow-hidden"
                  data-node-id="752:981"
                  data-name="Influcrush (10) 3"
                >
                  <img
                    src="/assets/case-studies/cirqell/imgInflucrush101.png"
                    alt="Creator Profile"
                    className="absolute h-full left-[-280.42%] max-w-none top-0 w-[471.53%] pointer-events-none select-none"
                    draggable={false}
                  />
                </div>
                {/* Rotated Sticky Note 3 (Purple, Group 38, 752:1007) */}
                <div className="absolute top-[375px] -right-[40px] z-20 flex-none rotate-[-15.28deg] pointer-events-auto">
                  <div className="relative bg-[#e8d7fd] border-[0.693px] border-[rgba(138,56,245,0.1)] border-solid rounded-[5.2px] shadow-[1.733px_2.599px_10.396px_rgba(0,0,0,0.18)] p-3 w-[213px] min-h-[229px] flex flex-col justify-center transition-all duration-300 hover:scale-105 hover:rotate-[-10deg] hover:shadow-[4px_8px_24px_rgba(0,0,0,0.22)] cursor-pointer">
                    {/* Yellow Tape */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[55px] h-[24px] bg-[#ffd54f] opacity-75 rounded-[1.7px] shadow-[0px_0.866px_2.6px_rgba(0,0,0,0.15)] pointer-events-none" />
                    <div className="font-['Architects_Daughter'] flex flex-col gap-[8px] text-[11.9px] leading-[16.6px]">
                      <p className="text-[#ee3f64] text-center">
                        Basic profiles often lack the context needed to understand someone&apos;s personality, interests, and reasons for connecting.
                      </p>
                      <div className="text-[#3d2b0e]">
                        <p className="mb-0">Designed customizable profiles with genre, conversation intent, current mood, and interests to make discovering compatible people easier.</p>
                        <p className="mb-0 font-bold mt-1">Key benefits:</p>
                        <ul className="list-disc pl-[17.85px]">
                          <li>Context-rich profiles</li>
                          <li>More relevant connections</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ───────────────── 5. PROBLEM SPACE (Frame 91, 443:171) ───────────────── */}
          <section
            data-section="06_problem_space" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex justify-start"
            aria-label="Problem Space"
          >
            <div className="w-full max-w-[588px] flex flex-col gap-[15px]">
              <h2 className="font-['Almarena_Neue',sans-serif] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Problem Space
              </h2>
              <div className="flex flex-col gap-4 font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black">
                <p>
                  Social platforms let creators build huge audiences but give them little control over who reaches them or how their time is valued.
                </p>
                <p>
                  Social DMs are asynchronous and noisy. Clubhouse-style rooms are group-based and unmonetized for individuals. Cameo is pre-recorded, with no real-time interaction.
                </p>
                <p>
                  There is no dedicated space for controlled, intentional, fee-based one-on-one voice conversations with verification and proximity-based discovery.
                </p>
              </div>
            </div>
          </section>

          {/* ───────────────── 6. KEY CHALLENGES (Frame 92, 443:175) ───────────────── */}
          <section
            data-section="07_key_challenges" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex justify-end"
            aria-label="Key Challenges"
          >
            <div className="w-full max-w-[653px] flex flex-col gap-[24px]">
              <h2 className="font-['Almarena_Neue',sans-serif] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Key Challenges
              </h2>
              <div className="flex flex-col gap-5 font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-black">For Users</h3>
                  <p>
                    Comment sections feel impersonal; users want real, direct access to creators they follow, with transparent pricing and no hidden subscriptions.
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-black">For Creators</h3>
                  <p>
                    Hundreds of daily messages and unpaid advice requests make it hard to find genuine requests, protect privacy, and monetize their time beyond brand deals.
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-black">For Existing Platforms</h3>
                  <p>
                    Products solve either broadcast reach or recorded personalization, but none offer verified, real-time, creator-controlled conversations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ───────────────── 7. BENTO SHOWCASE (Frame 94, 443:180) ───────────────── */}
          <section
            data-section="08_bento_showcase" data-reveal
            className="w-full max-w-[1440px] px-4 sm:px-8 xl:px-[61px] py-[20px] xl:py-[32px]"
            aria-label="Visual Showcase"
          >
            <div className="w-full max-w-[1318px] mx-auto">
              <img
                src="/assets/case-studies/cirqell/imgInflucrush81.png"
                alt="Cirqell Visual Showcase"
                className="w-full h-auto rounded-[20px] object-cover shadow-sm"
                draggable={false}
              />
            </div>
          </section>

          {/* ───────────────── 8. OPPORTUNITY (Frame 95, 443:182) ───────────────── */}
          <section
            data-section="09_opportunity" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex justify-start"
            aria-label="Opportunity"
          >
            <div className="w-full max-w-[629px] flex flex-col gap-[15px]">
              <h2 className="font-['Almarena_Neue',sans-serif] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Opportunity
              </h2>
              <p className="font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black">
                Creators increasingly monetize expertise and attention, yet no product treats a live conversation as a premium, protected experience. Cirqell explores that gap.
              </p>
            </div>
          </section>

          {/* ───────────────── 9. THE 4 PILLARS (Frame 96, 443:186) ───────────────── */}
          <section
            data-section="10_pillars"
            className="w-full max-w-[1440px] px-4 sm:px-8 xl:px-[81px] py-[30px] xl:py-[47px]"
            aria-label="Four Strategic Pillars"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px] justify-items-center">
              {[
                {
                  title: "Creator Monetization",
                  desc: "Creators earn fairly for every minute of their time.",
                },
                {
                  title: "Real-Time Intimacy",
                  desc: "Voice feels more authentic than text and more personal than pre-recorded video.",
                },
                {
                  title: "Creator Control",
                  desc: "Creators set pricing, availability, and who can reach them.",
                },
                {
                  title: "Trust & Safety",
                  desc: "Creators set pricing, availability, and who can reach them.",
                },
              ].map((pillar, idx) => (
                <div
                  key={pillar.title}
                  data-reveal
                  data-reveal-delay={(idx % 4 + 1).toString()}
                  className="w-full max-w-[311px] h-[220px] rounded-[20px] bg-[#dee4ef] p-[10px] flex flex-col justify-center items-center text-center gap-[10px] transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:bg-[#d8e0ed] cursor-pointer"
                >
                  <h3 className="font-['Almarena_Neue',sans-serif] font-semibold text-[20px] leading-[48px] tracking-[-0.96px] text-[#111] whitespace-nowrap">
                    {pillar.title}
                  </h3>
                  <p className="font-['Almarena_Neue',sans-serif] font-normal text-[16px] leading-[25px] text-black w-[241px]">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ───────────────── 10. VALIDATION (Frame 97, 443:199) ───────────────── */}
          <section
            data-section="11_validation" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex justify-start"
            aria-label="Opportunity Validation"
          >
            <div className="w-full max-w-[568px] flex flex-col gap-[15px]">
              <h2 className="font-['Almarena_Neue',sans-serif] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                How I validated the opportunity
              </h2>
              <ul className="list-disc list-outside pl-6 flex flex-col gap-1 font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black">
                <li>I interviewed users who actively follow influencers and have paid for creator content (Patreon, Cameo, etc.) [add number of interviews].</li>
                <li>I surveyed age group, occupation and preferred communication style [add number of responses].</li>
                <li>I compared Clubhouse and Cameo against the gap Cirqell targets.</li>
                <li>I developed one creator persona and one audience persona.</li>
              </ul>
            </div>
          </section>

          {/* ───────────────── 11. KEY INSIGHTS (Frame 98, 443:203) ───────────────── */}
          <section
            data-section="12_insights" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex justify-end"
            aria-label="Key Insights"
          >
            <div className="w-full max-w-[602px] flex flex-col gap-[15px]">
              <h2 className="font-['Almarena_Neue',sans-serif] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Key Insights
              </h2>
              <ul className="list-disc list-outside pl-6 flex flex-col gap-1 font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black">
                <li>Users prefer voice over text when they want authenticity.</li>
                <li>Verified profiles are essential before anyone pays or talks.</li>
                <li>Transparent per-minute pricing builds trust; hidden subscriptions erode it.</li>
                <li>Proximity-based discovery adds spontaneity and feels unique.</li>
              </ul>
            </div>
          </section>

          {/* ───────────────── 12. INFORMATION ARCHITECTURE (Frame 99, 443:207) ───────────────── */}
          <section
            data-section="13_info_architecture" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex flex-col gap-[30px] items-start"
            aria-label="Information Architecture"
          >
            <div className="w-full flex flex-col gap-[15px] items-start">
              <h2 className="font-['Almarena_Neue',sans-serif] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Information Architecture
              </h2>
              <p className="font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[588px]">
                The product is organized around four core experiences:
              </p>
            </div>

            <div className="w-full flex flex-wrap items-center justify-center gap-[20px] py-4">
              {["Discover", "Connect", "Call", "Manage"].map((node, idx) => (
                <React.Fragment key={node}>
                  <div
                    data-reveal
                    data-reveal-delay={(idx + 1).toString()}
                    className="size-[121px] rounded-full bg-[#dee4ef] flex items-center justify-center text-center font-['Almarena_Neue',sans-serif] font-semibold text-[16px] leading-[26.4px] tracking-[-0.528px] text-[#111] shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md hover:bg-[#cfdbee] cursor-pointer"
                  >
                    {node}
                  </div>
                  {idx < 3 && (
                    <div className="w-[63px] h-[28px] shrink-0 flex items-center justify-center">
                      <img
                        src="/assets/case-studies/cirqell/imgFrame105.svg"
                        alt=""
                        className="w-full h-full object-contain pointer-events-none select-none"
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <p className="font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[953px]">
              Separate journeys for creators and users keep navigation focused while supporting both goals.
            </p>
          </section>

          {/* ───────────────── 13. USER FLOW (Frame 100, 443:228) ───────────────── */}
          <section
            data-section="14_user_flow" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex flex-col gap-[30px] items-start"
            aria-label="User Flow"
          >
            <div className="w-full flex flex-col gap-[15px] items-start">
              <h2 className="font-['Almarena_Neue',sans-serif] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                User Flow
              </h2>
              <p className="font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[814px]">
                A streamlined path from launch to a paid voice call, with verification and transparent pricing at every step.
              </p>
            </div>

            {/* 3-Phase Rows with 5 circular nodes each */}
            <div className="w-full flex flex-col gap-[24px] py-2 overflow-x-auto">
              {[
                ["Splash", "Onboarding", "Sign Up/Login", "OTP Verification", "Profile Setup"],
                ["Home Feed (map)", "Filter", "Creator Profile", "Select Call Duration", "Initiate Call"],
                ["Payment", "Wallet Management", "Recharge", "Creator Earnings", "Withdraw"],
              ].map((row, rIdx) => (
                <div key={rIdx} className="min-w-[920px] flex items-center justify-center gap-[20px]">
                  {row.map((step, sIdx) => (
                    <React.Fragment key={step}>
                      <div className="size-[121px] rounded-full bg-[#f2f2f3] p-[5.5px] flex items-center justify-center text-center font-['Almarena_Neue',sans-serif] font-semibold text-[14px] leading-[22px] tracking-[-0.528px] text-[#111] shadow-sm">
                        <span className="w-[104px]">{step}</span>
                      </div>
                      {sIdx < 4 && (
                        <div className="w-[63px] h-[28px] shrink-0 flex items-center justify-center">
                          <img
                            src="/assets/case-studies/cirqell/imgFrame105.svg"
                            alt=""
                            className="w-full h-full object-contain pointer-events-none select-none"
                          />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* ───────────────── 14. IDEATION (Frame 101, 443:256) ───────────────── */}
          <section
            data-section="15_ideation" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex flex-col gap-[15px] items-start"
            aria-label="Ideation"
          >
            <div className="w-full flex flex-col gap-[15px] items-start">
              <h2 className="font-['Almarena_Neue',sans-serif] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Ideation
              </h2>
              <p className="font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[1116px]">
                I started with quick hand sketches to explore navigation, screen hierarchy and call flows, and to explore the Cirqell logo mark, before committing to digital wireframes.
              </p>
            </div>

            <div className="w-full flex justify-center py-2">
              <div className="w-full max-w-[624px] rounded-[12px] overflow-hidden shadow-sm flex items-center justify-center">
                <img
                  src="/assets/case-studies/cirqell/imgInflucrush91.png"
                  alt="Cirqell Ideation Sketches"
                  className="w-full h-auto object-contain"
                  draggable={false}
                />
              </div>
            </div>
          </section>

          {/* ───────────────── 15. LOW-FIDELITY WIREFRAMES (Frame 102, 443:262) ───────────────── */}
          <section
            data-section="16_wireframes" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex flex-col gap-[15px] items-start"
            aria-label="Low-Fidelity Wireframes"
          >
            <div className="w-full flex flex-col gap-[15px] items-start">
              <h2 className="font-['Almarena_Neue',sans-serif] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Low-Fidelity Wireframes
              </h2>
              <p className="font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[1116px]">
                Sketches became wireframes to validate navigation, information hierarchy and the call-initiation flow. Working in low fidelity let me iterate fast on the map discovery and profile screens before investing in visuals.
              </p>
            </div>

            <div className="w-full bg-[#dee4ef] rounded-[20px] flex items-center justify-center py-6 px-4 xl:h-[654px]">
              <img
                src="/assets/case-studies/cirqell/cirqell_wireframes_grid.png"
                alt="Cirqell Low Fidelity Wireframes"
                className="w-full max-w-[933px] h-auto object-contain"
                draggable={false}
              />
            </div>
          </section>

          {/* ───────────────── 16. SOLUTION & CORE EXPERIENCE (Frame 108, 443:268) ───────────────── */}
          <section
            data-section="17_solution" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[40px] flex flex-col gap-[24px] items-start"
            aria-label="Solution &amp; Core Experience"
          >
            <div className="flex flex-col gap-[12px]">
              <h2 className="font-['Almarena_Neue',sans-serif] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Solution
              </h2>
              <p className="font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[791px]">
                Cirqell is a curated voice ecosystem. Creators control pricing and availability; users discover nearby creators by genre, intent, mood and interest, preview a voice note, choose a call duration, see the price upfront, and call.
              </p>
            </div>

            <div className="flex flex-col gap-[12px]">
              <h3 className="font-['Almarena_Neue',sans-serif] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Core Experience
              </h3>
              <ul className="list-disc list-outside pl-6 flex flex-col gap-1 font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[791px]">
                <li>Discover nearby verified creators on a map, filtered by genre, intent, mood and interest.</li>
                <li>Preview a creator&apos;s voice note before deciding to connect.</li>
                <li>Choose call duration with clear per-minute pricing shown upfront.</li>
                <li>Call privately, with wallet-based payment and creator earnings and withdrawals.</li>
              </ul>
            </div>
          </section>

          {/* ───────────────── 17. HIGH-FIDELITY DESIGN (Frame 103, 443:275) ───────────────── */}
          <section
            data-section="18_hifi_screens" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex flex-col gap-[15px] items-start"
            aria-label="High-Fidelity Design"
          >
            <div className="w-full flex flex-col gap-[15px] items-start">
              <h2 className="font-['Almarena_Neue',sans-serif] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                High-Fidelity Design
              </h2>
              <p className="font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[1116px]">
                A dark navy and cyan interface with glass-style cards creates a premium, exclusive feel while keeping focus on profiles, voice and pricing.
              </p>
            </div>

            <div className="w-full flex justify-center py-2">
              <CirqellHiFiScreens />
            </div>
          </section>

          {/* ───────────────── 18. DESIGN SYSTEM (Frame 104, 443:294) ───────────────── */}
          <section
            data-section="19_design_system" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex flex-col gap-[15px] items-start"
            aria-label="Design System"
          >
            <div className="w-full flex flex-col gap-[15px] items-start">
              <h2 className="font-['Almarena_Neue',sans-serif] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Design System
              </h2>
              <p className="font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[1116px]">
                A reusable system of colour tokens, type scale and components for consistency and clean developer handoff.
              </p>
            </div>

            <div className="w-full flex justify-center py-2">
              <img
                src="/assets/case-studies/cirqell/cirqell_design_system_overview.png"
                alt="Cirqell Design System Sheet"
                className="w-full max-w-[1433px] h-auto rounded-[20px] shadow-sm"
                draggable={false}
              />
            </div>
          </section>

          {/* ───────────────── 19. ACCESSIBILITY (Frame 105, 443:300) ───────────────── */}
          <section
            data-section="20_accessibility" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex justify-start"
            aria-label="Accessibility"
          >
            <div className="w-full max-w-[588px] flex flex-col gap-[15px]">
              <h2 className="font-['Almarena_Neue',sans-serif] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Accessibility
              </h2>
              <p className="font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black">
                Accessibility considerations included sufficient colour contrast on dark surfaces, readable type scale, clear interaction states, and touch-friendly controls.
              </p>
            </div>
          </section>

          {/* ───────────────── 20. BUSINESS IMPACT (Frame 106, 443:304) ───────────────── */}
          <section
            data-section="21_business_impact" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex justify-end"
            aria-label="Business Impact"
          >
            <div className="w-full max-w-[602px] flex flex-col gap-[15px]">
              <h2 className="font-['Almarena_Neue',sans-serif] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Business Impact
              </h2>
              <div className="font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black">
                <p className="font-semibold text-black mb-1">Expected Outcomes</p>
                <p className="mb-0">• Sustainable per-minute revenue model for creators and the platform</p>
                <p className="mb-0">• Higher-quality, intentional interactions</p>
                <p className="mb-0">• Stronger creator control and privacy</p>
                <p>• Increased user trust through verification</p>
              </div>
            </div>
          </section>

          {/* ───────────────── 21. REFLECTION (Frame 107, 443:308) ───────────────── */}
          <section
            data-section="22_reflection" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex justify-start"
            aria-label="Reflection"
          >
            <div className="w-full max-w-[588px] flex flex-col gap-[15px]">
              <h2 className="font-['Almarena_Neue',sans-serif] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Reflection
              </h2>
              <div className="font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black flex flex-col gap-4">
                <p>
                  Cirqell taught me to design trust into a product, not just an interface.
                </p>
                <p>
                  Balancing creator control, user safety and a monetization model pushed me to make decisions I could justify with research.
                </p>
                <p>
                  Next, I would test [add next step, e.g. call-quality edge cases, creator onboarding] to validate the model at scale.
                </p>
              </div>
            </div>
          </section>

          {/* ───────────────── NEXT CASE STUDY SECTION ───────────────── */}
          <section
            data-section="next_case_study" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[60px] xl:py-[80px]"
            aria-label="Next Case Study"
          >
            <div className="w-full flex flex-col gap-[20px]">
              <div className="flex items-center gap-3">
                <span className="font-['Almarena_Neue',sans-serif] font-bold text-[12px] sm:text-[14px] uppercase tracking-[2px] text-[#8364fc]">
                  Next Project
                </span>
                <span className="h-px flex-1 max-w-[80px] bg-[#8364fc]/40" />
              </div>

              <Link
                href="/work/influcrush"
                data-cursor-key="project-influcrush"
                className="group relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden border border-black/10 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.008] bg-gradient-to-br from-[#76018c] via-[#3a0046] to-[#020103] p-6 sm:p-10 xl:p-14 flex flex-col justify-between min-h-[280px] sm:min-h-[360px]"
              >
                {/* Giant Ghost Text Background */}
                <div className="absolute right-6 -bottom-6 sm:right-10 sm:-bottom-8 pointer-events-none select-none opacity-15">
                  <span className="font-['Almarena_Neue',sans-serif] font-black text-[70px] sm:text-[120px] xl:text-[160px] leading-none tracking-[10px] sm:tracking-[25px] text-white uppercase whitespace-nowrap">
                    INFLUCRUSH
                  </span>
                </div>

                {/* Top Badge & Indicator */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-white/15 backdrop-blur-md px-3.5 py-1 font-['Almarena_Neue',sans-serif] font-medium text-[13px] text-white border border-white/20">
                    0→1 Design
                  </span>
                  <div className="size-11 sm:size-14 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shadow-md">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col gap-3 max-w-[720px] pt-10 sm:pt-14">
                  <h3 className="font-['Almarena_Neue',sans-serif] font-semibold text-[28px] sm:text-[40px] xl:text-[48px] leading-[1.15] text-white tracking-[-1px]">
                    InfluCrush
                  </h3>
                  <p className="font-['Almarena_Neue',sans-serif] font-normal text-[15px] sm:text-[18px] leading-[26px] text-white/80">
                    Designing an engaging social monetization platform connecting creators and verified influencers with their audience.
                  </p>
                  <div className="pt-2 flex items-center gap-2 font-['Almarena_Neue',sans-serif] font-semibold text-[15px] text-white group-hover:underline">
                    <span>View Case Study</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>

        </div>
      </main>

      {/* ─── Signature Site Contact Footer (Matches Homepage Exactly) ─── */}
      <footer className="w-full relative mt-16">
        <div className="hidden xl:flex flex-col items-center w-full">
          <DesktopContactFooter />
        </div>
        <div className="xl:hidden w-full flex flex-col">
          <MobileContactFooter />
        </div>
      </footer>
    </div>
  );
}
