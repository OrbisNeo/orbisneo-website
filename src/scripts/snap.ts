// Zachte sectie-scroll voor de homepage. Geen CSS scroll-snap: pas als de gebruiker stopt met
// scrollen, een beweging omlaag maakte en de bovenkant van de eerstvolgende sectie in de bovenste
// helft van het scherm staat, animeren we naar die sectie. Anders blijft het bij vrij lezen.
// De animatie is onze eigen (requestAnimationFrame, ease-out), zodat trackpad-momentum haar niet
// steeds afbreekt en opnieuw start.
(() => {
  const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
  if (sections.length < 2) return;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const DEBOUNCE_MS = 150; // fallback when scrollend is not supported
  const INPUT_MEMORY_MS = 1200;
  const DURATION_MS = 400;

  let timer = 0;
  let frame = 0;
  let animating = false;
  let pointerDown = false;
  let skipUntil = 0; // keyboard, anchor links, find in page: do not interfere
  let ignoreScrollEndUntil = 0; // the scrollend caused by our own animation
  let lastUserScroll = 0; // wheel or touch
  let lastDirection: "down" | "up" | null = null; // of the last wheel or touch movement
  let touchY = 0;

  const headerHeight = () =>
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h-compact")) || 64;

  const enabled = () => !reduced.matches && window.innerHeight >= 500;

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  const stopAnimation = () => {
    if (!animating) return;
    animating = false;
    window.cancelAnimationFrame(frame);
    ignoreScrollEndUntil = Date.now() + 300;
  };

  const animateTo = (target: number) => {
    const from = window.scrollY;
    const distance = target - from;
    if (Math.abs(distance) < 2) return;
    const start = performance.now();
    animating = true;

    const step = (now: number) => {
      if (!animating) return;
      const t = Math.min(1, (now - start) / DURATION_MS);
      window.scrollTo({ top: from + distance * easeOut(t), behavior: "instant" });
      if (t < 1) {
        frame = window.requestAnimationFrame(step);
      } else {
        animating = false;
        ignoreScrollEndUntil = Date.now() + 300;
      }
    };
    frame = window.requestAnimationFrame(step);
  };

  const evaluate = () => {
    if (!enabled() || animating || pointerDown) return;
    const now = Date.now();
    if (now < skipUntil || now < ignoreScrollEndUntil || now - lastUserScroll > INPUT_MEMORY_MS) return;
    // Only after a movement down. After scrolling up the reader is going back: never pull them down again.
    if (lastDirection !== "down") return;

    const vh = window.innerHeight;
    const header = headerHeight();
    // Bottom of the page (footer): nothing to align.
    if (window.scrollY + vh >= document.documentElement.scrollHeight - 2) return;

    // First section that starts below the header line. The hero (first section) is never a target:
    // it is the top of the page, and at small scroll steps it would pull the reader back up.
    const next = sections.slice(1).find((s) => s.getBoundingClientRect().top > header + 2);
    if (!next) return;
    const top = next.getBoundingClientRect().top;
    if (top >= vh * 0.5) return; // still in the lower half: keep reading

    animateTo(window.scrollY + top - header);
  };

  const schedule = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(evaluate, DEBOUNCE_MS);
  };

  const supportsScrollEnd = "onscrollend" in window;
  if (supportsScrollEnd) {
    window.addEventListener("scrollend", evaluate);
  } else {
    window.addEventListener(
      "scroll",
      () => {
        if (!animating) schedule();
      },
      { passive: true },
    );
  }

  // Wheel and touch set the direction. A running animation is only cancelled by a movement the
  // other way, by a key or by a click; more wheel events in the same direction (momentum) leave it alone.
  const userScrolled = (direction: "down" | "up" | null) => {
    lastUserScroll = Date.now();
    if (animating && direction === "up") stopAnimation();
    if (direction) lastDirection = direction;
  };

  // While we animate, downward wheel and touch movement is swallowed (preventDefault): the browser
  // would otherwise scroll it natively while every frame sets an absolute position, which makes the
  // page jump back and overshoot. Upward movement is not blocked and cancels the animation.
  window.addEventListener(
    "wheel",
    (e) => {
      const direction = e.deltaY > 0 ? "down" : e.deltaY < 0 ? "up" : null;
      if (animating && direction === "down" && e.cancelable) e.preventDefault();
      userScrolled(direction);
    },
    { passive: false },
  );
  window.addEventListener(
    "touchmove",
    (e) => {
      const y = e.touches[0]?.clientY ?? touchY;
      // Finger moving up means the page scrolls down.
      const direction = y < touchY ? "down" : y > touchY ? "up" : null;
      if (animating && direction === "down" && e.cancelable) e.preventDefault();
      userScrolled(direction);
      touchY = y;
    },
    { passive: false },
  );
  window.addEventListener(
    "touchstart",
    (e) => {
      pointerDown = true;
      touchY = e.touches[0]?.clientY ?? 0;
    },
    { passive: true },
  );
  const release = () => {
    pointerDown = false;
    if (!supportsScrollEnd) schedule();
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

  // Keyboard, anchor links, focus changes and find-in-page: leave the page alone for a moment.
  const skip = () => {
    skipUntil = Date.now() + INPUT_MEMORY_MS;
    stopAnimation();
  };
  window.addEventListener("keydown", skip);
  window.addEventListener("hashchange", skip);
  document.addEventListener("click", skip);
  window.addEventListener("focusin", skip);
})();
