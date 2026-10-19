(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const root = document.documentElement;
  const main = document.querySelector("main");
  const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
  if (!main || sections.length < 2) return;

  // Snapping is mandatory, so it is only worth it when the segments are about screen sized.
  // On a very small window (mobile landscape) free scrolling is friendlier.
  const evaluate = () => {
    const small = window.innerHeight < 500;
    root.toggleAttribute("data-snap-active", !small);
  };

  evaluate();
  window.addEventListener("resize", evaluate, { passive: true });
})();
