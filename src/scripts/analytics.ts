(() => {
  type UmamiFn = (event: string, data?: Record<string, string>) => void;
  const umami = (): UmamiFn | undefined => (window as unknown as { umami?: UmamiFn }).umami;

  // service-view: fire once per service segment when it comes into view
  const serviceSegments = document.querySelectorAll<HTMLElement>(".service-segment[id]");
  if (serviceSegments.length && "IntersectionObserver" in window) {
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          if (seen.has(id)) continue;
          seen.add(id);
          umami()?.("service-view", { service: id });
        }
      },
      { threshold: 0.4 },
    );
    for (const el of serviceSegments) io.observe(el);
  }

  // case-view: fire once per case card when it comes into view
  const cases = document.querySelectorAll<HTMLElement>(".case-card__org, .about-case__org");
  if (cases.length && "IntersectionObserver" in window) {
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const org = (entry.target.textContent || "").trim();
          if (!org || seen.has(org)) continue;
          seen.add(org);
          umami()?.("case-view", { organisation: org });
        }
      },
      { threshold: 0.5 },
    );
    for (const el of cases) io.observe(el);
  }

  // blog-read: fire once when article is 75% scrolled
  const article = document.querySelector<HTMLElement>(".article");
  if (article) {
    const slug = location.pathname.replace(/^\/blog\//, "").replace(/\/$/, "");
    const lang = document.documentElement.lang;
    let fired = false;
    const onScroll = () => {
      if (fired) return;
      const scrolled = window.scrollY - article.offsetTop + window.innerHeight;
      const ratio = scrolled / Math.max(1, article.offsetHeight);
      if (ratio >= 0.75) {
        fired = true;
        umami()?.("blog-read", { slug, lang });
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // outbound-click delegation for any external link without an explicit event
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    const link = target.closest<HTMLAnchorElement>("a[href]");
    if (!link) return;
    if (link.dataset.umamiEvent) return;
    try {
      const url = new URL(link.href, location.origin);
      if (url.origin === location.origin) return;
      if (url.protocol !== "http:" && url.protocol !== "https:") return;
      umami()?.("outbound-click", { host: url.host, path: location.pathname });
    } catch {
      /* ignore invalid href */
    }
  });
})();
