document.documentElement.classList.add("js");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.25 },
  );

  for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
    io.observe(el);
  }
} else {
  for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
    el.classList.add("is-visible");
  }
}
