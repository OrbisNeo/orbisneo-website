---
title: "Werkafspraak bouw, test en goedkeuring"
subtitle: "Levering via GitHub, testen door Vera, niets live zonder Daniel"
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
| 1.0 | 15 oktober 2026 | Eerste versie van de werkafspraak | Vera (Website & Voice) |

# Inleiding {.unnumbered}

## Doel van dit document {.unnumbered}

Deze werkafspraak legt vast hoe de bouw van de nieuwe website wordt opgeleverd, getest en goedgekeurd. De kern is eenvoudig: Claude Code levert alles via GitHub als pull request, Vera test elke preview en de testomgeving en rapporteert aan Daniel, en niets gaat live zonder Daniel.

## Scope {.unnumbered}

| Binnen scope | Buiten scope |
|---|---|
| Rollen en verantwoordelijkheden tijdens bouw, test en lancering | Inhoudelijke specificatie (zie productdocument) |
| Testchecklist en rapportageformat | Inrichting van accounts (zie GitHub-repo stappen) |
| Regels voor publicatie en lancering | DNS-stappen (zie TransIP DNS) |

## Doelgroep {.unnumbered}

Daniel Fokker, Claude Code en Vera.

# Rollen

| Rol | Wie | Verantwoordelijk voor |
|---|---|---|
| Opdrachtgever en goedkeurder | Daniel Fokker | Besluiten, feiten en teksten, goedkeuren en samenvoegen van pull requests, DNS en lancering |
| Bouwer | Claude Code | Code en configuratie, uitsluitend via pull requests met preview |
| Tester en rapporteur | Vera (Website & Voice) | Testen van elke preview en van de testomgeving, rapport aan Daniel, nieuwsedities als pull request |

# Afspraken

1. Claude Code levert alles via GitHub, in kleine pull requests met een beschrijving volgens het sjabloon en een deploy preview. Er wordt niets rechtstreeks naar `main` gepusht.
2. Vera test elke pull request op de deploy preview en vóór lancering de volledige testomgeving `test.orbisneoconsulting.com`, volgens de checklist in hoofdstuk 3.
3. Vera rapporteert aan Daniel per pull request (kort) en per testronde (volledig), in het format van hoofdstuk 4. Bevindingen gaan als reactie in de pull request; blokkerende punten krijgen het label `blokkerend`.
4. Alleen Daniel voegt samen naar `main`, zet `PUBLIC_NOINDEX` op `false`, wijzigt DNS en geeft het startsein voor de lancering. Niets gaat live zonder Daniel.
5. Niemand verzint feiten, klanten of prijzen. Ontbrekende informatie wordt een placeholder en een vraag aan Daniel.
6. Er wordt niets namens Orbis Neo verzonden of gepubliceerd buiten de site om, en de live WordPress-site wordt niet aangeraakt.
7. Elke actie die iets wijzigt (bestand, upload, instelling) wordt door Vera vastgelegd in de actielog van Orbis Neo.

# Testchecklist

| Gebied | Controle | Hulpmiddel | Norm |
|---|---|---|---|
| Talen | Elke pagina bestaat in EN en NL op het juiste adres; geen `/nl/` of `/en/` in URL's; teksten in de juiste taal, ook footer en formulier | Handmatig, sitemap | Geen afwijkingen |
| Taalwisselaar | Springt naar de tegenhanger van de huidige pagina; keuze blijft bewaard bij een volgend bezoek aan `/` | Browser, cookies wissen | Altijd juiste tegenhanger |
| Taaldetectie | `/` met Nederlandse browser gaat bij eerste bezoek naar `/welkom/`; met Engelse browser niet; met bot-user-agent (Googlebot) nooit; diepere pagina's nooit | `curl -I -H "Accept-Language: nl"` en `-A "Googlebot"` | 302 alleen in het juiste geval |
| hreflang en canonical | Per pagina canonical naar zichzelf, `hreflang` en en nl wederkerig, `x-default` naar Engels; sitemap met alternates | Bronweergave, validator | Alle pagina's correct |
| Robots | Previews en test: `noindex` in meta en header, `Disallow: /`; productie na lancering: `index` | `curl -I`, bronweergave | Geen indexeerbare preview |
| Redirects | Elke regel uit de redirectkaart: één stap, status 301 (of 410), juist doel | Script met `curl -sI` over de hele lijst | 100 procent |
| Formulier | Inzending in EN en NL, verplichte velden, foutmeldingen in de juiste taal, honeypot, bedanktpagina, melding komt aan | Handmatig, Netlify Forms | Beide talen aangekomen |
| Responsive | 375, 600, 834, 1280 en 1440 px; geen horizontaal scrollen; menu, cases, dienstsegmenten en logo's volgens het productdocument | Browser, apparaatsimulatie, eigen telefoon | Geen breuken |
| Beweging | Reveal werkt; met `prefers-reduced-motion` geen animatie; zonder JavaScript alles zichtbaar | Browserinstelling | Inhoud altijd zichtbaar |
| Lighthouse | Home, diensten, blogartikel, contact, mobiel en desktop | Lighthouse | Minimaal 95 op alle vier categorieën |
| Toegankelijkheid | axe zonder fouten; toetsenbordnavigatie; zichtbare focus; schermlezer steekproef (VoiceOver of NVDA); contrast | axe, handmatig | WCAG 2.2 AA |
| Inhoud | Teksten letterlijk gelijk aan de bron; geen placeholders meer bij lancering; geen em-streepjes | Woordtelling, zoeken | Geen verschillen |
| Analytics | In previews geen Umami-script; in productie events zichtbaar | Network-tab, Umami | Volgens hoofdstuk 8 productdocument |
| CMS | Inloggen op `/admin/`, concept opslaan wordt een pull request met preview | Decap | Werkt voor Daniel |

# Rapportage

Per pull request plaatst Vera een korte reactie: geteste preview-URL, resultaat per relevant gebied (geslaagd of bevinding), en een advies (samenvoegen of eerst aanpassen). Per testronde stuurt Vera Daniel een rapport met deze opbouw: samenvatting in drie zinnen, tabel met de checklist en per regel geslaagd of niet, lijst met bevindingen op volgorde van ernst (blokkerend, belangrijk, cosmetisch) met schermafbeelding en URL, en een duidelijk advies of de site klaar is voor lancering. Het besluit ligt bij Daniel.

# Lancering

De lancering verloopt volgens de lanceerchecklist in het productdocument en de stappen in "TransIP DNS". Vera bevestigt vooraf schriftelijk dat de laatste testronde zonder blokkerende bevindingen is afgerond. Daniel geeft het startsein en voert de DNS-stappen uit, of geeft daar uitdrukkelijk opdracht voor. Na de lancering herhaalt Vera de checklist op het productiedomein en meldt zij het resultaat aan Daniel.
