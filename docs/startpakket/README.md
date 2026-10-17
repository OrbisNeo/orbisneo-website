---
title: "Startpakket nieuwe website: index"
subtitle: "Overzicht en leesvolgorde van de websitedocumentatie"
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
| 1.0 | 15 oktober 2026 | Eerste versie van het startpakket | Vera (Website & Voice) |

# Inleiding {.unnumbered}

## Doel van dit document {.unnumbered}

Dit is de index van het startpakket nieuwe website van Orbis Neo. Het startpakket vormt de formele websitedocumentatie: het beschrijft wat er gebouwd wordt, hoe de bouw start, hoe de repository en hosting worden ingericht, hoe er wordt getest en goedgekeurd en welke DNS-stappen nodig zijn.

## Scope {.unnumbered}

Binnen scope: de nieuwe website op www.orbisneoconsulting.com en de overgang vanaf orbisneo.nl. Buiten scope: wijzigingen aan de live WordPress-site, mailboxinrichting in Microsoft 365 en de toekomstige portfoliopagina.

## Doelgroep {.unnumbered}

Daniel Fokker (eigenaar en goedkeurder), Claude Code of een ontwikkelaar (bouwer) en Vera (tester en rapporteur).

# Inhoud van het pakket

| # | Document | Bestanden | Voor wie | Inhoud |
|---|---|---|---|---|
| 1 | Productdocument nieuwe website | `productdocument-nieuwe-website.md` en `.pdf` | Bouwer, Daniel, Vera | Volledige product- en ontwerpspecificatie: doel, informatie-architectuur, design system, pagina's, techniek, CMS, SEO, analytics, hosting, migratie, open punten |
| 2 | Startopdracht Claude Code | `startopdracht-claude-code.md` en `.pdf` | Claude Code, Daniel | Eerste prompt: doel, te lezen bestanden, werkvolgorde, werkwijze, eerste vragen |
| 3 | GitHub-repo stappen | `github-repo-stappen.md` en `.pdf` | Daniel | Private repository, bescherming van `main`, Netlify, deploy previews, geheimen, toegang |
| 4 | Werkafspraak | `werkafspraak.md` en `.pdf` | Iedereen | Levering via pull requests, testchecklist, rapportage, niets live zonder Daniel |
| 5 | TransIP DNS | `transip-dns.md` en `.pdf` | Daniel, Vera | Loskoppelen van de 302, Netlify-records, mailrecords, doorsturen van de oude domeinen |
| 6 | Gebundeld hoofddocument | `orbis-neo-website-documentatie-v1.0.md` en `.pdf` | Archief, goedkeuring | Alle vijf documenten als delen in één document |
| 7 | Deze index | `README.md` en `.pdf` | Iedereen | Overzicht en leesvolgorde |

# Leesvolgorde

Daniel leest eerst het productdocument (in het bijzonder hoofdstuk 1 en hoofdstuk 11 met de open punten), daarna de GitHub-repo stappen om de accounts in te richten, en geeft vervolgens de startopdracht aan Claude Code. De werkafspraak geldt vanaf de eerste pull request. De TransIP-instructie is pas nodig bij de testomgeving en de lancering.

# Status en goedkeuring

Alle documenten hebben versie 1.0 en de status "Concept ter goedkeuring". Na goedkeuring door Daniel wordt de status "Vastgesteld"; latere wijzigingen krijgen een nieuw versienummer en een regel in de versiebeheertabel van het betreffende document en van het gebundelde hoofddocument.

# Belangrijkste besluiten in één oogopslag

| Onderwerp | Besluit |
|---|---|
| Techniek | Astro (statisch), Decap CMS, Netlify, Umami, GitHub met Actions en previews |
| Domein | www.orbisneoconsulting.com; orbisneo.nl en orbisneo.com 301 met padbehoud |
| Talen | Engels op de root; Nederlands op eigen adressen zonder prefix (`/diensten/`, `/over/`, `/blog/<nl-slug>/`, `/kennismaken/`); `hreflang` en `x-default` |
| Taaldetectie | Alleen bij eerste homepagebezoek, nooit voor bots; wisselaar onthoudt keuze |
| Vormgeving | Alleen licht, logo in kleur, warm, groot en leesbaar |
| Publicatie | Alles via pull request; niets live zonder Daniel |

# Bronbestanden

De onderliggende bestanden staan in `/workspace/orbisneo-redesign/`: `voorstel-nieuwe-website.md`, `palette.json`, `html/` en `logo/`.
