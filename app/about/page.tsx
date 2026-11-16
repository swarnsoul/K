import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PortraitInteractive from "./portrait-interactive";
import StickyUnfold from "./sticky-unfold";
import SmoothScroll from "./smooth-scroll";
import DeskScene from "@/components/DeskScene";
import { DesktopHeader, MobileHeader } from "@/components/Header";
import {
  ClotheslineTier,
  MobileHangingClothesline,
  TRAVEL_HANGING_PHOTOS,
  ART_PAINTING_PHOTOS,
} from "@/components/about/HangingClothesline";

export const metadata: Metadata = {
  title: "About | Kanak",
  description: "Learn more about Kanak's journey as a Product and UI/UX Designer, contemporary artist, and creator.",
};

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-transparent [overflow-x:clip]">
      {/* Lenis Smooth Scroll controller */}
      <SmoothScroll />
      {/* =========================================================================
          DESKTOP CANVAS (>= 1024px: 1024, 1280, 1440, 1680, 1920, 2560)
          Fixed 1440px width upper canvas (0-3980px).
          Unified Full-Width Footer Section (aspect-ratio 1440/990) below it.
          ========================================================================= */}
      <div className="hidden lg:flex w-full flex-col items-center">
        <div
          className="relative w-[1440px] h-[2330px] shrink-0 bg-transparent select-none"
          data-figma-id="217:666"
          data-name="Desktop - 10"
        >
          
          {/* =====================================================================
              1. FRAME 86: HEADER (node 443:55)
              ===================================================================== */}
          <DesktopHeader />

          {/* =====================================================================
              2. FRAME 80: BODY CONTENT (node 232:92)
              ===================================================================== */}
          <div className="absolute left-0 top-[1px] w-[1440px] h-[2329px]" data-figma-id="232:92" data-name="Frame 80">
            
            {/* Background container (node 217:667) */}
            <div className="absolute left-0 top-0 w-[1440px] h-[848px] pointer-events-none" data-figma-id="217:667" data-name="image 3" />

            {/* "About Me" Heading (node 223:125) */}
            <div className="absolute left-[597px] top-[152px] w-[246px] h-[55px] [word-break:break-word] flex flex-col font-['Architects_Daughter'] justify-center leading-[0] not-italic text-[40.955px] text-black text-center" data-figma-id="223:125">
              <p className="leading-[55px]">About Me</p>
            </div>

            {/* Frame 79: Portrait Frame (node 223:143) */}
            <div className="absolute left-[180.57px] top-[281.30px] w-[539.90px] h-[539.90px]" data-figma-id="223:143" data-name="Frame 79">
              {/* Component 27 (node 230:87) centered at (259.49, 259.49) rotated -10.54deg */}
              <PortraitInteractive
                className="absolute size-[337px]"
                style={{
                  left: "103.97px",
                  top: "96.41px",
                  transform: "rotate(-10.54deg)",
                  transformOrigin: "center center",
                }}
              />
            </div>

            {/* Frame 81: Intro Note (node 243:820) */}
            <div className="absolute left-[689px] top-[336px] w-[361px] h-[131px] bg-[#90caf9] content-stretch flex items-center justify-center rounded-[0px]" data-figma-id="243:820" data-name="Frame 81" data-cursor-key="about-intro-note">
              <div className="[word-break:break-word] flex flex-col font-['Architects_Daughter'] justify-center leading-[0] not-italic shrink-0 text-[30px] text-black text-center w-[325px]" data-figma-id="230:91">
                <p className="leading-[55px]">Hi again! I’m Kanak &amp; here is my story</p>
              </div>
            </div>

            {/* Intro Arrow (node 243:821) */}
            <div
              className="absolute flex h-[141.482px] items-center justify-center left-[1018px] top-[444px] w-[128.404px] pointer-events-none"
              data-figma-id="243:821"
              data-name="Arrow"
            >
              <div className="-scale-y-100 flex-none rotate-[56.86deg]">
                <div className="h-[75px] relative w-[120px]">
                  <img
                    src="/assets/about/arrow-intro.svg"
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                  />
                </div>
              </div>
            </div>

            {/* ===================================================================
                9 TIMELINE CARDS (nodes 233:696 through 243:807)
                =================================================================== */}
            
            {/* CARD 1 (node 233:696) */}
            <div
              className="absolute"
              style={{
                left: "794.86px",
                top: "610.91px",
                width: "350.683px",
                height: "171.065px",
                transform: "rotate(9.2deg)",
                transformOrigin: "center center",
              }}
              data-figma-id="233:696"
              data-name="Card"
              data-side="right"
              data-cursor-key="about-card-1"
            >
              <StickyUnfold side="right" tiltVariation={-2}>
                <div
                  className="border-[0.855px] border-[rgba(200,169,110,0.3)] border-solid h-[171.065px] relative rounded-[6.415px] shadow-[2.138px_3.207px_12.83px_0px_rgba(0,0,0,0.18),0px_1.069px_4.277px_0px_rgba(0,0,0,0.12)] shrink-0 w-[350.683px]"
                  style={{ backgroundImage: "linear-gradient(153.99665223989234deg, rgb(250, 246, 236) 0%, rgb(245, 238, 216) 100%)" }}
                  data-figma-id="233:697"
                  data-name="Container"
                  data-unfold-paper
                >
                  <div className="flex h-full gap-[12.83px] items-center pb-[28.87px] pt-[29.94px] px-[21.38px]">
                    <div className="flex-1" data-figma-id="233:699">
                      <p className="font-['Architects_Daughter'] text-[#3d2b0e] text-[20px] leading-[29.83px] w-[186px]" data-figma-id="233:700" data-unfold-text>
                        I always dreamed of becoming an engineer from <span className="text-[#da156a]">IIT.</span>
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center justify-center" data-figma-id="233:701" data-unfold-photo>
                      <div className="rotate-[-89.8deg]">
                        <div className="border border-solid border-white h-[106.406px] w-[80.994px] rounded-[10px] shadow-[0px_4.277px_4.277px_0px_rgba(0,0,0,0.25)] relative overflow-hidden" data-figma-id="233:702" data-name="image 34">
                          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                            <img src="/assets/about/card-1.png" alt="IIT dream" className="absolute h-[135.54%] left-[-0.08%] max-w-none top-[-22.87%] w-[100.16%]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tape */}
                <div className="absolute bg-[#ffd54f] h-[29.936px] left-[141.13px] opacity-75 rounded-[2.138px] shadow-[0px_1.069px_3.207px_0px_rgba(0,0,0,0.15)] top-[-17.11px] w-[68.426px] pointer-events-none" data-figma-id="233:703" data-name="Container" data-unfold-tape />
              </StickyUnfold>
            </div>

            {/* CARD 2 (node 233:716) */}
            <div
              className="absolute"
              style={{
                left: "267.72px",
                top: "820.44px",
                width: "393.334px",
                height: "191.870px",
                transform: "rotate(-10.0deg)",
                transformOrigin: "center center",
              }}
              data-figma-id="233:716"
              data-name="Card"
              data-side="left"
              data-cursor-key="about-card-2"
            >
              <StickyUnfold side="left" tiltVariation={3}>
                <div
                  className="bg-[#f4c5c5] border-[0.959px] border-[rgba(200,169,110,0.3)] border-solid h-[191.87px] relative rounded-[7.195px] shadow-[2.398px_3.598px_14.39px_0px_rgba(0,0,0,0.18),0px_1.199px_4.797px_0px_rgba(0,0,0,0.12)] shrink-0 w-[393.334px]"
                  data-figma-id="233:717"
                  data-name="Container"
                  data-unfold-paper
                >
                  <div className="flex h-full gap-[14.39px] items-center pb-[32.38px] pt-[33.58px] px-[23.98px]">
                    <div className="flex-1" data-figma-id="233:719">
                      <p className="font-['Architects_Daughter'] text-[#3d2b0e] text-[20px] leading-[30px] w-[208px]" data-figma-id="233:720" data-unfold-text>
                        I prepared for <span className="text-[#ee3f64]">JEE</span> with all my heart.
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center justify-center" data-unfold-photo>
                      <div className="rotate-[0.81deg]">
                        <div className="border border-solid border-white h-[98.677px] w-[119.623px] rounded-[11.216px] shadow-[0px_4.486px_11.216px_0px_rgba(0,0,0,0.25)] relative overflow-hidden" data-figma-id="233:729" data-name="image 35">
                          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[11.216px]">
                            <img src="/assets/about/card-2.png" alt="JEE preparation" className="absolute h-full left-[-46.72%] max-w-none top-0 w-[146.72%]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tape */}
                <div className="absolute bg-[#ffd54f] h-[33.577px] left-[158.29px] opacity-75 rounded-[2.398px] shadow-[0px_1.199px_3.598px_0px_rgba(0,0,0,0.15)] top-[-19.19px] w-[76.75px] pointer-events-none" data-figma-id="233:723" data-name="Container" data-unfold-tape />
              </StickyUnfold>
            </div>

            {/* CARD 3 (node 233:731) */}
            <div
              className="absolute"
              style={{
                left: "812.97px",
                top: "921.56px",
                width: "477.483px",
                height: "232.919px",
                transform: "rotate(12.7deg)",
                transformOrigin: "center center",
              }}
              data-figma-id="233:731"
              data-name="Card"
              data-side="right"
              data-cursor-key="about-card-3"
            >
              <StickyUnfold side="right" tiltVariation={-4}>
                <div
                  className="bg-[#b6e8ff] border-[1.165px] border-[rgba(200,169,110,0.3)] border-solid h-[232.919px] relative rounded-[8.734px] shadow-[2.911px_4.367px_17.469px_0px_rgba(0,0,0,0.18),0px_1.456px_5.823px_0px_rgba(0,0,0,0.12)] shrink-0 w-[477.483px]"
                  data-figma-id="233:732"
                  data-name="Container"
                  data-unfold-paper
                >
                  <div className="flex h-full gap-[17.47px] items-center pb-[39.31px] pt-[40.76px] px-[29.11px]">
                    <div className="flex-1" data-figma-id="233:734">
                      <p className="font-['Architects_Daughter'] text-[#3d2b0e] text-[20px] leading-[30px] w-[238px]" data-figma-id="233:735" data-unfold-text>
                        I couldn&apos;t pursue engineering at IIT, so I chose to study <span className="text-[#da156a]">Data Science at IIT Madras</span> instead.
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center justify-center" data-unfold-photo>
                      <div className="border border-solid border-white h-[171.384px] w-[172.151px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] relative shrink-0 overflow-hidden" data-figma-id="239:755" data-name="image 37">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                          <img src="/assets/about/card-3.png" alt="Data Science at IIT Madras" className="absolute h-[178.57%] left-[-0.14%] max-w-none top-[-9.56%] w-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tape */}
                <div className="absolute bg-[#ffd54f] h-[40.761px] left-[192.16px] opacity-75 rounded-[2.911px] shadow-[0px_1.456px_4.367px_0px_rgba(0,0,0,0.15)] top-[-23.29px] w-[93.167px] pointer-events-none" data-figma-id="233:737" data-name="Container" data-unfold-tape />
              </StickyUnfold>
            </div>

            {/* CARD 4 (node 233:745) */}
            <div
              className="absolute"
              style={{
                left: "205.74px",
                top: "1195.01px",
                width: "465.385px",
                height: "227.017px",
                transform: "rotate(-10.45deg)",
                transformOrigin: "center center",
              }}
              data-figma-id="233:745"
              data-name="Card"
              data-side="left"
              data-cursor-key="about-card-4"
            >
              <StickyUnfold side="left" tiltVariation={2}>
                <div
                  className="bg-[#caffcf] border-[1.135px] border-[rgba(200,169,110,0.3)] border-solid h-[227.017px] relative rounded-[8.513px] shadow-[2.838px_4.257px_17.026px_0px_rgba(0,0,0,0.18),0px_1.419px_5.675px_0px_rgba(0,0,0,0.12)] shrink-0 w-[465.385px]"
                  data-figma-id="233:746"
                  data-name="Container"
                  data-unfold-paper
                >
                  <div className="flex h-full gap-[17.03px] items-center pb-[38.31px] pt-[39.73px] px-[28.38px]">
                    <div className="flex-1" data-figma-id="233:748">
                      <p className="font-['Architects_Daughter'] text-[#3d2b0e] text-[20px] leading-[30px] w-[249px]" data-figma-id="233:749" data-unfold-text>
                        It was an online technical program. I knew it would give me time to explore my interests and <span className="text-[#1fad4e]">build new skills.</span>
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center justify-center" data-unfold-photo>
                      <div className="rotate-[-0.82deg]">
                        <div className="border border-solid border-white h-[126.361px] w-[148.065px] rounded-[9.747px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] relative overflow-hidden" data-figma-id="233:750" data-name="image 36">
                          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9.747px]">
                            <img src="/assets/about/card-4.png" alt="Build new skills" className="absolute h-[124.08%] left-[-5.95%] max-w-none top-[-24.08%] w-[106.02%]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tape */}
                <div className="absolute bg-[#ffd54f] h-[39.728px] left-[187.29px] opacity-75 rounded-[2.838px] shadow-[0px_1.419px_4.257px_0px_rgba(0,0,0,0.15)] top-[-22.7px] w-[90.806px] pointer-events-none" data-figma-id="233:751" data-name="Container" data-unfold-tape />
              </StickyUnfold>
            </div>

            {/* CARD 5 (node 233:705) */}
            <div
              className="absolute"
              style={{
                left: "801.57px",
                top: "1306.14px",
                width: "477.483px",
                height: "232.919px",
                transform: "rotate(13.4deg)",
                transformOrigin: "center center",
              }}
              data-figma-id="233:705"
              data-name="Card"
              data-side="right"
              data-cursor-key="about-card-5"
            >
              <StickyUnfold side="right" tiltVariation={-3}>
                <div
                  className="bg-[#e8d7fd] border-[1.165px] border-[rgba(200,169,110,0.3)] border-solid h-[232.919px] relative rounded-[8.734px] shadow-[2.911px_4.367px_17.469px_0px_rgba(0,0,0,0.18),0px_1.456px_5.823px_0px_rgba(0,0,0,0.12)] shrink-0 w-[477.483px]"
                  data-figma-id="233:706"
                  data-name="Container"
                  data-unfold-paper
                >
                  <div className="flex h-full gap-[17.47px] items-center pb-[39.31px] pt-[40.76px] px-[29.11px]">
                    <div className="flex-1" data-figma-id="233:708">
                      <p className="font-['Architects_Daughter'] text-[#3d2b0e] text-[20px] leading-[30px] w-[249px]" data-figma-id="233:709" data-unfold-text>
                        Along with studies, I was always <span className="text-[#8364fc]">passionate about painting and sketching.</span>
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center justify-center" data-unfold-photo>
                      <div className="rotate-[1.79deg]">
                        <div className="border-[0.898px] border-solid border-white h-[188.223px] w-[141.315px] rounded-[10px] shadow-[0px_3.591px_8.978px_0px_rgba(0,0,0,0.25)] relative overflow-hidden" data-figma-id="233:714" data-name="image 33">
                          <img src="/assets/about/card-5.png" alt="Painting and sketching" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tape */}
                <div className="absolute bg-[#ffd54f] h-[40.761px] left-[192.16px] opacity-75 rounded-[2.911px] shadow-[0px_1.456px_4.367px_0px_rgba(0,0,0,0.15)] top-[-23.29px] w-[93.167px] pointer-events-none" data-figma-id="233:712" data-name="Container" data-unfold-tape />
              </StickyUnfold>
            </div>

            {/* CARD 6 (node 239:764) */}
            <div
              className="absolute"
              style={{
                left: "197.98px",
                top: "1583.07px",
                width: "480.474px",
                height: "203.098px",
                transform: "rotate(-11.15deg)",
                transformOrigin: "center center",
              }}
              data-figma-id="239:764"
              data-name="Card"
              data-side="left"
              data-cursor-key="about-card-6"
            >
              <StickyUnfold side="left" tiltVariation={4}>
                <div
                  className="bg-[#f4c5c5] border-[1.015px] border-[rgba(200,169,110,0.3)] border-solid h-[203.098px] relative rounded-[7.616px] shadow-[2.539px_3.808px_15.232px_0px_rgba(0,0,0,0.18),0px_1.27px_5.077px_0px_rgba(0,0,0,0.12)] shrink-0 w-[480.474px]"
                  data-figma-id="239:765"
                  data-name="Container"
                  data-unfold-paper
                >
                  <div className="flex h-full gap-[15.23px] items-center pb-[34.27px] pt-[35.54px] px-[25.39px]">
                    <div className="flex-1" data-figma-id="239:767">
                      <p className="font-['Architects_Daughter'] text-[#3d2b0e] text-[20px] leading-[30px] w-[249px]" data-figma-id="239:768" data-unfold-text>
                        In my first year, alongside my degree, I started working as a <span className="text-[#ee3f64]">graphic designer.</span>
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center justify-center" data-unfold-photo>
                      <div className="rotate-[-0.58deg]">
                        <div className="border border-solid border-white h-[100.752px] w-[189.169px] rounded-[11.873px] shadow-[0px_4.749px_11.873px_0px_rgba(0,0,0,0.25)] relative overflow-hidden" data-figma-id="239:774" data-name="image 38">
                          <img src="/assets/about/card-6.png" alt="Graphic designer" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[11.873px] size-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tape */}
                <div className="absolute bg-[#ffd54f] h-[35.542px] left-[167.56px] opacity-75 rounded-[2.539px] shadow-[0px_1.27px_3.808px_0px_rgba(0,0,0,0.15)] top-[-20.31px] w-[81.238px] pointer-events-none" data-figma-id="239:770" data-name="Container" data-unfold-tape />
              </StickyUnfold>
            </div>

            {/* CARD 7 (node 239:776) */}
            <div
              className="absolute"
              style={{
                left: "793.71px",
                top: "1676.70px",
                width: "477.483px",
                height: "232.919px",
                transform: "rotate(13.85deg)",
                transformOrigin: "center center",
              }}
              data-figma-id="239:776"
              data-name="Card"
              data-side="right"
              data-cursor-key="about-card-7"
            >
              <StickyUnfold side="right" tiltVariation={-2}>
                <div
                  className="bg-[#f1d5ef] border-[1.165px] border-[rgba(200,169,110,0.3)] border-solid h-[232.919px] relative rounded-[8.734px] shadow-[2.911px_4.367px_17.469px_0px_rgba(0,0,0,0.18),0px_1.456px_5.823px_0px_rgba(0,0,0,0.12)] shrink-0 w-[477.483px]"
                  data-figma-id="239:777"
                  data-name="Container"
                  data-unfold-paper
                >
                  <div className="flex h-full gap-[17.47px] items-center pb-[39.31px] pt-[40.76px] px-[29.11px]">
                    <div className="flex-1" data-figma-id="239:779">
                      <p className="font-['Architects_Daughter'] text-[#3d2b0e] text-[20px] leading-[30px] w-[258px]" data-figma-id="239:780" data-unfold-text>
                        While working in graphic design, I discovered the world of UI/UX design. I took a UI/UX course alongside my degree and <span className="text-[#da156a]">learned everything step by step.</span>
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center justify-center" data-unfold-photo>
                      <div className="rotate-[0.68deg]">
                        <div className="border border-solid border-white h-[170.24px] w-[141.213px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] relative overflow-hidden" data-figma-id="239:786" data-name="image 39">
                          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                            <img src="/assets/about/card-7.png" alt="Learned UI/UX step by step" className="absolute h-[147.47%] left-0 max-w-none top-[-47.47%] w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tape */}
                <div className="absolute bg-[#ffd54f] h-[40.761px] left-[192.16px] opacity-75 rounded-[2.911px] shadow-[0px_1.456px_4.367px_0px_rgba(0,0,0,0.15)] top-[-23.29px] w-[93.167px] pointer-events-none" data-figma-id="239:782" data-name="Container" data-unfold-tape />
              </StickyUnfold>
            </div>

            {/* CARD 8 (node 239:788) */}
            <div
              className="absolute"
              style={{
                left: "200.96px",
                top: "1940.93px",
                width: "477.483px",
                height: "232.919px",
                transform: "rotate(-11.10deg)",
                transformOrigin: "center center",
              }}
              data-figma-id="239:788"
              data-name="Card"
              data-side="left"
              data-cursor-key="about-card-8"
            >
              <StickyUnfold side="left" tiltVariation={3}>
                <div
                  className="bg-[#b6e8ff] border-[1.165px] border-[rgba(200,169,110,0.3)] border-solid h-[232.919px] relative rounded-[8.734px] shadow-[2.911px_4.367px_17.469px_0px_rgba(0,0,0,0.18),0px_1.456px_5.823px_0px_rgba(0,0,0,0.12)] shrink-0 w-[477.483px]"
                  data-figma-id="239:789"
                  data-name="Container"
                  data-unfold-paper
                >
                  <div className="flex h-full gap-[17.47px] items-center pb-[39.31px] pt-[40.76px] px-[29.11px]">
                    <div className="flex-1" data-figma-id="239:791">
                      <p className="font-['Architects_Daughter'] text-[#3d2b0e] text-[20px] leading-[30px] w-[243px]" data-figma-id="239:792" data-unfold-text>
                        After building my skills, I started applying for internships—but <span className="text-[#ee3f64]">landed a full-time UI/UX job</span> instead.
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center justify-center" data-unfold-photo>
                      <div className="rotate-[0.45deg]">
                        <div className="border border-solid border-white h-[139.5px] w-[172.227px] rounded-[10px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] relative overflow-hidden" data-figma-id="265:122" data-name="image 40">
                          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                            <img src="/assets/about/card-8.png" alt="Full-time job" className="absolute h-full left-0 max-w-none top-0 w-[107.91%]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tape */}
                <div className="absolute bg-[#ffd54f] h-[40.761px] left-[192.16px] opacity-75 rounded-[2.911px] shadow-[0px_1.456px_4.367px_0px_rgba(0,0,0,0.15)] top-[-23.29px] w-[93.167px] pointer-events-none" data-figma-id="239:794" data-name="Container" data-unfold-tape />
              </StickyUnfold>
            </div>

            {/* CARD 9 (node 243:807) */}
            <div
              className="absolute"
              style={{
                left: "777.35px",
                top: "2073.08px",
                width: "418.238px",
                height: "204.019px",
                transform: "rotate(13.85deg)",
                transformOrigin: "center center",
              }}
              data-figma-id="243:807"
              data-name="Card"
              data-side="right"
              data-cursor-key="about-card-9"
            >
              <StickyUnfold side="right" tiltVariation={-1}>
                <div
                  className="border-[1.02px] border-[rgba(200,169,110,0.3)] border-solid h-[204.019px] relative rounded-[7.651px] shadow-[2.55px_3.825px_15.301px_0px_rgba(0,0,0,0.18),0px_1.275px_5.1px_0px_rgba(0,0,0,0.12)] shrink-0 w-[418.238px]"
                  style={{ backgroundImage: "linear-gradient(153.99665213746252deg, rgb(250, 246, 236) 0%, rgb(245, 238, 216) 100%)" }}
                  data-figma-id="243:808"
                  data-name="Container"
                  data-unfold-paper
                >
                  <div className="flex h-full gap-[9.54px] items-center pb-[34.43px] pt-[35.70px] px-[25.50px]">
                    <div className="flex-1" data-figma-id="243:810">
                      <p className="font-['Architects_Daughter'] text-[#3d2b0e] text-[20px] leading-[35.58px] mb-0 w-[245px]" data-figma-id="243:811" data-unfold-text>
                        Since then, I&apos;ve been designing apps, websites, and growing as a
                      </p>
                      <p className="font-['Architects_Daughter'] text-[#f61284] text-[20px] leading-[35.58px]" data-unfold-text>
                        Product &amp; UI/UX designer.
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center justify-center" data-unfold-photo>
                      <div className="rotate-[0.66deg]">
                        <div className="border-[1.193px] border-solid border-white h-[135.698px] w-[110.606px] rounded-[11.926px] shadow-[0px_4.771px_11.926px_0px_rgba(0,0,0,0.25)] relative overflow-hidden" data-figma-id="243:818" data-name="image 41">
                          <img src="/assets/about/card-9.png" alt="Product and UI/UX Designer" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[11.926px] size-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tape */}
                <div className="absolute bg-[#ffd54f] h-[35.703px] left-[168.32px] opacity-75 rounded-[2.55px] shadow-[0px_1.275px_3.825px_0px_rgba(0,0,0,0.15)] top-[-20.4px] w-[81.607px] pointer-events-none" data-figma-id="243:814" data-name="Container" data-unfold-tape />
              </StickyUnfold>
            </div>

          </div>

        </div>

        {/* =====================================================================
            2. FULL-WIDTH TWO-TIER CLOTHESLINES SECTION (EDGE-TO-EDGE)
            Ropes touch the literal screen edges on any display width!
            1st Rope: Travelling all around (User's original photos)
            2nd Rope: Contemporary Artist (Blank polaroids, ready for art)
            ===================================================================== */}
        <section className="w-full flex flex-col items-center select-none pt-8 pb-16 [overflow-x:clip]">
          {/* ── 1ST TIER: TRAVELLING ALL AROUND (Full Width, Rope Touches Edges) ── */}
          <div className="w-full flex flex-col items-center mb-14" data-cursor-key="about-travel">
            {/* Heading & Arrow */}
            <div className="flex items-center justify-center gap-4 mb-3">
              <h2 className="font-['Architects_Daughter'] text-[38px] leading-[44px] text-black text-center not-italic select-none">
                Travelling all around
              </h2>
              <div className="w-[110px] h-[72px] -scale-y-100 rotate-[-10deg] pointer-events-none">
                <img src="/assets/about/arrow-travel.svg" alt="" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Full-Width 1st Rope with User's Original Travel Photos */}
            <ClotheslineTier
              photos={TRAVEL_HANGING_PHOTOS}
              sectionTitle="Travelling all around"
              cursorKey="about-travel"
              ropeY={24}
              height={380}
            />
          </div>

          {/* ── 2ND TIER: CONTEMPORARY ARTIST / PAINTING (Full Width, Rope Touches Edges) ── */}
          <div className="w-full flex flex-col items-center mt-2" data-cursor-key="about-art">
            {/* Heading & Arrow */}
            <div className="flex items-center justify-center gap-4 mb-3">
              <h2 className="font-['Architects_Daughter'] text-[38px] leading-[44px] text-black text-center not-italic select-none">
                Contemporary Artist
              </h2>
              <div className="w-[110px] h-[72px] -scale-y-100 rotate-[-10deg] pointer-events-none">
                <img src="/assets/about/arrow-art.svg" alt="" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Full-Width 2nd Rope with All 9 Original Paintings */}
            <ClotheslineTier
              photos={ART_PAINTING_PHOTOS}
              sectionTitle="Contemporary Artist"
              cursorKey="about-art"
              ropeY={24}
              height={380}
            />
          </div>
        </section>

        {/* =====================================================================
            UNIFIED FULL-WIDTH FOOTER DESK SECTION (Frames 85 & 182)
            Scales uniformly with viewport width W / 1440.
            ===================================================================== */}
        <div className="w-full">
          <DeskScene />
        </div>
      </div>

      {/* =========================================================================
          RESPONSIVE MOBILE & TABLET LAYOUT (< 1024px)
          Single-column clean stack matching Step 4 rules.
          ========================================================================= */}
      <div className="lg:hidden w-full flex flex-col bg-transparent">
        {/* Mobile Header */}
        <MobileHeader />

        {/* Hero */}
        <div className="w-full pt-8 pb-6 px-4 flex flex-col items-center">
          <h1 className="font-['Architects_Daughter'] text-[36px] sm:text-[42px] text-black text-center mb-6">
            About Me
          </h1>
          <PortraitInteractive
            className="w-[280px] sm:w-[320px] aspect-square rotate-[-4deg] mb-8"
          />
          <div className="w-full max-w-[340px] bg-[#90caf9] p-5 shadow-sm relative" data-cursor-key="about-intro-note">
            <p className="font-['Architects_Daughter'] text-[22px] sm:text-[24px] leading-[36px] text-black text-center">
              Hi again! I’m Kanak &amp; here is my story
            </p>
            <div className="w-[60px] h-[70px] mx-auto mt-2">
              <img src="/assets/about/arrow-intro.svg" alt="" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        {/* 9 Cards Stack */}
        <div className="w-full px-4 py-8 flex flex-col items-center gap-12">
          {/* Card 1 */}
          <div className="w-full max-w-[460px]" data-cursor-key="about-card-1">
            <StickyUnfold side="right" tiltVariation={-2}>
              <div className="relative w-full p-5 rounded-[8px] shadow-md rotate-[-1.5deg]" style={{ backgroundImage: "linear-gradient(153.99deg, rgb(250, 246, 236) 0%, rgb(245, 238, 216) 100%)" }} data-unfold-paper>
                <div className="absolute bg-[#ffd54f] h-[28px] w-[64px] left-1/2 -translate-x-1/2 -top-3.5 opacity-75 rounded-[2px] shadow-sm pointer-events-none" data-unfold-tape />
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <p className="font-['Architects_Daughter'] text-[#3d2b0e] text-[18px] leading-[28px] text-center sm:text-left flex-1" data-unfold-text>
                    I always dreamed of becoming an engineer from <span className="text-[#da156a]">IIT.</span>
                  </p>
                  <div className="w-[90px] h-[90px] rounded-[10px] border border-white shadow-sm overflow-hidden shrink-0" data-unfold-photo>
                    <img src="/assets/about/card-1.png" alt="IIT dream" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </StickyUnfold>
          </div>

          {/* Card 2 */}
          <div className="w-full max-w-[460px]" data-cursor-key="about-card-2">
            <StickyUnfold side="left" tiltVariation={3}>
              <div className="relative w-full p-5 rounded-[8px] shadow-md bg-[#f4c5c5] rotate-[1.5deg]" data-unfold-paper>
                <div className="absolute bg-[#ffd54f] h-[28px] w-[64px] left-1/2 -translate-x-1/2 -top-3.5 opacity-75 rounded-[2px] shadow-sm pointer-events-none" data-unfold-tape />
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <p className="font-['Architects_Daughter'] text-[#3d2b0e] text-[18px] leading-[28px] text-center sm:text-left flex-1" data-unfold-text>
                    I prepared for <span className="text-[#ee3f64]">JEE</span> with all my heart.
                  </p>
                  <div className="w-[110px] h-[95px] rounded-[10px] border border-white shadow-sm overflow-hidden shrink-0" data-unfold-photo>
                    <img src="/assets/about/card-2.png" alt="JEE preparation" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </StickyUnfold>
          </div>

          {/* Card 3 */}
          <div className="w-full max-w-[460px]" data-cursor-key="about-card-3">
            <StickyUnfold side="right" tiltVariation={-4}>
              <div className="relative w-full p-5 rounded-[8px] shadow-md bg-[#b6e8ff] rotate-[-1.5deg]" data-unfold-paper>
                <div className="absolute bg-[#ffd54f] h-[28px] w-[64px] left-1/2 -translate-x-1/2 -top-3.5 opacity-75 rounded-[2px] shadow-sm pointer-events-none" data-unfold-tape />
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <p className="font-['Architects_Daughter'] text-[#3d2b0e] text-[18px] leading-[28px] text-center sm:text-left flex-1" data-unfold-text>
                    I couldn&apos;t pursue engineering at IIT, so I chose to study <span className="text-[#da156a]">Data Science at IIT Madras</span> instead.
                  </p>
                  <div className="w-[110px] h-[110px] rounded-[10px] border border-white shadow-sm overflow-hidden shrink-0" data-unfold-photo>
                    <img src="/assets/about/card-3.png" alt="Data Science" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </StickyUnfold>
          </div>

          {/* Card 4 */}
          <div className="w-full max-w-[460px]" data-cursor-key="about-card-4">
            <StickyUnfold side="left" tiltVariation={2}>
              <div className="relative w-full p-5 rounded-[8px] shadow-md bg-[#caffcf] rotate-[1.5deg]" data-unfold-paper>
                <div className="absolute bg-[#ffd54f] h-[28px] w-[64px] left-1/2 -translate-x-1/2 -top-3.5 opacity-75 rounded-[2px] shadow-sm pointer-events-none" data-unfold-tape />
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <p className="font-['Architects_Daughter'] text-[#3d2b0e] text-[18px] leading-[28px] text-center sm:text-left flex-1" data-unfold-text>
                    It was an online technical program. I knew it would give me time to explore my interests and <span className="text-[#1fad4e]">build new skills.</span>
                  </p>
                  <div className="w-[110px] h-[95px] rounded-[10px] border border-white shadow-sm overflow-hidden shrink-0" data-unfold-photo>
                    <img src="/assets/about/card-4.png" alt="New skills" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </StickyUnfold>
          </div>

          {/* Card 5 */}
          <div className="w-full max-w-[460px]" data-cursor-key="about-card-5">
            <StickyUnfold side="right" tiltVariation={-3}>
              <div className="relative w-full p-5 rounded-[8px] shadow-md bg-[#e8d7fd] rotate-[-1.5deg]" data-unfold-paper>
                <div className="absolute bg-[#ffd54f] h-[28px] w-[64px] left-1/2 -translate-x-1/2 -top-3.5 opacity-75 rounded-[2px] shadow-sm pointer-events-none" data-unfold-tape />
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <p className="font-['Architects_Daughter'] text-[#3d2b0e] text-[18px] leading-[28px] text-center sm:text-left flex-1" data-unfold-text>
                    Along with studies, I was always <span className="text-[#8364fc]">passionate about painting and sketching.</span>
                  </p>
                  <div className="w-[110px] h-[110px] rounded-[10px] border border-white shadow-sm overflow-hidden shrink-0" data-unfold-photo>
                    <img src="/assets/about/card-5.png" alt="Painting" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </StickyUnfold>
          </div>

          {/* Card 6 */}
          <div className="w-full max-w-[460px]" data-cursor-key="about-card-6">
            <StickyUnfold side="left" tiltVariation={4}>
              <div className="relative w-full p-5 rounded-[8px] shadow-md bg-[#f4c5c5] rotate-[1.5deg]" data-unfold-paper>
                <div className="absolute bg-[#ffd54f] h-[28px] w-[64px] left-1/2 -translate-x-1/2 -top-3.5 opacity-75 rounded-[2px] shadow-sm pointer-events-none" data-unfold-tape />
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <p className="font-['Architects_Daughter'] text-[#3d2b0e] text-[18px] leading-[28px] text-center sm:text-left flex-1" data-unfold-text>
                    In my first year, alongside my degree, I started working as a <span className="text-[#ee3f64]">graphic designer.</span>
                  </p>
                  <div className="w-[110px] h-[90px] rounded-[10px] border border-white shadow-sm overflow-hidden shrink-0" data-unfold-photo>
                    <img src="/assets/about/card-6.png" alt="Graphic designer" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </StickyUnfold>
          </div>

          {/* Card 7 */}
          <div className="w-full max-w-[460px]" data-cursor-key="about-card-7">
            <StickyUnfold side="right" tiltVariation={-2}>
              <div className="relative w-full p-5 rounded-[8px] shadow-md bg-[#f1d5ef] rotate-[-1.5deg]" data-unfold-paper>
                <div className="absolute bg-[#ffd54f] h-[28px] w-[64px] left-1/2 -translate-x-1/2 -top-3.5 opacity-75 rounded-[2px] shadow-sm pointer-events-none" data-unfold-tape />
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <p className="font-['Architects_Daughter'] text-[#3d2b0e] text-[18px] leading-[28px] text-center sm:text-left flex-1" data-unfold-text>
                    While working in graphic design, I discovered the world of UI/UX design. I took a UI/UX course alongside my degree and <span className="text-[#da156a]">learned everything step by step.</span>
                  </p>
                  <div className="w-[110px] h-[110px] rounded-[10px] border border-white shadow-sm overflow-hidden shrink-0" data-unfold-photo>
                    <img src="/assets/about/card-7.png" alt="UI/UX course" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </StickyUnfold>
          </div>

          {/* Card 8 */}
          <div className="w-full max-w-[460px]" data-cursor-key="about-card-8">
            <StickyUnfold side="left" tiltVariation={3}>
              <div className="relative w-full p-5 rounded-[8px] shadow-md bg-[#b6e8ff] rotate-[1.5deg]" data-unfold-paper>
                <div className="absolute bg-[#ffd54f] h-[28px] w-[64px] left-1/2 -translate-x-1/2 -top-3.5 opacity-75 rounded-[2px] shadow-sm pointer-events-none" data-unfold-tape />
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <p className="font-['Architects_Daughter'] text-[#3d2b0e] text-[18px] leading-[28px] text-center sm:text-left flex-1" data-unfold-text>
                    After building my skills, I started applying for internships—but <span className="text-[#ee3f64]">landed a full-time UI/UX job</span> instead.
                  </p>
                  <div className="w-[110px] h-[95px] rounded-[10px] border border-white shadow-sm overflow-hidden shrink-0" data-unfold-photo>
                    <img src="/assets/about/card-8.png" alt="Full-time job" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </StickyUnfold>
          </div>

          {/* Card 9 */}
          <div className="w-full max-w-[460px]" data-cursor-key="about-card-9">
            <StickyUnfold side="right" tiltVariation={-1}>
              <div className="relative w-full p-5 rounded-[8px] shadow-md rotate-[-1.5deg]" style={{ backgroundImage: "linear-gradient(153.99deg, rgb(250, 246, 236) 0%, rgb(245, 238, 216) 100%)" }} data-unfold-paper>
                <div className="absolute bg-[#ffd54f] h-[28px] w-[64px] left-1/2 -translate-x-1/2 -top-3.5 opacity-75 rounded-[2px] shadow-sm pointer-events-none" data-unfold-tape />
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1 text-center sm:text-left">
                    <p className="font-['Architects_Daughter'] text-[#3d2b0e] text-[18px] leading-[28px]" data-unfold-text>
                      Since then, I&apos;ve been designing apps, websites, and growing as a
                    </p>
                    <p className="font-['Architects_Daughter'] text-[#f61284] text-[18px] leading-[28px]" data-unfold-text>
                      Product &amp; UI/UX designer.
                    </p>
                  </div>
                  <div className="w-[90px] h-[105px] rounded-[10px] border border-white shadow-sm overflow-hidden shrink-0" data-unfold-photo>
                    <img src="/assets/about/card-9.png" alt="Product designer" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </StickyUnfold>
          </div>
        </div>

        {/* Travel Collages (Mobile Hanging Clothesline) */}
        <div className="w-full px-2 py-8 flex flex-col items-center" data-cursor-key="about-travel">
          <h2 className="font-['Architects_Daughter'] text-[28px] text-black text-center mb-2">Travelling all around</h2>
          <div className="w-[70px] h-[55px] -scale-y-100 rotate-[-10deg] mb-4 pointer-events-none">
            <img src="/assets/about/arrow-travel.svg" alt="" className="w-full h-full object-contain" />
          </div>
          <MobileHangingClothesline
            photos={TRAVEL_HANGING_PHOTOS}
            sectionTitle="Travelling all around"
            cursorKey="about-travel"
          />
        </div>

        {/* Contemporary Artist (Mobile Hanging Clothesline) */}
        <div className="w-full px-2 py-8 flex flex-col items-center" data-cursor-key="about-art">
          <h2 className="font-['Architects_Daughter'] text-[28px] text-black text-center mb-2">Contemporary Artist</h2>
          <div className="w-[70px] h-[55px] -scale-y-100 rotate-[-10deg] mb-4 pointer-events-none">
            <img src="/assets/about/arrow-art.svg" alt="" className="w-full h-full object-contain" />
          </div>
          <MobileHangingClothesline
            photos={ART_PAINTING_PHOTOS}
            sectionTitle="Contemporary Artist"
            cursorKey="about-art"
          />
        </div>

        {/* Desk Scene (Mobile) — unified full-width footer component */}
        <div className="w-full">
          <DeskScene />
        </div>
      </div>
    </main>
  );
}
