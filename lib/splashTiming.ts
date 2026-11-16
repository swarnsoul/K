/**
 * Splash Screen Animation Timing Constants
 * All timings, greetings sequence, and easing curves configured here.
 */

export interface GreetingItem {
  id: string;
  text: string;
  lang: string;
  script: "latin" | "devanagari" | "japanese";
}

export const GREETINGS_SEQUENCE: GreetingItem[] = [
  {
    id: "hello-1",
    text: "Hello!",
    lang: "en",
    script: "latin",
  },
  {
    id: "namaste",
    text: "नमस्ते",
    lang: "hi",
    script: "devanagari",
  },
  {
    id: "bonjour",
    text: "Bonjour!",
    lang: "fr",
    script: "latin",
  },
  {
    id: "hola",
    text: "Hola!",
    lang: "es",
    script: "latin",
  },
  {
    id: "konnichiwa",
    text: "こんにちは",
    lang: "ja",
    script: "japanese",
  },
  {
    id: "hallo",
    text: "Hallo",
    lang: "de",
    script: "latin",
  },
  {
    id: "hello-2",
    text: "Hello!",
    lang: "en",
    script: "latin",
  },
];

export const SPLASH_TIMING = {
  // Greetings list
  GREETINGS: GREETINGS_SEQUENCE,

  // Quick instant cut timing (ms per language)
  // No fade, no smart animation, brisk hard-cut change
  WORD_DURATION_MS: 200,
  FINAL_HOLD_MS: 350,

  // Total greetings sequence duration before upward slide starts
  // 6 switches * 200ms + 350ms final hold = 1550ms
  get TOTAL_GREETINGS_MS() {
    const numTransitions = GREETINGS_SEQUENCE.length - 1; // 6 transitions
    return numTransitions * this.WORD_DURATION_MS + this.FINAL_HOLD_MS;
  },

  // Crossfade easing (symmetrical ease-in-out for seamless crossfade without dips or jumps)
  CROSSFADE_EASING: "cubic-bezier(0.42, 0, 0.58, 1)",

  // Upward slide animation parameters
  SLIDE_MS: 1100,
  SLIDE_EASING: "cubic-bezier(0.76, 0, 0.24, 1)",

  // Hero parallax reveal parameters
  HERO_REVEAL_MS: 1300,
  HERO_REVEAL_EASING: "cubic-bezier(0.22, 1, 0.36, 1)",
  HERO_REVEAL_DISTANCE: "10vh",

  // Percentage of slide when hero animations (typewriter, cursors) start
  HERO_TRIGGER_PERCENT: 0.70, // 70% of slide (~770ms into 1100ms slide)

  // Skip fast-forward slide duration
  SKIP_SLIDE_MS: 500,

  // prefers-reduced-motion
  REDUCED_MOTION_HOLD_MS: 500,
  REDUCED_MOTION_FADE_MS: 300,

  // Absolute safety timeout
  SAFETY_TIMEOUT_MS: 10000,

  // Max font wait timeout
  MAX_FONT_WAIT_MS: 1200,
};
