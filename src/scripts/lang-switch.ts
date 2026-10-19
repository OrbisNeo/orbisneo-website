(() => {
  const ONE_YEAR = 60 * 60 * 24 * 365;
  type UmamiFn = (event: string, data?: Record<string, string>) => void;
  const umami = (): UmamiFn | undefined => (window as unknown as { umami?: UmamiFn }).umami;

  document.querySelectorAll<HTMLAnchorElement>("[data-lang-switch]").forEach((link) => {
    link.addEventListener("click", () => {
      const to = link.dataset.langSwitch;
      if (to !== "en" && to !== "nl") return;
      document.cookie = `on_lang=${to}; Max-Age=${ONE_YEAR}; Path=/; SameSite=Lax; Secure`;
      const from = document.documentElement.lang;
      umami()?.("language-switch", { from, to, path: location.pathname });
    });
  });
})();
