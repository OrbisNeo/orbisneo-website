---
title: "Startopdracht Claude Code"
subtitle: "Eerste opdracht voor de bouw van de nieuwe website"
author: "Vera (Website & Voice) voor Daniel Fokker"
date: "15 oktober 2026"
version: "1.0"
status: "Concept ter goedkeuring"
lang: nl
toc: true
---

# Versiebeheer {.unnumbered}

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | 15 oktober 2026 | Eerste versie van de startopdracht | Vera (Website & Voice) |

# Inleiding {.unnumbered}

## Doel van dit document {.unnumbered}

Dit document bevat de eerste opdracht (prompt) voor Claude Code, de AI-codebouwer die de nieuwe website van Orbis Neo bouwt. Het legt vast wat het doel is, welke bestanden eerst gelezen moeten worden, in welke volgorde het werk gebeurt, hoe er gewerkt wordt en welke vragen Claude Code eerst aan Daniel stelt. Hoofdstuk 6 is de letterlijke prompt die in Claude Code geplakt kan worden.

## Scope {.unnumbered}

| Binnen scope | Buiten scope |
|---|---|
| Bouw van de site volgens het productdocument, in kleine pull requests | Samenvoegen naar `main` (alleen Daniel) |
| Repository-inrichting, code, content-migratie, configuratie van Netlify-bestanden | DNS-wijzigingen bij TransIP |
| Tests en controles in GitHub Actions | Wijzigingen aan de live WordPress-site |
| Vragen stellen aan Daniel bij ontbrekende feiten | Verzinnen van feiten, klanten of prijzen |

## Doelgroep {.unnumbered}

Daniel Fokker (die de opdracht start en goedkeurt), Claude Code (uitvoerder) en Vera (die de previews test).

# Doel

Bouw de nieuwe, tweetalige website van Orbis Neo op www.orbisneoconsulting.com met Astro (statisch), Decap CMS, Netlify (hosting, Forms, Edge Functions, redirects, deploy previews), Umami en GitHub Actions, precies volgens `productdocument-nieuwe-website.md` versie 1.0. Het resultaat is een site die Daniel via deploy previews beoordeelt en die pas na zijn uitdrukkelijke akkoord live gaat.

# Te lezen bestanden

| Volgorde | Bestand | Waarom |
|---|---|---|
| 1 | `productdocument-nieuwe-website.md` (dit startpakket) | Volledige specificatie: leidend bij elke twijfel |
| 2 | `werkafspraak.md` | Hoe er wordt opgeleverd en getest |
| 3 | `github-repo-stappen.md` | Inrichting van repository en Netlify |
| 4 | `transip-dns.md` | Alleen ter informatie; DNS doet Daniel |
| 5 | `voorstel-nieuwe-website.md` en `palette.json` | Achtergrond: logo-analyse, kleuren, URL-inventaris |
| 6 | `html/` (opgehaalde pagina's van 15 oktober 2026) | Bron voor letterlijke teksten |
| 7 | `logo/` | Tijdelijke logobestanden tot de SVG of PNG van Daniel er is |

# Volgorde van het werk

Elke stap is één pull request (of een klein aantal), met een deploy preview. Een volgende stap begint pas als de vorige door Daniel is samengevoegd, tenzij Daniel anders aangeeft.

| # | Pull request | Inhoud | Klaar als |
|---|---|---|---|
| 1 | Repo-scaffold | Astro 6, TypeScript strict, `.nvmrc` (22), `netlify.toml` met `PUBLIC_NOINDEX=true`, README, `.editorconfig`, lege paginastructuur | Deploy preview toont een lege pagina met `noindex` |
| 2 | Design tokens | `tokens.css`, `base.css`, fonts via Fontsource, breekpunten, focusstijlen | Tokenpagina `/_styleguide/` (noindex, niet in sitemap) toont kleuren, typeschaal en knoppen |
| 3 | Layout en basiscomponenten | `BaseLayout`, `Seo`, header, mobiel menu, taalwisselaar (nog statisch), footerband, knoppen, links | Toetsenbord en schermlezer werken; Lighthouse toegankelijkheid 100 |
| 4 | Homepage-secties | Opening en cases, visie, dienstsegmenten met reveal, klantlogo's, contactteaser; collecties `cases`, `diensten`, `clients` | Beide homepages (`/`, `/welkom/`) volledig, placeholders zichtbaar gemarkeerd |
| 5 | Blogcollectie en migratie | `scripts/migrate-wp.ts` via de publieke WordPress REST API, zes blogparen, afbeeldingen, overzichten, artikelpagina, RSS | Twaalf artikelen, woordtelling gelijk aan de bron |
| 6 | NL-adressen en hreflang | `routes.ts`, `getAlternates`, sitemap-endpoint, robots, Edge Function voor `/`, taalcookie | Elke pagina heeft juiste canonical, hreflang en `x-default`; detectie getest met bot en mens |
| 7 | Diensten-, over-, privacy- en nieuwspagina's | Volledige teksten, collectie `nieuws` met voorbeeldeditie als `draft` | Alle pagina's uit de URL-tabel bestaan |
| 8 | Contactformulier | Netlify Forms met honeypot, validatie in beide talen, bedanktpagina's | Testinzending in preview zichtbaar in Netlify |
| 9 | Decap op `/admin` | `config.yml` met GitHub-backend, editorial workflow, i18n, previewstijl | Daniel kan inloggen en een conceptblog als pull request opslaan |
| 10 | Umami | `Analytics.astro`, events uit hoofdstuk 8 van het productdocument | Events zichtbaar in Umami (alleen productie); in preview geen script |
| 11 | Redirects | `public/_redirects` volgens de kaart, `check-redirects.ts`, `410.html` | Alle regels getest op de preview |
| 12 | CI en kwaliteit | `ci.yml` met typecheck, build, `check-content`, linkcheck, axe, Lighthouse op de preview | Alle controles groen; verplichte statuscheck op `main` |
| 13 | Testomgeving | `test.orbisneoconsulting.com` als domein in Netlify, `noindex` op headers en meta | Vera kan de volledige testronde draaien |

# Werkwijze

Claude Code werkt in kleine, afgebakende pull requests met een duidelijke titel en een beschrijving volgens het sjabloon in `github-repo-stappen.md`: wat is gewijzigd, waarom, hoe te testen en welke open punten er zijn. Elke pull request krijgt automatisch een deploy preview van Netlify; de link staat in de pull request. Claude Code voegt nooit zelf samen naar `main`, pusht nooit rechtstreeks naar `main`, zet nooit `PUBLIC_NOINDEX` op `false` en wijzigt geen DNS. Ontbrekende feiten worden niet verzonnen maar als `[PLACEHOLDER: ...]` opgenomen en in de pull request genoemd. Teksten van de huidige site worden letterlijk overgenomen; tikfouten worden alleen gemarkeerd, niet stil verbeterd. Het em-streepje wordt nergens gebruikt, ook niet in code-commentaar of commitberichten. Bij twijfel over de specificatie stelt Claude Code een vraag in de pull request in plaats van een aanname te doen.

# Eerste vragen aan Daniel

Voordat stap 4 begint, stelt Claude Code de volgende vragen (in één bericht, genummerd):

1. Kun je de logobestanden uit je OneDrive (map Orbis Neo) aanleveren als SVG, of anders als PNG met transparante achtergrond, voor het beeldmerk en voor beeldmerk plus woordmerk?
2. Welke feiten wil je per case tonen (situatie en resultaat), en hoe wil je de interim Head of IT-opdracht noemen (organisatie of anoniem, periode, resultaat)? Klopt "Info Support, 2026 tot heden" nog?
3. Welke klantlogo's mogen op de site, en in welke rol was je betrokken bij Essent, Rijkswaterstaat, Rechtspraak/IVO, gemeente Rotterdam en Sopra Steria?
4. Kies je Umami Cloud (gratis Hobby-plan, EU-servers) of zelf hosten (eigen server met PostgreSQL)?
5. Is het Netlify-account (team) aangemaakt en gekoppeld aan de GitHub-repository, en welk e-mailadres ontvangt de formulierberichten?

# Prompt voor Claude Code

```text
Je bent de bouwer van de nieuwe website van Orbis Neo (eigenaar Daniel Fokker).

DOEL
Bouw www.orbisneoconsulting.com als statische, tweetalige Astro-site (Engels op de root,
Nederlands op eigen adressen zonder /nl/-prefix) met Decap CMS op /admin, Netlify
(Forms, Edge Functions, _redirects, deploy previews), Umami en GitHub Actions.

LEES EERST, IN DEZE VOLGORDE
1. startpakket/productdocument-nieuwe-website.md (leidend)
2. startpakket/werkafspraak.md
3. startpakket/github-repo-stappen.md
4. voorstel-nieuwe-website.md, palette.json, html/ (bron voor letterlijke teksten), logo/

WERKVOLGORDE (elk punt is een eigen pull request met deploy preview)
1. Repo-scaffold Astro 6 + netlify.toml (PUBLIC_NOINDEX=true) + README
2. Design tokens (tokens.css, fonts via Fontsource, breekpunten)
3. Layout en basiscomponenten (header, menu, taalwisselaar, footerband)
4. Homepage-secties (cases, visie, dienstsegmenten met reveal, logo's, contact)
5. Blogcollectie + migratie van de zes blogparen via de WP REST API
6. NL-adressen, hreflang, x-default, sitemap, robots, Edge Function op /
7. Diensten-, over-, privacy- en nieuwspagina's
8. Contactformulier met Netlify Forms en honeypot
9. Decap CMS op /admin (GitHub-backend, editorial workflow, i18n)
10. Umami met de events uit het productdocument
11. _redirects volgens de redirectkaart + check-redirects
12. GitHub Actions (typecheck, build, contentcheck, linkcheck, axe, Lighthouse)
13. Testomgeving test.orbisneoconsulting.com met noindex

REGELS
- Kleine pull requests; elke pull request heeft een preview-URL en een testinstructie.
- Nooit pushen of samenvoegen naar main; Daniel voegt samen.
- Nooit PUBLIC_NOINDEX op false zetten, nooit DNS wijzigen, nooit iets versturen.
- Geen verzonnen feiten, klanten of prijzen; gebruik [PLACEHOLDER: ...].
- Teksten letterlijk overnemen; geen em-streepjes, nergens.
- Bij twijfel: vraag het in de pull request.

BEGIN MET
Stel Daniel eerst deze vijf vragen in één bericht: (1) logobestanden SVG of
transparante PNG, (2) feiten per CV-case en de interim Head of IT-opdracht,
(3) lijst toegestane klantlogo's, (4) Umami Cloud of self-host,
(5) Netlify-account en ontvangstadres formulier.
Start daarna met pull request 1.
```
