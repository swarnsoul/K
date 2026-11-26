"use client";

import React from "react";

export function DesktopContactFooter() {
  return (
    <footer
      id="contact"
      className="relative w-[1440px] h-[709px] border-b border-black border-solid overflow-hidden bg-transparent select-none"
      data-node-id="649:1250"
    >
      {/* ─── 1. PURPLE FOOTER CONTAINER (Matches Figma Frame 199, node 705:1093) ─── */}
      <div
        className="absolute bg-[#8364fc] h-[424px] left-0 rounded-tl-[40px] rounded-tr-[40px] top-[293px] w-[1440px] overflow-hidden"
        data-node-id="705:1093"
      >
        {/* Left Column: Logo & Tagline & Resume Button (Frame 77, node 649:1270) */}
        <div
          className="absolute flex flex-col gap-[30px] h-[290px] items-center left-[140px] top-[30px] w-[365px]"
          data-node-id="649:1270"
        >
          {/* Logo & Statement Group (Frame 200, node 705:1094) */}
          <div
            className="flex flex-col gap-[10px] items-center shrink-0 w-full"
            data-node-id="705:1094"
          >
            {/* Devanagari Signature Logo in Pure White (node 649:1271) */}
            <div className="h-[139px] relative shrink-0 w-[275px]" data-node-id="649:1271">
              <img
                src="/assets/logo-vectorized-white.svg"
                alt="Kanak artistic signature logo"
                className="w-full h-full object-contain block pointer-events-none select-none"
                draggable={false}
              />
            </div>

            {/* Bio Statement in Pure White (node 649:1310) */}
            <p
              className="font-['Almarena_Neue'] font-normal text-[20px] leading-[30px] text-center text-white w-full select-none"
              data-node-id="649:1310"
            >
              Blending strategy, creativity, and user empathy into every experience I design.
            </p>
          </div>

          {/* Download Resume Button (Component 31, node 708:1010 / 708:1012) */}
          <div className="w-[365px] h-[48px] shrink-0" data-node-id="708:1012">
            <a
              id="resume"
              href="/Kanak-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[365px] h-[48px] bg-white hover:bg-black border-[0.365px] border-black hover:border-white rounded-[21.923px] shadow-[0px_2.923px_7.308px_0px_rgba(0,0,0,0.3)] flex items-center justify-center font-['Almarena_Neue'] font-semibold text-[18.269px] leading-[32.885px] text-black hover:text-white transition-all duration-200 cursor-pointer no-squiggle select-none"
              data-node-id="708_1009"
              data-cursor-key="contact-resume-btn"
            >
              Download resume
            </a>
          </div>
        </div>
      </div>

      {/* ─── 2. RIGHT COLUMN: Contact Form Scalloped Card & Pen Tool (Frame 66, node 649:1251) ─── */}
      <div
        className="absolute left-[681px] top-0 w-[705.57px] h-[662px] pointer-events-auto"
        data-node-id="649:1251"
      >
        <div className="relative w-full h-full">
          {/* Scalloped Form Container (Frame 32, node 649:1253) */}
          <div
            className="absolute left-0 top-[80.99px] w-[607.42px] h-[581.01px]"
            data-node-id="649:1253"
            data-cursor-key="contact-card"
          >
            {/* Green scalloped SVG card background (node 649:1254) */}
            <img
              src="/assets/union-2.svg"
              alt="Contact card background"
              className="absolute inset-0 w-full h-full block pointer-events-none select-none"
              data-node-id="649:1254"
              draggable={false}
            />

            {/* Card Headline (node 649:1268) */}
            <div
              className="absolute left-[62.7px] top-[83.46px] w-[482.09px] text-center pointer-events-none select-none"
              data-node-id="649:1268"
            >
              <h3 className="font-['Architects_Daughter'] text-[33.732px] leading-[49.193px] text-black">
                Let&apos;s create something remarkable together.
              </h3>
            </div>

            {/* Form Fields (Frame 39, node 649:1255) */}
            <form
              id="desktop-contact-form"
              action="https://formspree.io/f/mzerwzko"
              method="POST"
              className="absolute left-[111px] top-[204.01px] w-[385px] h-[230px] flex flex-col justify-between z-10"
              data-node-id="649:1255"
            >
              {/* Name (node 649:1256 / 649:1257) */}
              <div className="w-full">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Name"
                  className="w-full bg-transparent border-none outline-none font-['Almarena_Neue'] text-[18px] leading-[30px] text-black placeholder-[#909090] p-0"
                />
                <img src="/assets/line-8.svg" alt="" className="w-full mt-[4px] block pointer-events-none" />
              </div>

              {/* Email (node 649:1258 / 649:1259) */}
              <div className="w-full">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  className="w-full bg-transparent border-none outline-none font-['Almarena_Neue'] text-[18px] leading-[30px] text-black placeholder-[#909090] p-0"
                />
                <img src="/assets/line-9.svg" alt="" className="w-full mt-[4px] block pointer-events-none" />
              </div>

              {/* Subject (node 649:1260 / 649:1261) */}
              <div className="w-full">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full bg-transparent border-none outline-none font-['Almarena_Neue'] text-[18px] leading-[30px] text-black placeholder-[#909090] p-0"
                />
                <img src="/assets/line-9.svg" alt="" className="w-full mt-[4px] block pointer-events-none" />
              </div>

              {/* Message (Frame 67, node 649:1262) */}
              <div className="w-full">
                <input
                  type="text"
                  name="message"
                  required
                  placeholder="Message"
                  className="w-full bg-transparent border-none outline-none font-['Almarena_Neue'] text-[18px] leading-[30px] text-black placeholder-[#909090] p-0"
                />
                <img src="/assets/line-9.svg" alt="" className="w-full mt-[60px] block pointer-events-none" />
              </div>
            </form>

            {/* Send Button (Component 32, node 708:1024 / 708:1026) */}
            <button
              type="submit"
              form="desktop-contact-form"
              className="absolute left-1/2 -translate-x-1/2 top-[455.01px] w-[228px] h-[48.231px] bg-[#c2f2d2] hover:bg-[#1fad4e] border-[0.365px] border-[#1fad4e] hover:border-[#c2f2d2] rounded-[21.923px] shadow-[0px_2.923px_7.308px_0px_rgba(0,0,0,0.3)] flex items-center justify-center font-['Almarena_Neue'] font-semibold text-[18.269px] leading-[32.885px] text-[#1fad4e] hover:text-[#c2f2d2] transition-all duration-200 cursor-pointer z-10 select-none"
              data-node-id="708_1023"
              data-cursor-key="contact-send-btn"
            >
              Send
            </button>
          </div>

          {/* Decorative Pen Tool on top right of form (node 649:1269) */}
          <div
            className="absolute left-[551.68px] top-0 w-[153.89px] h-[153.89px] flex items-center justify-center pointer-events-none select-none"
            data-node-id="649:1269"
          >
            <div className="rotate-[-99.93deg] w-[132.94px] h-[132.94px]">
              <img
                src="/assets/pen-tool.png"
                alt="Pen tool illustration"
                className="w-full h-full object-contain pointer-events-none"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function MobileContactFooter() {
  return (
    <footer
      id="contact"
      className="relative w-full bg-transparent border-b border-black flex flex-col items-center pt-8 sm:pt-12"
    >
      {/* ─── 1. CONTACT FORM SCALLOPED CARD ─── */}
      <div className="w-full px-4 sm:px-6 flex justify-center mb-12 sm:mb-16">
        <div
          className="w-full max-w-[480px] sm:max-w-[560px] h-[520px] sm:h-[580px] relative shrink-0"
          data-cursor-key="contact-card"
        >
          {/* Green scalloped SVG card background */}
          <img
            src="/assets/union-2.svg"
            alt="Contact card background"
            className="absolute inset-0 w-full h-full block pointer-events-none select-none"
            draggable={false}
          />

          {/* Card Content Overlay */}
          <div className="absolute inset-0 px-8 sm:px-14 pt-12 sm:pt-16 pb-8 flex flex-col justify-between z-10">
            {/* Card Headline */}
            <div className="text-center select-none">
              <h3 className="font-['Architects_Daughter'] text-[24px] sm:text-[30px] leading-snug text-black">
                Let&apos;s create something remarkable together.
              </h3>
            </div>

            {/* Form Fields */}
            <form
              action="https://formspree.io/f/mzerwzko"
              method="POST"
              className="w-full flex flex-col justify-between gap-3 sm:gap-4 my-2"
            >
              <div className="w-full">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Name"
                  className="w-full min-h-[38px] bg-transparent border-none outline-none font-['Almarena_Neue'] text-[16px] sm:text-[17px] text-black placeholder-[#909090] p-0"
                />
                <div className="w-full h-px bg-black opacity-20 mt-1" />
              </div>

              <div className="w-full">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  className="w-full min-h-[38px] bg-transparent border-none outline-none font-['Almarena_Neue'] text-[16px] sm:text-[17px] text-black placeholder-[#909090] p-0"
                />
                <div className="w-full h-px bg-black opacity-20 mt-1" />
              </div>

              <div className="w-full">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full min-h-[38px] bg-transparent border-none outline-none font-['Almarena_Neue'] text-[16px] sm:text-[17px] text-black placeholder-[#909090] p-0"
                />
                <div className="w-full h-px bg-black opacity-20 mt-1" />
              </div>

              <div className="w-full">
                <input
                  type="text"
                  name="message"
                  required
                  placeholder="Message"
                  className="w-full min-h-[38px] bg-transparent border-none outline-none font-['Almarena_Neue'] text-[16px] sm:text-[17px] text-black placeholder-[#909090] p-0"
                />
                <div className="w-full h-px bg-black opacity-20 mt-3" />
              </div>

              {/* Send Button (Component 32 hover variant on mobile) */}
              <div className="flex justify-center mt-1">
                <button
                  type="submit"
                  className="w-[200px] sm:w-[228px] h-[46px] sm:h-[48.231px] bg-[#c2f2d2] hover:bg-[#1fad4e] border-[0.365px] border-[#1fad4e] hover:border-[#c2f2d2] rounded-[21.923px] shadow-[0px_2.923px_7.308px_0px_rgba(0,0,0,0.3)] flex items-center justify-center font-['Almarena_Neue'] font-semibold text-[17px] sm:text-[18.269px] leading-[32.885px] text-[#1fad4e] hover:text-[#c2f2d2] transition-all duration-200 cursor-pointer select-none"
                  data-cursor-key="contact-send-btn"
                >
                  Send
                </button>
              </div>
            </form>
          </div>

          {/* Decorative Pen Tool */}
          <div className="absolute -right-3 sm:-right-4 -top-3 sm:-top-4 w-[85px] sm:w-[120px] h-[85px] sm:h-[120px] rotate-[-100deg] pointer-events-none select-none">
            <img
              src="/assets/pen-tool.png"
              alt="Pen tool illustration"
              className="w-full h-full object-contain pointer-events-none"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* ─── 2. PURPLE FOOTER CONTAINER (Mobile & Tablet) ─── */}
      <div className="w-full bg-[#8364fc] rounded-t-[32px] sm:rounded-t-[40px] px-6 sm:px-8 py-10 sm:py-14 flex flex-col items-center text-center gap-6 text-white overflow-hidden">
        {/* Devanagari "Kanak" Logo in White */}
        <div className="w-[220px] sm:w-[260px] h-[110px] sm:h-[130px] relative shrink-0">
          <img
            src="/assets/logo-vectorized-white.svg"
            alt="Kanak artistic signature logo"
            className="w-full h-full object-contain block pointer-events-none select-none"
            draggable={false}
          />
        </div>

        {/* Bio statement */}
        <p className="font-['Almarena_Neue'] text-[17px] sm:text-[19px] leading-[28px] text-white max-w-[360px] select-none">
          Blending strategy, creativity, and user empathy into every experience I design.
        </p>

        {/* Download resume button (Component 31 hover variant on mobile) */}
        <a
          id="resume"
          href="/Kanak-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-[340px] h-[48px] bg-white hover:bg-black border-[0.365px] border-black hover:border-white rounded-[21.923px] shadow-[0px_2.923px_7.308px_0px_rgba(0,0,0,0.3)] flex items-center justify-center font-['Almarena_Neue'] font-semibold text-[17px] sm:text-[18.269px] leading-[32.885px] text-black hover:text-white transition-all duration-200 cursor-pointer no-squiggle select-none"
          data-cursor-key="contact-resume-btn"
        >
          Download resume
        </a>
      </div>
    </footer>
  );
}

export default function ContactFooter() {
  return (
    <>
      <div className="hidden xl:block">
        <DesktopContactFooter />
      </div>
      <div className="xl:hidden">
        <MobileContactFooter />
      </div>
    </>
  );
}
