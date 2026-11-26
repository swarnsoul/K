"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface DeskSceneProps {
  className?: string;
  showClosingQuote?: boolean;
}

export default function DeskScene({
  className = "",
  showClosingQuote = true,
}: DeskSceneProps) {
  // Lamp state (default is ON as in Figma variant 1)
  const [isLampOn, setIsLampOn] = useState(true);

  // Diary state (hover on desktop, tap on mobile, keyboard accessible)
  const [isDiarySwapped, setIsDiarySwapped] = useState(false);

  // Diary popup modal state
  const [mounted, setMounted] = useState(false);
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const smallDiaryRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Check prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  const toggleLamp = () => {
    setIsLampOn((prev) => !prev);
  };

  const handleLampKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleLamp();
    }
  };

  const openDiaryModal = () => {
    setIsDiaryModalOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsModalVisible(true);
      });
    });
  };

  const closeDiaryModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setIsDiaryModalOpen(false);
      smallDiaryRef.current?.focus();
    }, reducedMotion ? 50 : 280);
  };

  const handleDiaryKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openDiaryModal();
    }
  };

  // Scroll lock, Escape listener, and auto-focus
  useEffect(() => {
    if (!isDiaryModalOpen) return;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.documentElement.setAttribute("data-modal-open", "true");
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDiaryModal();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);

    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.documentElement.removeAttribute("data-modal-open");
      window.removeEventListener("keydown", handleGlobalKeyDown);
      clearTimeout(focusTimer);
    };
  }, [isDiaryModalOpen, reducedMotion]);

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      closeButtonRef.current?.focus();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      closeDiaryModal();
    }
  };

  return (
    <footer
      className={`relative w-full overflow-hidden select-none bg-transparent ${className}`}
      style={{
        aspectRatio: "1440 / 990",
        containerType: "inline-size",
      }}
      aria-label="Footer Desk Scene"
      data-figma-id="563:899"
      data-name="Footer Scene"
    >
      {/* =====================================================================
          FRAME 85: CLOSING QUOTE & HAND-DRAWN HEARTS (node 563:899)
          Design: 1440 x 260 at y=3980 (rel y=0, h=260 / 990 = 26.26%)
          Striped band removed per user instructions; sits on global dotted canvas.
          ===================================================================== */}
      {showClosingQuote && (
        <div
          className="absolute left-0 top-0 w-full pointer-events-none z-[1]"
          style={{ height: "26.2626%" }}
          data-figma-id="563:899"
          data-name="Frame 85"
        >
          {/* Closing Quote (node 563:900): x=53, y=53.73, w=1000.53, h=67.93 */}
          <div
            className="absolute pointer-events-auto"
            style={{
              left: "3.6806%",
              top: "20.6651%",
              width: "69.4809%",
              height: "26.1269%",
            }}
            data-figma-id="563:900"
            data-cursor-key="desk-closing-quote"
          >
            <p
              className="[word-break:break-word] font-['Architects_Daughter'] not-italic text-[#ee3f64]"
              style={{
                fontSize: "calc(38 / 1440 * 100cqi)",
                lineHeight: "calc(50 / 1440 * 100cqi)",
              }}
            >
              A little bit of code, a lot of creativity, and countless dreams. Thanks for reading my story.
            </p>
          </div>

          {/* 3 Hand-drawn Hearts: Group 24 (node 563:901): x=1046, y=72, w=173.98, h=148.92 */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: "72.6389%",
              top: "27.6923%",
              width: "12.0819%",
              height: "57.2788%",
            }}
            data-figma-id="563:901"
            data-name="Group 24"
          >
            {/* Heart 1 (node 563:902) */}
            <div
              className="absolute flex items-center justify-center"
              style={{
                left: "64.6626%",
                top: "0%",
                width: "46.5323%",
                height: "52.2757%",
              }}
              data-figma-id="563:902"
              data-name="Heart"
            >
              <div className="rotate-[18.94deg] w-full h-full">
                <img
                  src="/assets/about/heart-large.svg"
                  alt=""
                  className="w-full h-full object-contain block"
                />
              </div>
            </div>

            {/* Heart 2 (node 563:909) */}
            <div
              className="absolute flex items-center justify-center"
              style={{
                left: "11.1967%",
                top: "26.1340%",
                width: "46.5323%",
                height: "52.2757%",
              }}
              data-figma-id="563:909"
              data-name="Heart"
            >
              <div className="rotate-[18.94deg] w-full h-full">
                <img
                  src="/assets/about/heart-large.svg"
                  alt=""
                  className="w-full h-full object-contain block"
                />
              </div>
            </div>

            {/* Heart 3 (node 563:916) */}
            <div
              className="absolute flex items-center justify-center"
              style={{
                left: "54.3172%",
                top: "64.4085%",
                width: "29.3776%",
                height: "35.5884%",
              }}
              data-figma-id="563:916"
              data-name="Heart"
            >
              <div className="rotate-[18.94deg] w-full h-full">
                <img
                  src="/assets/about/heart-small.svg"
                  alt=""
                  className="w-full h-full object-contain block"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          FRAME 182: DESK SCENE (node 563:923)
          Design: 1439 x 868 at y=4102 (rel y=122, h=868 / 990 = 87.68%)
          Aspect-ratio locked, zero sliced wings, zero seams.
          ===================================================================== */}
      <div
        className="absolute left-0 w-full overflow-hidden"
        style={{
          top: "12.3232%",
          height: "87.6768%",
        }}
        data-figma-id="563:923"
        data-name="Frame 182"
      >
        <div className="relative w-full h-full" data-name="Group 25">
          {/* ===================================================================
              LAYER 1: DESK BASE & LAPTOP (node 563:925)
              Clean uncut transparent PNG, spans 100% width across all viewports.
              Trapezoid slanted corners intact. Laptop width = 27% of section.
              =================================================================== */}
          <div
            className="absolute left-0 top-0 w-full pointer-events-none z-[1]"
            style={{ height: "110.4839%" }}
            data-figma-id="563:925"
            data-name="image 62"
          >
            <img
              src="/assets/desk/desk_base.png"
              alt="Wooden desk with drawers and laptop"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>

          {/* Laptop Hit Area for cursor */}
          <div
            className="absolute pointer-events-auto z-[3]"
            style={{
              left: "36.5%",
              top: "24%",
              width: "27%",
              height: "45%",
            }}
            data-cursor-key="desk-laptop"
            aria-label="Laptop"
          />

          {/* ===================================================================
              LAYER 2: POTHOS PLANT BEHIND LAMP (node 563:926)
              Always visible in BOTH ON and OFF states.
              =================================================================== */}
          <div
            className="absolute pointer-events-none z-[2]"
            style={{
              left: "70.1876%",
              top: "24.7696%",
              width: "25.7818%",
              height: "41.8203%",
            }}
            data-figma-id="563:926"
            data-name="image 65"
            aria-hidden="true"
          >
            <img
              src="/assets/desk/lamp_glow.png"
              alt="Pothos plant behind lamp"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>

          {/* ===================================================================
              LAYER 3: PINBOARD WITH POLAROIDS (node 563:927)
              Clean high-res pinboard asset with polaroids and Good things take time note.
              =================================================================== */}
          <div
            className="absolute flex items-center justify-center pointer-events-auto z-[3]"
            style={{
              left: "14.3155%",
              top: "20.0461%",
              width: "17.9379%",
              height: "36.5363%",
            }}
            data-figma-id="563:927"
            data-name="Good things take time (1) 1"
            data-cursor-key="desk-pinboard"
          >
            <div className="rotate-[-4.28deg] w-full h-full">
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/assets/desk/pinboard.png"
                  alt="Pinboard with polaroid photos and quote"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain block"
                />
              </div>
            </div>
          </div>

          {/* ===================================================================
              LAYER 4: LAMP COMPONENT (node 563:928, Component 29)
              Interactive toggle (ON / OFF). Bulb glow only when ON.
              No native tooltip, accessible aria-label preserved.
              =================================================================== */}
          <div
            className="absolute z-[4]"
            style={{
              left: "67.7554%",
              top: "16.8203%",
              width: "29.0480%",
              height: "44.2396%",
            }}
            data-figma-id="563:928"
            data-name="Component 29"
          >
            <button
              type="button"
              onClick={toggleLamp}
              onKeyDown={handleLampKeyDown}
              className="relative w-full h-full block cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc] focus-visible:ring-offset-2 rounded-[20px] transition-transform duration-150 active:scale-[0.98]"
              aria-label={isLampOn ? "Turn off desk lamp" : "Turn on desk lamp"}
              data-state={isLampOn ? "on" : "off"}
              data-cursor-key="desk-lamp"
            >
              <img
                src={isLampOn ? "/assets/desk/lamp_on.png" : "/assets/desk/lamp_off.png"}
                alt={isLampOn ? "Desk lamp turned ON" : "Desk lamp turned OFF"}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover block pointer-events-none ${
                  reducedMotion ? "" : "transition-opacity duration-300"
                }`}
              />
              {isLampOn && (
                <div
                  className="-translate-y-1/2 absolute aspect-[161/161] bg-white blur-[15px] pointer-events-none"
                  style={{
                    left: "29.9%",
                    right: "59.33%",
                    top: "calc(50% - 22.5px)",
                    borderRadius: "100px",
                  }}
                  data-figma-id="I563:928;546:948"
                  aria-hidden="true"
                />
              )}
              {/* Enlarge mobile hit area to >= 44x44px */}
              <span className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 min-w-[44px] min-h-[44px] pointer-events-auto" aria-hidden="true" />
            </button>
          </div>

          {/* ===================================================================
              LAYER 5: PLANT RIGHT (node 563:929, image 66)
              =================================================================== */}
          <div
            className="absolute pointer-events-auto z-[5] rounded-[7px] overflow-hidden"
            style={{
              left: "86.5879%",
              top: "28.5714%",
              width: "9.3815%",
              height: "38.0184%",
            }}
            data-figma-id="563:929"
            data-name="image 66"
            data-cursor-key="desk-plant"
            aria-hidden="true"
          >
            <div className="absolute inset-0 overflow-hidden rounded-[7px]">
              <img
                src="/assets/desk/lamp_glow.png"
                alt="Plant leaves"
                loading="lazy"
                decoding="async"
                className="absolute max-w-none pointer-events-none"
                style={{
                  width: "274.96%",
                  height: "110%",
                  left: "-174.89%",
                  top: "-10%",
                }}
              />
            </div>
          </div>

          {/* ===================================================================
              LAYER 6: CANDLE (node 563:930, image 63)
              =================================================================== */}
          <div
            className="absolute pointer-events-auto z-[6]"
            style={{
              left: "62.6129%",
              top: "41.9355%",
              width: "10.2154%",
              height: "14.6313%",
            }}
            data-figma-id="563:930"
            data-name="image 63"
            data-cursor-key="desk-candle"
            aria-hidden="true"
          >
            <img
              src="/assets/desk/candle.png"
              alt="Lit glass candle"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>

          {/* ===================================================================
              LAYER 7: MUG (node 563:931, image 64)
              =================================================================== */}
          <div
            className="absolute pointer-events-auto z-[7]"
            style={{
              left: "70.0486%",
              top: "55.2995%",
              width: "11.8138%",
              height: "16.9355%",
            }}
            data-figma-id="563:931"
            data-name="image 64"
            data-cursor-key="desk-mug"
            aria-hidden="true"
          >
            <img
              src="/assets/desk/mug.png"
              alt="Ceramic tulip mug on wooden saucer"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>

          {/* ===================================================================
              LAYER 8: CLOCK (node 563:932, image 69)
              =================================================================== */}
          <div
            className="absolute pointer-events-auto z-[8]"
            style={{
              left: "25.2953%",
              top: "43.5484%",
              width: "9.8679%",
              height: "14.9770%",
            }}
            data-figma-id="563:932"
            data-name="image 69"
            data-cursor-key="desk-clock"
            aria-hidden="true"
          >
            <img
              src="/assets/desk/clock.png"
              alt="Golden twin-bell alarm clock"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>

          {/* ===================================================================
              LAYER 9: PLANT LEFT & BOOKS (node 563:933, image 70)
              =================================================================== */}
          <div
            className="absolute pointer-events-auto z-[9]"
            style={{
              left: "0.8339%",
              top: "32.4885%",
              width: "23.0716%",
              height: "31.6820%",
            }}
            data-figma-id="563:933"
            data-name="image 70"
            data-cursor-key="desk-books"
            aria-hidden="true"
          >
            <img
              src="/assets/desk/plant_left.png"
              alt="Trailing pothos plant over stacked books and pen holder"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>

          {/* ===================================================================
              LAYER 10: DIARY / NOTEBOOK COMPONENT (node 563:934, Component 28)
              Interactive swap: Closed (diary_v1.png) <-> Open Checklist (diary_v2.png)
              No native tooltip, accessible aria-label preserved.
              =================================================================== */}
          <div
            className="absolute z-[10]"
            style={{
              left: "13.6901%",
              top: "55.2995%",
              width: "19.7887%",
              height: "21.8709%",
            }}
            data-figma-id="563:934"
            data-name="Component 28"
            data-cursor-key="desk-diary"
          >
            <div
              ref={smallDiaryRef}
              role="button"
              tabIndex={0}
              onClick={openDiaryModal}
              onKeyDown={handleDiaryKeyDown}
              onMouseEnter={() => setIsDiarySwapped(true)}
              onMouseLeave={() => setIsDiarySwapped(false)}
              className="relative w-full h-full flex items-center justify-center cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc] rounded-[12px]"
              aria-label="Today checklist diary and pen (hover to flip, click to open full view)"
            >
              <div
                className={`w-full h-full flex items-center justify-center ${
                  reducedMotion ? "" : "transition-all duration-300"
                }`}
                style={{
                  filter: isDiarySwapped
                    ? "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.22))"
                    : "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.12))",
                  transform: isDiarySwapped
                    ? "rotate(-3deg) scale(1.02)"
                    : "rotate(-4.97deg)",
                }}
                data-node-id="I563:934;546:924"
              >
                <img
                  src={
                    isDiarySwapped
                      ? "/assets/desk/diary_v2.png"
                      : "/assets/desk/diary_v1.png"
                  }
                  alt={
                    isDiarySwapped
                      ? "Open Today checklist diary with pink pen"
                      : "Today checklist diary with pink pen"
                  }
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-contain block ${
                    reducedMotion ? "" : "transition-opacity duration-200"
                  }`}
                />
              </div>
              {/* Enlarge mobile hit area to >= 44x44px */}
              <span className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 min-w-[44px] min-h-[44px] pointer-events-auto" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          POP-UP MODAL: BIG OPEN DIARY (node 783:1036, "Currently focused on")
          Smooth scale & fade in, blurred backdrop, keyboard focus trap,
          Escape to close, outside click to close, body scroll locked.
          =================================================================== */}
      {mounted && isDiaryModalOpen && createPortal(
        <div
          ref={backdropRef}
          role="dialog"
          aria-modal="true"
          aria-label="Currently focused on diary modal"
          onClick={handleBackdropClick}
          onKeyDown={handleModalKeyDown}
          className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8 transition-all ${
            reducedMotion ? "duration-75" : "duration-300"
          } ease-out ${
            isModalVisible
              ? "bg-black/50 backdrop-blur-md opacity-100"
              : "bg-black/0 backdrop-blur-none opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`relative flex items-center justify-center select-none transition-all ${
              reducedMotion ? "duration-75" : "duration-300"
            } ease-out transform ${
              isModalVisible
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-90 translate-y-3"
            }`}
            style={{
              width: "min(501px, 92vw, calc(88vh * 501 / 750))",
              aspectRatio: "501 / 750",
              maxHeight: "88vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/assets/desk/diary_open_focused.png"
              alt="Currently focused on: Designing AI-first user experiences, Simplifying complex workflows, Shipping production-ready features, Building scalable design systems"
              className="w-full h-full object-contain pointer-events-none drop-shadow-[0_25px_60px_rgba(0,0,0,0.45)]"
              draggable={false}
            />

            {/* Accessible Close Button */}
            <button
              ref={closeButtonRef}
              onClick={closeDiaryModal}
              className="absolute -top-3 -right-3 sm:-top-3.5 sm:-right-3.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#2d2a26] hover:bg-[#151413] text-[#faf6ec] flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc] cursor-pointer border border-[#faf6ec]/30"
              aria-label="Close diary"
            >
              <svg
                className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>,
        document.body
      )}
    </footer>
  );
}
