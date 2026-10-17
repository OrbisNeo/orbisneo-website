export type Lang = "en" | "nl";

export const ui = {
  en: {
    nav: {
      services: "Services",
      about: "About",
      blog: "Blog",
      contact: "Contact",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    skipLink: "Skip to content",
    lang: {
      current: "Current language",
      switchTo: "Switch to Dutch",
    },
    footer: {
      brand: "Orbis Neo Consulting",
      strapline: "Perspective on organisation, strategy and AI.",
      sitemapHeading: "Pages",
      contactHeading: "Contact",
      socialHeading: "Elsewhere",
      copyright: "Orbis Neo Consulting",
      kvk: "KvK",
      city: "Amersfoort",
    },
  },
  nl: {
    nav: {
      services: "Diensten",
      about: "Over",
      blog: "Blog",
      contact: "Kennismaken",
      menuOpen: "Menu openen",
      menuClose: "Menu sluiten",
    },
    skipLink: "Naar de inhoud",
    lang: {
      current: "Huidige taal",
      switchTo: "Switch to English",
    },
    footer: {
      brand: "Orbis Neo Consulting",
      strapline: "Perspectief op organisatie, strategie en AI.",
      sitemapHeading: "Pagina's",
      contactHeading: "Contact",
      socialHeading: "Elders",
      copyright: "Orbis Neo Consulting",
      kvk: "KvK",
      city: "Amersfoort",
    },
  },
} as const satisfies Record<Lang, unknown>;

export const t = (lang: Lang) => ui[lang];
