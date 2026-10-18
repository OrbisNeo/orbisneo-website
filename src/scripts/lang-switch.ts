const ONE_YEAR = 60 * 60 * 24 * 365;

document.querySelectorAll<HTMLAnchorElement>("[data-lang-switch]").forEach((link) => {
  link.addEventListener("click", () => {
    const lang = link.dataset.langSwitch;
    if (lang !== "en" && lang !== "nl") return;
    document.cookie = `on_lang=${lang}; Max-Age=${ONE_YEAR}; Path=/; SameSite=Lax; Secure`;
  });
});
