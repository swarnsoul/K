const fs = require('fs');

let code = fs.readFileSync('components/case-study/CirqellPage.tsx', 'utf8');

// 1. Import ScrollProgressBar and useEffect
code = code.replace(
  'import React from "react";',
  'import React, { useEffect } from "react";\nimport { ScrollProgressBar } from "./ScrollProgressBar";'
);

// 2. Add IntersectionObserver in CirqellPage()
const effectHook = `export function CirqellPage() {
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
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);`;

code = code.replace('export function CirqellPage() {', effectHook);

// 3. Mount ScrollProgressBar right inside the main wrapper
code = code.replace(
  '<div className="w-full min-h-screen bg-transparent [overflow-x:clip] select-none text-[#111111] font-[\'Inter\']">',
  `<div className="w-full min-h-screen bg-transparent [overflow-x:clip] select-none text-[#111111] font-['Inter']">
      {/* ─── Reading Progress Bar ─── */}
      <ScrollProgressBar />`
);

// 4. Hero Section reveals & tag hovers
code = code.replace(
  '<div className="w-full max-w-[953px] flex flex-col gap-[24px] xl:gap-[36px]">',
  '<div data-reveal className="w-full max-w-[953px] flex flex-col gap-[24px] xl:gap-[36px]">'
);

code = code.replace(
  'className="border border-black border-solid rounded-[200px] px-[14px] py-[3px] sm:py-[4px] font-[\'Inter\'] font-normal text-[14px] sm:text-[16px] leading-[27px] sm:leading-[35px] text-black whitespace-nowrap bg-transparent"',
  'className="border border-black border-solid rounded-[200px] px-[14px] py-[3px] sm:py-[4px] font-[\'Inter\'] font-normal text-[14px] sm:text-[16px] leading-[27px] sm:leading-[35px] text-black whitespace-nowrap bg-transparent transition-all duration-200 hover:scale-105 hover:bg-[#002f82]/5 hover:border-[#002f82] cursor-default"'
);

// 5. Hero Banner Phone floating animation
code = code.replace(
  'className="relative z-10 w-[220px] sm:w-[280px] xl:w-[335px] h-[90%] sm:h-[95%] xl:h-[596px] xl:absolute xl:top-[152px] xl:left-1/2 xl:-translate-x-1/2 flex items-end justify-center"',
  'className="relative z-10 w-[220px] sm:w-[280px] xl:w-[335px] h-[90%] sm:h-[95%] xl:h-[596px] xl:absolute xl:top-[152px] xl:left-1/2 xl:-translate-x-1/2 flex items-end justify-center animate-float-slow transition-transform duration-500 ease-out group-hover:scale-[1.03]"'
);

code = code.replace(
  'className="relative w-full max-w-[1318px] h-[380px] sm:h-[480px] xl:h-[542px] rounded-[24px] sm:rounded-[30px] bg-[rgba(0,39,109,0.09)] overflow-hidden flex items-center justify-center"',
  'className="group relative w-full max-w-[1318px] h-[380px] sm:h-[480px] xl:h-[542px] rounded-[24px] sm:rounded-[30px] bg-[rgba(0,39,109,0.09)] overflow-hidden flex items-center justify-center transition-shadow duration-500 hover:shadow-xl"'
);

// 6. Design Process Pills cascading reveal & hover lift
code = code.replace(
  'className="w-full max-w-[1320px] mx-auto min-h-[720px] xl:min-h-[759px] h-auto rounded-[24px] bg-[rgba(0,47,130,0.13)] p-6 sm:p-10 xl:p-[56px] flex flex-col gap-[15px] shadow-sm overflow-hidden',
  'data-reveal className="w-full max-w-[1320px] mx-auto min-h-[720px] xl:min-h-[759px] h-auto rounded-[24px] bg-[rgba(0,47,130,0.13)] p-6 sm:p-10 xl:p-[56px] flex flex-col gap-[15px] shadow-sm overflow-hidden'
);

code = code.replace(
  '<div className="absolute left-[23.5px] top-[0.5px] w-[148px] h-[66px] flex items-center justify-center">',
  '<div data-reveal data-reveal-delay="1" className="absolute left-[23.5px] top-[0.5px] w-[148px] h-[66px] flex items-center justify-center">'
);
code = code.replace(
  '<div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[22px] py-[12px] font-[\'Inter\'] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap">',
  '<div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[22px] py-[12px] font-[\'Inter\'] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md hover:border hover:border-[#002f82]/20 cursor-pointer">'
);

code = code.replace(
  '<div className="absolute left-[199px] top-[74.5px] w-[172px] h-[66px] flex items-center justify-center">',
  '<div data-reveal data-reveal-delay="2" className="absolute left-[199px] top-[74.5px] w-[172px] h-[66px] flex items-center justify-center">'
);
code = code.replace(
  '<div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[22px] py-[12px] font-[\'Inter\'] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap">',
  '<div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[22px] py-[12px] font-[\'Inter\'] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md hover:border hover:border-[#002f82]/20 cursor-pointer">'
);

code = code.replace(
  '<div className="absolute left-[378px] top-[148.5px] w-[217px] h-[66px] flex items-center justify-center">',
  '<div data-reveal data-reveal-delay="3" className="absolute left-[378px] top-[148.5px] w-[217px] h-[66px] flex items-center justify-center">'
);
code = code.replace(
  '<div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[22px] py-[12px] font-[\'Inter\'] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap">',
  '<div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[22px] py-[12px] font-[\'Inter\'] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md hover:border hover:border-[#002f82]/20 cursor-pointer">'
);

code = code.replace(
  '<div className="absolute left-[554.5px] top-[222.5px] w-[151px] h-[66px] flex items-center justify-center">',
  '<div data-reveal data-reveal-delay="4" className="absolute left-[554.5px] top-[222.5px] w-[151px] h-[66px] flex items-center justify-center">'
);
code = code.replace(
  '<div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[22px] py-[12px] font-[\'Inter\'] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap">',
  '<div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[22px] py-[12px] font-[\'Inter\'] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md hover:border hover:border-[#002f82]/20 cursor-pointer">'
);

code = code.replace(
  '<div className="absolute left-[731.5px] top-[296.5px] w-[190px] h-[66px] flex items-center justify-center">',
  '<div data-reveal data-reveal-delay="5" className="absolute left-[731.5px] top-[296.5px] w-[190px] h-[66px] flex items-center justify-center">'
);
code = code.replace(
  '<div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[22px] py-[12px] font-[\'Inter\'] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap">',
  '<div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[22px] py-[12px] font-[\'Inter\'] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md hover:border hover:border-[#002f82]/20 cursor-pointer">'
);

code = code.replace(
  '<div className="absolute left-[802px] top-[370.5px] w-[217px] h-[66px] flex items-center justify-center">',
  '<div data-reveal data-reveal-delay="6" className="absolute left-[802px] top-[370.5px] w-[217px] h-[66px] flex items-center justify-center">'
);
code = code.replace(
  '<div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[22px] py-[12px] font-[\'Inter\'] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap">',
  '<div className="bg-white rounded-full drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] px-[22px] py-[12px] font-[\'Inter\'] font-medium text-[15px] leading-[22.5px] text-[#111] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md hover:border hover:border-[#002f82]/20 cursor-pointer">'
);

// 7. Sticky Notes interactive hover physics
code = code.replace(
  'className="relative shrink-0 flex flex-col items-center">\n                <div\n                  className="w-[288.8px] h-[535.1px] relative overflow-hidden"\n                  data-node-id="466:5312"',
  'data-reveal data-reveal-delay="1" className="relative shrink-0 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2">\n                <div\n                  className="w-[288.8px] h-[535.1px] relative overflow-hidden"\n                  data-node-id="466:5312"'
);

code = code.replace(
  'className="relative shrink-0 flex flex-col items-center">\n                <div\n                  className="w-[288.8px] h-[535.1px] relative overflow-hidden"\n                  data-node-id="752:980"',
  'data-reveal data-reveal-delay="2" className="relative shrink-0 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2">\n                <div\n                  className="w-[288.8px] h-[535.1px] relative overflow-hidden"\n                  data-node-id="752:980"'
);

code = code.replace(
  'className="relative shrink-0 flex flex-col items-center">\n                <div\n                  className="w-[288.8px] h-[535.1px] relative overflow-hidden"\n                  data-node-id="752:981"',
  'data-reveal data-reveal-delay="3" className="relative shrink-0 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2">\n                <div\n                  className="w-[288.8px] h-[535.1px] relative overflow-hidden"\n                  data-node-id="752:981"'
);

// Enhance sticky notes with hover float & tilt
code = code.replace(
  'className="relative bg-[#b6e8ff] border-[0.693px] border-[rgba(138,56,245,0.1)] border-solid rounded-[5.2px] shadow-[1.733px_2.599px_10.396px_rgba(0,0,0,0.18)] p-3 w-[187px] min-h-[229px] flex flex-col justify-center"',
  'className="relative bg-[#b6e8ff] border-[0.693px] border-[rgba(138,56,245,0.1)] border-solid rounded-[5.2px] shadow-[1.733px_2.599px_10.396px_rgba(0,0,0,0.18)] p-3 w-[187px] min-h-[229px] flex flex-col justify-center transition-all duration-300 hover:scale-105 hover:rotate-[-10deg] hover:shadow-[4px_8px_24px_rgba(0,0,0,0.22)] cursor-pointer"'
);

code = code.replace(
  'className="relative bg-[#caffcf] border-[0.693px] border-[rgba(138,56,245,0.1)] border-solid rounded-[5.2px] shadow-[1.733px_2.599px_10.396px_rgba(0,0,0,0.18)] p-3 w-[187px] min-h-[229px] flex flex-col justify-center"',
  'className="relative bg-[#caffcf] border-[0.693px] border-[rgba(138,56,245,0.1)] border-solid rounded-[5.2px] shadow-[1.733px_2.599px_10.396px_rgba(0,0,0,0.18)] p-3 w-[187px] min-h-[229px] flex flex-col justify-center transition-all duration-300 hover:scale-105 hover:rotate-[-10deg] hover:shadow-[4px_8px_24px_rgba(0,0,0,0.22)] cursor-pointer"'
);

code = code.replace(
  'className="relative bg-[#e8d7fd] border-[0.693px] border-[rgba(138,56,245,0.1)] border-solid rounded-[5.2px] shadow-[1.733px_2.599px_10.396px_rgba(0,0,0,0.18)] p-3 w-[213px] min-h-[229px] flex flex-col justify-center"',
  'className="relative bg-[#e8d7fd] border-[0.693px] border-[rgba(138,56,245,0.1)] border-solid rounded-[5.2px] shadow-[1.733px_2.599px_10.396px_rgba(0,0,0,0.18)] p-3 w-[213px] min-h-[229px] flex flex-col justify-center transition-all duration-300 hover:scale-105 hover:rotate-[-10deg] hover:shadow-[4px_8px_24px_rgba(0,0,0,0.22)] cursor-pointer"'
);

// 8. 4 Pillars Cards hover lift & stagger
code = code.replace(
  'className="w-[311px] h-[220px] rounded-[14px] bg-[#f2f4f8] p-[35px] flex flex-col items-center justify-center text-center gap-[10px]"',
  'data-reveal data-reveal-delay="1" className="w-[311px] h-[220px] rounded-[14px] bg-[#f2f4f8] p-[35px] flex flex-col items-center justify-center text-center gap-[10px] transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border hover:border-[#002f82]/20 cursor-default"'
);
code = code.replace(
  'className="w-[311px] h-[220px] rounded-[14px] bg-[#f2f4f8] p-[32px] flex flex-col items-center justify-center text-center gap-[10px]"',
  'data-reveal data-reveal-delay="2" className="w-[311px] h-[220px] rounded-[14px] bg-[#f2f4f8] p-[32px] flex flex-col items-center justify-center text-center gap-[10px] transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border hover:border-[#002f82]/20 cursor-default"'
);

// 9. Sections reveal-on-scroll
code = code.replace(
  'data-section="06_problem_space"',
  'data-section="06_problem_space" data-reveal'
);
code = code.replace(
  'data-section="07_key_challenges"',
  'data-section="07_key_challenges" data-reveal'
);
code = code.replace(
  'data-section="08_bento_showcase"',
  'data-section="08_bento_showcase" data-reveal'
);
code = code.replace(
  'data-section="09_opportunity"',
  'data-section="09_opportunity" data-reveal'
);
code = code.replace(
  'data-section="11_validation"',
  'data-section="11_validation" data-reveal'
);
code = code.replace(
  'data-section="12_insights"',
  'data-section="12_insights" data-reveal'
);
code = code.replace(
  'data-section="13_info_architecture"',
  'data-section="13_info_architecture" data-reveal'
);
code = code.replace(
  'data-section="14_user_flow"',
  'data-section="14_user_flow" data-reveal'
);
code = code.replace(
  'data-section="15_ideation"',
  'data-section="15_ideation" data-reveal'
);
code = code.replace(
  'data-section="16_wireframes"',
  'data-section="16_wireframes" data-reveal'
);
code = code.replace(
  'data-section="17_solution"',
  'data-section="17_solution" data-reveal'
);
code = code.replace(
  'data-section="18_hifi_screens"',
  'data-section="18_hifi_screens" data-reveal'
);
code = code.replace(
  'data-section="19_design_system"',
  'data-section="19_design_system" data-reveal'
);
code = code.replace(
  'data-section="20_accessibility"',
  'data-section="20_accessibility" data-reveal'
);
code = code.replace(
  'data-section="21_business_impact"',
  'data-section="21_business_impact" data-reveal'
);
code = code.replace(
  'data-section="22_reflection"',
  'data-section="22_reflection" data-reveal'
);
code = code.replace(
  'data-section="next_case_study"',
  'data-section="next_case_study" data-reveal'
);

fs.writeFileSync('components/case-study/CirqellPage.tsx', code);
console.log('Successfully updated CirqellPage.tsx with smooth scroll animations!');
