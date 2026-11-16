"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ScrollProgressBar } from "./ScrollProgressBar";
import { DesktopNavbarContent, MobileHeader } from "@/components/Header";
import { DesktopContactFooter, MobileContactFooter } from "@/components/ContactFooter";

// ─── InfluCrush High-Fidelity Design Screen Assets ───
const imgLoginScreen1 = "/assets/case-studies/influcrush/9b17937454858e18d6eb362df52f99b791626cb6.png";
const imgCelebLogin3 = "/assets/case-studies/influcrush/8a10fdf3cf3f0d38b3376bce8c1d7bbb5cdde6ec.png";
const imgCelebLogin21 = "/assets/case-studies/influcrush/2839c1011858723a1631c215e3b6e76291cb8408.png";
const imgCLocation1 = "/assets/case-studies/influcrush/daa73007b2a2ce27089eaa8e3e9c9b7b7c799354.png";
const imgCIdentity1 = "/assets/case-studies/influcrush/8901844ce05311f397679b689770514494661930.png";
const imgHeightSetting1 = "/assets/case-studies/influcrush/77ed4638f9c29b1695b310c7e43282abf3181814.png";
const imgCFaceVerify1 = "/assets/case-studies/influcrush/e57df5efc1d76f88ac478f8a12c431ed417a0a58.png";
const imgCFaceVerify21 = "/assets/case-studies/influcrush/771bc7a127f6449c85cc6c642ed9e8edcf8426a8.png";
const imgCVerifDone1 = "/assets/case-studies/influcrush/554050dbe39ce233e1e5d045915d042e3a050520.png";
const imgKycDigiloacker1 = "/assets/case-studies/influcrush/a68b62e72c42625f7a5da5d8db4d95c33605f5ee.png";
const imgCOnboarding11 = "/assets/case-studies/influcrush/9c3795ac5bfa97c39295ea1d390763cd0a2c41e3.png";

export function InfluCrushPage() {
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
    <div className="w-full min-h-screen bg-transparent [overflow-x:clip] select-none text-[#111111] font-['Inter']">
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

          {/* ───────────────── 1. HERO INTRO (Frame 87, 315:168) ───────────────── */}
          <section
            data-section="02_hero_intro"
            className="w-full max-w-[1440px] min-h-[560px] xl:min-h-[636px] flex flex-col items-end pr-5 sm:pr-10 xl:pr-[81px] pt-8 sm:pt-14 xl:pt-[104px] pb-10 xl:pb-[104px]"
            aria-label="Hero Overview"
          >
            <div data-reveal className="w-full max-w-[953px] flex flex-col gap-[24px] xl:gap-[36px]">
              <span className="font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black uppercase tracking-normal">
                InfluCrush Mobile Application
              </span>

              <h1 className="font-['Inter'] font-medium text-[26px] sm:text-[30px] leading-[36px] sm:leading-[40px] text-black">
                A creator-first relationship platform designed for intentional, trusted connections.
              </h1>

              <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black">
                InfluCrush explores a new category at the intersection of the creator economy and online dating. Designed from scratch, it gives creators full control over who they connect with while helping users build meaningful relationships through a trust-first, subscription-based experience.
              </p>

              {/* Discipline Tags — 2 distinct rows as in Figma Frame 97 */}
              <div className="flex flex-col gap-[9px] w-full max-w-[693px]">
                <div className="flex flex-wrap gap-[8px] items-center">
                  {["Product Strategy", "UX Research", "Information Architecture", "Interaction Design"].map((tag) => (
                    <span
                      key={tag}
                      className="border border-black border-solid rounded-[200px] px-[14px] py-[3px] sm:py-[4px] font-['Inter'] font-normal text-[14px] sm:text-[16px] leading-[27px] sm:leading-[35px] text-black whitespace-nowrap bg-transparent transition-all duration-200 hover:scale-105 hover:bg-[#8364fc]/5 hover:border-[#8364fc] cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-[8px] items-center">
                  {["UI Design", "Prototyping", "Design System"].map((tag) => (
                    <span
                      key={tag}
                      className="border border-black border-solid rounded-[200px] px-[14px] py-[3px] sm:py-[4px] font-['Inter'] font-normal text-[14px] sm:text-[16px] leading-[27px] sm:leading-[35px] text-black whitespace-nowrap bg-transparent transition-all duration-200 hover:scale-105 hover:bg-[#8364fc]/5 hover:border-[#8364fc] cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta details */}
              <p className="font-['Inter'] font-normal text-[14px] sm:text-[16px] leading-[25px] text-black">
                Product Designer | 5 Months | Mobile App (iOS &amp; Android) | Solo Project
              </p>
            </div>
          </section>

          {/* ───────────────── 2. HERO BANNER MOCKUP (Frame 88, 320:181) ───────────────── */}
          <section
            data-section="03_hero_banner"
            className="w-full max-w-[1440px] min-h-[460px] xl:h-[566px] flex items-center justify-center px-4 sm:px-8 xl:px-[61px] py-[20px] xl:py-[24px]"
            aria-label="InfluCrush Hero Preview"
          >
            <div className="group relative w-full max-w-[1318px] h-[380px] sm:h-[480px] xl:h-[542px] rounded-[24px] sm:rounded-[30px] bg-[#f1e5f3] overflow-hidden flex items-center justify-center transition-shadow duration-500 hover:shadow-xl">
              {/* Giant Ghost Brand Title - Exactly Centered and Fully Contained Within Box */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[120px] sm:top-[140px] xl:top-[140.5px] -translate-y-1/2 pointer-events-none select-none z-0 flex items-center justify-center w-full">
                <span className="font-['Inter'] font-extrabold text-[clamp(44px,13.2vw,192.8px)] leading-none tracking-[-0.01em] text-[#720287] opacity-20 uppercase whitespace-nowrap text-center">
                  INFLUCRUSH
                </span>
              </div>

              {/* 3D Phone Mockup - Rigidly Centered in the Middle with Isolated Float Animation */}
              <div className="z-10 w-[220px] sm:w-[280px] xl:w-[301px] h-[90%] sm:h-[95%] xl:h-[568px] relative xl:absolute xl:top-[107px] xl:left-1/2 xl:-translate-x-1/2 flex items-end justify-center pointer-events-none">
                <div className="w-full h-full flex items-end justify-center animate-float-slow transition-transform duration-500 ease-out group-hover:scale-[1.03] pointer-events-auto">
                  <img
                    src="/assets/case-studies/influcrush/fc432d4b02ed226592080afb117f55eb4f04f720.png"
                    alt="InfluCrush Phone Mockup"
                    className="w-full h-full object-cover object-top drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ───────────────── 3. DESIGN PROCESS TIMELINE (Frame 89, 327:208) ───────────────── */}
          <section
            data-section="04_design_process"
            className="w-full max-w-[1440px] px-4 sm:px-8 xl:px-[60px] py-[20px] xl:py-[39px]"
            aria-label="Design Process"
          >
            <div data-reveal className="w-full max-w-[1320px] mx-auto min-h-[720px] xl:min-h-[759px] h-auto rounded-[24px] bg-[#f7f1de] p-6 sm:p-10 xl:p-[56px] flex flex-col gap-[15px] shadow-sm overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <h2 className="font-['Inter'] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Design Process
              </h2>
              <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[851px]">
                From discovery to validation, every phase informed the next ensuring design decisions were driven by user needs, product strategy, and long-term scalability rather than visual execution alone.
              </p>

              {/* Timeline Container without any scrollbar */}
              <div className="w-full pt-[20px] xl:pt-[40px] pb-6 flex justify-center overflow-x-auto xl:overflow-x-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="min-w-[929px] w-[929px] h-[480px] relative shrink-0">
                  {/* Month Headers */}
                  <div className="h-[28px] relative w-full font-['Inter'] font-medium text-[12px] leading-[16px] tracking-[1.2px] text-[#9e9b94]">
                    <div className="absolute left-0 top-0 w-[98.8px] text-center">May</div>
                    <div className="absolute left-[197.6px] top-0 w-[98.8px] text-center">June</div>
                    <div className="absolute left-[395.2px] top-0 w-[98.8px] text-center">July</div>
                    <div className="absolute left-[592.8px] top-0 w-[98.8px] text-center">Aug</div>
                    <div className="absolute left-[790.4px] top-0 w-[98.8px] text-center">Sept</div>
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
                      <div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[22px] py-[12px] font-['Inter'] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md hover:border hover:border-[#720287]/20 cursor-pointer">
                        Research
                      </div>
                    </div>

                    {/* 2. Problem Framing */}
                    <div data-reveal data-reveal-delay="2" className="absolute left-[98.5px] top-[75.5px] w-[155px] h-[65px] flex items-center justify-center">
                      <div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[18px] py-[12px] font-['Inter'] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md hover:border hover:border-[#720287]/20 cursor-pointer">
                        Problem Framing
                      </div>
                    </div>

                    {/* 3. Information Architecture */}
                    <div data-reveal data-reveal-delay="3" className="absolute left-[238.5px] top-[161.5px] w-[199px] h-[65px] flex items-center justify-center">
                      <div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[20px] py-[12px] font-['Inter'] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md hover:border hover:border-[#720287]/20 cursor-pointer">
                        Information Architecture
                      </div>
                    </div>

                    {/* 4. Wireframing */}
                    <div data-reveal data-reveal-delay="4" className="absolute left-[403.5px] top-[226.5px] w-[122px] h-[66px] flex items-center justify-center">
                      <div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[20px] py-[12px] font-['Inter'] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md hover:border hover:border-[#720287]/20 cursor-pointer">
                        Wireframing
                      </div>
                    </div>

                    {/* 5. High-Fidelity Design */}
                    <div data-reveal data-reveal-delay="5" className="absolute left-[479.5px] top-[303.5px] w-[168px] h-[66px] flex items-center justify-center">
                      <div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[18px] py-[12px] font-['Inter'] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md hover:border hover:border-[#720287]/20 cursor-pointer">
                        High-Fidelity Design
                      </div>
                    </div>

                    {/* 6. Prototype & Evaluation */}
                    <div data-reveal data-reveal-delay="6" className="absolute left-[505.5px] top-[369.5px] w-[193px] h-[65px] flex items-center justify-center">
                      <div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[16px] py-[12px] font-['Inter'] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md hover:border hover:border-[#720287]/20 cursor-pointer">
                        Prototype &amp; Evaluation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ───────────────── 4. KEY APP SCREENS (Frame 90, 334:387) ───────────────── */}
          <section
            data-section="05_key_screens"
            className="w-full max-w-[1440px] px-4 sm:px-8 xl:px-[81px] py-[30px] xl:py-[47px] flex items-center justify-center overflow-visible"
            aria-label="Key App Screens"
          >
            <div className="flex flex-col xl:flex-row items-center justify-center gap-[40px] xl:gap-[60px] shrink-0 pt-4 pb-8">
              {/* Phone 1 */}
              <div data-reveal data-reveal-delay="1" className="relative shrink-0 flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-[30px]">
                <div className="w-[280px] sm:w-[303.5px] h-[480px] sm:h-[525.2px] relative overflow-hidden rounded-[28px] shadow-md">
                  <img
                    src="/assets/case-studies/influcrush/6bb8ef7a79c33a8443705f0233affa402950130b.png"
                    alt="InfluCrush Screen 1"
                    className="absolute h-[115.78%] left-[-13.57%] max-w-none top-[-7.64%] w-[356.17%] pointer-events-none select-none"
                    draggable={false}
                  />
                </div>
              </div>

              {/* Phone 2 */}
              <div data-reveal data-reveal-delay="2" className="relative shrink-0 flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-[30px]">
                <div className="w-[280px] sm:w-[292.2px] h-[480px] sm:h-[525.2px] relative overflow-hidden rounded-[28px] shadow-md">
                  <img
                    src="/assets/case-studies/influcrush/301e5e00043a30bcb94f318fd30f02d9c6431589.png"
                    alt="InfluCrush Screen 2"
                    className="absolute h-[115.78%] left-[-224.48%] max-w-none top-[-7.89%] w-[370.01%] pointer-events-none select-none"
                    draggable={false}
                  />
                </div>
              </div>

              {/* Phone 3 */}
              <div data-reveal data-reveal-delay="3" className="relative shrink-0 flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-[30px]">
                <div className="w-[280px] sm:w-[303.8px] h-[480px] sm:h-[525.2px] relative overflow-hidden rounded-[28px] shadow-md">
                  <img
                    src="/assets/case-studies/influcrush/6bb8ef7a79c33a8443705f0233affa402950130b.png"
                    alt="InfluCrush Screen 3"
                    className="absolute h-[115.78%] left-[-115.9%] max-w-none top-[-7.89%] w-[355.86%] pointer-events-none select-none"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ───────────────── 5. PROBLEM SPACE (Frame 91, 342:422) ───────────────── */}
          <section
            data-section="06_problem_space" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex justify-start"
            aria-label="Problem Space"
          >
            <div className="w-full max-w-[588px] flex flex-col gap-[15px]">
              <h2 className="font-['Inter'] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Problem Space
              </h2>
              <div className="flex flex-col gap-4 font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black">
                <p>
                  Today&apos;s platforms are built for engagement, not meaningful relationships. Social media allows creators to build large communities but offers little control over personal interactions, while traditional dating apps prioritize discovery at scale over trust and compatibility.
                </p>
                <p>
                  This creates a gap for creators who want to build genuine connections without compromising their privacy, and for users who seek authentic interactions beyond public comments and endless swiping. InfluCrush was conceived to bridge this gap by creating a relationship platform centered around trust, intentional access, and creator control.
                </p>
              </div>
            </div>
          </section>

          {/* ───────────────── 6. KEY CHALLENGES (Frame 92, 342:430) ───────────────── */}
          <section
            data-section="07_key_challenges" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex justify-end"
            aria-label="Key Challenges"
          >
            <div className="w-full max-w-[653px] flex flex-col gap-[24px]">
              <h2 className="font-['Inter'] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Key Challenges
              </h2>
              <div className="flex flex-col gap-5 font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-black">For Users</h3>
                  <p>
                    Meaningful conversations are difficult to initiate in crowded social platforms, while traditional dating apps often encourage superficial interactions.
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-black">For Creators</h3>
                  <p>
                    Managing thousands of unsolicited messages makes it challenging to identify genuine connection requests while maintaining personal boundaries.
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-black">For Existing Platforms</h3>
                  <p>
                    Current products solve either audience engagement or matchmaking, but neither supports structured, trust-first relationships between creators and their communities.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ───────────────── 7. BENTO SHOWCASE (Frame 94, 342:445) ───────────────── */}
          <section
            data-section="08_bento_showcase" data-reveal
            className="w-full max-w-[1440px] px-4 sm:px-8 xl:px-[61px] py-[20px] xl:py-[32px]"
            aria-label="Visual Showcase"
          >
            <div className="w-full max-w-[1318px] mx-auto">
              <img
                src="/assets/case-studies/influcrush/44984f384504864f81986f14c79d3c0e5662f091.png"
                alt="InfluCrush Visual Showcase"
                className="w-full h-auto rounded-[20px] object-cover shadow-sm"
                draggable={false}
              />
            </div>
          </section>

          {/* ───────────────── 8. OPPORTUNITY (Frame 95, 352:60) ───────────────── */}
          <section
            data-section="09_opportunity" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex justify-start"
            aria-label="Opportunity"
          >
            <div className="w-full max-w-[629px] flex flex-col gap-[15px]">
              <h2 className="font-['Inter'] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Opportunity
              </h2>
              <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black">
                The rise of the creator economy has changed how people build trust online, but meaningful interactions still happen through public comments or overcrowded inboxes. Existing dating platforms solve discovery, while social platforms solve reach. Neither is designed for intentional relationships between creators and their communities. InfluCrush explores the opportunity to bridge that gap by combining creator control, trust-first interactions, and a premium relationship experience.
              </p>
            </div>
          </section>

          {/* ───────────────── 9. THE 4 PILLARS (Frame 96, 354:66) ───────────────── */}
          <section
            data-section="10_pillars"
            className="w-full max-w-[1440px] px-4 sm:px-8 xl:px-[81px] py-[30px] xl:py-[47px]"
            aria-label="Four Strategic Pillars"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px] justify-items-center">
              {[
                {
                  title: "Creator Economy",
                  desc: "Creators need meaningful interactions not thousands of unsolicited messages.",
                },
                {
                  title: "Intentional Relationships",
                  desc: "Users value quality conversations over endless swiping.",
                },
                {
                  title: "Creator Control",
                  desc: "Creators decide who can connect, when, and under what conditions.",
                },
                {
                  title: "Premium Access",
                  desc: "Monetization becomes part of the experience instead of interrupting it.",
                },
              ].map((pillar, idx) => (
                <div
                  key={pillar.title}
                  data-reveal
                  data-reveal-delay={(idx % 4 + 1).toString()}
                  className="w-full max-w-[311px] h-[220px] rounded-[20px] bg-[#f1e5f3] p-[10px] flex flex-col justify-center items-center text-center gap-[10px] transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:bg-[#ebd9ee] cursor-pointer"
                >
                  <h3 className="font-['Inter'] font-semibold text-[20px] leading-[48px] tracking-[-0.96px] text-[#111] whitespace-nowrap">
                    {pillar.title}
                  </h3>
                  <p className="font-['Inter'] font-normal text-[16px] leading-[25px] text-black w-[241px]">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ───────────────── 10. VALIDATION (Frame 97, 358:92) ───────────────── */}
          <section
            data-section="11_validation" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex justify-start"
            aria-label="Opportunity Validation"
          >
            <div className="w-full max-w-[588px] flex flex-col gap-[15px]">
              <h2 className="font-['Inter'] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                How I validated the opportunity
              </h2>
              <ul className="list-disc list-outside pl-6 flex flex-col gap-1 font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black">
                <li>Competitive analysis of Tinder, Bumble, Instagram, and Hinge.</li>
                <li>Product teardown of onboarding, discovery, and messaging flows.</li>
                <li>Creator economy and subscription model research.</li>
                <li>Behavioral pattern analysis across social and dating platforms.</li>
              </ul>
            </div>
          </section>

          {/* ───────────────── 11. KEY INSIGHTS (Frame 98, 358:99) ───────────────── */}
          <section
            data-section="12_insights" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex justify-end"
            aria-label="Key Insights"
          >
            <div className="w-full max-w-[602px] flex flex-col gap-[15px]">
              <h2 className="font-['Inter'] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Key Insights
              </h2>
              <ul className="list-disc list-outside pl-6 flex flex-col gap-1 font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black">
                <li>Users value meaningful conversations over endless swiping.</li>
                <li>Creators need control over who can contact them.</li>
                <li>Trust should be established before conversations begin.</li>
                <li>Monetization works best when it enhances the experience, not interrupts it.</li>
              </ul>
            </div>
          </section>

          {/* ───────────────── 12. INFORMATION ARCHITECTURE (Frame 99, 358:103) ───────────────── */}
          <section
            data-section="13_info_architecture" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex flex-col gap-[30px] items-start"
            aria-label="Information Architecture"
          >
            <div className="w-full flex flex-col gap-[15px] items-start">
              <h2 className="font-['Inter'] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Information Architecture
              </h2>
              <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[588px]">
                The product is organized around four core experiences:
              </p>
            </div>

            <div className="w-full flex flex-wrap items-center justify-center gap-[20px] py-4">
              {["Discover", "Connect", "Converse", "Manage"].map((node, idx) => (
                <React.Fragment key={node}>
                  <div
                    data-reveal
                    data-reveal-delay={(idx + 1).toString()}
                    className="size-[121px] rounded-full bg-[#f1e5f3] flex items-center justify-center text-center font-['Inter'] font-semibold text-[16px] leading-[26.4px] tracking-[-0.528px] text-[#111] shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md hover:bg-[#e8d2eb] cursor-pointer"
                  >
                    {node}
                  </div>
                  {idx < 3 && (
                    <div className="w-[63px] h-[28px] shrink-0 flex items-center justify-center">
                      <img
                        src="/assets/case-studies/influcrush/b5210d626001d58e1e80d6ab3da8eb79ab354171.svg"
                        alt=""
                        className="w-full h-full object-contain pointer-events-none select-none"
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[953px]">
              This structure keeps navigation focused while supporting both user goals and creator workflows.
            </p>
          </section>

          {/* ───────────────── 13. USER FLOW (Frame 100, 358:131) ───────────────── */}
          <section
            data-section="14_user_flow" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex flex-col gap-[30px] items-start"
            aria-label="User Flow"
          >
            <div className="w-full flex flex-col gap-[15px] items-start">
              <h2 className="font-['Inter'] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                User Flow
              </h2>
              <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[710px]">
                A streamlined journey designed to minimize friction while building trust at every step.
              </p>
            </div>

            <div className="w-full flex items-center justify-center py-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="min-w-[920px] flex items-center justify-center gap-[20px]">
                {["Onboarding", "Profile Setup", "Discover", "Request Access", "Subscription", "Conversation"].map((step, sIdx) => (
                  <React.Fragment key={step}>
                    <div
                      data-reveal
                      data-reveal-delay={(sIdx % 6 + 1).toString()}
                      className="size-[121px] rounded-full bg-[#f7f1de] p-[5.5px] flex items-center justify-center text-center font-['Inter'] font-semibold text-[14px] leading-[22px] tracking-[-0.528px] text-[#111] shadow-sm transition-all duration-300 hover:scale-105 hover:bg-[#efe6cb] cursor-pointer"
                    >
                      <span className="w-[104px]">{step}</span>
                    </div>
                    {sIdx < 5 && (
                      <div className="w-[63px] h-[28px] shrink-0 flex items-center justify-center">
                        <img
                          src="/assets/case-studies/influcrush/b5210d626001d58e1e80d6ab3da8eb79ab354171.svg"
                          alt=""
                          className="w-full h-full object-contain pointer-events-none select-none"
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>

          {/* ───────────────── 14. IDEATION (Frame 101, 358:161) ───────────────── */}
          <section
            data-section="15_ideation" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex flex-col gap-[15px] items-start"
            aria-label="Ideation"
          >
            <div className="w-full flex flex-col gap-[15px] items-start">
              <h2 className="font-['Inter'] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Ideation
              </h2>
              <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[1116px]">
                I started with quick hand sketches to rapidly explore navigation patterns, screen hierarchy, and interaction flows before committing to digital wireframes. This helped evaluate multiple concepts early while keeping the focus on solving the problem rather than refining visuals.
              </p>
            </div>

            <div className="w-full flex justify-center py-2">
              <div className="w-full max-w-[710px] rounded-[12px] overflow-hidden shadow-sm flex items-center justify-center">
                <img
                  src="/assets/case-studies/influcrush/327c55932f61a7717c588c181868f3253103d16f.png"
                  alt="InfluCrush Ideation Sketches"
                  className="w-full h-auto object-contain"
                  draggable={false}
                />
              </div>
            </div>
          </section>

          {/* ───────────────── 15. LOW-FIDELITY WIREFRAMES (Frame 102, 379:55) ───────────────── */}
          <section
            data-section="16_wireframes" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex flex-col gap-[20px] items-start"
            aria-label="Low-Fidelity Wireframes"
          >
            <div className="w-full flex flex-col gap-[15px] items-start">
              <h2 className="font-['Inter'] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Low-Fidelity Wireframes
              </h2>
              <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[1116px]">
                The sketches were translated into low-fidelity wireframes to validate navigation, information hierarchy, and core user flows. Working in low fidelity made it easier to iterate quickly before moving into high-fidelity designs.
              </p>
            </div>

            <div className="w-full flex items-start justify-center py-2">
              <div className="w-full max-w-[933px] rounded-[20px] overflow-hidden shadow-sm">
                <img
                  src="/assets/case-studies/influcrush/2dbca79dd399148305cb019fb20d6fd9cb33a44c.png"
                  alt="InfluCrush Low Fidelity Wireframes"
                  className="w-full h-auto object-contain"
                  draggable={false}
                />
              </div>
            </div>
          </section>

          {/* ───────────────── 16. SOLUTION & CORE EXPERIENCE (Frame 108, 408:80) ───────────────── */}
          <section
            data-section="17_solution" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[40px] flex flex-col gap-[24px] items-start"
            aria-label="Solution &amp; Core Experience"
          >
            <div className="flex flex-col gap-[12px]">
              <h2 className="font-['Inter'] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Solution
              </h2>
              <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[791px]">
                InfluCrush reimagines creator–community relationships through a trust-first experience. Instead of open messaging, the platform enables creators to control access while allowing users to discover, connect, subscribe, and communicate through a structured interaction model.
              </p>
            </div>

            <div className="flex flex-col gap-[12px]">
              <h3 className="font-['Inter'] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Core Experience
              </h3>
              <ul className="list-disc list-outside pl-6 flex flex-col gap-1 font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[791px]">
                <li>Discover verified creators based on preferences.</li>
                <li>Request Access instead of sending unrestricted messages.</li>
                <li>Subscribe to unlock meaningful conversations.</li>
                <li>Connect through a private and intentional chat experience.</li>
              </ul>
            </div>
          </section>

          {/* ───────────────── 17. HIGH-FIDELITY DESIGN (Frame 103, 382:96) ───────────────── */}
          <section
            data-section="18_hifi_screens" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex flex-col gap-[20px] items-start"
            aria-label="High-Fidelity Design"
          >
            <div className="w-full flex flex-col gap-[15px] items-start">
              <h2 className="font-['Inter'] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                High-Fidelity Design
              </h2>
              <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[1116px]">
                The interface uses a premium dark theme, bold visual hierarchy, and minimal interactions to create an immersive experience while keeping the focus on profiles and conversations.
              </p>
            </div>

            <div className="w-full flex justify-center py-4 overflow-x-auto xl:overflow-x-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="min-w-[933px] w-[933px] flex flex-col gap-[46.6px] items-center">
                {/* Row 1: 6 iPhone Screens */}
                <div className="flex gap-[19.9px] items-center justify-center w-full">
                  {[
                    { img: imgLoginScreen1, alt: "Login Screen 1" },
                    { img: imgCelebLogin3, alt: "Celeb login 3" },
                    { img: imgCelebLogin21, alt: "Celeb login 2 1" },
                    { img: imgCLocation1, alt: "C location 1" },
                    { img: imgCIdentity1, alt: "C identity 1" },
                    { img: imgHeightSetting1, alt: "Height Setting 1" },
                  ].map((s, idx) => (
                    <div
                      key={s.alt}
                      data-reveal
                      data-reveal-delay={(idx % 6 + 1).toString()}
                      className="w-[138.9px] h-[300.6px] relative shrink-0 rounded-[16px] overflow-hidden shadow-md transition-all duration-300 hover:scale-[1.06] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer"
                    >
                      <img
                        src={s.img}
                        alt={s.alt}
                        className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                      />
                    </div>
                  ))}
                </div>

                {/* Row 2: 5 iPhone Screens */}
                <div className="flex gap-[20.6px] items-center justify-center">
                  {[
                    { img: imgCFaceVerify1, alt: "C face Verify 1" },
                    { img: imgCFaceVerify21, alt: "C face verify 2 1" },
                    { img: imgCVerifDone1, alt: "C Verif.. Done 1" },
                    { img: imgKycDigiloacker1, alt: "KYC Digiloacker 1" },
                    { img: imgCOnboarding11, alt: "C Onboarding 1 1" },
                  ].map((s, idx) => (
                    <div
                      key={s.alt}
                      data-reveal
                      data-reveal-delay={(idx % 5 + 1).toString()}
                      className="w-[138.9px] h-[300.6px] relative shrink-0 rounded-[16px] overflow-hidden shadow-md transition-all duration-300 hover:scale-[1.06] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer"
                    >
                      <img
                        src={s.img}
                        alt={s.alt}
                        className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ───────────────── 18. DESIGN SYSTEM (Frame 104, 397:57) ───────────────── */}
          <section
            data-section="19_design_system" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex flex-col gap-[20px] items-start"
            aria-label="Design System"
          >
            <div className="w-full flex flex-col gap-[15px] items-start">
              <h2 className="font-['Inter'] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Design System
              </h2>
              <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black max-w-[1116px]">
                A scalable design system was created using reusable components, consistent spacing, typography, and color tokens to ensure visual consistency and efficient handoff.
              </p>
            </div>

            <div className="w-full flex justify-center py-2">
              <div className="w-full max-w-[1280px] rounded-[20px] overflow-hidden shadow-sm">
                <img
                  src="/assets/case-studies/influcrush/bc31c6e3bf28c22b1f960914f66050a1eb3a3a2e.png"
                  alt="InfluCrush Design System Sheet"
                  className="w-full h-auto rounded-[20px] shadow-sm object-cover"
                  draggable={false}
                />
              </div>
            </div>
          </section>

          {/* ───────────────── 19. ACCESSIBILITY (Frame 105, 405:54) ───────────────── */}
          <section
            data-section="20_accessibility" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex justify-start"
            aria-label="Accessibility"
          >
            <div className="w-full max-w-[588px] flex flex-col gap-[15px]">
              <h2 className="font-['Inter'] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Accessibility
              </h2>
              <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black">
                Accessibility considerations included sufficient color contrast, readable typography, clear interaction states, and touch-friendly components to improve usability across devices.
              </p>
            </div>
          </section>

          {/* ───────────────── 20. BUSINESS IMPACT (Frame 106, 405:68) ───────────────── */}
          <section
            data-section="21_business_impact" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex justify-end"
            aria-label="Business Impact"
          >
            <div className="w-full max-w-[602px] flex flex-col gap-[15px]">
              <h2 className="font-['Inter'] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Business Impact
              </h2>
              <div className="font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black">
                <p className="font-semibold text-black mb-1">Expected Outcomes</p>
                <p className="mb-0">• Higher quality interactions</p>
                <p className="mb-0">• Better creator control</p>
                <p className="mb-0">• Sustainable subscription model</p>
                <p>• Increased user trust and retention</p>
              </div>
            </div>
          </section>

          {/* ───────────────── 21. REFLECTION (Frame 107, 405:76) ───────────────── */}
          <section
            data-section="22_reflection" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[30px] xl:py-[47px] flex justify-start"
            aria-label="Reflection"
          >
            <div className="w-full max-w-[588px] flex flex-col gap-[15px]">
              <h2 className="font-['Inter'] font-medium text-[26px] sm:text-[30px] leading-[48px] tracking-[-0.96px] text-[#111]">
                Reflection
              </h2>
              <div className="font-['Inter'] font-normal text-[15px] sm:text-[16px] leading-[25px] text-black flex flex-col gap-4">
                <p>
                  Designing InfluCrush highlighted the challenge of balancing monetization with authentic connection.
                </p>
                <p>
                  By creating a trust-first access model, the platform empowers creators while ensuring users experience meaningful interactions.
                </p>
                <p>
                  Moving forward, the next step would be testing onboarding drop-off rates and validating creator subscription pricing in a live beta.
                </p>
              </div>
            </div>
          </section>

          {/* ───────────────── NEXT CASE STUDY SECTION (Pointing to Cirqell) ───────────────── */}
          <section
            data-section="next_case_study" data-reveal
            className="w-full max-w-[1440px] px-5 sm:px-10 xl:px-[81px] py-[60px] xl:py-[80px]"
            aria-label="Next Case Study"
          >
            <div className="w-full flex flex-col gap-[20px]">
              <div className="flex items-center gap-3">
                <span className="font-['Inter'] font-bold text-[12px] sm:text-[14px] uppercase tracking-[2px] text-[#002f82]">
                  Next Project
                </span>
                <span className="h-px flex-1 max-w-[80px] bg-[#002f82]/40" />
              </div>

              <Link
                href="/work/cirqell"
                className="group relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-gradient-to-br from-[#00173d] via-[#002f82] to-[#019595] p-8 sm:p-12 xl:p-16 flex flex-col justify-between min-h-[320px] sm:min-h-[380px] transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]"
              >
                {/* Ambient Decorative Glow */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] pointer-events-none group-hover:scale-125 transition-transform duration-700" />

                {/* Ghost Brand Watermark */}
                <div className="absolute -bottom-8 -right-8 pointer-events-none select-none opacity-10">
                  <span className="font-['Inter'] font-extrabold text-[120px] sm:text-[180px] xl:text-[220px] leading-none text-white tracking-[20px]">
                    CIRQELL
                  </span>
                </div>

                {/* Top Badge & Indicator */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-white/15 backdrop-blur-md px-3.5 py-1 font-['Inter'] font-medium text-[13px] text-white border border-white/20">
                    Voice-First Platform
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
                  <h3 className="font-['Inter'] font-semibold text-[28px] sm:text-[40px] xl:text-[48px] leading-[1.15] text-white tracking-[-1px]">
                    Cirqell
                  </h3>
                  <p className="font-['Inter'] font-normal text-[15px] sm:text-[18px] leading-[26px] text-white/80">
                    A voice-first platform for intentional, paid conversations between creators and their audience with transparent per-minute pricing.
                  </p>
                  <div className="pt-2 flex items-center gap-2 font-['Inter'] font-semibold text-[15px] text-white group-hover:underline">
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
