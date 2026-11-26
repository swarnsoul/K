import React from "react";

interface SocialLinkConfig {
  name: string;
  icon: string;
  href: string;
  cursorKey: string;
  hasLine: boolean;
  hoverTextClass: string;
  hoverArrowColor: string;
  hoverBgClass: string;
  hoverLineClass: string;
  iconGlowClass: string;
  iconRotate: string;
}

const socialLinks: SocialLinkConfig[] = [
  {
    name: "LinkedIn",
    icon: "/assets/image-18.png",
    href: "https://www.linkedin.com/in/kanakprajapati/",
    cursorKey: "social-linkedin",
    hasLine: true,
    hoverTextClass: "group-hover:text-[#0077B5]",
    hoverArrowColor: "group-hover:text-[#0077B5]",
    hoverBgClass: "group-hover:bg-[#0077B5]/[0.08]",
    hoverLineClass: "bg-[#0077B5]",
    iconGlowClass: "group-hover:shadow-[0_4px_16px_rgba(0,119,181,0.35)]",
    iconRotate: "group-hover:-rotate-3",
  },
  {
    name: "Behance",
    icon: "/assets/image-19.png",
    href: "https://www.behance.net/swarnsoul",
    cursorKey: "social-behance",
    hasLine: true,
    hoverTextClass: "group-hover:text-[#0057FF]",
    hoverArrowColor: "group-hover:text-[#0057FF]",
    hoverBgClass: "group-hover:bg-[#0057FF]/[0.08]",
    hoverLineClass: "bg-[#0057FF]",
    iconGlowClass: "group-hover:shadow-[0_4px_16px_rgba(0,87,255,0.35)]",
    iconRotate: "group-hover:rotate-3",
  },
  {
    name: "Instagram",
    icon: "/assets/image-20.png",
    href: "https://www.instagram.com/swarnsoul?jplx=MTc0cGcwM2VlOXhieA==",
    cursorKey: "social-instagram",
    hasLine: true,
    hoverTextClass: "group-hover:text-[#E1306C]",
    hoverArrowColor: "group-hover:text-[#E1306C]",
    hoverBgClass: "group-hover:bg-[#E1306C]/[0.08]",
    hoverLineClass:
      "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    iconGlowClass: "group-hover:shadow-[0_4px_16px_rgba(225,48,108,0.35)]",
    iconRotate: "group-hover:-rotate-3",
  },
  {
    name: "X (Twitter)",
    icon: "/assets/image-21.png",
    href: "https://x.com/swarnsoul",
    cursorKey: "social-x",
    hasLine: true,
    hoverTextClass: "group-hover:text-[#8364FC]",
    hoverArrowColor: "group-hover:text-[#8364FC]",
    hoverBgClass: "group-hover:bg-[#8364FC]/[0.08]",
    hoverLineClass: "bg-[#8364FC]",
    iconGlowClass: "group-hover:shadow-[0_4px_16px_rgba(131,100,252,0.4)]",
    iconRotate: "group-hover:rotate-3",
  },
  {
    name: "prajapatikanak315@gmail.com",
    icon: "/assets/image-22.png",
    href: "mailto:prajapatikanak315@gmail.com",
    cursorKey: "social-email",
    hasLine: false,
    hoverTextClass: "group-hover:text-[#EE3F64]",
    hoverArrowColor: "group-hover:text-[#EE3F64]",
    hoverBgClass: "group-hover:bg-[#EE3F64]/[0.08]",
    hoverLineClass: "bg-[#EE3F64]",
    iconGlowClass: "group-hover:shadow-[0_4px_16px_rgba(238,63,100,0.35)]",
    iconRotate: "group-hover:-rotate-3",
  },
];

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="38"
      height="31"
      viewBox="0 0 38 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 overflow-visible ${className}`}
    >
      <path
        d="M33.776 15.7071C34.1665 15.3166 34.1665 14.6834 33.776 14.2929L27.412 7.92893C27.0215 7.53841 26.3883 7.53841 25.9978 7.92893C25.6073 8.31946 25.6073 8.95262 25.9978 9.34315L31.6547 15L25.9978 20.6569C25.6073 21.0474 25.6073 21.6805 25.9978 22.0711C26.3883 22.4616 27.0215 22.4616 27.412 22.0711L33.776 15.7071ZM4 15V16H33.0689V15V14H4V15Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DesktopSocial() {
  return (
    <section
      id="about"
      className="relative w-[1440px] h-[526px] border-b border-black border-solid flex items-center justify-center overflow-hidden bg-transparent"
      data-node-id="153:916"
    >
      {/* Content wrapper (Frame 73) */}
      <div
        className="w-[892.87px] h-[418px] relative flex items-center justify-between"
        data-node-id="183:766"
      >
        {/* Left Side: Green Scalloped Sticker & Pen */}
        <div
          className="w-[445.87px] h-[418px] relative shrink-0"
          data-node-id="169:905"
        >
          {/* Scalloped Union Card */}
          <div
            className="absolute left-0 top-[50.84px] w-[383.85px] h-[367.16px]"
            data-node-id="159:937"
            data-cursor-key="social-sticker"
          >
            {/* Scalloped Green BG SVG */}
            <img
              src="/assets/union-1.svg"
              alt="Curiosity badge background"
              className="absolute inset-0 w-full h-full block"
              data-node-id="159:938"
            />

            {/* Top Text: You scrolled this far for a reason. */}
            <div
              className="absolute left-[39.5px] top-[52.67px] w-[304.85px] h-[137.96px] flex items-center justify-center text-center"
              data-node-id="159:943"
            >
              <p className="font-['Architects_Daughter'] text-[40.05px] leading-[50.07px] text-black">
                You scrolled this far for a reason.
              </p>
            </div>

            {/* Bottom Text: Let's turn that curiosity into a conversation. */}
            <div
              className="absolute left-[43.4px] top-[205.16px] w-[297.07px] h-[137.96px] flex items-center justify-center text-center"
              data-node-id="159:946"
            >
              <p className="font-['Almarena_Neue',sans-serif] font-normal text-[22.25px] leading-[33.38px] text-[#225432]">
                Let&apos;s turn that curiosity into a conversation.
              </p>
            </div>
          </div>

          {/* Pen tool illustration over the top right of the green sticker */}
          <div
            className="absolute left-[348.63px] top-0 w-[97.25px] h-[97.25px] flex items-center justify-center"
            data-node-id="159:941"
          >
            <div className="rotate-[-99.93deg] w-[84.01px] h-[84.01px]">
              <img
                src="/assets/pen-tool.png"
                alt="Pen tool illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Social Media Channels */}
        <div
          className="w-[441px] h-[418px] flex flex-col justify-end shrink-0"
          data-node-id="183:833"
        >
          {socialLinks.map((link, idx) => (
            <div key={idx} className="flex flex-col group relative">
              {/* Interactive Row Anchor */}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-[19px] w-full h-[47px] px-2 -mx-2 rounded-[12px] no-squiggle transition-all duration-200 ease-out ${link.hoverBgClass}`}
                data-cursor-key={link.cursorKey}
              >
                {/* Brand Icon */}
                <div
                  className={`w-[37px] h-[37px] rounded-[8px] overflow-hidden flex items-center justify-center shrink-0 transition-all duration-200 ease-out group-hover:scale-105 ${link.iconRotate} ${link.iconGlowClass}`}
                >
                  <img
                    src={link.icon}
                    alt={link.name}
                    className="w-full h-full object-cover block"
                  />
                </div>

                {/* Text and Arrow row */}
                <div className="w-[385px] h-[31px] flex items-center justify-between shrink-0">
                  <span
                    className={`font-['Almarena_Neue',sans-serif] font-normal text-[18px] leading-[30px] text-black truncate w-[329px] transition-all duration-200 ease-out group-hover:translate-x-1 ${link.hoverTextClass}`}
                  >
                    {link.name}
                  </span>
                  <div className="w-[38px] h-[31px] shrink-0 text-black flex items-center justify-end transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                    <ArrowIcon
                      className={`transition-colors duration-200 ${link.hoverArrowColor}`}
                    />
                  </div>
                </div>
              </a>

              {/* Bottom Divider Line (aligned under the 385px text/arrow column) */}
              {link.hasLine && (
                <div className="ml-[56px] w-[385px] h-[1px] relative my-[3px] bg-[#6B6B6B]/40 overflow-hidden">
                  <div
                    className={`absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out ${link.hoverLineClass}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Floating accent icon */}
      <div
        className="absolute right-[68px] top-[202px] w-[27.07px] h-0"
        data-node-id="181:729"
      >
        <img src="/assets/component-25.svg" alt="" className="w-full block" />
      </div>
    </section>
  );
}

export function MobileSocial() {
  return (
    <section
      id="about"
      className="relative w-full bg-transparent border-b border-black py-10 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8 flex flex-col items-center overflow-visible"
    >
      <div className="w-full max-w-[890px] flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10">
        {/* Left Side: Green Scalloped Sticker & Pen */}
        <div className="w-full max-w-[360px] sm:max-w-[420px] h-[340px] sm:h-[390px] relative shrink-0 overflow-visible">
          {/* Scalloped Green BG */}
          <img
            src="/assets/union-1.svg"
            alt="Curiosity badge background"
            className="absolute inset-0 w-full h-full block"
          />

          {/* Top Text */}
          <div className="absolute left-[24px] right-[24px] top-[40px] sm:top-[50px] flex items-center justify-center text-center">
            <p className="font-['Architects_Daughter'] text-[26px] sm:text-[32px] md:text-[36px] leading-tight text-black">
              You scrolled this far for a reason.
            </p>
          </div>

          {/* Bottom Text */}
          <div className="absolute left-[24px] right-[24px] bottom-[35px] sm:bottom-[45px] flex items-center justify-center text-center">
            <p className="font-['Almarena_Neue',sans-serif] font-normal text-[16px] sm:text-[18px] leading-snug text-[#225432]">
              Let&apos;s turn that curiosity into a conversation.
            </p>
          </div>

          {/* Pen Tool Illustration - Fully visible inside container bounds */}
          <div className="absolute right-1 sm:right-2 -top-4 sm:-top-5 w-[65px] sm:w-[75px] h-[65px] sm:h-[75px] rotate-[-100deg] pointer-events-none select-none z-20">
            <img
              src="/assets/pen-tool.png"
              alt="Pen tool illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right Side: Social Media Channels */}
        <div className="w-full max-w-[420px] flex flex-col justify-end">
          {socialLinks.map((link, idx) => (
            <div key={idx} className="flex flex-col group relative">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`min-h-[48px] flex items-center justify-between gap-3 px-3 py-2 rounded-[12px] no-squiggle transition-all duration-200 ease-out ${link.hoverBgClass}`}
                data-cursor-key={link.cursorKey}
              >
                <div
                  className={`w-[32px] sm:w-[36px] h-[32px] sm:h-[36px] rounded-[6px] overflow-hidden shrink-0 transition-all duration-200 ease-out group-hover:scale-105 ${link.iconRotate} ${link.iconGlowClass}`}
                >
                  <img
                    src={link.icon}
                    alt={link.name}
                    className="w-full h-full object-cover block"
                  />
                </div>
                <span
                  className={`font-['Almarena_Neue',sans-serif] font-normal text-[16px] sm:text-[18px] text-black truncate flex-1 transition-all duration-200 ease-out group-hover:translate-x-1 ${link.hoverTextClass}`}
                >
                  {link.name}
                </span>
                <div className="w-[32px] sm:w-[38px] h-[26px] sm:h-[31px] shrink-0 text-black flex items-center justify-end transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                  <ArrowIcon
                    className={`transition-colors duration-200 ${link.hoverArrowColor}`}
                  />
                </div>
              </a>
              {link.hasLine && (
                <div className="w-full h-[1px] relative my-1 bg-black/15 overflow-hidden">
                  <div
                    className={`absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out ${link.hoverLineClass}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Social() {
  return (
    <>
      <div className="hidden xl:block">
        <DesktopSocial />
      </div>
      <div className="xl:hidden">
        <MobileSocial />
      </div>
    </>
  );
}
