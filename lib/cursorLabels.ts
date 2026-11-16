/**
 * lib/cursorLabels.ts
 *
 * Central dictionary for all custom cursor badge labels.
 * Voice: Kanak's (warm, confident, a bit playful, short; maximum ~4 words, <= 28 characters,
 * no emoji, no all caps, no full stops; names what it is or what happens on click).
 */

export const CURSOR_LABELS: Record<string, string | ((el: HTMLElement) => string)> = {
  // ─── Global Navigation ────────────────────────────────────────────────────────
  "nav-logo": "Take me home",
  "nav-work": "See my best work",
  "nav-resume": "My story in one page",
  "nav-about": "Meet the human",
  "nav-contact": "Say hello",
  "nav-linkedin": (el: HTMLElement) => {
    const isHeld =
      el.getAttribute("data-state") === "held" ||
      el.getAttribute("data-holding") === "true" ||
      (typeof document !== "undefined" &&
        (document.documentElement.hasAttribute("data-nav-holding-linkedIn") ||
          document.documentElement.hasAttribute("data-nav-holding-linkedin") ||
          document.documentElement.hasAttribute("data-nav-holding")));
    return isHeld ? "Wheee!" : "Swing me, or say hi";
  },
  "nav-behance": (el: HTMLElement) => {
    const isHeld =
      el.getAttribute("data-state") === "held" ||
      el.getAttribute("data-holding") === "true" ||
      (typeof document !== "undefined" &&
        (document.documentElement.hasAttribute("data-nav-holding-behance") ||
          document.documentElement.hasAttribute("data-nav-holding")));
    return isHeld ? "Wheee!" : "Swing me, or see my work";
  },

  // ─── Home Hero Section ────────────────────────────────────────────────────────
  "hero-portrait": (el: HTMLElement) => {
    const state = el.getAttribute("data-state");
    return state === "real" ? "Plot twist: it's me" : "Let's talk design";
  },
  "hero-badge-uiux": "Yes, that's me",
  "hero-badge-product": "Form meets function",
  "hero-badge-status": "Ready for new ideas",
  "hero-stamp": "Creating from Jaipur",
  "hero-pen": "Pixels and prototypes",

  // ─── Home Projects Section ────────────────────────────────────────────────────
  "project-cirqell": "Peek inside Cirqell",
  "project-influcrush": "Peek inside InfluCrush",
  "project-ecommerce": "Open the case study",
  "projects-heading": "Curated work",

  // ─── Home Process Section ─────────────────────────────────────────────────────
  "process-card": "How I think",
  "process-card-1": "Deep dive research",
  "process-card-2": "Connecting the dots",
  "process-card-3": "Crafting every pixel",
  "process-card-4": "Polishing the flow",

  // ─── Home Design Companions (Tools) Section ───────────────────────────────────
  "tool-figma": () =>
    typeof document !== "undefined" && document.documentElement.hasAttribute("data-physics-dragging")
      ? "Got you!"
      : "Where pixels are born",
  "tool-claude": () =>
    typeof document !== "undefined" && document.documentElement.hasAttribute("data-physics-dragging")
      ? "Got you!"
      : "Vibe coding partner",
  "tool-openai": () =>
    typeof document !== "undefined" && document.documentElement.hasAttribute("data-physics-dragging")
      ? "Got you!"
      : "Endless exploration",
  "tool-gemini": () =>
    typeof document !== "undefined" && document.documentElement.hasAttribute("data-physics-dragging")
      ? "Got you!"
      : "Visual spark partner",
  "tool-framer": () =>
    typeof document !== "undefined" && document.documentElement.hasAttribute("data-physics-dragging")
      ? "Got you!"
      : "Interactions that live",
  "tool-rive": () =>
    typeof document !== "undefined" && document.documentElement.hasAttribute("data-physics-dragging")
      ? "Got you!"
      : "Ideas that move",
  "tool-miro": () =>
    typeof document !== "undefined" && document.documentElement.hasAttribute("data-physics-dragging")
      ? "Got you!"
      : "Sticky notes, endless",
  "tool-spotify": () =>
    typeof document !== "undefined" && document.documentElement.hasAttribute("data-physics-dragging")
      ? "Got you!"
      : "Soundtrack for focus",
  "tool-companion": () =>
    typeof document !== "undefined" && document.documentElement.hasAttribute("data-physics-dragging")
      ? "Got you!"
      : "Grab me, toss me around",
  "tool-heading": "Tools I live in",

  // ─── Home Social Section ──────────────────────────────────────────────────────
  "social-linkedin": "Say hi on LinkedIn",
  "social-behance": "Explore my Behance",
  "social-instagram": "Catch creative reels",
  "social-x": "Follow along on X",
  "social-email": "Drop me a line",
  "social-sticker": "Start a conversation",

  // ─── Home Contact Footer ──────────────────────────────────────────────────────
  "contact-resume-btn": "Download my resume",
  "contact-send-btn": "Send message",
  "contact-card": "Let's build together",

  // ─── About Page Hero & Portrait ───────────────────────────────────────────────
  "about-portrait": (el: HTMLElement) => {
    const state = el.getAttribute("data-state");
    return state === "hover" ? "Still me, just candid" : "Let's talk design";
  },
  "about-intro-note": "Where it all began",

  // ─── About Page Sticky Timeline Cards ─────────────────────────────────────────
  "about-card-1": "A dream with a plan",
  "about-card-2": "Late nights and math",
  "about-card-3": "Taking the tech path",
  "about-card-4": "Curiosity took over",
  "about-card-5": "Canvas before screens",
  "about-card-6": "First client gig",
  "about-card-7": "Found my true calling",
  "about-card-8": "Learning by doing",
  "about-card-9": "Designing for people",

  // ─── About Page Photo Galleries ───────────────────────────────────────────────
  "about-travel": "Wanderlust, on camera",
  "about-art": "Oil and acrylic canvas",

  // ─── About Page Desk Scene Footer Props ───────────────────────────────────────
  "desk-lamp": (el: HTMLElement) => {
    const state = el.getAttribute("data-state");
    return state === "off" ? "Let there be light" : "Lights off?";
  },
  "desk-diary": "Peek at my to-do list",
  "desk-laptop": "Always building things",
  "desk-candle": "Smells like deadlines",
  "desk-mug": "Powered by chai",
  "desk-pinboard": "Memories I pinned",
  "desk-clock": "Never enough hours",
  "desk-bunny": "Quiet desk companion",
  "desk-books": "Mindful reads",
  "desk-plant": "Greenery for focus",
  "desk-pen": "Ready to sketch",
  "desk-closing-quote": "Thanks for visiting",
};

/**
 * Resolves the label text for an element based on data-cursor, data-cursor-key,
 * or fallback.
 */
export function resolveCursorLabel(el: HTMLElement | null): string | null {
  if (!el) return null;

  // 1. One-off label attribute
  const directLabel = el.getAttribute("data-cursor");
  if (directLabel) return directLabel;

  // 2. Central key lookup
  const key = el.getAttribute("data-cursor-key");
  if (key && key in CURSOR_LABELS) {
    const entry = CURSOR_LABELS[key];
    if (typeof entry === "function") {
      return entry(el);
    }
    return entry;
  }

  return null;
}
