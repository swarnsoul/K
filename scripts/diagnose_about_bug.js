const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));

  console.log("Navigating to / ...");
  await page.goto("http://localhost:3001/", { waitUntil: "networkidle0" });

  // Scroll down a bit on home page first to see if home scroll position affects it!
  await page.evaluate(() => window.scrollTo(0, 1500));
  await new Promise((r) => setTimeout(r, 400));

  console.log("Home scrollY before navigation:", await page.evaluate(() => window.scrollY));

  // Instrument IntersectionObserver and StickyUnfold in page before navigation
  await page.evaluate(() => {
    window.__stickyLogs = [];
    const origIO = window.IntersectionObserver;
    window.IntersectionObserver = function (cb, opts) {
      console.log("IO created with rootMargin:", opts?.rootMargin);
      const io = new origIO((entries, obs) => {
        for (const e of entries) {
          const key = e.target.closest("[data-cursor-key]")?.getAttribute("data-cursor-key");
          console.log(`IO callback: target=${key}, isIntersecting=${e.isIntersecting}, ratio=${e.intersectionRatio}, top=${e.boundingClientRect.top}`);
        }
        cb(entries, obs);
      }, opts);
      return io;
    };
  });

  console.log("Clicking About in nav...");
  const aboutLink = await page.$('header a[href="/about"]');
  await aboutLink.click();

  await new Promise((r) => setTimeout(r, 1200));

  const stateAfterNav = await page.evaluate(() => {
    return {
      scrollY: window.scrollY,
      lenisScroll: window.__lenis?.scroll,
      lenisTargetScroll: window.__lenis?.targetScroll,
      visibleCardsCount: document.querySelectorAll('.hidden.lg\\:flex [data-cursor-key^="about-card-"]').length,
    };
  });
  console.log("State right after navigation to /about:", stateAfterNav);

  // Now scroll down
  console.log("Scrolling down /about...");
  await page.evaluate(async () => {
    const lenis = window.__lenis;
    console.log("Current lenis before scroll:", lenis?.scroll, "window.scrollY:", window.scrollY);
    for (let y = 0; y <= 4000; y += 500) {
      if (lenis) {
        lenis.scrollTo(y, { immediate: true });
      } else {
        window.scrollTo(0, y);
      }
      await new Promise((r) => setTimeout(r, 100));
    }
  });

  await new Promise((r) => setTimeout(r, 1000));

  const finalCards = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.hidden.lg\\:flex [data-cursor-key^="about-card-"]'));
    return cards.map((c) => {
      const key = c.getAttribute("data-cursor-key");
      const text = c.querySelector("[data-unfold-text], p");
      const spans = text ? Array.from(text.querySelectorAll("span")) : [];
      const transparent = spans.filter((s) => s.style.color === "transparent").length;
      const rect = c.getBoundingClientRect();
      return { key, spans: spans.length, transparent, top: rect.top, bottom: rect.bottom };
    });
  });
  console.log("Final visible cards:", finalCards);

  await browser.close();
})();
