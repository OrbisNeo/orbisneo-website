# orbisneo-website

Nieuwe website van Orbis Neo Consulting: statische Astro-site, tweetalig (Engels op de root, Nederlands op eigen adressen zonder `/nl/`-prefix), gehost op Netlify.

Volledige specificatie: `docs/startpakket/productdocument-nieuwe-website.md`.

## Vereisten

- Node.js 22 (zie `.nvmrc`)
- npm 10+

## Lokale ontwikkeling

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # output in dist/
npm run preview      # bekijk de build lokaal
npm run check        # type- en syntaxcontrole
```

## Mappenstructuur

Volledige structuur: § 5.2 van het productdocument. In het kort:

- `src/pages/` — routes en pagina's
- `src/layouts/` — layoutcomponenten
- `src/content/` — content collections (blog, nieuws, diensten, cases) per taal
- `src/i18n/` — taalroutes, teksten en helpers
- `src/styles/` — design tokens en basisstijlen
- `public/` — statische assets, `_redirects`, Decap CMS op `/admin/`
- `netlify/edge-functions/` — Edge Functions (taaldetectie op `/`)
- `scripts/` — bouwcontroles (content, redirects) en migratie
- `.github/` — CI, CODEOWNERS, PR-template
- `docs/startpakket/` — vastgestelde documentatie v1.0

## Omgevingen

| Context | PUBLIC_NOINDEX | Zichtbaar als |
|---|---|---|
| Deploy preview | `true` | `deploy-preview-<n>--orbisneo-website.netlify.app` |
| Branch deploy | `true` | `<branch>--orbisneo-website.netlify.app` |
| Productie | `false` | `www.orbisneoconsulting.com` |

In `netlify.toml` staat `PUBLIC_NOINDEX` in de productiecontext op `false`. Deploy previews en branch deploys blijven op `true`. Daniel merget deze stand pas nadat de DNS voor www naar Netlify wijst en het certificaat actief is.

## Werkwijze

Elke wijziging gaat via een pull request met deploy preview. Alleen Daniel voegt samen naar `main` en wijzigt DNS. Vera geeft opdrachten en controleert previews, Cursor cloud agents voeren uit. Regels voor agents: `AGENTS.md`. Schrijfregels: `docs/schrijfregels.md`. Overdracht, toegang en openstaande punten: `docs/overdracht.md`. Zie verder `docs/startpakket/werkafspraak.md` en `docs/startpakket/github-repo-stappen.md`.

## Status

De site staat op de testomgeving en de teksten zijn grotendeels af. Openstaande punten en de weg naar de lancering staan in `docs/overdracht.md` (sectie 6) en in het productdocument. De oorspronkelijke bouwvolgorde (PR 1 tot en met 13) staat in `docs/startpakket/startopdracht-claude-code.md` § 5.
