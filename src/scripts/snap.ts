(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const root = document.documentElement;
  const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
  if (sections.length < 2) return;

  // Only segments that fill the screen snap. Shorter ones would leave a gap, and the hero
  // is the top of the page. Snapping is "proximity": a segment taller than the screen stays
  // fully reachable by scrolling, the browser only pulls in when you stop near a start.
  const evaluate = () => {
    const compact = parseFloat(getComputedStyle(root).getPropertyValue("--header-h-compact")) || 64;
    const usable = window.innerHeight - compact;
    let any = false;
    sections.forEach((el, i) => {
      const fills = i > 0 && el.offsetHeight >= usable * 0.95;
      el.toggleAttribute("data-snap", fills);
      any = any || fills;
    });
    root.toggleAttribute("data-snap-active", any);
  };

  evaluate();
  window.addEventListener("resize", evaluate, { passive: true });
  window.addEventListener("load", evaluate);
  if ("ResizeObserver" in window) new ResizeObserver(evaluate).observe(document.querySelector("main")!);
})();
