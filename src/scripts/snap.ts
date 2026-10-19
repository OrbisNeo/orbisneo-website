// Zachte sectie-scroll voor de homepage. Geen CSS scroll-snap: pas als de gebruiker stopt met
// scrollen en de bovenkant van de eerstvolgende sectie in de bovenste helft van het scherm staat,
// scrollt de pagina er soepel naartoe. Anders blijft het bij vrij lezen.
(() => {
  const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
  if (sections.length < 2) return;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const DEBOUNCE_MS = 150;
  const INPUT_MEMORY_MS = 1200;
  const ANIMATION_MAX_MS = 1500;

  let timer = 0;
  let animating = false;
  let animationTimer = 0;
  let pointerDown = false;
  let skipUntil = 0; // keyboard, anchor links, find in page: do not interfere
  let lastUserScroll = 0; // wheel or touch
  let lastDirection: "down" | "up" | null = null; // of the last wheel or touch movement
  let touchY = 0;

  const headerHeight = () =>
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h-compact")) || 64;

  const enabled = () => !reduced.matches && window.innerHeight >= 500;

  const stopAnimation = () => {
    if (!animating) return;
    animating = false;
    window.clearTimeout(animationTimer);
    window.scrollTo({ top: window.scrollY, behavior: "auto" }); // cancels the smooth scroll
  };

  const userTookOver = (direction: "down" | "up" | null) => {
    lastUserScroll = Date.now();
    if (direction) lastDirection = direction;
    stopAnimation();
  };

  const evaluate = () => {
    if (!enabled() || animating || pointerDown) return;
    const now = Date.now();
    if (now < skipUntil || now - lastUserScroll > INPUT_MEMORY_MS) return;
    // Only after a movement down. After scrolling up the reader is going back: never pull them down again.
    if (lastDirection !== "down") return;

    const vh = window.innerHeight;
    const header = headerHeight();
    // Bottom of the page (footer): nothing to align.
    if (window.scrollY + vh >= document.documentElement.scrollHeight - 2) return;

    // First section that starts below the header line.
    const next = sections.find((s) => s.getBoundingClientRect().top > header + 2);
    if (!next) return;
    const top = next.getBoundingClientRect().top;
    if (top >= vh * 0.5) return; // still in the lower half: keep reading

    animating = true;
    window.scrollTo({ top: window.scrollY + top - header, behavior: "smooth" });
    animationTimer = window.setTimeout(() => {
      animating = false;
    }, ANIMATION_MAX_MS);
  };

  const onScrollEnd = () => {
    if (animating) {
      animating = false;
      window.clearTimeout(animationTimer);
      return;
    }
    evaluate();
  };

  const supportsScrollEnd = "onscrollend" in window;
  if (supportsScrollEnd) {
    window.addEventListener("scrollend", onScrollEnd);
  } else {
    window.addEventListener(
      "scroll",
      () => {
        if (animating) return;
        window.clearTimeout(timer);
        timer = window.setTimeout(evaluate, DEBOUNCE_MS);
      },
      { passive: true },
    );
  }

  // Wheel and touch are the only inputs we act on; any of them cancels a running animation.
  window.addEventListener(
    "wheel",
    (e) => userTookOver(e.deltaY > 0 ? "down" : e.deltaY < 0 ? "up" : null),
    { passive: true },
  );
  window.addEventListener(
    "touchmove",
    (e) => {
      const y = e.touches[0]?.clientY ?? touchY;
      // Finger moving up means the page scrolls down.
      userTookOver(y < touchY ? "down" : y > touchY ? "up" : null);
      touchY = y;
    },
    { passive: true },
  );
  window.addEventListener(
    "touchstart",
    (e) => {
      pointerDown = true;
      touchY = e.touches[0]?.clientY ?? 0;
      stopAnimation();
    },
    { passive: true },
  );
  const release = () => {
    pointerDown = false;
    if (!supportsScrollEnd) {
      window.clearTimeout(timer);
      timer = window.setTimeout(evaluate, DEBOUNCE_MS);
    }
  };
  window.addEventListener("touchend", release, { passive: true });
  window.addEventListener("touchcancel", release, { passive: true });
  window.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") {
      pointerDown = true;
      stopAnimation();
    }
  });
  window.addEventListener("pointerup", () => {
    if (pointerDown) release();
  });

  // Keyboard, anchor links and find-in-page: leave the page alone for a moment.
  const skip = () => {
    skipUntil = Date.now() + INPUT_MEMORY_MS;
    stopAnimation();
  };
  window.addEventListener("keydown", skip);
  window.addEventListener("hashchange", skip);
  document.addEventListener("click", (e) => {
    if ((e.target as Element | null)?.closest('a[href*="#"]')) skip();
  });
  window.addEventListener("focusin", skip);
})();
