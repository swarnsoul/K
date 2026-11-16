"use client";

import React from "react";

// ─── Row 1 Assets (Top 6 Screens) ───
const r1_imgRectangle1 = "/assets/case-studies/cirqell/hifi/407fb29aec9ad266715cbfd66bc6e1c83fcf5318.png";
const r1_imgWhatsAppImage20260224At52157PmPicsartAiImageEnhancerRemovebgPreview1 = "/assets/case-studies/cirqell/hifi/34a46dfe4e920a626948fb3daf84c06b2559e933.png";
const r1_imgAvatarImage = "/assets/case-studies/cirqell/hifi/f40173a56351e5ef7e5395c40be52fc37363b800.png";
const r1_imgLevels = "/assets/case-studies/cirqell/hifi/d5314cc1fe714f817cfa15b4e308839317b23aa2.svg";
const r1_imgLine2 = "/assets/case-studies/cirqell/hifi/0968715af995ceee04edf423823ad845497bb6c2.svg";
const r1_imgFrame1 = "/assets/case-studies/cirqell/hifi/3429e6f3b9e479e7f2eb127476894d30741a8dcf.svg";
const r1_imgLine1 = "/assets/case-studies/cirqell/hifi/c407d3e69583df651aa1f04a9efd08c8fca3ee53.svg";
const r1_imgFrame2 = "/assets/case-studies/cirqell/hifi/515292edf44610179c80bffe37adf1f8944b299a.svg";
const r1_imgVuesaxBoldFacebook = "/assets/case-studies/cirqell/hifi/4cb6aa0d9ed511558208e9c468ada65a48398d7f.svg";
const r1_imgVector = "/assets/case-studies/cirqell/hifi/dd6f0ae8147f4e1bdba5cfa7db3be664c3d5361c.svg";
const r1_imgVector1 = "/assets/case-studies/cirqell/hifi/d0babb9afb5b5e75cd83ece40cc620f470b5f50f.svg";
const r1_imgRing1 = "/assets/case-studies/cirqell/hifi/501a2d53e90a8f52466873c3bb7efad003d7187c.svg";
const r1_imgFace = "/assets/case-studies/cirqell/hifi/eafb8cd1af003e1a6b123675560df0462f270504.svg";
const r1_imgVector2 = "/assets/case-studies/cirqell/hifi/31b5b107878be88557db6dcdb9b5af2d926d62b6.svg";
const r1_imgVector3 = "/assets/case-studies/cirqell/hifi/67557ebb33e8236409872c3b68ee390e569c3f61.svg";
const r1_imgLine3 = "/assets/case-studies/cirqell/hifi/4b9538752067065fbdd70a8b520d656b08d2e107.svg";

// ─── Row 2 Assets (Bottom 5 Screens) ───
const r2_imgIPhone131426 = "/assets/case-studies/cirqell/hifi/407fb29aec9ad266715cbfd66bc6e1c83fcf5318.png";
const r2_imgLevels = "/assets/case-studies/cirqell/hifi/a0b437eedfc3d28883ab8e0247290fc2fc488ca5.svg";
const r2_imgLine2 = "/assets/case-studies/cirqell/hifi/a79d6cb758016f47c6e5a4feda0498acd916246d.svg";
const r2_imgPerson = "/assets/case-studies/cirqell/hifi/5d4bcd6a1d8f1831efa4ead7ae98b39a8d960d8d.svg";
const r2_imgEdit = "/assets/case-studies/cirqell/hifi/7da46b6cb72e4a22742979145c8dcae3bf4e5507.svg";
const r2_imgFrame1 = "/assets/case-studies/cirqell/hifi/a9ed6b7e171cb10beebd3db47bbe6915656a6621.svg";
const r2_imgFrame2 = "/assets/case-studies/cirqell/hifi/09c914dc88d357816ef3d67d9dde05f8e41d2bb2.svg";
const r2_imgFrame3 = "/assets/case-studies/cirqell/hifi/831f87d76b418ede58f8d2e8b3c671f012f2642c.svg";
const r2_imgMicrophone = "/assets/case-studies/cirqell/hifi/5936b9279009548feb9eac1160f9ef9b6d8240db.svg";
const r2_imgFrame4 = "/assets/case-studies/cirqell/hifi/d929fad2be6d5a947f8ea452c1eac582c1cc467e.svg";
const r2_imgFrame5 = "/assets/case-studies/cirqell/hifi/db4a413dbf3fe6c11c72c212d6b6212cc8513ccc.svg";
const r2_imgFrame6 = "/assets/case-studies/cirqell/hifi/88b9c400cbad13e11fac7da9665673bb62ced17d.svg";
const r2_imgFrame7 = "/assets/case-studies/cirqell/hifi/874d894ca44ec705fdb864643ac095e49db3f759.svg";
const r2_imgFrame8 = "/assets/case-studies/cirqell/hifi/c537e3230b2b223b1e1d5b44259b5d36d507d476.svg";
const r2_imgMicrophone1 = "/assets/case-studies/cirqell/hifi/b5d091b26b2d89888bae2f134d69caf77b2ac152.svg";
const r2_imgFontawesome = "/assets/case-studies/cirqell/hifi/510606690b758d9c810379c75e65649032c98553.svg";
const r2_imgEllipse19 = "/assets/case-studies/cirqell/hifi/ac1b8591800e1a57c4113cfd05dba77a9d264c51.svg";
const r2_imgFontawesome1 = "/assets/case-studies/cirqell/hifi/449befe254b4ab345a057f0ce9d3f1371becf3b5.svg";

// ─── Row 1 Implementation (6 iPhone Screens) ───
function Row1Screens() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative size-full" data-node-id="445:3292">
      <div className="bg-black h-[308.2px] overflow-clip relative shrink-0 w-[142.415px] rounded-[16px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3116" data-name="iPhone 13 & 14 - 26">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[308.2px] left-1/2 top-1/2 w-[142.415px]" data-node-id="445:3117">
          <div className="absolute inset-0 opacity-70 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[103.91%] left-[-13.25%] max-w-none top-[-3.91%] w-[126.49%]" src={r1_imgRectangle1} />
          </div>
        </div>
        <div className="absolute content-stretch flex h-[20.084px] items-start justify-between left-0 top-0 w-[142.415px]" data-node-id="445:3118" data-name="iOS status bar">
          <div className="h-[19.719px] relative shrink-0 w-[51.306px]" data-node-id="I445:3118;1:14623" data-name="Time">
            <p className="[word-break:break-word] absolute font-['SF_Pro'] font-semibold font-[590] inset-[33.96%_37.71%_20.4%_35.01%] leading-[8.034px] text-[6.208px] text-center text-white whitespace-nowrap" data-node-id="I445:3118;1:14624" style={{ fontVariationSettings: '"wdth" 100' }}>
              9:41
            </p>
          </div>
          <div className="h-[19.719px] relative shrink-0 w-[51.306px]" data-node-id="I445:3118;1:14625" data-name="Levels">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgLevels} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute bottom-[5.84px] h-0 left-1/2 w-[52.584px]" data-node-id="445:3119">
          <div className="absolute inset-[-1.83px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={r1_imgLine2} />
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[16.432px] items-center justify-center left-1/2 top-[calc(50%+0.18px)] w-[102.247px]" data-node-id="445:3120">
          <div className="h-[48.932px] relative shrink-0 w-[50.223px]" data-node-id="445:3121" data-name="WhatsApp_Image_2026-02-24_at_5_21_57_PM-Picsart-AiImageEnhancer-removebg-preview 1">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={r1_imgWhatsAppImage20260224At52157PmPicsartAiImageEnhancerRemovebgPreview1} />
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col font-['Kantumruy_Pro'] font-normal font-normal gap-[2.556px] items-center justify-center leading-[0] relative shrink-0 text-center text-white w-full" data-node-id="445:3122">
            <div className="flex flex-col h-[10.225px] justify-center relative shrink-0 text-[7.303px] w-full" data-node-id="445:3123">
              <p className="leading-[normal]">Join The Network</p>
            </div>
            <div className="flex flex-col h-[20.449px] justify-center relative shrink-0 text-[5.112px] w-full" data-node-id="445:3124">
              <p className="leading-[7.303px]">Private voice first connections based on proximity and intent.</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[4.747px] items-center relative shrink-0 w-full" data-node-id="445:3125">
            <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[20.449px] justify-center leading-[0] min-w-full relative shrink-0 text-[5.477px] text-center text-white w-[min-content]" data-node-id="445:3126">
              <p className="leading-[7.303px]">Which gender best describes you ?</p>
            </div>
            <div className="content-stretch flex flex-col gap-[9.859px] items-center justify-center relative shrink-0 w-[94.943px]" data-node-id="445:3127">
              <div className="backdrop-blur-[7.668px] border-[#002f82] border-[0.365px] border-solid content-stretch flex h-[20.449px] items-center justify-center px-[13.511px] py-[4.017px] relative rounded-[3.652px] shrink-0 w-full" data-node-id="445:3128" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 94.943 20.449' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(9.4943 2.0068 -9.3172 2.0297 8.5496e-7 0.38152)'><stop stop-color='rgba(0,54,148,0.7)' offset='0'/><stop stop-color='rgba(0,25,79,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
                <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal justify-center leading-[0] relative shrink-0 text-[6.208px] text-center text-white w-[60.618px]" data-node-id="445:3129">
                  <p className="leading-[normal]">Female</p>
                </div>
              </div>
              <div className="backdrop-blur-[7.668px] border-[#002f82] border-[0.365px] border-solid content-stretch flex h-[20.449px] items-center justify-center px-[13.511px] py-[4.017px] relative rounded-[3.652px] shrink-0 w-full" data-node-id="445:3130" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 94.943 20.449' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(9.4943 2.0068 -9.3172 2.0297 8.5496e-7 0.38152)'><stop stop-color='rgba(0,54,148,0.7)' offset='0'/><stop stop-color='rgba(0,25,79,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
                <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal justify-center leading-[0] relative shrink-0 text-[6.208px] text-center text-white whitespace-nowrap" data-node-id="445:3131">
                  <p className="leading-[normal]">Male</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black h-[308.2px] overflow-clip relative shrink-0 w-[142.415px] rounded-[16px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3141" data-name="iPhone 13 & 14 - 27">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[308.2px] left-1/2 top-1/2 w-[142.415px]" data-node-id="445:3143">
          <div className="absolute inset-0 opacity-70 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[103.91%] left-[-13.25%] max-w-none top-[-3.91%] w-[126.49%]" src={r1_imgRectangle1} />
          </div>
        </div>
        <div className="absolute content-stretch flex h-[20.084px] items-start justify-between left-0 top-0 w-[142.415px]" data-node-id="445:3144" data-name="iOS status bar">
          <div className="h-[19.719px] relative shrink-0 w-[51.306px]" data-node-id="I445:3144;1:14623" data-name="Time">
            <p className="[word-break:break-word] absolute font-['SF_Pro'] font-semibold font-[590] inset-[33.96%_37.71%_20.4%_35.01%] leading-[8.034px] text-[6.208px] text-center text-white whitespace-nowrap" data-node-id="I445:3144;1:14624" style={{ fontVariationSettings: '"wdth" 100' }}>
              9:41
            </p>
          </div>
          <div className="h-[19.719px] relative shrink-0 w-[51.306px]" data-node-id="I445:3144;1:14625" data-name="Levels">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgLevels} />
          </div>
        </div>
        <div className="absolute content-stretch flex gap-[9.859px] items-center left-[10.22px] top-[30.67px]" data-node-id="445:3145">
          <div className="relative shrink-0 size-[10.225px]" data-node-id="445:3146">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgFrame1} />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[10.225px] justify-center leading-[0] relative shrink-0 text-[7.303px] text-center text-white w-[81.797px]" data-node-id="445:3148">
            <p className="leading-[normal]">OTP Verification</p>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute bottom-[5.84px] h-0 left-1/2 w-[52.584px]" data-node-id="445:3149">
          <div className="absolute inset-[-1.83px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={r1_imgLine2} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute backdrop-blur-[7.668px] border-[0.365px] border-[rgba(255,255,255,0.1)] border-solid h-[132.921px] left-1/2 rounded-[3.652px] top-[102.25px] w-[102.247px]" data-node-id="445:3150" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 102.25 132.92' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(10.225 13.044 -10.034 13.193 9.2072e-7 2.4799)'><stop stop-color='rgba(217,217,217,0.4)' offset='0'/><stop stop-color='rgba(115,115,115,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
          <div className="-translate-x-1/2 absolute h-0 left-1/2 top-[30.67px] w-[81.797px]" data-node-id="445:3151">
            <div className="absolute inset-[-0.37px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={r1_imgLine1} />
            </div>
          </div>
          <div className="-translate-x-1/2 absolute h-0 left-1/2 top-[60.98px] w-[81.797px]" data-node-id="445:3152">
            <div className="absolute inset-[-0.37px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={r1_imgLine1} />
            </div>
          </div>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[9.859px] justify-center leading-[0] left-[calc(50%-40.9px)] text-[5.112px] text-white top-[25.38px] w-[61.348px]" data-node-id="445:3153">
            <p className="leading-[normal]">(+91) India</p>
          </div>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[10.225px] justify-center leading-[0] left-[calc(50%-40.9px)] text-[5.112px] text-[rgba(255,255,255,0.2)] top-[55.51px] w-[81.797px]" data-node-id="445:3154">
            <p className="leading-[normal]">Enter Your Mobile Number</p>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[10.225px] justify-center leading-[0] left-1/2 text-[4.382px] text-center text-white top-[86.54px] w-[81.797px]" data-node-id="445:3155">
            <p className="leading-[7.303px]">We will send you one time password (OTP)</p>
          </div>
          <div className="absolute flex items-center justify-center left-[81.8px] size-[10.225px] top-[20.08px]" data-node-id="445:3156">
            <div className="-rotate-90 flex-none">
              <div className="relative size-[10.225px]">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgFrame2} />
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 absolute backdrop-blur-[7.668px] border-[#002f82] border-[0.365px] border-solid content-stretch flex items-center justify-center left-[calc(50%-0.18px)] px-[13.511px] py-[4.017px] rounded-[3.652px] top-[105.53px] w-[66.095px]" data-node-id="445:3158" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 66.095 14.034' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(6.6095 1.3772 -6.4862 1.3929 5.9518e-7 0.26182)'><stop stop-color='rgba(0,54,148,0.7)' offset='0'/><stop stop-color='rgba(0,25,79,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
            <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal justify-center leading-[0] relative shrink-0 text-[5.477px] text-center text-white whitespace-nowrap" data-node-id="445:3159">
              <p className="leading-[normal]">Send</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[308.2px] overflow-clip relative shrink-0 w-[142.415px] rounded-[16px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3169" data-name="iPhone 13 & 14 - 28">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-black inset-0" />
          <div className="absolute inset-0 opacity-70 overflow-hidden">
            <img alt="" className="absolute h-[103.91%] left-[-13.25%] max-w-none top-[-3.91%] w-[126.49%]" src={r1_imgRectangle1} />
          </div>
        </div>
        <div className="absolute content-stretch flex h-[20.084px] items-start justify-between left-0 top-0 w-[142.415px]" data-node-id="445:3171" data-name="iOS status bar">
          <div className="h-[19.719px] relative shrink-0 w-[51.306px]" data-node-id="I445:3171;1:14623" data-name="Time">
            <p className="[word-break:break-word] absolute font-['SF_Pro'] font-semibold font-[590] inset-[33.96%_37.71%_20.4%_35.01%] leading-[8.034px] text-[6.208px] text-center text-white whitespace-nowrap" data-node-id="I445:3171;1:14624" style={{ fontVariationSettings: '"wdth" 100' }}>
              9:41
            </p>
          </div>
          <div className="h-[19.719px] relative shrink-0 w-[51.306px]" data-node-id="I445:3171;1:14625" data-name="Levels">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgLevels} />
          </div>
        </div>
        <div className="absolute content-stretch flex gap-[9.859px] items-center left-[10.22px] top-[30.67px]" data-node-id="445:3172">
          <div className="relative shrink-0 size-[10.225px]" data-node-id="445:3173">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgFrame1} />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[10.225px] justify-center leading-[0] relative shrink-0 text-[7.303px] text-center text-white w-[81.797px]" data-node-id="445:3175">
            <p className="leading-[normal]">OTP Verification</p>
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[10.225px] justify-center leading-[0] left-1/2 text-[4.382px] text-center text-white top-[107.36px] w-[81.797px]" data-node-id="445:3176">
          <p className="leading-[normal]">We have sent you one time password (OTP)</p>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[10.225px] justify-center leading-[0] left-[calc(50%+0.18px)] text-[0px] text-center text-white top-[168.71px] w-[98.23px]" data-node-id="445:3177">
          <p className="text-[5.112px]">
            <span className="leading-[normal]">Didn’t Receive a OTP ?</span>
            <span className="leading-[normal] text-[#019595]">{` `}</span>
            <span className="[word-break:break-word] font-['Kantumruy_Pro'] font-semibold font-semibold leading-[normal] text-[#019595]">Resend OTP</span>
            <span className="leading-[normal] text-[#019595]">{` `}</span>
          </p>
        </div>
        <div className="-translate-x-1/2 absolute content-stretch flex gap-[6.573px] items-center justify-center left-1/2 top-[123.06px]" data-node-id="445:3178">
          <div className="backdrop-blur-[7.668px] border-[0.365px] border-[rgba(255,255,255,0.1)] border-solid content-stretch flex flex-col items-center justify-center p-[6.573px] relative rounded-[3.652px] shrink-0 w-[23.736px]" data-node-id="445:3179" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 23.736 23.371' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2.3736 2.2935 -2.3293 2.3197 2.1374e-7 0.43602)'><stop stop-color='rgba(0,47,130,1)' offset='0'/><stop stop-color='rgba(0,47,130,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
            <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-medium font-medium h-[10.225px] justify-center leading-[0] relative shrink-0 text-[8.764px] text-center text-white w-full" data-node-id="445:3180">
              <p className="leading-[normal]">7</p>
            </div>
          </div>
          <div className="backdrop-blur-[7.668px] border-[0.365px] border-[rgba(255,255,255,0.1)] border-solid content-stretch flex flex-col items-center justify-center px-[5.112px] py-[6.573px] relative rounded-[3.652px] shrink-0 w-[23.736px]" data-node-id="445:3181" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 23.736 23.371' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2.3736 2.2935 -2.3293 2.3197 2.1374e-7 0.43602)'><stop stop-color='rgba(0,47,130,1)' offset='0'/><stop stop-color='rgba(0,47,130,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
            <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-medium font-medium h-[10.225px] justify-center leading-[0] relative shrink-0 text-[8.764px] text-center text-white w-full" data-node-id="445:3182">
              <p className="leading-[normal]">4</p>
            </div>
          </div>
          <div className="backdrop-blur-[7.668px] border-[0.365px] border-[rgba(255,255,255,0.1)] border-solid relative rounded-[3.652px] shrink-0 size-[23.736px]" data-node-id="445:3183" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 23.736 23.736' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2.3736 2.3293 -2.3293 2.3559 2.1374e-7 0.44283)'><stop stop-color='rgba(217,217,217,0.4)' offset='0'/><stop stop-color='rgba(115,115,115,0)' offset='1'/></radialGradient></defs></svg>\")" }} />
          <div className="backdrop-blur-[7.668px] border-[0.365px] border-[rgba(255,255,255,0.1)] border-solid relative rounded-[3.652px] shrink-0 size-[23.736px]" data-node-id="445:3184" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 23.736 23.736' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2.3736 2.3293 -2.3293 2.3559 2.1374e-7 0.44283)'><stop stop-color='rgba(217,217,217,0.4)' offset='0'/><stop stop-color='rgba(115,115,115,0)' offset='1'/></radialGradient></defs></svg>\")" }} />
        </div>
        <div className="-translate-x-1/2 absolute bottom-[5.84px] h-0 left-1/2 w-[52.584px]" data-node-id="445:3185">
          <div className="absolute inset-[-1.83px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={r1_imgLine2} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute backdrop-blur-[7.668px] border-[#002f82] border-[0.365px] border-solid content-stretch flex h-[18.258px] items-center justify-center left-[calc(50%+0.18px)] px-[13.511px] py-[4.017px] rounded-[3.652px] top-[265.84px] w-[66.095px]" data-node-id="445:3186" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 66.095 18.258' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(6.6095 1.7918 -6.4862 1.8122 5.9518e-7 0.34064)'><stop stop-color='rgba(0,54,148,0.7)' offset='0'/><stop stop-color='rgba(0,25,79,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
          <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal justify-center leading-[0] relative shrink-0 text-[5.477px] text-center text-white whitespace-nowrap" data-node-id="445:3187">
            <p className="leading-[normal]">Next</p>
          </div>
        </div>
      </div>
      <div className="bg-black h-[308.2px] overflow-clip relative shrink-0 w-[142.415px] rounded-[16px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3197" data-name="iPhone 13 & 14 - 29">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[308.2px] left-1/2 top-1/2 w-[142.415px]" data-node-id="445:3198">
          <div className="absolute inset-0 opacity-70 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[103.91%] left-[-13.25%] max-w-none top-[-3.91%] w-[126.49%]" src={r1_imgRectangle1} />
          </div>
        </div>
        <div className="absolute content-stretch flex h-[20.084px] items-start justify-between left-0 top-0 w-[142.415px]" data-node-id="445:3199" data-name="iOS status bar">
          <div className="h-[19.719px] relative shrink-0 w-[51.306px]" data-node-id="I445:3199;1:14623" data-name="Time">
            <p className="[word-break:break-word] absolute font-['SF_Pro'] font-semibold font-[590] inset-[33.96%_37.71%_20.4%_35.01%] leading-[8.034px] text-[6.208px] text-center text-white whitespace-nowrap" data-node-id="I445:3199;1:14624" style={{ fontVariationSettings: '"wdth" 100' }}>
              9:41
            </p>
          </div>
          <div className="h-[19.719px] relative shrink-0 w-[51.306px]" data-node-id="I445:3199;1:14625" data-name="Levels">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgLevels} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute bottom-[5.84px] h-0 left-1/2 w-[52.584px]" data-node-id="445:3200">
          <div className="absolute inset-[-1.83px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={r1_imgLine2} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-center justify-center left-1/2 top-[51.12px] w-[102.247px]" data-node-id="445:3201">
          <div className="h-[48.932px] relative shrink-0 w-[50.223px]" data-node-id="445:3202" data-name="WhatsApp_Image_2026-02-24_at_5_21_57_PM-Picsart-AiImageEnhancer-removebg-preview 1">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={r1_imgWhatsAppImage20260224At52157PmPicsartAiImageEnhancerRemovebgPreview1} />
          </div>
        </div>
        <div className="absolute content-stretch flex flex-col gap-[28.118px] items-center justify-center left-[20.08px] top-[120.5px] w-[102.247px]" data-node-id="445:3203">
          <div className="[word-break:break-word] content-stretch flex flex-col font-['Kantumruy_Pro'] font-normal font-normal gap-[5.477px] items-center justify-center leading-[0] relative shrink-0 text-center text-white w-full" data-node-id="445:3204">
            <div className="flex flex-col h-[10.225px] justify-center relative shrink-0 text-[7.303px] w-full" data-node-id="445:3205">
              <p className="leading-[normal]">Link your Facebook</p>
            </div>
            <div className="flex flex-col h-[20.449px] justify-center relative shrink-0 text-[5.112px] w-full" data-node-id="445:3206">
              <p className="leading-[7.303px]">Connect your Facebook to verify your account</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[10.955px] items-center justify-center relative shrink-0 w-full" data-node-id="445:3207">
            <div className="relative shrink-0 size-[25.562px]" data-node-id="445:3208" data-name="vuesax/bold/facebook">
              <div className="absolute contents inset-0" data-node-id="I445:3208;445:2649" data-name="vuesax/bold/facebook">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgVuesaxBoldFacebook} />
              </div>
            </div>
            <div className="backdrop-blur-[7.668px] border-[#002f82] border-[0.365px] border-solid content-stretch flex h-[20.449px] items-center justify-center px-[13.511px] py-[4.017px] relative rounded-[3.652px] shrink-0 w-full" data-node-id="445:3209" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 102.25 20.449' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(10.225 2.0068 -10.034 2.0297 9.2072e-7 0.38152)'><stop stop-color='rgba(0,54,148,0.7)' offset='0'/><stop stop-color='rgba(0,25,79,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
              <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal justify-center leading-[0] relative shrink-0 text-[5.477px] text-center text-white w-[60.618px]" data-node-id="445:3210">
                <p className="leading-[normal]">Link your Facebook</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black h-[308.2px] overflow-clip relative shrink-0 w-[142.415px] rounded-[16px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3225" data-name="iPhone 13 & 14 - 30">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[308.2px] left-1/2 top-1/2 w-[142.415px]" data-node-id="445:3226">
          <div className="absolute inset-0 opacity-70 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[103.91%] left-[-13.25%] max-w-none top-[-3.91%] w-[126.49%]" src={r1_imgRectangle1} />
          </div>
        </div>
        <div className="absolute content-stretch flex h-[20.084px] items-start justify-between left-0 top-0 w-[142.415px]" data-node-id="445:3227" data-name="iOS status bar">
          <div className="h-[19.719px] relative shrink-0 w-[51.306px]" data-node-id="I445:3227;1:14623" data-name="Time">
            <p className="[word-break:break-word] absolute font-['SF_Pro'] font-semibold font-[590] inset-[33.96%_37.71%_20.4%_35.01%] leading-[8.034px] text-[6.208px] text-center text-white whitespace-nowrap" data-node-id="I445:3227;1:14624" style={{ fontVariationSettings: '"wdth" 100' }}>
              9:41
            </p>
          </div>
          <div className="h-[19.719px] relative shrink-0 w-[51.306px]" data-node-id="I445:3227;1:14625" data-name="Levels">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgLevels} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute bottom-[5.84px] h-0 left-1/2 w-[52.584px]" data-node-id="445:3228">
          <div className="absolute inset-[-1.83px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={r1_imgLine2} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute content-stretch flex gap-[9.859px] items-center left-[calc(50%-10.04px)] top-[30.67px]" data-node-id="445:3229">
          <div className="relative shrink-0 size-[10.225px]" data-node-id="445:3230">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgFrame1} />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[10.225px] justify-center leading-[0] relative shrink-0 text-[7.303px] text-center text-white w-[81.797px]" data-node-id="445:3232">
            <p className="leading-[14.607px]">{`Face Recognition `}</p>
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[10.225px] justify-center leading-[0] left-1/2 text-[5.112px] text-center text-white top-[56.24px] w-[102.247px]" data-node-id="445:3233">
          <p className="leading-[9.129px]">Scan your face to verify your identity</p>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-1/2 top-[calc(50%-17.16px)]" data-node-id="445:3234">
          <div className="absolute inset-[23.22%_10.51%_69.74%_73.02%]" data-node-id="445:3235" data-name="Vector">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgVector} />
          </div>
          <div className="absolute flex inset-[23.22%_73.02%_69.74%_10.51%] items-center justify-center" data-node-id="445:3236" style={{ containerType: "size" }}>
            <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
              <div className="relative size-full" data-name="Vector">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgVector1} />
              </div>
            </div>
          </div>
          <div className="absolute flex inset-[58.6%_10.51%_34.36%_73.02%] items-center justify-center" data-node-id="445:3237" style={{ containerType: "size" }}>
            <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
              <div className="relative size-full" data-name="Vector">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgVector} />
              </div>
            </div>
          </div>
          <div className="absolute flex inset-[58.6%_73.02%_34.36%_10.51%] items-center justify-center" data-node-id="445:3238" style={{ containerType: "size" }}>
            <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
              <div className="relative size-full" data-name="Vector">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgVector1} />
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[31.404px] left-1/2 top-[calc(50%-16.43px)] w-[32.135px]" data-node-id="445:3239" data-name="iOS Face ID - Animation">
            <div className="absolute h-[23.299px] left-[4.87px] top-[4.46px] w-[23.127px]" data-node-id="I445:3239;35:196" data-name="ring-1">
              <div className="absolute inset-[-2.61%_-2.63%]">
                <img alt="" className="block max-w-none size-full" src={r1_imgRing1} />
              </div>
            </div>
            <div className="absolute h-[10.279px] left-[11.55px] top-[12.45px] w-[9.936px]" data-node-id="I445:3239;35:201" data-name="face">
              <div className="absolute inset-[-5.92%_-6.13%_0_-6.13%]">
                <img alt="" className="block max-w-none size-full" src={r1_imgFace} />
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute backdrop-blur-[7.668px] border-[#002f82] border-[0.365px] border-solid content-stretch flex h-[20.449px] items-center justify-center left-1/2 px-[13.511px] py-[4.017px] rounded-[3.652px] top-[224.94px] w-[102.247px]" data-node-id="445:3240" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 102.25 20.449' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(10.225 2.0068 -10.034 2.0297 9.2072e-7 0.38152)'><stop stop-color='rgba(0,54,148,0.7)' offset='0'/><stop stop-color='rgba(0,25,79,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
          <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal justify-center leading-[0] relative shrink-0 text-[5.477px] text-center text-white w-[60.618px]" data-node-id="445:3241">
            <p className="leading-[normal]">Start Scan</p>
          </div>
        </div>
      </div>
      <div className="bg-black h-[308.2px] overflow-clip relative shrink-0 w-[142.415px] rounded-[16px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3262" data-name="iPhone 13 & 14 - 31">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[308.2px] left-1/2 top-1/2 w-[142.415px]" data-node-id="445:3263">
          <div className="absolute inset-0 opacity-70 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[103.91%] left-[-13.25%] max-w-none top-[-3.91%] w-[126.49%]" src={r1_imgRectangle1} />
          </div>
        </div>
        <div className="absolute content-stretch flex h-[20.084px] items-start justify-between left-0 top-0 w-[142.415px]" data-node-id="445:3264" data-name="iOS status bar">
          <div className="h-[19.719px] relative shrink-0 w-[51.306px]" data-node-id="I445:3264;1:14623" data-name="Time">
            <p className="[word-break:break-word] absolute font-['SF_Pro'] font-semibold font-[590] inset-[33.96%_37.71%_20.4%_35.01%] leading-[8.034px] text-[6.208px] text-center text-white whitespace-nowrap" data-node-id="I445:3264;1:14624" style={{ fontVariationSettings: '"wdth" 100' }}>
              9:41
            </p>
          </div>
          <div className="h-[19.719px] relative shrink-0 w-[51.306px]" data-node-id="I445:3264;1:14625" data-name="Levels">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgLevels} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute bottom-[5.84px] h-0 left-1/2 w-[52.584px]" data-node-id="445:3265">
          <div className="absolute inset-[-1.83px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={r1_imgLine2} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute content-stretch flex items-center left-1/2 top-[30.67px]" data-node-id="445:3266">
          <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[10.225px] justify-center leading-[0] relative shrink-0 text-[7.303px] text-center text-white w-[81.797px]" data-node-id="445:3267">
            <p className="leading-[14.607px]">{`Face Recognition `}</p>
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[10.225px] justify-center leading-[0] left-1/2 text-[5.112px] text-center text-white top-[56.24px] w-[102.247px]" data-node-id="445:3268">
          <p className="leading-[9.129px]">Scan your face to verify your identity</p>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-1/2 top-[calc(50%-16.8px)]" data-node-id="445:3269">
          <div className="absolute inset-[23.34%_10.51%_69.62%_73.02%]" data-node-id="445:3270" data-name="Vector">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgVector2} />
          </div>
          <div className="absolute flex inset-[23.34%_73.02%_69.62%_10.51%] items-center justify-center" data-node-id="445:3271" style={{ containerType: "size" }}>
            <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
              <div className="relative size-full" data-name="Vector">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgVector3} />
              </div>
            </div>
          </div>
          <div className="absolute flex inset-[58.72%_10.51%_34.24%_73.02%] items-center justify-center" data-node-id="445:3272" style={{ containerType: "size" }}>
            <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
              <div className="relative size-full" data-name="Vector">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgVector2} />
              </div>
            </div>
          </div>
          <div className="absolute flex inset-[58.72%_73.02%_34.24%_10.51%] items-center justify-center" data-node-id="445:3273" style={{ containerType: "size" }}>
            <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
              <div className="relative size-full" data-name="Vector">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={r1_imgVector3} />
              </div>
            </div>
          </div>
          <div className="absolute bg-gradient-to-b from-[28.063%] from-[rgba(217,217,217,0)] h-[103.342px] left-[29.94px] to-[#7b0292] top-[85.81px] w-[82.162px]" data-node-id="445:3274" />
          <div className="absolute h-[103.342px] left-[29.94px] rounded-[2.921px] top-[85.81px] w-[82.528px]" data-node-id="445:3275" data-name="Avatar Image">
            <img alt="" className="absolute inset-0 max-w-none object-cover opacity-60 pointer-events-none rounded-[2.921px] size-full" src={r1_imgAvatarImage} />
          </div>
          {/* Biometric Laser Scan Line (Rigid horizontal center, smooth vertical scan) */}
          <div className="absolute bottom-[165.41px] left-1/2 -translate-x-1/2 w-[98.596px] h-0 flex items-center justify-center pointer-events-none z-10" data-node-id="445:3276">
            <div className="w-full h-0 relative animate-laser-scan">
              <div className="h-0 relative w-[98.596px]">
                <div className="absolute inset-[-1.83px_0_0_0]">
                  <img alt="" className="block max-w-none size-full drop-shadow-[0_0_8px_rgba(1,149,149,0.95)]" src={r1_imgLine3} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Loader Capsule (Exact Figma Frame 153, node 445:3277) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[220.56px] w-[122px] h-[7px] rounded-full border border-white/40 bg-black/40 p-[1px] flex items-center overflow-hidden" data-node-id="445:3277">
          <div className="bg-[#019595] h-full w-[48.8%] rounded-full shadow-[0_0_4px_rgba(1,149,149,0.5)]" data-node-id="445:3278" />
        </div>
      </div>
    </div>
  );
}

// ─── Row 2 Implementation (5 iPhone Screens) ───
function Row2Screens() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative size-full" data-node-id="445:3515">
      <div className="h-[362.881px] overflow-clip relative shrink-0 w-[167.682px] rounded-[20px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3293" data-name="iPhone 13 & 14 - 26">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-black inset-0" />
          <div className="absolute inset-0 opacity-70 overflow-hidden">
            <img alt="" className="absolute h-[103.91%] left-[-13.25%] max-w-none top-[-3.91%] w-[126.49%]" src={r2_imgIPhone131426} />
          </div>
        </div>
        <div className="absolute content-stretch flex h-[23.647px] items-start justify-between left-0 top-0 w-[167.682px]" data-node-id="445:3295" data-name="iOS status bar">
          <div className="h-[23.218px] relative shrink-0 w-[60.409px]" data-node-id="I445:3295;1:14623" data-name="Time">
            <p className="[word-break:break-word] absolute font-['SF_Pro'] font-semibold font-[590] inset-[33.96%_38.21%_22.97%_35.3%] leading-[9.459px] text-[7.309px] text-center text-white whitespace-nowrap" data-node-id="I445:3295;1:14624" style={{ fontVariationSettings: '"wdth" 100' }}>
              9:41
            </p>
          </div>
          <div className="h-[23.218px] relative shrink-0 w-[60.409px]" data-node-id="I445:3295;1:14625" data-name="Levels">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgLevels} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute content-stretch flex items-center left-1/2 top-[36.12px]" data-node-id="445:3296">
          <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[12.039px] justify-center leading-[0] relative shrink-0 text-[8.599px] text-center text-white w-[96.31px]" data-node-id="445:3297">
            <p className="leading-[normal]">Profile</p>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute bottom-[6.88px] h-0 left-1/2 w-[61.913px]" data-node-id="445:3298">
          <div className="absolute inset-[-2.15px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={r2_imgLine2} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute backdrop-blur-[9.029px] border-[0.43px] border-[rgba(255,255,255,0.1)] border-solid left-1/2 rounded-[42.995px] size-[36.116px] top-[65.78px]" data-node-id="445:3299" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 36.116 36.116' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(3.6116 3.5442 -3.5442 3.5847 3.2522e-7 0.67381)'><stop stop-color='rgba(217,217,217,0.4)' offset='0'/><stop stop-color='rgba(115,115,115,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[10.319px] top-1/2" data-node-id="445:3300" data-name="Person">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgPerson} />
          </div>
          <div className="absolute backdrop-blur-[9.029px] border-[0.43px] border-[rgba(255,255,255,0.1)] border-solid content-stretch flex flex-col items-center justify-center left-[22.79px] p-[7.739px] rounded-[128.986px] size-[15.908px] top-[21.93px]" data-node-id="445:3301" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 15.908 15.908' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(1.5908 1.5611 -1.5611 1.579 1.4325e-7 0.2968)'><stop stop-color='rgba(0,47,130,1)' offset='0'/><stop stop-color='rgba(0,47,130,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
            <div className="relative shrink-0 size-[7.739px]" data-node-id="445:3302" data-name="Edit">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgEdit} />
            </div>
          </div>
        </div>
        <div className="absolute content-stretch flex flex-col h-[192.619px] items-start left-[12.04px] top-[108.35px] w-[144.465px]" data-node-id="445:3303">
          <div className="h-[126.836px] mb-[-29.667px] relative shrink-0 w-full" data-node-id="445:3304">
            <div className="absolute content-stretch flex flex-col gap-[2.15px] items-start justify-center left-0 top-0 w-[144.465px]" data-node-id="445:3305">
              <div className="[word-break:break-word] content-stretch flex font-['Kantumruy_Pro'] font-normal font-normal gap-[8.169px] items-center leading-[0] relative shrink-0 text-[6.449px] text-white w-[144.035px]" data-node-id="445:3306">
                <div className="flex flex-col h-[12.039px] justify-center relative shrink-0 w-[78.252px]" data-node-id="445:3307">
                  <p className="leading-[normal]">First Name</p>
                </div>
                <div className="flex flex-col h-[12.039px] justify-center relative shrink-0 w-[57.614px]" data-node-id="445:3308">
                  <p className="leading-[normal]">Last Name</p>
                </div>
              </div>
              <div className="content-stretch flex gap-[7.145px] items-center relative shrink-0 w-[144.035px]" data-node-id="445:3309">
                <div className="backdrop-blur-[7.897px] border-[0.376px] border-[rgba(255,255,255,0.1)] border-solid h-[19.556px] relative rounded-[3.761px] shrink-0 w-[68.445px]" data-node-id="445:3310" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 68.445 19.556' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(6.8445 1.9191 -6.7168 1.941 6.1634e-7 0.36484)'><stop stop-color='rgba(217,217,217,0.4)' offset='0'/><stop stop-color='rgba(115,115,115,0)' offset='1'/></radialGradient></defs></svg>\")" }} />
                <div className="backdrop-blur-[7.897px] border-[0.376px] border-[rgba(255,255,255,0.1)] border-solid h-[19.556px] relative rounded-[3.761px] shrink-0 w-[68.445px]" data-node-id="445:3311" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 68.445 19.556' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(6.8445 1.9191 -6.7168 1.941 6.1634e-7 0.36484)'><stop stop-color='rgba(217,217,217,0.4)' offset='0'/><stop stop-color='rgba(115,115,115,0)' offset='1'/></radialGradient></defs></svg>\")" }} />
              </div>
              <p className="[word-break:break-word] font-['Kantumruy_Pro'] font-normal font-normal h-[10.749px] leading-[normal] min-w-full relative shrink-0 text-[4.729px] text-[rgba(255,255,255,0.3)] w-[min-content]" data-node-id="445:3312">
                Disclaimer: Your name is used for verification only and will remain private.
              </p>
              <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[12.039px] justify-center leading-[0] min-w-full relative shrink-0 text-[6.449px] text-white w-[min-content]" data-node-id="445:3313">
                <p className="leading-[normal]">Age</p>
              </div>
              <div className="backdrop-blur-[9.029px] border-[0.43px] border-[rgba(255,255,255,0.1)] border-solid h-[19.778px] relative rounded-[4.3px] shrink-0 w-full" data-node-id="445:3314" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 144.46 19.778' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(14.446 1.9409 -14.177 1.9631 0.0000013009 0.36899)'><stop stop-color='rgba(217,217,217,0.4)' offset='0'/><stop stop-color='rgba(115,115,115,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
                <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[9.459px] justify-center leading-[0] left-[135px] text-[5.589px] text-center text-white top-1/2 w-[12.899px]" data-node-id="445:3315">
                  <p className="leading-[normal]">yrs</p>
                </div>
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] font-['Kantumruy_Pro'] font-normal font-normal h-[65.783px] leading-[0] relative shrink-0 text-[4.729px] text-[rgba(255,255,255,0.3)] w-full whitespace-pre-wrap" data-node-id="445:3316">
            <p className="leading-[normal] mb-0">Your profile picture, images, and any visual content will not be displayed, published, or shared anywhere on the platform or outside the platform without your explicit consent.</p>
            <p className="leading-[normal] mb-0">​</p>
            <p className="leading-[normal] mb-0">No content will be made public unless you actively choose to enable visibility.</p>
            <p className="leading-[normal] mb-0">​</p>
            <p className="leading-[normal] mb-0">We are committed to protecting your identity, privacy, and brand integrity at all times.</p>
            <p className="leading-[normal]">I have read and agree to the Privacy Assurance and wish to continue.</p>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute backdrop-blur-[9.029px] border-[#002f82] border-[0.43px] border-solid content-stretch flex h-[20.638px] items-center justify-center left-[calc(50%+0.22px)] px-[15.908px] py-[4.729px] rounded-[4.3px] top-[313.01px] w-[77.822px]" data-node-id="445:3317" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 77.822 20.638' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(7.7822 2.0253 -7.637 2.0484 7.0078e-7 0.38503)'><stop stop-color='rgba(0,54,148,0.7)' offset='0'/><stop stop-color='rgba(0,25,79,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
          <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal justify-center leading-[0] relative shrink-0 text-[6.449px] text-center text-white whitespace-nowrap" data-node-id="445:3318">
            <p className="leading-[normal]">{`Link your Instagram `}</p>
          </div>
        </div>
      </div>
      <div className="h-[362.881px] overflow-clip relative shrink-0 w-[167.682px] rounded-[20px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3330" data-name="iPhone 13 & 14 - 27">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-black inset-0" />
          <div className="absolute inset-0 opacity-70 overflow-hidden">
            <img alt="" className="absolute h-[103.91%] left-[-13.25%] max-w-none top-[-3.91%] w-[126.49%]" src={r2_imgIPhone131426} />
          </div>
        </div>
        <div className="absolute content-stretch flex h-[23.647px] items-start justify-between left-0 top-0 w-[167.682px]" data-node-id="445:3332" data-name="iOS status bar">
          <div className="h-[23.218px] relative shrink-0 w-[60.409px]" data-node-id="I445:3332;1:14623" data-name="Time">
            <p className="[word-break:break-word] absolute font-['SF_Pro'] font-semibold font-[590] inset-[33.96%_38.21%_22.97%_35.3%] leading-[9.459px] text-[7.309px] text-center text-white whitespace-nowrap" data-node-id="I445:3332;1:14624" style={{ fontVariationSettings: '"wdth" 100' }}>
              9:41
            </p>
          </div>
          <div className="h-[23.218px] relative shrink-0 w-[60.409px]" data-node-id="I445:3332;1:14625" data-name="Levels">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgLevels} />
          </div>
        </div>
        <div className="absolute content-stretch flex gap-[11.609px] items-center left-[12.04px] top-[36.12px]" data-node-id="445:3333">
          <div className="relative shrink-0 size-[12.039px]" data-node-id="445:3334">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgFrame1} />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[12.039px] justify-center leading-[0] relative shrink-0 text-[8.599px] text-center text-white w-[96.31px]" data-node-id="445:3336">
            <p className="leading-[normal]">Terms and Conditions</p>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute bottom-[6.88px] h-0 left-1/2 w-[61.913px]" data-node-id="445:3337">
          <div className="absolute inset-[-2.15px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={r2_imgLine2} />
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal justify-center leading-[0] left-[12.04px] size-[144.465px] text-[0px] text-white top-[132.43px]" data-node-id="445:3338">
          <p className="font-['Kantumruy_Pro'] font-medium font-medium leading-[normal] mb-0 text-[5.589px] whitespace-pre-wrap">By proceeding, you acknowledge and agree that:</p>
          <p className="leading-[normal] mb-0 text-[5.589px] whitespace-pre-wrap">​</p>
          <p className="leading-[normal] mb-0 text-[4.729px] whitespace-pre-wrap">​</p>
          <ul className="list-disc mb-0">
            <li className="mb-0 ms-[calc(var(--list-marker-font-size,0)*1.5*1)] whitespace-pre-wrap">
              <span className="leading-[normal] text-[4.729px]">
                Cirqell is a strictly private, voice-first, consent-driven network.
                <br aria-hidden />
                {` `}
              </span>
            </li>
            <li className="ms-[calc(var(--list-marker-font-size,0)*1.5*1)]">
              <span className="leading-[normal] text-[4.729px]">There are no public profiles, searchable exposure, or automatic identity visibility.</span>
            </li>
          </ul>
          <p className="leading-[normal] mb-0 text-[4.729px] whitespace-pre-wrap">​</p>
          <ul className="mb-0">
            <li className="list-disc ms-[calc(var(--list-marker-font-size,0)*1.5*1)] whitespace-pre-wrap">
              <span className="leading-[normal] text-[4.729px]">{`Your name, image, personal information, and participation will   never be displayed or disclosed without your explicit authorization.`}</span>
            </li>
          </ul>
          <p className="leading-[normal] mb-0 text-[4.729px] whitespace-pre-wrap">​</p>
          <ul className="mb-0">
            <li className="list-disc ms-[calc(var(--list-marker-font-size,0)*1.5*1)] whitespace-pre-wrap">
              <span className="leading-[normal] text-[4.729px]">{`Users cannot contact or access you outside the platform’s structured, permission-based system.  `}</span>
            </li>
          </ul>
          <p className="leading-[normal] mb-0 text-[4.729px] whitespace-pre-wrap">​</p>
          <ul className="mb-0">
            <li className="list-disc ms-[calc(var(--list-marker-font-size,0)*1.5*1)]">
              <span className="leading-[normal] text-[4.729px]">All interactions are based on mutual consent and controlled engagement.</span>
            </li>
          </ul>
          <p className="leading-[normal] mb-0 text-[4.729px] whitespace-pre-wrap">​</p>
          <ul className="list-disc">
            <li className="mb-0 ms-[calc(var(--list-marker-font-size,0)*1.5*1)]">
              <span className="leading-[normal] text-[4.729px]">
                All conversations, voice exchanges, and shared materials remain strictly confidential within this secure ecosystem.
                <br aria-hidden />
                <br aria-hidden />
              </span>
            </li>
            <li className="ms-[calc(var(--list-marker-font-size,0)*1.5*1)]">
              <span className="leading-[normal] text-[4.729px]">You agree to maintain professional conduct, respect, and platform integrity at all times.</span>
            </li>
          </ul>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-medium font-medium h-[24.077px] justify-center leading-[0] left-[27.95px] text-[4.729px] text-white top-[228.73px] w-[116.518px]" data-node-id="445:3339">
          <p className="leading-[normal]">I Have Read, Understood, and Agree to Uphold These Terms and Continue</p>
        </div>
        <div className="absolute content-stretch flex items-center justify-center left-[12.04px] px-[1.72px] size-[12.039px] top-[222.72px]" data-node-id="445:3340">
          <div className="backdrop-blur-[9.029px] border-[0.43px] border-[rgba(255,255,255,0.3)] border-solid relative rounded-[42.995px] shrink-0 size-[8.169px]" data-node-id="445:3341" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 8.1691 8.1691' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0.81691 0.80167 -0.80167 0.81083 7.3562e-8 0.15241)'><stop stop-color='rgba(217,217,217,0.4)' offset='0'/><stop stop-color='rgba(115,115,115,0)' offset='1'/></radialGradient></defs></svg>\")" }} />
        </div>
        <div className="-translate-x-1/2 absolute backdrop-blur-[9.029px] border-[0.43px] border-[rgba(115,115,115,0)] border-solid content-stretch flex h-[20.638px] items-center justify-center left-[calc(50%+0.22px)] px-[15.908px] py-[4.729px] rounded-[4.3px] top-[313.01px] w-[77.822px]" data-node-id="445:3342" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 77.822 20.638' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(7.7822 2.0253 -7.637 2.0484 7.0078e-7 0.38503)'><stop stop-color='rgba(115,115,115,0.4)' offset='0'/><stop stop-color='rgba(115,115,115,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
          <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal justify-center leading-[0] relative shrink-0 text-[6.449px] text-[rgba(255,255,255,0.3)] text-center whitespace-nowrap" data-node-id="445:3343">
            <p className="leading-[normal]">Agree and Continue</p>
          </div>
        </div>
      </div>
      <div className="h-[362.881px] overflow-clip relative shrink-0 w-[167.682px] rounded-[20px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3353" data-name="iPhone 13 & 14 - 28">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-black inset-0" />
          <div className="absolute inset-0 opacity-70 overflow-hidden">
            <img alt="" className="absolute h-[103.91%] left-[-13.25%] max-w-none top-[-3.91%] w-[126.49%]" src={r2_imgIPhone131426} />
          </div>
        </div>
        <div className="absolute content-stretch flex h-[23.647px] items-start justify-between left-0 top-0 w-[167.682px]" data-node-id="445:3355" data-name="iOS status bar">
          <div className="h-[23.218px] relative shrink-0 w-[60.409px]" data-node-id="I445:3355;1:14623" data-name="Time">
            <p className="[word-break:break-word] absolute font-['SF_Pro'] font-semibold font-[590] inset-[33.96%_38.21%_22.97%_35.3%] leading-[9.459px] text-[7.309px] text-center text-white whitespace-nowrap" data-node-id="I445:3355;1:14624" style={{ fontVariationSettings: '"wdth" 100' }}>
              9:41
            </p>
          </div>
          <div className="h-[23.218px] relative shrink-0 w-[60.409px]" data-node-id="I445:3355;1:14625" data-name="Levels">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgLevels} />
          </div>
        </div>
        <div className="absolute content-stretch flex gap-[11.609px] items-center left-[12.04px] top-[36.12px]" data-node-id="445:3356">
          <div className="relative shrink-0 size-[12.039px]" data-node-id="445:3357">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgFrame2} />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[12.039px] justify-center leading-[0] relative shrink-0 text-[8.599px] text-center text-white w-[96.31px]" data-node-id="445:3359">
            <p className="leading-[normal]">Terms and Conditions</p>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute bottom-[6.88px] h-0 left-1/2 w-[61.913px]" data-node-id="445:3360">
          <div className="absolute inset-[-2.15px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={r2_imgLine2} />
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal justify-center leading-[0] left-[12.04px] size-[144.465px] text-[0px] text-white top-[132.43px]" data-node-id="445:3361">
          <p className="font-['Kantumruy_Pro'] font-medium font-medium leading-[normal] mb-0 text-[5.589px] whitespace-pre-wrap">By proceeding, you acknowledge and agree that:</p>
          <p className="leading-[normal] mb-0 text-[5.589px] whitespace-pre-wrap">​</p>
          <p className="leading-[normal] mb-0 text-[4.729px] whitespace-pre-wrap">​</p>
          <ul className="list-disc mb-0">
            <li className="mb-0 ms-[calc(var(--list-marker-font-size,0)*1.5*1)] whitespace-pre-wrap">
              <span className="leading-[normal] text-[4.729px]">
                Cirqell is a strictly private, voice-first, consent-driven network.
                <br aria-hidden />
                {` `}
              </span>
            </li>
            <li className="ms-[calc(var(--list-marker-font-size,0)*1.5*1)]">
              <span className="leading-[normal] text-[4.729px]">There are no public profiles, searchable exposure, or automatic identity visibility.</span>
            </li>
          </ul>
          <p className="leading-[normal] mb-0 text-[4.729px] whitespace-pre-wrap">​</p>
          <ul className="mb-0">
            <li className="list-disc ms-[calc(var(--list-marker-font-size,0)*1.5*1)] whitespace-pre-wrap">
              <span className="leading-[normal] text-[4.729px]">{`Your name, image, personal information, and participation will   never be displayed or disclosed without your explicit authorization.`}</span>
            </li>
          </ul>
          <p className="leading-[normal] mb-0 text-[4.729px] whitespace-pre-wrap">​</p>
          <ul className="mb-0">
            <li className="list-disc ms-[calc(var(--list-marker-font-size,0)*1.5*1)] whitespace-pre-wrap">
              <span className="leading-[normal] text-[4.729px]">{`Users cannot contact or access you outside the platform’s structured, permission-based system.  `}</span>
            </li>
          </ul>
          <p className="leading-[normal] mb-0 text-[4.729px] whitespace-pre-wrap">​</p>
          <ul className="mb-0">
            <li className="list-disc ms-[calc(var(--list-marker-font-size,0)*1.5*1)]">
              <span className="leading-[normal] text-[4.729px]">All interactions are based on mutual consent and controlled engagement.</span>
            </li>
          </ul>
          <p className="leading-[normal] mb-0 text-[4.729px] whitespace-pre-wrap">​</p>
          <ul className="list-disc">
            <li className="mb-0 ms-[calc(var(--list-marker-font-size,0)*1.5*1)]">
              <span className="leading-[normal] text-[4.729px]">
                All conversations, voice exchanges, and shared materials remain strictly confidential within this secure ecosystem.
                <br aria-hidden />
                <br aria-hidden />
              </span>
            </li>
            <li className="ms-[calc(var(--list-marker-font-size,0)*1.5*1)]">
              <span className="leading-[normal] text-[4.729px]">You agree to maintain professional conduct, respect, and platform integrity at all times.</span>
            </li>
          </ul>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-medium font-medium h-[24.077px] justify-center leading-[0] left-[27.95px] text-[4.729px] text-white top-[228.73px] w-[116.518px]" data-node-id="445:3362">
          <p className="leading-[normal]">I Have Read, Understood, and Agree to Uphold These Terms and Continue</p>
        </div>
        <div className="absolute content-stretch flex items-center justify-center left-[12.04px] px-[1.72px] size-[12.039px] top-[222.72px]" data-node-id="445:3363">
          <div className="backdrop-blur-[9.029px] bg-[#002f82] border-[#002f82] border-[0.43px] border-solid relative rounded-[42.995px] shrink-0 size-[8.169px]" data-node-id="445:3364" />
        </div>
        <div className="-translate-x-1/2 absolute backdrop-blur-[9.029px] border-[#002f82] border-[0.43px] border-solid content-stretch flex h-[21.498px] items-center justify-center left-[calc(50%+0.21px)] px-[15.908px] py-[4.729px] rounded-[4.3px] top-[313.01px] w-[77.822px]" data-node-id="445:3365" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 77.822 21.498' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(7.7822 2.1097 -7.637 2.1338 7.0078e-7 0.40108)'><stop stop-color='rgba(0,47,130,0.4)' offset='0'/><stop stop-color='rgba(0,48,130,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
          <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal justify-center leading-[0] relative shrink-0 text-[6.449px] text-center text-white whitespace-nowrap" data-node-id="445:3366">
            <p className="leading-[normal]">Agree and Continue</p>
          </div>
        </div>
      </div>
      <div className="h-[362.881px] overflow-clip relative shrink-0 w-[167.682px] rounded-[20px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3376" data-name="iPhone 13 & 14 - 29">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-black inset-0" />
          <div className="absolute inset-0 opacity-70 overflow-hidden">
            <img alt="" className="absolute h-[103.91%] left-[-13.25%] max-w-none top-[-3.91%] w-[126.49%]" src={r2_imgIPhone131426} />
          </div>
        </div>
        <div className="absolute content-stretch flex h-[23.647px] items-start justify-between left-0 top-0 w-[167.682px]" data-node-id="445:3377" data-name="iOS status bar">
          <div className="h-[23.218px] relative shrink-0 w-[60.409px]" data-node-id="I445:3377;1:14623" data-name="Time">
            <p className="[word-break:break-word] absolute font-['SF_Pro'] font-semibold font-[590] inset-[33.96%_38.21%_22.97%_35.3%] leading-[9.459px] text-[7.309px] text-center text-white whitespace-nowrap" data-node-id="I445:3377;1:14624" style={{ fontVariationSettings: '"wdth" 100' }}>
              9:41
            </p>
          </div>
          <div className="h-[23.218px] relative shrink-0 w-[60.409px]" data-node-id="I445:3377;1:14625" data-name="Levels">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgLevels} />
          </div>
        </div>
        <div className="absolute content-stretch flex gap-[11.609px] items-center left-[12.04px] top-[36.12px]" data-node-id="445:3378">
          <div className="relative shrink-0 size-[12.039px]" data-node-id="445:3379">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgFrame3} />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[12.039px] justify-center leading-[0] relative shrink-0 text-[8.599px] text-center text-white w-[96.31px]" data-node-id="445:3381">
            <p className="leading-[normal]">{`Account Setup `}</p>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute bottom-[6.88px] h-0 left-1/2 w-[61.913px]" data-node-id="445:3382">
          <div className="absolute inset-[-2.15px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={r2_imgLine2} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute backdrop-blur-[9.029px] border-[#002f82] border-[0.43px] border-solid content-stretch flex items-center justify-center left-[calc(50%+0.22px)] px-[15.908px] py-[4.729px] rounded-[42.995px] size-[24.507px] top-[264.85px]" data-node-id="445:3383" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 24.507 24.507' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2.4507 2.405 -2.405 2.4325 2.2069e-7 0.45723)'><stop stop-color='rgba(0,47,130,0.4)' offset='0'/><stop stop-color='rgba(0,48,130,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
          <div className="relative shrink-0 size-[11.179px]" data-node-id="445:3384" data-name="Microphone">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgMicrophone} />
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-medium font-medium h-[28.807px] justify-center leading-[0] left-[calc(50%-71.37px)] text-[0px] text-[rgba(255,255,255,0.5)] top-[214.33px] w-[144.035px]" data-node-id="445:3385">
          <p className="font-['Kantumruy_Pro'] font-bold font-bold leading-[normal] mb-0 text-[3.87px]">Before You Record</p>
          <p className="font-['Kantumruy_Pro'] font-normal font-normal leading-[normal] text-[3.87px]">Your voice note may be audible to others. Please avoid sharing any sensitive or private information. Introduce yourself and share your interests briefly. Keep it authentic and appropriate.</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-medium font-medium h-[28.807px] justify-center leading-[0] left-[calc(50%-71.8px)] text-[3.87px] text-[rgba(255,255,255,0.5)] top-[240.13px] w-[144.465px]" data-node-id="445:3386">
          <p>
            <span className="[word-break:break-word] font-['Kantumruy_Pro'] font-bold font-bold leading-[normal]">Demo Voice Note Example</span>
            <span className="leading-[normal]">
              <br aria-hidden />
            </span>
            <span className="[word-break:break-word] font-['Kantumruy_Pro'] font-normal font-normal leading-[normal]">“Hi, I’m XYZ a travel influencer who loves exploring hidden gems and sharing budget-friendly tips. Passionate about food, culture, and connecting with new people. Excited to be here!”</span>
          </p>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-medium font-medium h-[5.159px] justify-center leading-[0] left-1/2 text-[4.729px] text-center text-white top-[295.81px] w-[59.334px]" data-node-id="445:3387">
          <p className="leading-[normal]">Hold to Record Voice Note</p>
        </div>
        <div className="-translate-x-1/2 absolute backdrop-blur-[9.029px] border-[0.43px] border-[rgba(255,255,255,0.1)] border-solid h-[19.778px] left-[calc(50%+0.43px)] rounded-[4.3px] top-[175.42px] w-[144.465px]" data-node-id="445:3388" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 144.46 19.778' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(14.446 1.9409 -14.177 1.9631 0.0000013009 0.36899)'><stop stop-color='rgba(217,217,217,0.4)' offset='0'/><stop stop-color='rgba(115,115,115,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
          <div className="absolute content-stretch flex gap-[2.15px] items-center left-[6.88px] top-[3.44px]" data-node-id="I445:3388;95:389">
            <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[6.449px] justify-center leading-[0] relative shrink-0 text-[4.729px] text-[rgba(255,255,255,0.5)] w-[115.228px]" data-node-id="I445:3388;95:390">
              <p className="leading-[normal]">Select Interest</p>
            </div>
            <div className="flex items-center justify-center relative shrink-0 size-[12.039px]" data-node-id="I445:3388;95:391">
              <div className="-rotate-90 flex-none">
                <button className="block cursor-pointer relative size-[12.039px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgFrame4} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute backdrop-blur-[9.029px] border-[0.43px] border-[rgba(115,115,115,0)] border-solid content-stretch flex h-[20.638px] items-center justify-center left-[calc(50%+0.22px)] px-[15.908px] py-[4.729px] rounded-[4.3px] top-[313.01px] w-[77.822px]" data-node-id="445:3389" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 77.822 20.638' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(7.7822 2.0253 -7.637 2.0484 7.0078e-7 0.38503)'><stop stop-color='rgba(115,115,115,0.4)' offset='0'/><stop stop-color='rgba(115,115,115,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
          <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal justify-center leading-[0] relative shrink-0 text-[6.449px] text-[rgba(255,255,255,0.3)] text-center whitespace-nowrap" data-node-id="445:3390">
            <p className="leading-[normal]">Agree and Continue</p>
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[12.039px] justify-center leading-[0] left-[calc(50%-71.8px)] text-[6.449px] text-white top-[169.4px] w-[144.465px]" data-node-id="445:3391">
          <p className="leading-[normal]">Interest</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[12.039px] justify-center leading-[0] left-[calc(50%-71.8px)] text-[6.449px] text-white top-[135.01px] w-[144.465px]" data-node-id="445:3392">
          <p className="leading-[normal]">Current Mood</p>
        </div>
        <div className="-translate-x-1/2 absolute backdrop-blur-[9.029px] border-[0.43px] border-[rgba(255,255,255,0.1)] border-solid h-[19.778px] left-[calc(50%+0.43px)] rounded-[4.3px] top-[142.31px] w-[144.465px]" data-node-id="445:3393" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 144.46 19.778' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(14.446 1.9409 -14.177 1.9631 0.0000013009 0.36899)'><stop stop-color='rgba(217,217,217,0.4)' offset='0'/><stop stop-color='rgba(115,115,115,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
          <div className="absolute content-stretch flex gap-[2.15px] items-center left-[6.88px] top-[3.44px]" data-node-id="I445:3393;95:308">
            <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[6.449px] justify-center leading-[0] relative shrink-0 text-[4.729px] text-[rgba(255,255,255,0.5)] w-[115.228px]" data-node-id="I445:3393;95:309">
              <p className="leading-[normal]">Select Mood</p>
            </div>
            <div className="flex items-center justify-center relative shrink-0 size-[12.039px]" data-node-id="I445:3393;95:310">
              <div className="-rotate-90 flex-none">
                <button className="block cursor-pointer relative size-[12.039px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgFrame5} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[12.039px] justify-center leading-[0] left-[calc(50%-71.8px)] text-[6.449px] text-white top-[100.61px] w-[144.465px]" data-node-id="445:3394">
          <p className="leading-[normal]">Conversation Intent</p>
        </div>
        <div className="-translate-x-1/2 absolute backdrop-blur-[9.029px] border-[0.43px] border-[rgba(255,255,255,0.1)] border-solid h-[19.778px] left-[calc(50%+0.43px)] rounded-[4.3px] top-[107.92px] w-[144.465px]" data-node-id="445:3395" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 144.46 19.778' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(14.446 1.9409 -14.177 1.9631 0.0000013009 0.36899)'><stop stop-color='rgba(217,217,217,0.4)' offset='0'/><stop stop-color='rgba(115,115,115,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
          <div className="absolute content-stretch flex gap-[2.15px] items-center left-[6.88px] top-[3.44px]" data-node-id="I445:3395;95:259">
            <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[6.449px] justify-center leading-[0] relative shrink-0 text-[4.729px] text-[rgba(255,255,255,0.5)] w-[115.228px]" data-node-id="I445:3395;95:260">
              <p className="leading-[normal]">Select Intent</p>
            </div>
            <div className="flex items-center justify-center relative shrink-0 size-[12.039px]" data-node-id="I445:3395;95:261">
              <div className="-rotate-90 flex-none">
                <button className="block cursor-pointer relative size-[12.039px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgFrame6} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[12.039px] justify-center leading-[0] left-[calc(50%-71.8px)] text-[6.449px] text-white top-[66.21px] w-[144.465px]" data-node-id="445:3396">
          <p className="leading-[normal]">Primary Genre</p>
        </div>
        <div className="-translate-x-1/2 absolute backdrop-blur-[9.029px] border-[0.43px] border-[rgba(255,255,255,0.1)] border-solid h-[19.778px] left-[calc(50%+0.43px)] rounded-[4.3px] top-[73.52px] w-[144.465px]" data-node-id="445:3397" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 144.46 19.778' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(14.446 1.9409 -14.177 1.9631 0.0000013009 0.36899)'><stop stop-color='rgba(217,217,217,0.4)' offset='0'/><stop stop-color='rgba(115,115,115,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
          <div className="absolute content-stretch flex gap-[2.15px] items-center left-[6.88px] top-[3.44px]" data-node-id="I445:3397;95:197">
            <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[6.449px] justify-center leading-[0] relative shrink-0 text-[4.729px] text-[rgba(255,255,255,0.5)] w-[115.228px]" data-node-id="I445:3397;95:198">
              <p className="leading-[normal]">Select Genre</p>
            </div>
            <div className="flex items-center justify-center relative shrink-0 size-[12.039px]" data-node-id="I445:3397;95:199">
              <div className="-rotate-90 flex-none">
                <button className="block cursor-pointer relative size-[12.039px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgFrame7} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[362.881px] overflow-clip relative shrink-0 w-[167.682px] rounded-[20px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3426" data-name="iPhone 13 & 14 - 30">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-black inset-0" />
          <div className="absolute inset-0 opacity-70 overflow-hidden">
            <img alt="" className="absolute h-[103.91%] left-[-13.25%] max-w-none top-[-3.91%] w-[126.49%]" src={r2_imgIPhone131426} />
          </div>
        </div>
        <div className="absolute content-stretch flex h-[23.647px] items-start justify-between left-0 top-0 w-[167.682px]" data-node-id="445:3427" data-name="iOS status bar">
          <div className="h-[23.218px] relative shrink-0 w-[60.409px]" data-node-id="I445:3427;1:14623" data-name="Time">
            <p className="[word-break:break-word] absolute font-['SF_Pro'] font-semibold font-[590] inset-[33.96%_38.21%_22.97%_35.3%] leading-[9.459px] text-[7.309px] text-center text-white whitespace-nowrap" data-node-id="I445:3427;1:14624" style={{ fontVariationSettings: '"wdth" 100' }}>
              9:41
            </p>
          </div>
          <div className="h-[23.218px] relative shrink-0 w-[60.409px]" data-node-id="I445:3427;1:14625" data-name="Levels">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgLevels} />
          </div>
        </div>
        <div className="absolute content-stretch flex gap-[11.609px] items-center left-[12.04px] top-[36.12px]" data-node-id="445:3428">
          <div className="relative shrink-0 size-[12.039px]" data-node-id="445:3429">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgFrame8} />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[12.039px] justify-center leading-[0] relative shrink-0 text-[8.599px] text-center text-white w-[96.31px]" data-node-id="445:3431">
            <p className="leading-[normal]">{`Account Setup `}</p>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute bottom-[6.88px] h-0 left-1/2 w-[61.913px]" data-node-id="445:3432">
          <div className="absolute inset-[-2.15px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={r2_imgLine2} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute backdrop-blur-[9.029px] border-[#019595] border-[0.43px] border-solid content-stretch flex items-center justify-center left-[calc(50%+0.21px)] px-[15.908px] py-[4.729px] rounded-[42.995px] size-[24.507px] top-[264.85px]" data-node-id="445:3433" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 24.507 24.507' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2.4507 2.405 -2.405 2.4325 2.2069e-7 0.45723)'><stop stop-color='rgba(0,47,130,0.8)' offset='0'/><stop stop-color='rgba(0,48,130,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
          <div className="relative shrink-0 size-[11.179px]" data-node-id="445:3434" data-name="Microphone">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgMicrophone1} />
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-medium font-medium h-[28.807px] justify-center leading-[0] left-[calc(50%-71.37px)] text-[0px] text-[rgba(255,255,255,0.5)] top-[214.33px] w-[144.035px]" data-node-id="445:3435">
          <p className="font-['Kantumruy_Pro'] font-bold font-bold leading-[normal] mb-0 text-[3.87px]">Before You Record</p>
          <p className="font-['Kantumruy_Pro'] font-normal font-normal leading-[normal] text-[3.87px]">Your voice note may be audible to others. Please avoid sharing any sensitive or private information. Introduce yourself and share your interests briefly. Keep it authentic and appropriate.</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-medium font-medium h-[28.807px] justify-center leading-[0] left-[calc(50%-71.8px)] text-[3.87px] text-[rgba(255,255,255,0.5)] top-[240.13px] w-[144.465px]" data-node-id="445:3436">
          <p>
            <span className="[word-break:break-word] font-['Kantumruy_Pro'] font-bold font-bold leading-[normal]">Demo Voice Note Example</span>
            <span className="leading-[normal]">
              <br aria-hidden />
            </span>
            <span className="[word-break:break-word] font-['Kantumruy_Pro'] font-normal font-normal leading-[normal]">“Hi, I’m XYZ a travel influencer who loves exploring hidden gems and sharing budget-friendly tips. Passionate about food, culture, and connecting with new people. Excited to be here!”</span>
          </p>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-medium font-medium h-[5.159px] justify-center leading-[0] left-1/2 text-[4.729px] text-center text-white top-[295.81px] w-[59.334px]" data-node-id="445:3437">
          <p className="leading-[normal]">Hold to Record Voice Note</p>
        </div>
        <div className="-translate-x-1/2 absolute backdrop-blur-[9.029px] border-[0.43px] border-[rgba(255,255,255,0.1)] border-solid h-[19.778px] left-[calc(50%+0.43px)] rounded-[4.3px] top-[175.42px] w-[144.465px]" data-node-id="445:3438" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 144.46 19.778' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(14.446 1.9409 -14.177 1.9631 0.0000013009 0.36899)'><stop stop-color='rgba(217,217,217,0.4)' offset='0'/><stop stop-color='rgba(115,115,115,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
          <div className="absolute content-stretch flex gap-[2.15px] items-center left-[6.88px] top-[3.44px]" data-node-id="I445:3438;95:389">
            <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[6.449px] justify-center leading-[0] relative shrink-0 text-[4.729px] text-[rgba(255,255,255,0.5)] w-[115.228px]" data-node-id="I445:3438;95:390">
              <p className="leading-[normal]">Select Interest</p>
            </div>
            <div className="flex items-center justify-center relative shrink-0 size-[12.039px]" data-node-id="I445:3438;95:391">
              <div className="-rotate-90 flex-none">
                <button className="block cursor-pointer relative size-[12.039px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgFrame4} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute content-stretch flex gap-[1.29px] items-center left-[calc(50%+0.21px)] top-[317.31px]" data-node-id="445:3439">
          <div className="bg-[var(--color\/background-\[don\'t-edit\]\/error\/bg-error-solid,#d92d20)] content-stretch flex items-center justify-center overflow-clip p-[4.3px] relative rounded-[17.198px] shrink-0" data-node-id="445:3440" data-name="Button">
            <div className="relative shrink-0 size-[8.599px]" data-node-id="I445:3440;4022:1149" data-name="Fontawesome">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgFontawesome} />
            </div>
          </div>
          <div className="border-[#002f82] border-[0.43px] border-solid content-stretch flex gap-[3.44px] items-center px-[3.44px] py-[1.72px] relative rounded-[17.198px] shrink-0 w-[113.078px]" data-node-id="445:3441" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 113.08 17.198' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(10.512 1.4618 -0.22233 1.5988 5.3744 -5.1659e-7)'><stop stop-color='rgba(0,47,130,0.4)' offset='0'/><stop stop-color='rgba(0,47,130,0)' offset='1'/></radialGradient></defs></svg>\")" }} data-name="Recording">
            <div className="content-stretch flex gap-[1.72px] items-center relative shrink-0" data-node-id="445:3442" data-name="Recording Time">
              <div className="relative shrink-0 size-[3.44px] animate-pulse" data-node-id="445:3443">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgEllipse19} />
              </div>
              <p className="[word-break:break-word] font-['Montserrat'] font-medium font-medium leading-[6.879px] relative shrink-0 text-[5.159px] text-[color:var(--color\/text-\[don\'t-edit\]\/text-primary_on-brand,white)] whitespace-nowrap" data-node-id="445:3444">
                0:01
              </p>
            </div>
            <div className="content-stretch flex gap-[1.72px] h-[13.759px] items-center py-[3.44px] relative shrink-0" data-node-id="445:3445" data-name="Waveform">
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] relative rounded-[0.43px] shrink-0 size-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.15s' }} data-node-id="445:3446" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] relative rounded-[0.43px] shrink-0 size-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.30s' }} data-node-id="445:3447" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[3.44px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.45s' }} data-node-id="445:3448" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[3.44px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.60s' }} data-node-id="445:3449" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[6.019px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.00s' }} data-node-id="445:3450" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[6.019px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.15s' }} data-node-id="445:3451" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[1.72px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.30s' }} data-node-id="445:3452" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[1.72px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.45s' }} data-node-id="445:3453" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[6.879px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.60s' }} data-node-id="445:3454" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[6.879px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.00s' }} data-node-id="445:3455" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[6.019px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.15s' }} data-node-id="445:3456" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[6.019px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.30s' }} data-node-id="445:3457" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[4.3px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.45s' }} data-node-id="445:3458" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[4.3px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.60s' }} data-node-id="445:3459" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[4.3px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.00s' }} data-node-id="445:3460" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[4.3px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.15s' }} data-node-id="445:3461" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[4.3px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.30s' }} data-node-id="445:3462" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[4.3px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.45s' }} data-node-id="445:3463" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[6.019px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.60s' }} data-node-id="445:3464" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[6.019px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.00s' }} data-node-id="445:3465" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[4.3px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.15s' }} data-node-id="445:3466" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[4.3px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.30s' }} data-node-id="445:3467" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[6.879px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.45s' }} data-node-id="445:3468" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[6.879px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.60s' }} data-node-id="445:3469" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[4.3px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.00s' }} data-node-id="445:3470" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[4.3px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.15s' }} data-node-id="445:3471" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[1.72px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.30s' }} data-node-id="445:3472" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] h-[1.72px] relative rounded-[0.43px] shrink-0 w-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.45s' }} data-node-id="445:3473" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] relative rounded-[0.43px] shrink-0 size-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.60s' }} data-node-id="445:3474" />
              <div className="bg-[var(--color\/base-color-\[edit-here\]\/base\/white,white)] relative rounded-[0.43px] shrink-0 size-[0.86px] animate-waveform-pulse" style={{ animationDelay: '0.00s' }} data-node-id="445:3475" />
            </div>
          </div>
          <div className="bg-[#002f82] content-stretch flex items-center justify-center overflow-clip p-[4.3px] relative rounded-[17.198px] shrink-0" data-node-id="445:3476" data-name="Button">
            <div className="relative shrink-0 size-[8.599px]" data-node-id="I445:3476;4022:1149" data-name="Fontawesome">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgFontawesome1} />
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal justify-center leading-[0] left-[82.03px] text-[6.449px] text-[rgba(255,255,255,0.3)] text-center top-[310.99px] whitespace-nowrap" data-node-id="445:3477">
          <p className="leading-[normal] whitespace-pre">{`<  Slide to cancel`}</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[12.039px] justify-center leading-[0] left-[calc(50%-71.8px)] text-[6.449px] text-white top-[169.4px] w-[144.465px]" data-node-id="445:3478">
          <p className="leading-[normal]">Interest</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[12.039px] justify-center leading-[0] left-[calc(50%-71.8px)] text-[6.449px] text-white top-[135.01px] w-[144.465px]" data-node-id="445:3479">
          <p className="leading-[normal]">Current Mood</p>
        </div>
        <div className="-translate-x-1/2 absolute backdrop-blur-[9.029px] border-[0.43px] border-[rgba(255,255,255,0.1)] border-solid h-[19.778px] left-[calc(50%+0.43px)] rounded-[4.3px] top-[142.31px] w-[144.465px]" data-node-id="445:3480" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 144.46 19.778' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(14.446 1.9409 -14.177 1.9631 0.0000013009 0.36899)'><stop stop-color='rgba(217,217,217,0.4)' offset='0'/><stop stop-color='rgba(115,115,115,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
          <div className="absolute content-stretch flex gap-[2.15px] items-center left-[6.88px] top-[3.44px]" data-node-id="I445:3480;95:308">
            <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[6.449px] justify-center leading-[0] relative shrink-0 text-[4.729px] text-[rgba(255,255,255,0.5)] w-[115.228px]" data-node-id="I445:3480;95:309">
              <p className="leading-[normal]">Select Mood</p>
            </div>
            <div className="flex items-center justify-center relative shrink-0 size-[12.039px]" data-node-id="I445:3480;95:310">
              <div className="-rotate-90 flex-none">
                <button className="block cursor-pointer relative size-[12.039px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgFrame5} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[12.039px] justify-center leading-[0] left-[calc(50%-71.8px)] text-[6.449px] text-white top-[100.61px] w-[144.465px]" data-node-id="445:3481">
          <p className="leading-[normal]">Conversation Intent</p>
        </div>
        <div className="-translate-x-1/2 absolute backdrop-blur-[9.029px] border-[0.43px] border-[rgba(255,255,255,0.1)] border-solid h-[19.778px] left-[calc(50%+0.43px)] rounded-[4.3px] top-[107.92px] w-[144.465px]" data-node-id="445:3482" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 144.46 19.778' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(14.446 1.9409 -14.177 1.9631 0.0000013009 0.36899)'><stop stop-color='rgba(217,217,217,0.4)' offset='0'/><stop stop-color='rgba(115,115,115,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
          <div className="absolute content-stretch flex gap-[2.15px] items-center left-[6.88px] top-[3.44px]" data-node-id="I445:3482;95:259">
            <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[6.449px] justify-center leading-[0] relative shrink-0 text-[4.729px] text-[rgba(255,255,255,0.5)] w-[115.228px]" data-node-id="I445:3482;95:260">
              <p className="leading-[normal]">Select Intent</p>
            </div>
            <div className="flex items-center justify-center relative shrink-0 size-[12.039px]" data-node-id="I445:3482;95:261">
              <div className="-rotate-90 flex-none">
                <button className="block cursor-pointer relative size-[12.039px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgFrame6} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[12.039px] justify-center leading-[0] left-[calc(50%-71.8px)] text-[6.449px] text-white top-[66.21px] w-[144.465px]" data-node-id="445:3483">
          <p className="leading-[normal]">Primary Genre</p>
        </div>
        <div className="-translate-x-1/2 absolute backdrop-blur-[9.029px] border-[0.43px] border-[rgba(255,255,255,0.1)] border-solid h-[19.778px] left-[calc(50%+0.43px)] rounded-[4.3px] top-[73.52px] w-[144.465px]" data-node-id="445:3484" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 144.46 19.778' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(14.446 1.9409 -14.177 1.9631 0.0000013009 0.36899)'><stop stop-color='rgba(217,217,217,0.4)' offset='0'/><stop stop-color='rgba(115,115,115,0)' offset='1'/></radialGradient></defs></svg>\")" }}>
          <div className="absolute content-stretch flex gap-[2.15px] items-center left-[6.88px] top-[3.44px]" data-node-id="I445:3484;95:197">
            <div className="[word-break:break-word] flex flex-col font-['Kantumruy_Pro'] font-normal font-normal h-[6.449px] justify-center leading-[0] relative shrink-0 text-[4.729px] text-[rgba(255,255,255,0.5)] w-[115.228px]" data-node-id="I445:3484;95:198">
              <p className="leading-[normal]">Select Genre</p>
            </div>
            <div className="flex items-center justify-center relative shrink-0 size-[12.039px]" data-node-id="I445:3484;95:199">
              <div className="-rotate-90 flex-none">
                <button className="block cursor-pointer relative size-[12.039px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={r2_imgFrame7} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CirqellHiFiScreens() {
  return (
    <div className="w-full flex flex-col items-center gap-[45px] overflow-x-auto xl:overflow-x-visible py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="w-[935px] shrink-0 flex flex-col items-center gap-[45px]">
        {/* Row 1: 6 iPhone Screens */}
        <div className="w-full flex items-center justify-center">
          <Row1Screens />
        </div>
        {/* Row 2: 5 iPhone Screens */}
        <div className="w-full flex items-center justify-center">
          <Row2Screens />
        </div>
      </div>
    </div>
  );
}
