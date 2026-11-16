import type { Metadata } from "next";
import { Architects_Daughter, Noto_Sans_Devanagari, Noto_Sans_JP, Kantumruy_Pro, Montserrat } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import SplashScreen from "@/components/SplashScreen";

const architectsDaughter = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-architects",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  weight: "400",
  subsets: ["devanagari"],
  display: "swap",
  variable: "--font-devanagari",
});

const notoSansJP = Noto_Sans_JP({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-japanese",
});

const kantumruyPro = Kantumruy_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kantumruy",
});

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Kanak | Portfolio",
  description: "Product Designer & UI/UX Designer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${architectsDaughter.variable} ${notoSansDevanagari.variable} ${notoSansJP.variable} ${kantumruyPro.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Instant Session Check before First Paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var path=window.location.pathname;var isSubpage=path!=='/'&&path!=='';var q=window.location.search;var force=q.indexOf('splash=1')!==-1;var seen=sessionStorage.getItem('visited_session');if(isSubpage||(!force&&seen)){document.documentElement.classList.add('splash-skip');}else{document.documentElement.classList.add('splash-pending');}}catch(e){document.documentElement.classList.add('splash-skip');}})();`,
          }}
        />
        <noscript>
          <style>{`#splash-screen { display: none !important; } html.splash-pending, html.splash-pending body { overflow: auto !important; }`}</style>
        </noscript>
        {/* Preload Critical Assets */}
        <link rel="preload" as="image" href="/assets/logo-nav-vectorized.svg" />
        <link rel="preload" as="image" href="/assets/des-ida-gner1.png" />
      </head>
      <body className="antialiased relative min-h-screen">
        {/* Fixed background layer: stays static on dedicated GPU compositing layer to prevent repaints */}
        <div
          className="fixed inset-0 -z-10 pointer-events-none bg-white will-change-transform"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.22) 1.2px, transparent 1.2px)",
            backgroundSize: "25px 25px",
            backgroundPosition: "calc(50% + 4px) 18px",
            transform: "translateZ(0)",
          }}
          aria-hidden="true"
        />
        {/* Splash Screen Component */}
        <SplashScreen />
        <div id="hero-reveal-wrapper" suppressHydrationWarning className="w-full">
          <div id="main-page-content" suppressHydrationWarning className="w-full">
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
          </div>
        </div>
        <CustomCursor />
      </body>
    </html>
  );
}
