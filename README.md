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
| Productie (tot lancering) | `true` | `test.orbisneoconsulting.com` |
| Productie (na lancering) | `false` | `www.orbisneoconsulting.com` |

De schakelaar `PUBLIC_NOINDEX` zet Daniel pas op `false` bij go-live. Nooit automatisch, nooit door de bouwer.

## Werkwijze

Elke wijziging gaat via een pull request met deploy preview. Alleen Daniel voegt samen naar `main` en wijzigt DNS. Zie `docs/startpakket/werkafspraak.md` en `docs/startpakket/github-repo-stappen.md`.

## Status

Pull request 1 van 13: repo-scaffold. Volgende stappen staan in `docs/startpakket/startopdracht-claude-code.md` § 5.
