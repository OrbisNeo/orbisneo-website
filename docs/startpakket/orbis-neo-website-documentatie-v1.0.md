---
title: "Orbis Neo Website Documentatie v1.0"
subtitle: "Gebundeld hoofddocument: productdocument, startopdracht, GitHub, werkafspraak en DNS"
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
| 1.0 | 15 oktober 2026 | Eerste gebundelde versie van de websitedocumentatie | Vera (Website & Voice) |

# Inleiding {.unnumbered}

## Doel van dit document {.unnumbered}

Dit hoofddocument bundelt de formele websitedocumentatie van Orbis Neo in één bestand, voor goedkeuring en archivering. De inhoud is gelijk aan die van de vijf losse documenten in het startpakket; elk document is hier een deel. De nummering van hoofdstukken en paragrafen begint per deel opnieuw en is gelijk aan die van het losse document, zodat verwijzingen binnen een deel (zoals "paragraaf 5.5" of "hoofdstuk 11") naar hetzelfde deel verwijzen.

## Scope {.unnumbered}

Binnen scope: de nieuwe website op www.orbisneoconsulting.com, de bouwopdracht, de inrichting van GitHub en Netlify, de werkafspraak over testen en goedkeuren en de DNS-stappen bij TransIP. Buiten scope: wijzigingen aan de live WordPress-site, mailboxinrichting in Microsoft 365 en de toekomstige portfoliopagina.

## Doelgroep {.unnumbered}

Daniel Fokker (eigenaar en goedkeurder), Claude Code of een ontwikkelaar (bouwer) en Vera (tester en rapporteur).

## Opbouw {.unnumbered}

| Deel | Document | Losse bestanden |
|---|---|---|
| 1 | Productdocument nieuwe website | `productdocument-nieuwe-website.md` en `.pdf` |
| 2 | Startopdracht Claude Code | `startopdracht-claude-code.md` en `.pdf` |
| 3 | GitHub-repo stappen | `github-repo-stappen.md` en `.pdf` |
| 4 | Werkafspraak bouw, test en goedkeuring | `werkafspraak.md` en `.pdf` |
| 5 | TransIP DNS | `transip-dns.md` en `.pdf` |


# Deel 1: Productdocument nieuwe website {.part}

## Versiebeheer {.unnumbered}

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 0.1 | 15 oktober 2026 | Onderzoek en voorstel nieuwe website (voorstel-nieuwe-website.md) | Vera (Website & Voice) |
| 0.9 | 15 oktober 2026 | Besluiten uit het interview met Daniel verwerkt (stack, domein, talen, design, homepage, content) | Vera (Website & Voice) |
| 1.0 | 15 oktober 2026 | Taalstrategie vastgesteld (Nederlandse adressen zonder prefix), formele documentopmaak, opgenomen in startpakket | Vera (Website & Voice) |

## Inleiding {.unnumbered}

### Doel van dit document {.unnumbered}

Dit document is het product- en ontwerpdocument voor de nieuwe website van Orbis Neo op www.orbisneoconsulting.com. Het legt vast wat er gebouwd wordt, hoe het eruitziet, hoe het technisch in elkaar zit en hoe de overgang van de huidige WordPress-site op orbisneo.nl verloopt. Het is zo opgesteld dat een ontwikkelaar of een AI-codebouwer (Claude Code, Cursor) direct kan beginnen met bouwen, zonder aanvullende ontwerpsessies. Waar een besluit nog openstaat, staat dat expliciet in hoofdstuk 11, en waar feiten van Daniel ontbreken, staat een herkenbare placeholder in de vorm `[PLACEHOLDER: ...]`.

### Scope {.unnumbered}

| Binnen scope | Buiten scope |
|---|---|
| Ontwerp en bouw van de publieke website in Engels (standaard) en Nederlands | Portfoliopagina (komt later) |
| Pagina's home, diensten, over, contact, blog, nieuws, privacy, bedankt, 404 | Donkere modus (bewust alleen licht) |
| Migratie van de zes gepubliceerde blogparen | Migratie van conceptblogs 507, 518, 523, 493, 495 en 506 |
| Decap CMS op `/admin`, Netlify-hosting, Netlify Forms, Umami-analytics | Aanpassen van LinkedIn-links (doet Daniel zelf) |
| DNS bij TransIP, redirects vanaf orbisneo.nl en orbisneo.com | Wijzigingen aan de live WordPress-site vóór de overgang |
| Behoud en aanvulling van de mailrecords voor Microsoft 365 | Inrichting van mailboxen en aliassen in Microsoft 365 zelf |
| Contenttype "nieuws" met reviewworkflow | Automatisch publiceren van welke content dan ook |

### Doelgroep {.unnumbered}

Het document is bedoeld voor drie lezers. Daniel Fokker is eigenaar en keurt het ontwerp, de teksten en elke publicatie goed. De bouwer (een ontwikkelaar of Claude Code) gebruikt het als bouwspecificatie. Vera, de website-assistent van Orbis Neo, gebruikt het als toetsingskader bij het testen van previews en als basis voor het wekelijkse nieuws.

### Bronnen {.unnumbered}

De inhoud is gebaseerd op het eerdere onderzoek `voorstel-nieuwe-website.md` (logo-analyse, palet, URL-inventaris, redirectkaart, blogparen en formulierverschillen), `palette.json`, de op 15 oktober 2026 opgehaalde pagina's in `html/`, de logobestanden in `logo/` en de besluiten uit het gesprek met Daniel op 15 oktober 2026. Externe technische feiten zijn gecontroleerd in de documentatie van Netlify, Astro, Decap CMS, Umami, TransIP en Microsoft en daar waar relevant met bron vermeld.

## Doel en uitgangspunten

### Doel van de nieuwe website

De nieuwe website moet directies van middelgrote en grotere ondernemingen in één bezoek laten zien wie Daniel Fokker is, wat hij in vijfentwintig jaar heeft gedaan in de domeinen die AI nu het hardst raakt, hoe hij over AI denkt en welke vier diensten hij levert. De huidige propositie blijft inhoudelijk gelijk: "AI is transforming your organisation from the inside" en de vier diensten Board scan, Ambition and position session, AI financial framework en Fractional support. Wat verandert, is de vorm. De homepage wordt één lange, rustig scrollende pagina in de stijl van een productpagina van Apple, die opent met Daniels loopbaan als reeks cases, daarna zijn visie via de blogs laat zien, vervolgens de diensten één voor één in beeld brengt en eindigt met de organisaties waar hij heeft gewerkt en een ingetogen uitnodiging tot contact.

Daarnaast lost de nieuwe site de technische problemen van de huidige site op: dubbele en verwarrende URL's (`/contact-2/`, `/blog-2/`, `/nl/home/`), een ontbrekende `x-default`, Engelse URL's die in het Nederlands landen, verschillen tussen het Nederlandse en Engelse formulier en het logo dat alleen als JPG op wit bestaat.

### Uitgangspunten (besluiten)

De volgende besluiten zijn op 15 oktober 2026 door Daniel genomen en zijn leidend voor de bouw.

| Onderwerp | Besluit |
|---|---|
| Sitegenerator | Astro, statische output, geen database |
| Contentbeheer | Decap CMS op `/admin`, blogs en nieuws als Markdown in Git, GitHub-backend |
| Hosting | Netlify, met Netlify Forms, `_redirects`, Edge Functions en deploy previews per pull request |
| Analytics | Umami (open source, cookieloos, geen cookiebanner), bij voorkeur Umami Cloud in de EU-regio |
| Broncode | Private GitHub-repository met GitHub Actions; elke pull request krijgt een eigen preview-URL |
| Primair domein | www.orbisneoconsulting.com; geen WordPress meer |
| DNS | TransIP, alleen als DNS-beheerder; de huidige 302-doorverwijzing via TransIP-webhosting vervalt |
| Oude domeinen | orbisneo.nl en orbisneo.com gaan na lancering met een 301 en padbehoud naar orbisneoconsulting.com |
| Mail | Blijft op Microsoft 365 (Outlook); nieuwe aliassen op orbisneoconsulting.com; mailrecords blijven intact |
| Talen | Engels is standaard en staat op de root; Nederlands is het alternatief |
| URL-structuur talen | Nooit `/nl/` of `/en/` in een URL; Nederlandse pagina's krijgen eigen Nederlandse adressen zonder prefix |
| SEO talen | `hreflang` per paar plus `x-default` naar de Engelse versie |
| Taaldetectie | Alleen bij het eerste bezoek aan de homepage, op basis van browsertaal en eventueel IP; nooit voor bots |
| Taalwisselaar | Zichtbaar in de header, springt naar de tegenhanger van de huidige pagina en onthoudt de keuze |
| Vormgeving | Alleen licht, logo in kleur, warm en niet klinisch, grote leesbare letters, vet en logokleur als accent |
| Ontwerpvolgorde | Desktop eerst ontworpen, daarna responsief naar beneden |
| Homepage | Eén lange scrollpagina: cv als cases, visie (blogs), diensten als scrollsegmenten, klantlogo's in grijstinten, subtiel contact |
| Klantlogo's | Grijstinten; het Info Support-logo blijft staan |
| Contactformulier | Gelijk in beide talen: naam, e-mail, telefoon, dienstkeuze, bericht, toestemming; Netlify Forms met honeypot |
| Blogs | De zes gepubliceerde paren gaan mee, gekoppeld via `translationKey`; concepten niet |
| Nieuws | Wekelijks nieuwsoverzicht, samengesteld door Vera, alleen via pull request met goedkeuring van Daniel |
| Logo | Daniel levert SVG of transparante PNG uit zijn OneDrive (Orbis Neo); een lichte logovariant is niet nodig |

### Kwaliteitseisen

De site haalt in Lighthouse op mobiel en desktop minimaal 95 voor prestaties, toegankelijkheid, best practices en SEO. Alle tekst voldoet aan WCAG 2.2 niveau AA, inclusief contrast, toetsenbordbediening, zichtbare focus en respect voor `prefers-reduced-motion`. Pagina's laden zonder JavaScript volledig en leesbaar; JavaScript verrijkt alleen (animaties, taalkeuze onthouden, analytics-events). Elke pagina heeft één `h1`, een unieke titel en metabeschrijving, een canonical en, waar een tegenhanger bestaat, `hreflang`. De totale JavaScript-bundel op de homepage blijft onder 30 kB gecomprimeerd, exclusief het Umami-script.

### Taalstrategie: eerlijke afweging en besluit

Daniel wilde oorspronkelijk dat de taal automatisch wordt gekozen en dat er nergens `/nl/` of `/en/` in een adres staat. Daar zit een spanning in die hier eerlijk wordt vastgelegd. Zoekmachines indexeren per URL. Als dezelfde URL afhankelijk van browsertaal, cookie of IP-adres Engels of Nederlands toont, ziet Google vrijwel altijd de Engelse versie, omdat Googlebot meestal zonder `Accept-Language` en vanaf Amerikaanse IP-adressen crawlt. De Nederlandse versie wordt dan niet geïndexeerd, en `hreflang` kan niet werken, omdat `hreflang` per definitie naar een andere URL verwijst. Er zijn drie manieren om met de wens om te gaan:

| Variant | Werking | Gevolg voor vindbaarheid |
|---|---|---|
| (a) Zelfde pad, taal via Edge Function en cookie | Eén URL per pagina; de Edge Function toont de Engelse of Nederlandse HTML | Nederlands niet indexeerbaar, geen `hreflang`, complexe caching met `Vary` |
| (b) Nederlandse adressen zonder prefix | Elke Nederlandse pagina heeft een eigen Nederlands adres, zoals `/diensten/` naast `/services/` | Beide talen indexeerbaar, `hreflang` en `x-default` werken volledig |
| (c) Nederlands op orbisneo.nl | Nederlands op een eigen domein | Werkt voor SEO, maar strijdig met het besluit om orbisneo.nl door te sturen |

**Besluit:** variant (b). Nederlandse pagina's krijgen eigen, Nederlandse adressen zonder taalprefix. Engels staat op de root, `hreflang="en"`, `hreflang="nl"` en `hreflang="x-default"` (naar Engels) staan op elke pagina met een tegenhanger. Automatische taaldetectie gebeurt alleen bij het eerste bezoek aan de Engelse homepage `/`, nooit voor bots en nooit op diepere pagina's: wie via Google op een Nederlandse blog landt, blijft daar. De taalwisselaar springt altijd naar het tegenhanger-adres van de huidige pagina en onthoudt de keuze in een functionele cookie. Daarmee wordt de wens van Daniel (geen prefix, automatisch de juiste taal voor nieuwe bezoekers, een onthouden keuze) zo goed mogelijk ingevuld zonder vindbaarheid op te offeren. De uitwerking staat in paragraaf 5.5 en hoofdstuk 7.

## Informatie-architectuur

### Sitemap

De site bestaat uit een korte, vlakke structuur. De homepage draagt het verhaal; de dienstenpagina en de over-pagina bieden de volledige tekst voor wie verder wil lezen en behouden de bestaande, goed gevonden adressen `/services/` en `/about/`.

```text
www.orbisneoconsulting.com
|
|-- /                         Home (EN, lange scrollpagina)
|   |-- #cases                Loopbaan als cases
|   |-- #perspective          Visie: laatste blogs + nieuws van deze week
|   |-- #services             Vier diensten als scrollsegmenten
|   |-- #clients              Organisaties (logo's in grijstinten)
|   |-- #contact              Subtiele uitnodiging
|-- /services/                Diensten, volledige tekst
|-- /about/                   Over Daniel en Orbis Neo, volledige loopbaan
|-- /blog/                    Blogoverzicht EN
|   |-- /blog/<en-slug>/      Blogartikel EN
|-- /news/                    Nieuwsarchief EN
|   |-- /news/<jjjj>-week-<ww>/   Weekeditie EN
|-- /contact/                 Contact EN
|   |-- /contact/thanks/      Bedankt (noindex)
|-- /privacy/                 Privacyverklaring EN
|
|-- /welkom/                  Home (NL)
|-- /diensten/                Diensten NL
|-- /over/                    Over NL
|-- /blog/overzicht/          Blogoverzicht NL
|   |-- /blog/<nl-slug>/      Blogartikel NL
|-- /nieuws/                  Nieuwsarchief NL
|   |-- /nieuws/<jjjj>-week-<ww>/ Weekeditie NL
|-- /kennismaken/             Contact NL
|   |-- /kennismaken/bedankt/ Bedankt (noindex)
|-- /privacybeleid/           Privacyverklaring NL
|
|-- /404.html                 Tweetalige foutpagina
|-- /admin/                   Decap CMS (noindex, niet in sitemap)
|-- /sitemap.xml, /robots.txt, /blog/feed.xml, /blog/overzicht/feed.xml
```

### URL-tabel Engels en Nederlands

| Functie | Engels (standaard) | Nederlands | Index | Opmerking |
|---|---|---|---|---|
| Home | `/` | `/welkom/` | ja | Taaldetectie alleen op `/`, alleen bij eerste bezoek |
| Diensten | `/services/` | `/diensten/` | ja | Ongewijzigd ten opzichte van nu (EN) |
| Over | `/about/` | `/over/` | ja | Ongewijzigd ten opzichte van nu (EN) |
| Blogoverzicht | `/blog/` | `/blog/overzicht/` | ja | `overzicht` is een gereserveerde slug |
| Blogartikel | `/blog/<en-slug>/` | `/blog/<nl-slug>/` | ja | Slugs per taal verschillend en uniek |
| Nieuwsarchief | `/news/` | `/nieuws/` | ja | |
| Nieuwseditie | `/news/2026-week-43/` | `/nieuws/2026-week-43/` | ja | Eén editie per week per taal |
| Contact | `/contact/` | `/kennismaken/` | ja | Sluit aan op de knop "Plan een kennismaking" |
| Bedankt | `/contact/thanks/` | `/kennismaken/bedankt/` | nee | `noindex`, niet in sitemap |
| Privacy | `/privacy/` | `/privacybeleid/` | ja | `/privacybeleid/` bestaat nu ook al |
| RSS | `/blog/feed.xml` | `/blog/overzicht/feed.xml` | n.v.t. | Vervangt `/feed/` en `/nl/feed/` |
| Foutpagina | `/404.html` | idem | nee | Tweetalig |

De Nederlandse blogslugs worden opgeschoond (kleine letters, koppeltekens, geen underscores):

| Datum | translationKey | Engelse titel en slug | Nederlandse titel en slug |
|---|---|---|---|
| 24-10-2025 | `ethical-ai` | Ethical AI: From Sentiment to Agreements That Work, `ethical-ai-from-sentiment-to-working-agreements` | Ethisch AI: van sentiment naar afspraken die wel werken, `ethische-ai` |
| 04-11-2025 | `ai-without-hype` | AI Without the Hype: 7 Management Decisions to Make First, `ai-without-the-hype` | AI zonder hype: 7 managementbesluiten die je eerst moet nemen, `ai-zonder-hype` |
| 05-01-2026 | `ai-automation-label` | Is AI just automation with a new label?, `is-ai-just-automation-with-a-new-label` | Is AI soms gewoon automatisering met een nieuw label?, `ai-gewoon-automatisering-met-nieuw-label` |
| 20-01-2026 | `getting-started` | Getting Started with AI?, `getting-started-with-ai` | Beginnen met AI?, `beginnen-met-ai` |
| 12-02-2026 | `ai-agents` | From Chaos to Clarity, `ai-agents-in-organisations` | Van Chaos naar Helderheid, `ai-agents-in-organisaties` |
| 18-05-2026 | `agent-sprawl` | Agent sprawl: the new shadow IT, `agent-sprawl-the-new-shadow-it` | Agent sprawl: de nieuwe shadow IT, `agent-sprawl-de-nieuwe-shadow-it` |

Alle zes blogs vallen nu in de categorie "AI in organisations" en "AI in Organisaties". De nieuwe site toont die categorie als label, maar maakt geen aparte categoriepagina's; oude categorie-, tag- en auteurspagina's worden doorgestuurd naar het blogoverzicht van de juiste taal.

### Navigatie

**Hoofdnavigatie (header).** Links staat het logo in kleur, dat naar de homepage van de actieve taal linkt. Rechts staan, in deze volgorde: Services / Diensten, About / Over, Blog, Contact / Kennismaken en de taalwisselaar `EN | NL`. Op de homepage verwijzen Services en Blog niet naar ankers maar naar de volwaardige pagina's, zodat de navigatie op elke pagina hetzelfde gedrag heeft. De contactlink is visueel ingetogen (tekstlink, geen knop), conform de wens dat contact subtiel blijft.

**Taalwisselaar.** Tekstlabels `EN` en `NL`, geen vlaggen. De actieve taal heeft `aria-current="true"` en een onderstreping in Neo-teal. De andere taal is een gewone link naar het tegenhanger-adres van de huidige pagina (`<a href="/diensten/" hreflang="nl" lang="nl">NL</a>`). Bestaat er geen tegenhanger, dan linkt de wisselaar naar het overzicht in de andere taal (bijvoorbeeld van een nieuwseditie die maar in één taal bestaat naar `/nieuws/`). Bij klikken schrijft een klein script de cookie `on_lang` (zie 5.5); zonder JavaScript werkt de link gewoon.

**Footer.** Logo, korte beschrijving van Orbis Neo, contactgegevens (e-mail, Amersfoort, KvK-nummer 98659456), links naar alle pagina's van de actieve taal, privacy, social links (LinkedIn `linkedin.com/in/danielfokker`, X `x.com/orbis_neo`, Instagram `instagram.com/orbisneo`, alle drie overgenomen van de huidige site) en de copyrighttekst. De footertekst is op de huidige site ook op Engelse pagina's Nederlands; de nieuwe site toont per taal een eigen versie (Engelse vertaling ter goedkeuring van Daniel).

**Kruimelpad.** Alleen op blogartikelen en nieuwsedities: Home, Blog (of Nieuws), artikeltitel. Opgemaakt als `BreadcrumbList` in structured data.

**Skiplink.** Eerste focusbaar element op elke pagina: "Skip to content" / "Naar de inhoud".

## Design system

### Ontwerpprincipes

De site is licht, warm en rustig. Warm betekent hier: veel wit, maar met een zachte, licht groengrijze ondergrond (#F2F5F1) en een warm gebroken wit (#F7F5F0) voor afwisselende secties, een letter met karakter in de koppen en royale witruimte, in plaats van strakke grijze kaders. Het logo staat altijd in kleur. Vet gedrukte koppen in Orbis-antraciet en accenten in Neo-teal dragen de merkherkenning; petrol wordt gebruikt voor koppen met nadruk en het donkerste deel van verlopen. Onderaan elke pagina loopt de logokleur als band in, met een verloop van wit naar teal, zodat elke pagina "landt" in het merk. Er is geen donkere modus.

### Kleuren

| Token | Hex | Gebruik | Contrast op wit | Contrast op #F2F5F1 |
|---|---|---|---|---|
| `--color-orbis` | #32434A | Hoofdtekst, koppen | 10,31 (AAA) | 9,38 (AAA) |
| `--color-neo` | #46969F | Accentlijnen, grote cijfers, iconen, logo | 3,43 (alleen groot of decoratief) | 3,12 |
| `--color-petrol` | #2B525C | Nadrukkoppen, verloop donker | 8,52 (AAA) | n.v.t. |
| `--color-action` | #2B6F78 | Links, primaire knoppen | 5,76 (AA) | 5,24 (AA) |
| `--color-action-hover` | #245E66 | Hover knop en link | 7,32 (wit op deze kleur) | |
| `--color-action-active` | #1F5158 | Ingedrukte knop | 8,84 (wit op deze kleur) | |
| `--color-text-soft` | #4A5A60 | Bijschriften, metadata | 7,19 (AAA) | 6,54 (AA) |
| `--color-bg` | #FFFFFF | Paginagrond | | |
| `--color-surface` | #F2F5F1 | Vlakken, kaarten | | |
| `--color-surface-warm` | #F7F5F0 | Afwisselende secties | tekst #32434A: 9,46 | |
| `--color-mist` | #E6F0F0 | Lichte tint van Neo voor verlopen | tekst #32434A: 8,88 | |
| `--color-border` | #E2E6E2 | Decoratieve randen | | |
| `--color-error` | #B42318 | Foutmeldingen formulier | 6,57 (AA) | |
| `--color-success` | #1E6B3A | Bevestiging formulier | 6,52 (AA) | |

Contrastwaarden zijn berekend met de WCAG 2.x-formule. Neo-teal #46969F haalt op wit 3,43:1 en wordt daarom nooit gebruikt voor lopende tekst of links, wel voor koppen vanaf 24 px vet, lijnen, cijfers en het logo. Witte tekst op Neo-teal is niet toegestaan (3,43:1); in de footerband staat de tekst daarom op het lichte deel van het verloop.

### Typografie

**Aanbeveling.** Koppen in **Fraunces** (variabel, gratis, SIL Open Font License) en lopende tekst in **Source Sans 3** (variabel, gratis, SIL Open Font License), beide zelf gehost via Fontsource (`@fontsource-variable/fraunces` en `@fontsource-variable/source-sans-3`). Fraunces geeft de koppen warmte en karakter zonder speels te worden, mits de as `SOFT` op 50 en `WONK` op 0 staat en het gewicht tussen 600 en 700 ligt. Source Sans 3 is zeer goed leesbaar op grote corpsen, heeft tabelcijfers en een complete set Nederlandse en Engelse tekens. Een alternatief voor wie liever alleen een schreefloze letter wil, is Figtree voor koppen en Source Sans 3 voor tekst (open punt 8).

| Rol | Font | Desktop (vanaf 1024 px) | Mobiel (tot 479 px) | Gewicht | Regelhoogte |
|---|---|---|---|---|---|
| Display (homepage-opening) | Fraunces | 80 px | 44 px | 650 | 1,05 |
| H1 | Fraunces | 60 px | 38 px | 650 | 1,1 |
| H2 | Fraunces | 44 px | 30 px | 600 | 1,15 |
| H3 | Fraunces | 30 px | 24 px | 600 | 1,25 |
| H4 | Source Sans 3 | 22 px | 20 px | 700 | 1,3 |
| Lead (intro) | Source Sans 3 | 24 px | 20 px | 400 | 1,5 |
| Body | Source Sans 3 | 19 px | 17 px | 400 | 1,65 |
| Small (meta) | Source Sans 3 | 16 px | 15 px | 500 | 1,5 |
| Label (knoppen, eyebrow) | Source Sans 3 | 15 px | 15 px | 700, hoofdletters, spatiëring 0,08em | 1,2 |

Alle groottes schalen vloeiend met `clamp()` tussen 360 en 1440 px schermbreedte. Lopende tekst heeft een maximale regellengte van 68 tekens (`max-width: 68ch`).

### Design tokens als CSS custom properties

```css
/* src/styles/tokens.css */
:root {
  /* Kleuren */
  --color-orbis: #32434A;
  --color-neo: #46969F;
  --color-petrol: #2B525C;
  --color-action: #2B6F78;
  --color-action-hover: #245E66;
  --color-action-active: #1F5158;
  --color-text: var(--color-orbis);
  --color-text-soft: #4A5A60;
  --color-bg: #FFFFFF;
  --color-surface: #F2F5F1;
  --color-surface-warm: #F7F5F0;
  --color-mist: #E6F0F0;
  --color-border: #E2E6E2;
  --color-error: #B42318;
  --color-success: #1E6B3A;
  --color-focus: #2B6F78;

  /* Verlopen */
  --gradient-footer: linear-gradient(180deg, #FFFFFF 0%, #E6F0F0 55%, #46969F 100%);
  --gradient-brand: linear-gradient(135deg, #2B525C 0%, #46969F 100%);

  /* Fonts */
  --font-display: "Fraunces Variable", Georgia, "Times New Roman", serif;
  --font-body: "Source Sans 3 Variable", "Segoe UI", system-ui, sans-serif;
  --font-display-settings: "SOFT" 50, "WONK" 0, "opsz" 72;

  /* Typeschaal (vloeiend tussen 360 en 1440 px) */
  --fs-display: clamp(2.75rem, 1.9rem + 3.78vw, 5rem);
  --fs-h1: clamp(2.375rem, 1.79rem + 2.59vw, 3.75rem);
  --fs-h2: clamp(1.875rem, 1.58rem + 1.3vw, 2.75rem);
  --fs-h3: clamp(1.5rem, 1.37rem + 0.56vw, 1.875rem);
  --fs-h4: clamp(1.25rem, 1.21rem + 0.19vw, 1.375rem);
  --fs-lead: clamp(1.25rem, 1.17rem + 0.37vw, 1.5rem);
  --fs-body: clamp(1.0625rem, 1.02rem + 0.19vw, 1.1875rem);
  --fs-small: clamp(0.9375rem, 0.92rem + 0.09vw, 1rem);
  --fs-label: 0.9375rem;
  --lh-tight: 1.1;
  --lh-heading: 1.2;
  --lh-body: 1.65;
  --measure: 68ch;

  /* Ruimte (basis 4 px) */
  --space-1: 0.25rem;  /* 4 */
  --space-2: 0.5rem;   /* 8 */
  --space-3: 0.75rem;  /* 12 */
  --space-4: 1rem;     /* 16 */
  --space-5: 1.5rem;   /* 24 */
  --space-6: 2rem;     /* 32 */
  --space-7: 3rem;     /* 48 */
  --space-8: 4rem;     /* 64 */
  --space-9: 6rem;     /* 96 */
  --space-10: 8rem;    /* 128 */
  --section-y: clamp(4rem, 2.5rem + 6.67vw, 8rem);
  --gutter: clamp(1.25rem, 0.5rem + 3.33vw, 3rem);
  --container: 1280px;
  --container-narrow: 760px;

  /* Radii */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-pill: 999px;

  /* Schaduwen (zacht, warm) */
  --shadow-sm: 0 1px 2px rgba(50, 67, 74, 0.06), 0 1px 3px rgba(50, 67, 74, 0.08);
  --shadow-md: 0 4px 12px rgba(50, 67, 74, 0.08), 0 2px 4px rgba(50, 67, 74, 0.06);
  --shadow-lg: 0 18px 40px rgba(43, 82, 92, 0.12), 0 4px 10px rgba(43, 82, 92, 0.06);

  /* Beweging */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-reveal: 700ms;

  /* Lagen */
  --z-header: 50;
  --z-overlay: 100;

  /* Breekpunten (ter referentie; custom properties werken niet in media queries) */
  --bp-xl: 1440px;
  --bp-lg: 1024px;
  --bp-md: 768px;
  --bp-sm: 480px;
}

@media (prefers-reduced-motion: reduce) {
  :root { --duration-fast: 0ms; --duration-base: 0ms; --duration-reveal: 0ms; }
}
```

### Breekpunten

Er wordt desktop eerst ontworpen en gebouwd; media queries gebruiken daarom `max-width`. Omdat custom properties niet in media queries kunnen, staan de breekpunten ook als constanten in `src/styles/breakpoints.ts` en als PostCSS custom media (`@custom-media --below-lg (max-width: 1023.98px);`).

| Naam | Bereik | Ontwerpbasis | Kolommen | Gutter |
|---|---|---|---|---|
| XL | vanaf 1440 px | 1440 px | 12 | 48 px |
| Desktop | 1024 tot 1439 px | 1280 px | 12 | 40 px |
| Tablet | 768 tot 1023 px | 834 px | 8 | 32 px |
| Mobiel groot | 480 tot 767 px | 600 px | 4 | 24 px |
| Mobiel klein | tot 479 px | 375 px | 4 | 20 px |

### Componenten en staten

Elke interactieve component heeft vijf staten: standaard, hover, focus-visible, actief (ingedrukt) en uitgeschakeld. Focus is altijd zichtbaar als een ring van 3 px in `--color-focus` met 3 px afstand (`outline: 3px solid var(--color-focus); outline-offset: 3px;`). Tikvlakken zijn minimaal 44 bij 44 px.

| Component | Standaard | Hover | Focus-visible | Actief | Uitgeschakeld / overig |
|---|---|---|---|---|---|
| Knop primair | Achtergrond #2B6F78, witte tekst, label 15 px vet, radius pill, padding 14 x 28 px | Achtergrond #245E66, pijl schuift 4 px | Focusring | Achtergrond #1F5158 | Achtergrond #E2E6E2, tekst #4A5A60, `aria-disabled` |
| Knop secundair | Transparant, rand 2 px #2B6F78, tekst #2B6F78 | Achtergrond #E6F0F0 | Focusring | Achtergrond #DCEDEE | Rand en tekst #4A5A60 |
| Tekstlink | #2B6F78, onderstreept 1 px, offset 3 px | Onderstreping 2 px, kleur #245E66 | Focusring | #1F5158 | Bezocht: zelfde kleur |
| Navigatielink | #32434A, 17 px, gewicht 600 | Onderstreping 2 px Neo-teal | Focusring | n.v.t. | Actieve pagina: `aria-current="page"`, onderstreping blijvend |
| Taalwisselaar | EN en NL naast elkaar, actieve taal vet met teal onderstreping | Niet-actieve taal onderstreept | Focusring | n.v.t. | Geen tegenhanger: link naar overzicht |
| Header | Wit, hoogte 88 px, logo 44 px hoog | n.v.t. | n.v.t. | n.v.t. | Na 80 px scrollen: hoogte 64 px, logo 34 px, `--shadow-sm`, achtergrond wit 92 procent met blur |
| Casekaart | Achtergrond wit, rand 1 px #E2E6E2, radius 20 px, padding 40 px | `--shadow-md`, rand Neo-teal | Focusring rond kaart als link | n.v.t. | Placeholder-inhoud zichtbaar gemarkeerd in preview, nooit in productie |
| Blogkaart | Afbeelding 16:10, label, titel H3, datum, samenvatting | Afbeelding schaalt 1,03, titel onderstreept | Focusring | n.v.t. | Zonder afbeelding: vlak met merkverloop |
| Dienstsegment | Schermvullend segment, groot nummer in Neo-teal | n.v.t. | Ankers focusbaar | n.v.t. | Reveal: zie 4.2 |
| Kenmerkenlijst dienst | Definitielijst (`dl`) met Voor wie, Duur, Oplevering, Prijs | n.v.t. | n.v.t. | n.v.t. | |
| Klantlogo | Grijstinten (`filter: grayscale(1)`, `opacity: .75`), max hoogte 48 px | Opacity 1 (geen kleur, blijft grijs) | n.v.t. (geen link) | n.v.t. | |
| Invoerveld | Rand 1,5 px #B9C4C4, radius 12 px, hoogte 52 px, label boven veld | Rand #4A5A60 | Rand 2 px #2B6F78 plus focusring | n.v.t. | Fout: rand #B42318, foutmelding onder veld met icoon, `aria-invalid="true"`, `aria-describedby` |
| Checkbox | 22 px, rand 1,5 px, radius 6 px | Rand #2B6F78 | Focusring | Aangevinkt: vlak #2B6F78 met wit vinkje | Fout bij verplichte toestemming |
| Melding | Vlak met icoon en tekst, radius 12 px | n.v.t. | Krijgt focus na verzenden | n.v.t. | Succes (#1E6B3A) en fout (#B42318) |
| Nieuwsitem | Bron, titel als link, één zin commentaar van Daniel | Titel onderstreept | Focusring | n.v.t. | Externe link met icoon en "opent externe site" voor schermlezers |
| Footerband | Verloop `--gradient-footer`, tekst #32434A op lichte deel, onderrand 12 px massief #46969F | n.v.t. | n.v.t. | n.v.t. | |
| Skiplink | Buiten beeld | n.v.t. | Zichtbaar linksboven, knopstijl | n.v.t. | |

### Logo

Het logo wordt in kleur gebruikt, op wit of op `--color-surface`. Daniel levert vanuit zijn OneDrive (map Orbis Neo) een SVG of een PNG met transparante achtergrond van zowel het beeldmerk als beeldmerk plus woordmerk; de huidige site heeft alleen JPG op wit. Tot die bestanden er zijn, gebruikt de bouwer `logo/logo-transparant.png` als tijdelijke plaatsvervanger. Een lichte (negatieve) variant is niet nodig, omdat de site alleen licht is. Minimale breedte van beeldmerk plus woordmerk: 140 px; vrije ruimte rondom: de hoogte van de letter "O". Favicons worden uit het beeldmerk gegenereerd (SVG-favicon, 32 px PNG, 180 px Apple touch icon, 192 en 512 px voor het webmanifest).

### Beeldtaal

Daniels portretfoto (`Daniel-Fokker-Orbis-Neo.jpeg`, nu op de site) is het belangrijkste beeld. De huidige blogafbeeldingen zijn stockfoto's; die gaan mee, maar de licentie wordt gecontroleerd (open punt 13). Als grafisch element gebruikt de site fragmenten van het netwerk van banen en knooppunten uit het beeldmerk, als dunne lijnen in Neo-teal op 15 procent dekking, nooit over tekst. Afbeeldingen worden geleverd als AVIF en WebP met `srcset` en een expliciete breedte en hoogte, zodat de layout niet verspringt.

## Paginastructuur

Deze paragraaf beschrijft elke pagina sectie voor sectie, met het gedrag per breekpunt. Teksten worden letterlijk overgenomen van de huidige site, tenzij anders vermeld. Alle Engelse teksten hebben een Nederlandse tegenhanger die al op de huidige site staat.

### Gemeenschappelijke onderdelen

| Onderdeel | Desktop en XL | Tablet | Mobiel |
|---|---|---|---|
| Header | Logo links, navigatie en taalwisselaar rechts op één regel, sticky, wordt compact na 80 px scrollen | Logo links, navigatie verborgen achter menuknop, taalwisselaar blijft zichtbaar naast de knop | Als tablet; menu opent als schermvullend paneel met grote links (24 px), taalwisselaar onderaan het paneel |
| Footerband | Vier kolommen (merk, pagina's, contact, social) op het verloop, onderrand 12 px Neo-teal | Twee kolommen | Eén kolom, gecentreerd |
| Container | Max 1280 px, gecentreerd; achtergrondvlakken lopen door tot de rand | Volle breedte min gutter | Volle breedte min gutter |

### Homepage (`/` en `/welkom/`)

De homepage is één lange scrollpagina in vijf hoofdstukken. Elk hoofdstuk heeft een eigen ritme: veel witruimte, één boodschap per scherm en zachte overgangen in achtergrondkleur tussen wit, `--color-surface-warm` en `--color-surface`.

#### Sectie 1: Opening en loopbaan als cases (`#cases`)

**Opening (eerste scherm).** Links groot de display-kop, overgenomen van de huidige homepage: "AI is transforming your organisation from the inside." (NL: "AI verandert uw organisatie van binnenuit."). Daarboven de eyebrow "For boards of mid-market and larger companies". Daaronder de lead: "I help you stay in control of the areas it affects most. Not awareness sessions, but practical direction." Rechts het portret van Daniel in een afgeronde uitsnede (radius 20 px) met naam en rol: "Daniel Fokker, interim Head of IT and consultant in AI strategy, policy and governance" (NL: "Daniel Fokker, interim Head of IT en adviseur AI-strategie, -beleid en -governance"). Onderaan het scherm een rustige scroll-aanwijzing ("25 years in the domains AI is now changing most"). Er staat geen opvallende knop in het eerste scherm; alleen een tekstlink "Plan a short intro (15 min)".

**Inleiding op de cases.** Eén alinea, overgenomen van de over-pagina: "I've spent twenty-five years working in the areas that AI is now disrupting most. IT delivery and software development, IT operations and management, enterprise architecture, HR, and IT financial management." Gevolgd door de zin over enterprise architecture als rode draad.

**Cases.** Elke werkervaring wordt een case met drie onderdelen: Situatie, Rol en Resultaat. Op desktop staat links een sticky tijdlijn met jaartallen en organisatienamen, die meebeweegt en de actieve case markeert; rechts scrollen de casekaarten. Alleen feiten van de huidige over-pagina zijn gebruikt. Wat ontbreekt, is als placeholder gemarkeerd en moet door Daniel worden ingevuld vóór lancering.

| # | Organisatie en periode | Situatie | Rol | Resultaat |
|---|---|---|---|---|
| 1 | `[PLACEHOLDER: organisatie of anoniem]`, `[PLACEHOLDER: periode]` | `[PLACEHOLDER: situatie]` | Interim Head of IT | `[PLACEHOLDER: resultaat]` |
| 2 | Info Support International Group, 2026 tot heden | Een groep met meerdere businessunits die AI verantwoord wil adopteren | Lead AI Policy & Governance: ontwikkeling van groepsbreed AI-beleid, governance en praktische kaders | `[PLACEHOLDER: concreet resultaat]` |
| 3 | Stichting Studielink, 2022 tot 2025 | Een landelijk digitaal platform dat technisch en organisatorisch richting nodig had | Manager Development and Architecture, lid van het managementteam, met regie op enterprise architecture, platformvernieuwing en de veranderroadmap | `[PLACEHOLDER: concreet resultaat, bijvoorbeeld wat de platformvernieuwing opleverde]` |
| 4 | VodafoneZiggo, 2019 tot 2022 | Kosten- en waardesturing voor een van de grootste IT-organisaties van Nederland | Enterprise Architect met focus op IT Financial Management | Kostenmodellering, dashboards voor directie en MT, EA-tooling en betere delivery-doorstroming; `[PLACEHOLDER: kwantificering indien gewenst]` |
| 5 | VodafoneZiggo, 2017 tot 2019 | De fusie van Vodafone en Ziggo, in een complexe omgeving met veel stakeholders | Programme Manager Integration, verantwoordelijk voor de HR- en B2B-programma's | Realisatie van de beoogde synergieën; `[PLACEHOLDER: details]` |
| 6 | Ziggo, 2014 tot 2017 | Het zakelijke segment | Demand Manager B2B en Strategic Vendor Manager: roadmap, leveranciersturing, budgettering en planning | `[PLACEHOLDER: resultaat]` |
| 7 | Ordina, 2001 tot 2014 | IT-dienstverlening voor een brede klantportefeuille | Manager Customer Service and Service Delivery: IT-servicemanagement, teamontwikkeling en managed services | `[PLACEHOLDER: resultaat]` |
| 8 | UWV, 1999 tot 2004 | Applicatieontwikkeling | Projectmanager applicatieontwikkeling en releasemanagement | `[PLACEHOLDER: resultaat]` |

Onder de cases volgt een compacte strook "Education and knowledge": MSc Business Administration, Radboud University (2013 tot 2017); BSc Business Informatics, Avans (1999 tot 2002); TOGAF, ArchiMate, IT4IT, TBM/IT Financial Management, PRINCE2, SAFe/Agile/Scrum, Lean Six Sigma. Daarna één blok "How I work", overgenomen van de over-pagina: interim en parttime, altijd met een eindpunt en een overdracht aan een interne eigenaar, met een link "Read the full story" naar `/about/`.

Let op: de huidige site noemt de rol bij Info Support "2026 tot heden" en noemt geen interim Head of IT-opdracht. De bouwer neemt de case "Interim Head of IT" alleen op met door Daniel aangeleverde feiten (open punt 6).

| Breekpunt | Gedrag |
|---|---|
| Desktop en XL | Opening tweekoloms (tekst 7 kolommen, portret 5); cases met sticky tijdlijn links (3 kolommen) en kaarten rechts (8 kolommen) |
| Tablet | Opening tweekoloms met kleiner portret; tijdlijn wordt een horizontale jaartallenbalk boven de kaarten, sticky onder de header |
| Mobiel | Portret boven de kop (max 240 px); geen sticky tijdlijn; elke kaart toont het jaartal als eyebrow; Situatie, Rol en Resultaat onder elkaar |

#### Sectie 2: Visie (`#perspective`)

Kop: "Perspective" (NL: "Visie"), met de ondertitel "How I look at AI in organisations" (vertaling ter goedkeuring). Daaronder de drie meest recente blogs als kaarten en een link "All articles" naar `/blog/`. Rechts naast of onder de kaarten staat een compacte kaart "This week" met de titel en de eerste drie items van de meest recente nieuwseditie, plus een link naar de editie. Bestaat er nog geen goedgekeurde editie, dan wordt de kaart niet getoond.

| Breekpunt | Gedrag |
|---|---|
| Desktop en XL | Drie blogkaarten op een rij (elk 3 kolommen) plus nieuwskaart (3 kolommen) |
| Tablet | Twee blogkaarten per rij, nieuwskaart volle breedte eronder |
| Mobiel | Horizontaal veegbare strook blogkaarten met scroll-snap en zichtbare indicator, nieuwskaart eronder |

#### Sectie 3: Diensten als scrollsegmenten (`#services`)

Intro: "Four services. Each with a clear outcome." met de bestaande intro "I don't deliver open-ended engagements or reports that gather dust..." Daarna één segment per dienst, elk minimaal 85 procent van de schermhoogte (`min-height: 85svh`). Elk segment toont het nummer groot in Neo-teal, de titel, de kernzin, twee à drie alinea's en de kenmerkenlijst. Er worden geen bedragen genoemd; de prijsregel is letterlijk de tekst van de huidige site.

| # | Dienst EN / NL | Kernzin | Voor wie | Duur | Oplevering | Prijs |
|---|---|---|---|---|---|---|
| 1 | Board scan / Directie scan | Within a few days, you'll know where you stand. | CEO, CFO, CIO or board team | Three to five days | Board conversation plus concise priorities memo | Fixed fee, agreed upfront |
| 2 | Ambition and position session / Ambitie- en positie sessie | Your board defines its own AI position. Concrete, and agreed. | Board team, two to eight participants | Preparation plus half a day to a full day | Agreed AI position document, ready for internal use | Fixed fee, agreed upfront |
| 3 | AI financial framework / Financieel kader voor AI | A clear answer to the financial questions around AI, at last. | CFO, finance director, or IT leader with budget responsibility | Two to four weeks, depending on available data | Framework, financial model and implementation plan for embedding | Day rate, scope agreed upfront |
| 4 | Fractional support / Interim-ondersteuning | Senior steering for an agreed period, with a clear endpoint. | Board or leadership team needing senior steering without a permanent hire | One to two days a week, minimum three months | Fixed rhythm, direct access, periodic reporting to the board | Fixed monthly fee based on days deployed |

De Board scan noemt op de huidige site ook "Group size: 6 to 20 participants", terwijl de doelgroep "CEO, CFO, CIO or board team" is. Dat wordt overgenomen, maar ter controle aan Daniel voorgelegd (open punt 12). Na het vierde segment volgt het afsluitende blok "Which service fits your situation? Not sure? Start with the board scan." met een secundaire knop naar `/services/` en een tekstlink naar contact.

**Scroll-reveal.** Elk segment krijgt het attribuut `data-reveal`. Een `IntersectionObserver` (drempel 0,25) voegt de klasse `is-visible` toe; de inhoud schuift dan in 700 ms van 24 px omlaag naar zijn plek en van dekking 0 naar 1, met een vertraging van 80 ms per onderdeel (nummer, titel, tekst, kenmerken). Het nummer telt niet op en er is geen parallax van tekst, om onrust te vermijden. Op desktop toont een smalle voortgangsindicator links (1 tot en met 4) welk segment actief is. Bij `prefers-reduced-motion: reduce` is alles direct zichtbaar, zonder verschuiving, en zonder JavaScript is de inhoud ook gewoon zichtbaar (de verborgen beginstand wordt pas gezet als het script de klasse `js` op `html` heeft gezet).

```css
.js [data-reveal] > * { opacity: 0; transform: translateY(24px); }
.js [data-reveal].is-visible > * {
  opacity: 1; transform: none;
  transition: opacity var(--duration-reveal) var(--ease-out),
              transform var(--duration-reveal) var(--ease-out);
}
.js [data-reveal].is-visible > *:nth-child(2) { transition-delay: 80ms; }
.js [data-reveal].is-visible > *:nth-child(3) { transition-delay: 160ms; }
.js [data-reveal].is-visible > *:nth-child(4) { transition-delay: 240ms; }
@media (prefers-reduced-motion: reduce) {
  .js [data-reveal] > * { opacity: 1; transform: none; transition: none; }
}
```

| Breekpunt | Gedrag |
|---|---|
| Desktop en XL | Segment tweekoloms: links nummer en titel (sticky binnen het segment), rechts tekst en kenmerken; voortgangsindicator links |
| Tablet | Eén kolom, nummer en titel boven de tekst; geen voortgangsindicator; segmenthoogte vrij |
| Mobiel | Als tablet; kenmerken als gestapelde lijst; `min-height` vervalt zodat er geen lege schermen ontstaan |

#### Sectie 4: Organisaties (`#clients`)

Kop: "Organisations I have worked for" (NL: "Organisaties waar ik heb gewerkt"). De logo's in grijstinten, in deze volgorde (zoals nu op de site): Ziggo, Ordina, Studielink, UWV, VodafoneZiggo, Essent, Rijkswaterstaat, IVO Rechtspraak, gemeente Rotterdam, Sopra Steria en Info Support. Het Info Support-logo blijft staan. Essent, Rijkswaterstaat, Rechtspraak/IVO, gemeente Rotterdam en Sopra Steria staan niet als werkgever in de loopbaan; Daniel bevestigt de context en of de vermelding akkoord is (open punt 7). Logo's worden als SVG of transparante PNG opgeslagen, krijgen een `alt` met de organisatienaam en zijn geen links.

| Breekpunt | Gedrag |
|---|---|
| Desktop en XL | Raster van zes per rij, verticaal gecentreerd, max hoogte 48 px |
| Tablet | Vier per rij |
| Mobiel | Drie per rij, max hoogte 36 px; geen automatisch scrollende carrousel |

#### Sectie 5: Subtiel contact (`#contact`)

Een rustig blok op `--color-surface-warm`, zonder formulier: "Want to find out whether this fits your situation? A first conversation takes fifteen minutes and is free of obligation." met een tekstlink "Schedule an intro call" naar `/contact/` en het e-mailadres als tekstlink. Daarna volgt de footerband.

### Dienstenpagina (`/services/` en `/diensten/`)

De volledige tekst van de huidige dienstenpagina, in dezelfde volgorde: kop "Four services. Each with a clear outcome.", intro, de vier diensten met alle alinea's en kenmerken, en het afsluitende blok. Elke dienst heeft een anker (`#board-scan`, `#ambition-session`, `#ai-financial-framework`, `#fractional-support`; NL `#directiescan`, `#ambitiesessie`, `#financieel-kader`, `#interim-ondersteuning`) en een inhoudsnavigatie bovenaan. De opmaak gebruikt dezelfde segmentcomponent als de homepage, maar zonder schermvullende hoogte.

### Over-pagina (`/about/` en `/over/`)

Opening met "About Daniel Fokker and Orbis Neo" en de lead "Grip starts with factual insight...", portret, de blokken "Why my background is relevant right now", "How I work", de volledige loopbaan als cases (dezelfde collectie als de homepage, maar alle velden uitgeklapt), opleiding en certificeringen, het blok "About the name: Orbis Neo" en het afsluitende contactblok.

### Blogoverzicht (`/blog/` en `/blog/overzicht/`)

Kop "Blog" met de huidige ondertitel "Insights on Organization, Strategy & AI" (NL ter goedkeuring), daaronder de meest recente blog uitgelicht (grote kaart over de volle breedte), gevolgd door de overige blogs in een raster, nieuwste eerst. Bovenaan rechts een link naar het nieuwsarchief. Bij meer dan twaalf artikelen komt paginering (`/blog/2/`; NL `/blog/overzicht/2/`). Raster: drie kolommen op desktop, twee op tablet, één op mobiel.

### Blogartikel (`/blog/<slug>/`)

Kruimelpad, label (categorie), titel (H1), auteur, publicatiedatum, eventueel bijgewerkt-datum en leestijd. Daaronder de omslagafbeelding op 16:9 (max 1280 px breed), dan de tekst op leesbreedte (68 tekens, 19 px). Tussenkoppen H2 en H3, citaten met een dikke linkerrand in Neo-teal, tabellen met horizontale scroll op mobiel. Onderaan: een korte auteursbox met portret en één zin, een link "Lees dit artikel in het Nederlands" als er een tegenhanger is, twee gerelateerde artikelen (zelfde categorie, nieuwste eerst) en het subtiele contactblok. Op desktop staat links naast de tekst een kleine inhoudsopgave van de H2-koppen, sticky; op tablet en mobiel vervalt die.

### Nieuwsarchief en nieuwseditie (`/news/`, `/nieuws/`)

Het archief toont de edities, nieuwste eerst, met weeknummer, datum en samenvatting. Een editie toont een korte introductie, daarna de items als lijst: bron, titel als externe link, de datum van het bronartikel en één of twee zinnen duiding. Onderaan staat de vaste tekst "Curated by Vera, the Orbis Neo assistant, and reviewed by Daniel Fokker" (NL: "Samengesteld door Vera, de assistent van Orbis Neo, en beoordeeld door Daniel Fokker").

### Contactpagina (`/contact/` en `/kennismaken/`)

Ingetogen, tweekoloms op desktop. Links: kop "Please contact Orbis Neo" (NL "Neem contact op met Orbis Neo"), één zin dat een eerste gesprek vijftien minuten duurt, e-mail, telefoon (+31 6 53 38 03 29, nu op de site als "+31 (0) 653380329"), "Amersfoort, Nederland" en de LinkedIn-link. Rechts het formulier. Op tablet en mobiel staat het formulier onder de gegevens.

| Veld | Type | Verplicht | Label EN | Label NL |
|---|---|---|---|---|
| `name` | text, `autocomplete="name"` | ja | Your name | Uw naam |
| `email` | email, `autocomplete="email"` | ja | Email address | E-mailadres |
| `phone` | tel, `autocomplete="tel"` | nee | Phone number | Telefoonnummer |
| `services[]` | checkboxen | nee | What is your question about? Board scan, Ambition and position session, AI financial framework, Fractional support, Not sure yet | Waar gaat uw vraag over? Directie scan, Ambitie- en positie sessie, Financieel kader voor AI, Interim-ondersteuning, Weet ik nog niet |
| `message` | textarea, 6 regels | ja | Your request | Uw vraag |
| `consent` | checkbox | ja | I agree that Orbis Neo may contact me (with a link to the privacy statement) | Ik ga akkoord dat Orbis Neo contact met mij opneemt (met link naar het privacybeleid) |
| `bot-field` | text, verborgen | n.v.t. | Honeypot | Honeypot |
| `language` | hidden | n.v.t. | `en` | `nl` |

Validatie gebeurt met native HTML-validatie plus een klein script dat de foutmeldingen in de juiste taal toont en de focus op het eerste foute veld zet. Na verzenden volgt de bedanktpagina in dezelfde taal. Formulierdetails staan in 5.8.

### Privacypagina (`/privacy/` en `/privacybeleid/`)

Een eenvoudige tekstpagina op leesbreedte. De bestaande privacyverklaring wordt overgenomen en bijgewerkt met de nieuwe verwerkers: Netlify (hosting en formulieren), Umami (cookieloze statistieken), Microsoft 365 (e-mail) en GitHub (opslag van content). Daarnaast wordt de functionele taalcookie `on_lang` genoemd. Vera levert de bijgewerkte tekst als concept; Daniel keurt goed.

### Bedanktpagina en 404

De bedanktpagina bevestigt in één zin dat het bericht is ontvangen en dat Daniel binnen `[PLACEHOLDER: termijn, bijvoorbeeld twee werkdagen]` reageert, met een link terug naar de homepage. Beide hebben `noindex`. De 404-pagina is tweetalig ("This page does not exist (anymore). / Deze pagina bestaat niet (meer).") met links naar beide homepages, de blogoverzichten en contact.

## Technische architectuur

### Overzicht

| Laag | Keuze | Toelichting |
|---|---|---|
| Framework | Astro 6, `output: "static"` | Volledig statische HTML; geen server, geen database |
| Taal | TypeScript (strict) | Ook voor content-schema's en Edge Function |
| Styling | Gewone CSS met custom properties, per component gescoped (`<style>` in `.astro`) | Geen CSS-framework nodig; PostCSS voor custom media |
| Content | Astro content collections met `glob()`-loader en Zod-schema's | Markdown en YAML in Git |
| CMS | Decap CMS 3, statisch op `/admin/` | GitHub-backend met Netlify als OAuth-provider |
| Hosting | Netlify | Build, CDN, Forms, Edge Functions, `_redirects`, deploy previews |
| Analytics | Umami Cloud (EU) | Eén script, cookieloos |
| CI | GitHub Actions | Typecheck, build, contentcontrole, linkcheck, toegankelijkheid |
| Node | 22 LTS | Vastgelegd in `.nvmrc` en `netlify.toml` |

Astro 6 definieert content collections in `src/content.config.ts`, met `glob()` uit `astro/loaders` en Zod uit `astro/zod` (Zod 4); bron: docs.astro.build, Content collections en Upgrade to Astro v6.

### Mappenstructuur van de repository

```text
orbisneo-website/
|-- .github/
|   |-- workflows/ci.yml
|   |-- CODEOWNERS
|   |-- pull_request_template.md
|-- netlify/
|   |-- edge-functions/language.ts
|-- public/
|   |-- _redirects
|   |-- admin/
|   |   |-- index.html
|   |   |-- config.yml
|   |-- fonts/ (alleen indien niet via Fontsource)
|   |-- favicon.svg, favicon-32.png, apple-touch-icon.png, site.webmanifest
|   |-- images/logos/ (klantlogo's, SVG of PNG)
|-- scripts/
|   |-- check-content.ts     (paren, slugs, placeholders)
|   |-- check-redirects.ts   (alle doelen van _redirects bestaan in dist)
|   |-- migrate-wp.ts        (eenmalige export via WP REST API)
|-- src/
|   |-- assets/
|   |   |-- brand/ (logo.svg, beeldmerk.svg)
|   |   |-- blog/ (omslagafbeeldingen)
|   |   |-- people/daniel-fokker.jpg
|   |-- components/
|   |-- content/
|   |   |-- blog/en/*.md, blog/nl/*.md
|   |   |-- nieuws/en/*.md, nieuws/nl/*.md
|   |   |-- diensten/en/*.md, diensten/nl/*.md
|   |   |-- cases/en/*.md, cases/nl/*.md
|   |   |-- clients/clients.yaml
|   |-- content.config.ts
|   |-- data/site.ts (contactgegevens, social links, KvK)
|   |-- i18n/
|   |   |-- routes.ts (vaste paginaparen)
|   |   |-- ui.ts (interfaceteksten EN en NL)
|   |   |-- utils.ts (alternates, t(), formatDate)
|   |-- layouts/
|   |   |-- BaseLayout.astro
|   |   |-- ArticleLayout.astro
|   |-- pages/ (zie 5.6)
|   |-- scripts/ (reveal.ts, lang-switch.ts, analytics.ts, form.ts)
|   |-- styles/ (tokens.css, base.css, prose.css, breakpoints.ts)
|-- astro.config.mjs
|-- netlify.toml
|-- package.json, tsconfig.json, .nvmrc, .editorconfig
|-- README.md
```

### Astro-configuratie

Astro's ingebouwde i18n-routering werkt met taalprefixen (`/nl/...`). Omdat Nederlandse pagina's eigen adressen zonder prefix krijgen, wordt die routering bewust niet gebruikt. De taal is een eigenschap van elke pagina en elk content-item; de koppeling tussen talen loopt via `src/i18n/routes.ts` voor vaste pagina's en via `translationKey` voor content. Om dezelfde reden wordt de sitemap door een eigen endpoint gemaakt, zodat er `xhtml:link`-alternates in kunnen.

```js
// astro.config.mjs
import { defineConfig } from "astro/config";

const isProd = process.env.CONTEXT === "production" && process.env.PUBLIC_NOINDEX !== "true";

export default defineConfig({
  site: "https://www.orbisneoconsulting.com",
  output: "static",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "auto" },
  prefetch: { prefetchAll: false, defaultStrategy: "hover" },
  image: { responsiveStyles: true },
  vite: { define: { __IS_PROD__: JSON.stringify(isProd) } },
});
```

### Content collections met Zod-schema's

Bestanden staan per taal in een eigen map (`en/` en `nl/`), met de `translationKey` als bestandsnaam. De taal van een item wordt afgeleid uit die map (`entry.id` begint met `en/` of `nl/`, helper `langOf(entry)` in `src/i18n/utils.ts`) en staat dus niet in de frontmatter. Daardoor zijn beide versies in Decap naast elkaar te bewerken (i18n-structuur `multiple_folders`). Het URL-deel heet bewust `urlSlug` en niet `slug`, omdat de `glob()`-loader een frontmatterveld `slug` gebruikt als id van het item.

```ts
// src/content.config.ts
import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const RESERVED = ["overzicht", "feed.xml", "2", "3", "4", "5"];
const urlSlug = z.string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "alleen kleine letters, cijfers en koppeltekens")
  .refine((s) => !RESERVED.includes(s), "gereserveerde slug");

const seo = z.object({
  title: z.string().max(60).optional(),
  description: z.string().min(70).max(160).optional(),
  noindex: z.boolean().default(false),
}).default({ noindex: false });

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    translationKey: z.string(),
    urlSlug,
    description: z.string().max(200),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string().default("AI in organisations"),
    tags: z.array(z.string()).default([]),
    heroImage: image().optional(),
    heroAlt: z.string().optional(),
    author: z.string().default("Daniel Fokker"),
    legacyUrl: z.string().optional(),
    draft: z.boolean().default(false),
    seo,
  }).refine((d) => !d.heroImage || !!d.heroAlt, { message: "heroAlt verplicht bij heroImage" }),
});

const nieuws = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/nieuws" }),
  schema: z.object({
    title: z.string(),
    translationKey: z.string().regex(/^\d{4}-week-\d{2}$/),
    urlSlug: z.string().regex(/^\d{4}-week-\d{2}$/),
    week: z.string().regex(/^\d{4}-W\d{2}$/),
    date: z.coerce.date(),
    summary: z.string().max(240),
    items: z.array(z.object({
      title: z.string(),
      url: z.url(),
      source: z.string(),
      sourceDate: z.coerce.date().optional(),
      commentary: z.string().max(400),
      tags: z.array(z.string()).default([]),
    })).min(3).max(8),
    curatedBy: z.string().default("Vera"),
    approvedBy: z.string().optional(),
    draft: z.boolean().default(true),
    seo,
  }),
});

const diensten = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/diensten" }),
  schema: z.object({
    title: z.string(),
    translationKey: z.enum(["board-scan", "ambition-session", "ai-financial-framework", "fractional-support"]),
    anchor: z.string(),
    order: z.number().int().min(1).max(4),
    tagline: z.string(),
    summary: z.string(),
    audience: z.string(),
    duration: z.string(),
    deliverable: z.string(),
    priceNote: z.string(),
    groupSize: z.string().optional(),
    closingNote: z.string().optional(),
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/cases" }),
  schema: z.object({
    organisation: z.string(),
    translationKey: z.string(),
    order: z.number().int(),
    periodStart: z.number().int(),
    periodEnd: z.number().int().nullable(),
    roleTitle: z.string(),
    situation: z.string(),
    role: z.string(),
    result: z.string(),
    domains: z.array(z.enum(["it-delivery", "it-operations", "enterprise-architecture", "hr", "itfm", "ai-governance"])).default([]),
    logo: z.string().optional(),
    showOnHome: z.boolean().default(true),
    placeholder: z.boolean().default(false),
  }),
});

const clients = defineCollection({
  loader: file("./src/content/clients/clients.yaml"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    logo: z.string(),
    order: z.number().int(),
    confirmed: z.boolean().default(false),
  }),
});

export const collections = { blog, nieuws, diensten, cases, clients };
```

Voorbeeld van een gemigreerd blogbestand:

```markdown
---
title: "Agent sprawl: the new shadow IT"
translationKey: agent-sprawl
urlSlug: agent-sprawl-the-new-shadow-it
description: "AI agents often start small and useful. But without overview, ownership and clear rules, agent sprawl can become the new shadow IT."
pubDate: 2026-05-18
category: "AI in organisations"
heroImage: ../../../assets/blog/agent-sprawl.jpg
heroAlt: "Agent sprawl: the new shadow IT"
legacyUrl: "https://orbisneo.nl/agent-sprawl-the-new-shadow-it/"
---
```

Het bestand staat in `src/content/blog/en/agent-sprawl.md`; de Nederlandse tegenhanger in `src/content/blog/nl/agent-sprawl.md` met `urlSlug: agent-sprawl-de-nieuwe-shadow-it`.

### Taalafhandeling

**Vaste pagina's.** `src/i18n/routes.ts` legt de paren vast:

```ts
export const routes = {
  home:     { en: "/",               nl: "/welkom/" },
  services: { en: "/services/",      nl: "/diensten/" },
  about:    { en: "/about/",         nl: "/over/" },
  blog:     { en: "/blog/",          nl: "/blog/overzicht/" },
  news:     { en: "/news/",          nl: "/nieuws/" },
  contact:  { en: "/contact/",       nl: "/kennismaken/" },
  thanks:   { en: "/contact/thanks/", nl: "/kennismaken/bedankt/" },
  privacy:  { en: "/privacy/",       nl: "/privacybeleid/" },
} as const;
export type Lang = "en" | "nl";
export const defaultLang: Lang = "en";
```

**Content.** `getAlternates(entry)` zoekt in dezelfde collectie het item met dezelfde `translationKey` en de andere taal en geeft beide URL's terug. Ontbreekt een tegenhanger, dan worden er geen `hreflang`-tags voor dat paar gezet en linkt de taalwisselaar naar het overzicht.

**Interfaceteksten.** `src/i18n/ui.ts` bevat alle vaste teksten (navigatie, knoppen, formulierlabels, foutmeldingen, datumnotatie) per taal; componenten gebruiken `t(lang, "nav.services")`. Datums: EN "18 May 2026", NL "18 mei 2026", via `Intl.DateTimeFormat`.

**HTML.** Elke pagina zet `<html lang="en">` of `<html lang="nl">`.

**Taaldetectie en onthouden keuze.** Een Netlify Edge Function draait uitsluitend op het pad `/` (de Engelse homepage). Ze doet niets bij bots, niets op oude domeinen, niets bij een POST en niets als er `?lang=en` in de URL staat. Is er een cookie `on_lang=nl`, dan volgt een 302 naar `/welkom/`. Is er geen cookie (eerste bezoek), dan kijkt de functie naar `Accept-Language`; staat Nederlands vóór Engels, dan volgt een 302 naar `/welkom/`. Alleen als de browser Engels noch Nederlands opgeeft, mag het land uit `context.geo` meewegen (Nederland of België wordt Nederlands; standaard uit, open punt 2). In alle gevallen wordt het resultaat als cookie bewaard, zodat de detectie maar één keer gebeurt. Diepere pagina's worden nooit omgeleid: wie op `/diensten/` of een Engelse blog binnenkomt, ziet die pagina. De taalwisselaar schrijft bij klikken `on_lang` en navigeert naar het tegenhanger-adres; daarmee wordt de keuze onthouden en bij het volgende bezoek aan `/` gerespecteerd.

```ts
// netlify/edge-functions/language.ts
import type { Config, Context } from "@netlify/edge-functions";

const PRIMARY_HOSTS = ["www.orbisneoconsulting.com", "test.orbisneoconsulting.com"];
const BOT = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|linkedinbot|embedly|lighthouse|headless|google|bing|duckduck|yandex|baidu|petal|applebot|ahrefs|semrush/i;
const USE_GEO = Netlify.env.get("LANG_USE_GEO") === "true";
const ONE_YEAR = 60 * 60 * 24 * 365;

function prefersDutch(header: string | null): boolean | null {
  if (!header) return null;
  const langs = header.split(",").map((part) => {
    const [tag, q] = part.trim().split(";q=");
    return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
  }).sort((a, b) => b.q - a.q);
  for (const { tag } of langs) {
    if (tag.startsWith("nl")) return true;
    if (tag.startsWith("en")) return false;
  }
  return null;
}

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const isPreview = url.hostname.endsWith(".netlify.app");
  if (!PRIMARY_HOSTS.includes(url.hostname) && !isPreview) return;
  if (request.method !== "GET") return;
  if (BOT.test(request.headers.get("user-agent") ?? "")) return;
  if (url.searchParams.get("lang") === "en") {
    context.cookies.set({ name: "on_lang", value: "en", path: "/", maxAge: ONE_YEAR, sameSite: "Lax", secure: true });
    return;
  }

  const saved = context.cookies.get("on_lang");
  let target: "en" | "nl";
  if (saved === "en" || saved === "nl") {
    target = saved;
  } else {
    const nl = prefersDutch(request.headers.get("accept-language"));
    const geoNl = USE_GEO && ["NL", "BE"].includes(context.geo?.country?.code ?? "");
    target = nl === true || (nl === null && geoNl) ? "nl" : "en";
    context.cookies.set({ name: "on_lang", value: target, path: "/", maxAge: ONE_YEAR, sameSite: "Lax", secure: true });
  }

  if (target === "nl") {
    return new Response(null, {
      status: 302,
      headers: { Location: "/welkom/", "Cache-Control": "private, no-store", Vary: "Accept-Language, Cookie" },
    });
  }
  return; // Engels: gewoon de statische pagina
};

export const config: Config = { path: "/" };
```

```ts
// src/scripts/lang-switch.ts (in BaseLayout geladen)
document.querySelectorAll<HTMLAnchorElement>("a[data-lang-switch]").forEach((a) => {
  a.addEventListener("click", () => {
    const lang = a.dataset.langSwitch;
    document.cookie = `on_lang=${lang}; Max-Age=31536000; Path=/; SameSite=Lax; Secure`;
    (window as any).umami?.track("language-switch", { to: lang, from: document.documentElement.lang });
  });
});
```

De cookie `on_lang` is een functionele cookie die alleen een door de bezoeker gemaakte of afgeleide taalvoorkeur bewaart; daarvoor is geen toestemming en geen cookiebanner nodig. Hij wordt wel in de privacyverklaring genoemd.

### Pagina's en routes

| Bestand | URL | Bron |
|---|---|---|
| `src/pages/index.astro` | `/` | `<HomePage lang="en" />` |
| `src/pages/welkom.astro` | `/welkom/` | `<HomePage lang="nl" />` |
| `src/pages/services.astro`, `diensten.astro` | `/services/`, `/diensten/` | collectie `diensten` |
| `src/pages/about.astro`, `over.astro` | `/about/`, `/over/` | collectie `cases` plus vaste tekst |
| `src/pages/blog/index.astro` | `/blog/` | collectie `blog`, `lang = en` |
| `src/pages/blog/overzicht.astro` | `/blog/overzicht/` | collectie `blog`, `lang = nl` |
| `src/pages/blog/[urlSlug].astro` | `/blog/<slug>/` | `getStaticPaths` over beide talen; build faalt bij dubbele slug |
| `src/pages/blog/feed.xml.ts`, `blog/overzicht/feed.xml.ts` | RSS per taal | `@astrojs/rss` |
| `src/pages/news/index.astro`, `news/[urlSlug].astro` | `/news/...` | collectie `nieuws`, `lang = en`, `draft = false` |
| `src/pages/nieuws/index.astro`, `nieuws/[urlSlug].astro` | `/nieuws/...` | collectie `nieuws`, `lang = nl` |
| `src/pages/contact/index.astro`, `contact/thanks.astro` | `/contact/`, `/contact/thanks/` | `<ContactPage lang="en" />` |
| `src/pages/kennismaken/index.astro`, `kennismaken/bedankt.astro` | `/kennismaken/`, `/kennismaken/bedankt/` | `<ContactPage lang="nl" />` |
| `src/pages/privacy.astro`, `privacybeleid.astro` | `/privacy/`, `/privacybeleid/` | Markdown in `src/content/pages/` of inline |
| `src/pages/404.astro` | `/404.html` | Tweetalig |
| `src/pages/sitemap.xml.ts` | `/sitemap.xml` | Eigen endpoint met alternates |
| `src/pages/robots.txt.ts` | `/robots.txt` | Afhankelijk van omgeving |

Elke pagina is een dun bestand dat een gedeeld paginacomponent met een `lang`-prop aanroept, zodat de opbouw per taal identiek blijft.

### Componenten

| Component | Doel |
|---|---|
| `BaseLayout.astro` | `<html lang>`, `<head>` via `Seo.astro`, skiplink, header, main, footer, scripts |
| `Seo.astro` | Titel, beschrijving, canonical, hreflang, Open Graph, robots, JSON-LD |
| `Header.astro`, `Nav.astro`, `MobileMenu.astro` | Navigatie; menu met `aria-expanded`, focus-trap en Escape |
| `LanguageSwitch.astro` | EN en NL met tegenhanger-URL en `data-lang-switch` |
| `Footer.astro` | Footerband met verloop |
| `Button.astro`, `TextLink.astro` | Knoppen en links in alle staten |
| `HomeHero.astro` | Opening met portret |
| `CaseTimeline.astro`, `CaseCard.astro` | Loopbaan als cases |
| `PerspectiveSection.astro`, `BlogCard.astro`, `NewsTeaser.astro` | Visie |
| `ServiceSegment.astro`, `ServiceFacts.astro`, `ServiceProgress.astro` | Dienstsegmenten en kenmerken |
| `ClientLogos.astro` | Logo's in grijstinten |
| `ContactTeaser.astro` | Subtiel contactblok |
| `ContactForm.astro`, `FormField.astro`, `Checkbox.astro`, `Alert.astro` | Formulier |
| `ArticleHeader.astro`, `Toc.astro`, `AuthorBox.astro`, `RelatedPosts.astro`, `Breadcrumbs.astro` | Blogartikel |
| `NewsItem.astro`, `NewsEdition.astro` | Nieuws |
| `Picture.astro` | Wrapper om Astro `<Picture>` met AVIF en WebP |
| `Analytics.astro` | Umami-script, alleen in productie |

### Contactformulier met Netlify Forms

Netlify herkent formulieren tijdens de deploy in de statische HTML aan het attribuut `data-netlify="true"`. Beide talen gebruiken dezelfde formuliernaam en dezelfde velden; het verborgen veld `language` onderscheidt ze. Spam wordt geweerd met de honeypot `netlify-honeypot="bot-field"` en het ingebouwde spamfilter van Netlify, zonder captcha.

```html
<form name="contact" method="POST" action="/contact/thanks/"
      data-netlify="true" netlify-honeypot="bot-field" novalidate>
  <input type="hidden" name="form-name" value="contact" />
  <input type="hidden" name="language" value="en" />
  <p class="visually-hidden" aria-hidden="true">
    <label>Leave this field empty <input name="bot-field" tabindex="-1" autocomplete="off" /></label>
  </p>
  <label for="f-name">Your name *</label>
  <input id="f-name" name="name" type="text" autocomplete="name" required />
  <label for="f-email">Email address *</label>
  <input id="f-email" name="email" type="email" autocomplete="email" required />
  <label for="f-phone">Phone number</label>
  <input id="f-phone" name="phone" type="tel" autocomplete="tel" />
  <fieldset>
    <legend>What is your question about?</legend>
    <label><input type="checkbox" name="services[]" value="board-scan" /> Board scan</label>
    <label><input type="checkbox" name="services[]" value="ambition-session" /> Ambition and position session</label>
    <label><input type="checkbox" name="services[]" value="ai-financial-framework" /> AI financial framework</label>
    <label><input type="checkbox" name="services[]" value="fractional-support" /> Fractional support</label>
    <label><input type="checkbox" name="services[]" value="not-sure" /> Not sure yet</label>
  </fieldset>
  <label for="f-message">Your request *</label>
  <textarea id="f-message" name="message" rows="6" required></textarea>
  <label><input type="checkbox" name="consent" value="yes" required />
    I agree that Orbis Neo may contact me. See the <a href="/privacy/">privacy statement</a>. *</label>
  <button type="submit" data-umami-event="contact-form-submit" data-umami-event-lang="en">Send message</button>
</form>
```

Formuliermeldingen gaan per e-mail naar het adres dat Daniel kiest (open punt 4); dat stel je in onder Netlify, Forms, Form notifications. Inzendingen worden in Netlify periodiek verwijderd (bewaartermijn in de privacyverklaring). Daniel test vóór lancering in beide talen of het bericht aankomt.

### Build en kwaliteitscontroles

`npm run build` voert achtereenvolgens uit: `astro check` (types en schema's), `astro build`, `tsx scripts/check-content.ts` en `tsx scripts/check-redirects.ts`. `check-content` controleert dat elke `translationKey` in blog, diensten en cases in beide talen bestaat (nieuws mag eentalig zijn), dat alle `urlSlug`'s in `/blog/` uniek zijn over beide talen heen, dat er geen gereserveerde slugs zijn en dat er in een productiebuild geen tekst `[PLACEHOLDER` en geen item met `placeholder: true` of `draft: true` gepubliceerd wordt. `check-redirects` leest `public/_redirects` en controleert dat elk doel op het primaire domein als bestand in `dist/` bestaat. Bij een fout faalt de build en gaat er niets live.

## CMS-workflow

### Keuze van de backend

Decap CMS draait als statische pagina op `/admin/` en schrijft wijzigingen als commits en pull requests naar GitHub. Netlify meldt in de eigen documentatie dat Git Gateway verouderd is: het blijft werken voor bestaande sites, maar nieuwe configuraties worden niet aangeraden (bron: docs.netlify.com, Git Gateway). Daarom gebruikt deze site de **GitHub-backend** van Decap, waarbij Netlify als OAuth-provider de GitHub-login afhandelt (bron: decapcms.org, GitHub backend). Iedere editor heeft daarvoor een GitHub-account met schrijfrechten op de repository nodig. Voor Daniel en Vera is dat geen bezwaar. Mocht er later een editor zonder GitHub-account bij komen, dan is een gehoste authenticatiedienst zoals DecapBridge of Decap Turbo een alternatief.

### Rollen

| Rol | Wie | Rechten in GitHub | Wat doet deze rol |
|---|---|---|---|
| Eigenaar en goedkeurder | Daniel Fokker | Admin; enige code owner | Schrijft en bewerkt blogs, keurt elke pull request goed en voegt samen |
| Contentassistent | Vera (eigen GitHub-account of GitHub App) | Write, geen bypass van branch protection | Zet nieuwsedities en conceptvertalingen klaar als pull request |
| Bouwer | Claude Code of ontwikkelaar | Write, geen bypass | Code-wijzigingen via pull requests |

### Publicatiestroom

Decap staat in `editorial_workflow`. Elke nieuwe of gewijzigde entry wordt een eigen branch en pull request met de status Draft, In review of Ready. Netlify bouwt voor elke pull request automatisch een deploy preview, en Decap toont de link daarnaar in de editor zodra de preview klaar is. Publiceren in Decap betekent samenvoegen naar `main`; omdat `main` beschermd is en een goedkeuring van Daniel als code owner vereist, kan niets zonder zijn akkoord live gaan. De stappen zijn:

1. Schrijven: Daniel (of Vera voor nieuws) maakt in `/admin/` een entry aan en vult beide talen in, naast elkaar.
2. Opslaan: Decap maakt een branch `cms/blog/<translationKey>` en een pull request.
3. Controleren: GitHub Actions draait de controles; Netlify maakt een deploy preview met `noindex`.
4. Beoordelen: Daniel bekijkt de preview op telefoon en laptop en keurt goed in GitHub of zet de status in Decap op Ready.
5. Publiceren: samenvoegen naar `main`; Netlify bouwt productie en de wijziging staat binnen enkele minuten live.
6. Terugdraaien: in Netlify met "Publish deploy" op een eerdere deploy, of in GitHub met een revert-pull request.

### Nieuws: workflow voor de wekelijkse editie

Vera stelt elke week een editie samen van drie tot acht berichten over AI-beleid, governance en AI in organisaties, met per bericht bron, titel, link en één of twee zinnen duiding in de stijl van Daniel. Er worden geen volledige artikelen overgenomen, alleen titel, link en eigen duiding. Vera maakt een branch `nieuws/2026-week-43`, zet `src/content/nieuws/en/2026-week-43.md` en `src/content/nieuws/nl/2026-week-43.md` klaar met `draft: true` en opent een pull request met het label `nieuws`. Daniel beoordeelt de preview, past eventueel de duiding aan, zet `draft: false` en `approvedBy: "Daniel Fokker"` en voegt samen. Er is geen geplande taak die publiceert; een pull request die niet wordt goedgekeurd, blijft gewoon liggen. Een editie die na veertien dagen niet is samengevoegd, sluit Vera met een korte notitie.

### Decap-configuratie (schets)

```html
<!-- public/admin/index.html -->
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex" />
  <title>Orbis Neo CMS</title>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</head>
<body></body>
</html>
```

```yaml
# public/admin/config.yml
backend:
  name: github
  repo: <github-organisatie>/orbisneo-website
  branch: main
  base_url: https://api.netlify.com
  commit_messages:
    create: "content({{collection}}): nieuw {{slug}}"
    update: "content({{collection}}): wijzig {{slug}}"
    delete: "content({{collection}}): verwijder {{slug}}"
    uploadMedia: "media: upload {{path}}"
    deleteMedia: "media: verwijder {{path}}"

publish_mode: editorial_workflow
site_url: https://www.orbisneoconsulting.com
display_url: https://www.orbisneoconsulting.com
locale: nl
media_folder: src/assets/blog
public_folder: ../../../assets/blog

i18n:
  structure: multiple_folders
  locales: [en, nl]
  default_locale: en

collections:
  - name: blog
    label: Blog
    label_singular: Blogartikel
    folder: src/content/blog
    create: true
    i18n: true
    format: frontmatter
    extension: md
    identifier_field: title
    slug: "{{fields.translationKey}}"
    summary: "{{title}} ({{pubDate | date('YYYY-MM-DD')}})"
    sortable_fields: [pubDate, title]
    fields:
      - { name: title, label: Titel, widget: string, i18n: true }
      - { name: translationKey, label: "Vertaalsleutel (gelijk in beide talen)", widget: string, i18n: duplicate, pattern: ["^[a-z0-9-]+$", "kleine letters en koppeltekens"] }
      - { name: urlSlug, label: "URL-deel", widget: string, i18n: true, pattern: ["^[a-z0-9]+(-[a-z0-9]+)*$", "kleine letters en koppeltekens"] }
      - { name: description, label: Samenvatting, widget: text, i18n: true }
      - { name: pubDate, label: Publicatiedatum, widget: datetime, format: "YYYY-MM-DD", time_format: false, i18n: duplicate }
      - { name: updatedDate, label: "Bijgewerkt op", widget: datetime, format: "YYYY-MM-DD", time_format: false, required: false, i18n: duplicate }
      - { name: category, label: Categorie, widget: string, i18n: true, default: "AI in organisations" }
      - { name: heroImage, label: Omslagafbeelding, widget: image, required: false, i18n: duplicate }
      - { name: heroAlt, label: "Alt-tekst afbeelding", widget: string, required: false, i18n: true }
      - { name: draft, label: Concept, widget: boolean, default: true, i18n: duplicate }
      - { name: body, label: Tekst, widget: markdown, i18n: true }

  - name: nieuws
    label: Nieuws
    label_singular: Weekeditie
    folder: src/content/nieuws
    create: true
    i18n: true
    slug: "{{fields.translationKey}}"
    identifier_field: title
    fields:
      - { name: title, label: Titel, widget: string, i18n: true }
      - { name: translationKey, label: "Sleutel (jjjj-week-ww)", widget: string, i18n: duplicate, pattern: ["^\\d{4}-week-\\d{2}$", "bijvoorbeeld 2026-week-43"] }
      - { name: urlSlug, label: "URL-deel", widget: string, i18n: duplicate }
      - { name: week, label: "ISO-week (2026-W43)", widget: string, i18n: duplicate }
      - { name: date, label: Datum, widget: datetime, format: "YYYY-MM-DD", time_format: false, i18n: duplicate }
      - { name: summary, label: Samenvatting, widget: text, i18n: true }
      - name: items
        label: Berichten
        widget: list
        i18n: true
        fields:
          - { name: title, label: Titel, widget: string }
          - { name: url, label: Link, widget: string }
          - { name: source, label: Bron, widget: string }
          - { name: sourceDate, label: "Datum bron", widget: datetime, format: "YYYY-MM-DD", time_format: false, required: false }
          - { name: commentary, label: Duiding, widget: text }
      - { name: curatedBy, label: "Samengesteld door", widget: string, default: Vera, i18n: duplicate }
      - { name: approvedBy, label: "Goedgekeurd door", widget: string, required: false, i18n: duplicate }
      - { name: draft, label: Concept, widget: boolean, default: true, i18n: duplicate }

  - name: diensten
    label: Diensten
    folder: src/content/diensten
    create: false
    delete: false
    i18n: true
    slug: "{{fields.translationKey}}"
    fields:
      - { name: title, label: Titel, widget: string, i18n: true }
      - { name: translationKey, label: Sleutel, widget: hidden, i18n: duplicate }
      - { name: anchor, label: Anker, widget: string, i18n: true }
      - { name: order, label: Volgorde, widget: number, i18n: duplicate }
      - { name: tagline, label: Kernzin, widget: string, i18n: true }
      - { name: summary, label: "Korte tekst (homepage)", widget: text, i18n: true }
      - { name: audience, label: "Voor wie", widget: string, i18n: true }
      - { name: duration, label: Duur, widget: string, i18n: true }
      - { name: deliverable, label: Oplevering, widget: string, i18n: true }
      - { name: priceNote, label: "Prijs (tekst, geen bedrag)", widget: string, i18n: true }
      - { name: groupSize, label: Groepsgrootte, widget: string, required: false, i18n: true }
      - { name: body, label: "Volledige tekst", widget: markdown, i18n: true }

  - name: cases
    label: "Loopbaan (cases)"
    folder: src/content/cases
    create: true
    i18n: true
    slug: "{{fields.translationKey}}"
    identifier_field: organisation
    fields:
      - { name: organisation, label: Organisatie, widget: string, i18n: true }
      - { name: translationKey, label: Sleutel, widget: string, i18n: duplicate }
      - { name: order, label: Volgorde, widget: number, i18n: duplicate }
      - { name: periodStart, label: Startjaar, widget: number, i18n: duplicate }
      - { name: periodEnd, label: "Eindjaar (leeg = heden)", widget: number, required: false, i18n: duplicate }
      - { name: roleTitle, label: Functietitel, widget: string, i18n: true }
      - { name: situation, label: Situatie, widget: text, i18n: true }
      - { name: role, label: Rol, widget: text, i18n: true }
      - { name: result, label: Resultaat, widget: text, i18n: true }
      - { name: placeholder, label: "Bevat nog placeholders", widget: boolean, default: false, i18n: duplicate }
```

De taal van een item staat niet in de frontmatter maar volgt uit de map: Decap schrijft de Engelse versie naar `en/` en de Nederlandse naar `nl/`, en de site leidt de taal af uit het id van het item (`entry.id` begint met `en/` of `nl/`). Zo kan een taal nooit per ongeluk verkeerd worden ingevuld.

### Lokale voorvertoning in de editor

Decap toont standaard een eenvoudige voorvertoning. Voor een herkenbare weergave registreert `public/admin/index.html` de site-CSS (`CMS.registerPreviewStyle("/admin/preview.css")`) met de fonts en kleuren uit het design system. De echte toets blijft de deploy preview van Netlify.

## SEO

### Meta per pagina

| Element | Regel |
|---|---|
| `<title>` | Max 60 tekens, patroon "Paginatitel \| Orbis Neo"; homepage EN: "AI transformation for leadership teams of ambitious mid-market companies \| Orbis Neo" (bestaande titel), NL: "Daniel Fokker, Orbis Neo: AI-transformatie voor groter MKB" |
| Metabeschrijving | 70 tot 160 tekens, per taal, overgenomen uit Yoast waar beschikbaar |
| Canonical | Altijd absoluut naar de eigen URL op `https://www.orbisneoconsulting.com`, met afsluitende slash |
| Robots | `index, follow` in productie; `noindex, nofollow` op deploy previews, branch deploys, de testomgeving, bedanktpagina's, 404 en `/admin/` |
| Open Graph en Twitter | `og:title`, `og:description`, `og:image` (1200 x 630, per blog de omslag, anders een merkbeeld), `og:locale` `en_GB` of `nl_NL` plus `og:locale:alternate` |
| Taal | `<html lang>` per pagina |

### Canonical en hreflang

Op elke pagina met een tegenhanger staan drie alternates, ook in de sitemap. Elke pagina verwijst naar zichzelf en naar de andere taal (wederkerig), en `x-default` wijst naar de Engelse versie.

```html
<!-- op /diensten/ -->
<link rel="canonical" href="https://www.orbisneoconsulting.com/diensten/" />
<link rel="alternate" hreflang="en" href="https://www.orbisneoconsulting.com/services/" />
<link rel="alternate" hreflang="nl" href="https://www.orbisneoconsulting.com/diensten/" />
<link rel="alternate" hreflang="x-default" href="https://www.orbisneoconsulting.com/services/" />
```

De automatische omleiding op `/` maakt Google niet in de war, omdat ze bots overslaat, alleen op de homepage werkt en een 302 (tijdelijk) is. Googlebot ziet `/` dus altijd in het Engels, vindt `/welkom/` via `hreflang`, de taalwisselaar (een gewone link) en de sitemap.

### Sitemap en robots

`/sitemap.xml` bevat alleen canonieke, indexeerbare URL's in beide talen, met `lastmod` en `xhtml:link`-alternates. `robots.txt` verwijst in productie naar de sitemap en sluit `/admin/` uit; buiten productie staat er `Disallow: /`.

```ts
// src/pages/robots.txt.ts
export const GET = () => {
  const prod = import.meta.env.PUBLIC_SITE_ENV === "production" && import.meta.env.PUBLIC_NOINDEX !== "true";
  const body = prod
    ? "User-agent: *\nDisallow: /admin/\n\nSitemap: https://www.orbisneoconsulting.com/sitemap.xml\n"
    : "User-agent: *\nDisallow: /\n";
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
};
```

### Structured data

Elke pagina krijgt JSON-LD met een `@graph`. Op alle pagina's staan `Organization` (als `ProfessionalService`), `Person` en `WebSite`; blogartikelen krijgen daarnaast `BlogPosting` en `BreadcrumbList`.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://www.orbisneoconsulting.com/#organization",
      "name": "Orbis Neo",
      "url": "https://www.orbisneoconsulting.com/",
      "logo": "https://www.orbisneoconsulting.com/images/orbisneo-logo.png",
      "email": "[PLACEHOLDER: alias op orbisneoconsulting.com]",
      "telephone": "+31653380329",
      "address": { "@type": "PostalAddress", "addressLocality": "Amersfoort", "addressCountry": "NL" },
      "identifier": { "@type": "PropertyValue", "propertyID": "KvK", "value": "98659456" },
      "founder": { "@id": "https://www.orbisneoconsulting.com/#daniel" },
      "areaServed": "NL",
      "sameAs": ["https://www.linkedin.com/in/danielfokker", "https://x.com/orbis_neo", "https://instagram.com/orbisneo"]
    },
    {
      "@type": "Person",
      "@id": "https://www.orbisneoconsulting.com/#daniel",
      "name": "Daniel Fokker",
      "jobTitle": "Interim Head of IT; consultant AI strategy, policy and governance",
      "worksFor": { "@id": "https://www.orbisneoconsulting.com/#organization" },
      "image": "https://www.orbisneoconsulting.com/images/daniel-fokker.jpg",
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "Radboud Universiteit" },
        { "@type": "CollegeOrUniversity", "name": "Avans Hogeschool" }
      ],
      "knowsAbout": ["AI governance", "Enterprise architecture", "IT financial management", "TOGAF", "ArchiMate", "IT4IT"],
      "sameAs": ["https://www.linkedin.com/in/danielfokker"]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.orbisneoconsulting.com/#website",
      "url": "https://www.orbisneoconsulting.com/",
      "name": "Orbis Neo",
      "inLanguage": ["en", "nl"],
      "publisher": { "@id": "https://www.orbisneoconsulting.com/#organization" }
    }
  ]
}
```

```json
{
  "@type": "BlogPosting",
  "headline": "Agent sprawl: the new shadow IT",
  "inLanguage": "en",
  "datePublished": "2026-05-18",
  "dateModified": "2026-05-18",
  "author": { "@id": "https://www.orbisneoconsulting.com/#daniel" },
  "publisher": { "@id": "https://www.orbisneoconsulting.com/#organization" },
  "image": "https://www.orbisneoconsulting.com/_astro/agent-sprawl.<hash>.jpg",
  "mainEntityOfPage": "https://www.orbisneoconsulting.com/blog/agent-sprawl-the-new-shadow-it/",
  "workTranslation": { "@id": "https://www.orbisneoconsulting.com/blog/agent-sprawl-de-nieuwe-shadow-it/" }
}
```

De Nederlandse versie gebruikt `translationOfWork` in plaats van `workTranslation`. De `@id`-waarden zijn vast, zodat de grafen per pagina naar dezelfde entiteiten verwijzen.

### Redirects

Alle oude URL's krijgen één 301 naar de nieuwe, zonder ketens. De volledige kaart staat in 10.3. Netlify verwerkt `_redirects` van boven naar beneden en stopt bij de eerste match; specifieke regels staan daarom boven de domeinbrede regels. Een uitroepteken na de statuscode (`301!`) dwingt de redirect af, ook als er op dat pad een bestand bestaat.

### Search Console

Voor orbisneoconsulting.com wordt een domeineigendom in Google Search Console aangemaakt (verificatie via een TXT-record bij TransIP). Na lancering wordt de sitemap ingediend en wordt voor orbisneo.nl de functie Adreswijziging (Change of Address) gebruikt, die vereist dat beide domeinen geverifieerd zijn en dat de homepage en de belangrijkste pagina's met een 301 doorsturen. Hetzelfde gebeurt in Bing Webmaster Tools.

## Analytics

### Opzet met Umami

Umami is open source en meet zonder cookies en zonder persoonsgegevens, zodat er geen cookiebanner nodig is. Er zijn twee varianten. **Umami Cloud** heeft een gratis Hobby-plan met 100.000 events per maand, één website en zes maanden bewaartermijn, met servers in de VS en de EU (bron: umami.is/pricing en docs.umami.is, Cloud FAQ, gecontroleerd oktober 2026). **Zelf hosten** is gratis en heeft geen limieten, maar vraagt een eigen server met een PostgreSQL-database en onderhoud, wat afwijkt van het uitgangspunt "geen database, weinig onderhoud". Het advies is Umami Cloud in de EU-regio (open punt 9).

Het script wordt alleen in productie geladen en is beperkt tot het productiedomein, zodat previews en de testomgeving niet meetellen:

```astro
---
// src/components/Analytics.astro
const enabled = import.meta.env.PUBLIC_SITE_ENV === "production";
const id = import.meta.env.PUBLIC_UMAMI_WEBSITE_ID;
---
{enabled && id && (
  <script defer src="https://cloud.umami.is/script.js"
    data-website-id={id}
    data-domains="www.orbisneoconsulting.com"></script>
)}
```

De Content-Security-Policy staat het Umami-domein toe in `script-src` en `connect-src`; het exacte endpoint voor het versturen van events wordt bij de implementatie in de Network-tab gecontroleerd.

### Events

| Event | Waar | Eigenschappen | Implementatie |
|---|---|---|---|
| `cta-intro-click` | Elke link of knop "Plan a short intro" | `location` (hero, services, contact-teaser, footer), `lang` | `data-umami-event` met `data-umami-event-location` |
| `contact-form-submit` | Verzendknop formulier | `lang`, `services` (komma-gescheiden) | Script bij geldige verzending |
| `contact-form-success` | Bedanktpagina | `lang` | Paginaweergave `/contact/thanks/` en `/kennismaken/bedankt/` als doel |
| `language-switch` | Taalwisselaar | `from`, `to`, `path` | `lang-switch.ts` |
| `service-view` | Elk dienstsegment op de homepage | `service` | `IntersectionObserver`, één keer per paginaweergave |
| `case-view` | Elke casekaart | `organisation` | `IntersectionObserver`, één keer |
| `blog-read` | Blogartikel, 75 procent gescrold | `slug`, `lang` | Scrollscript, één keer |
| `news-item-click` | Link in nieuwseditie | `week`, `host` | `data-umami-event` |
| `email-click`, `phone-click`, `linkedin-click` | Contactlinks | `location` | `data-umami-event` |
| `outbound-click` | Overige externe links | `host` | Gedelegeerde klikhandler |

In Umami worden twee doelen ingesteld: een bezoek aan een bedanktpagina en `cta-intro-click`. Een funnel "homepage, contactpagina, bedanktpagina" laat zien waar bezoekers afhaken.

## Hosting en DNS

### Netlify

De site wordt gehost op Netlify. Netlify bouwt bij elke push naar `main` de productiesite en bij elke pull request een deploy preview op een eigen adres (`deploy-preview-<nummer>--<sitenaam>.netlify.app`). Formulieren, redirects en de Edge Function zitten in hetzelfde platform. Een apart hostingpakket bij TransIP is daarmee niet nodig; TransIP blijft alleen registrar en DNS-beheerder van orbisneoconsulting.com (zie open punt 3).

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"

[context.production.environment]
  PUBLIC_SITE_ENV = "production"
  # Tot de lancering op "true"; bij go-live naar "false" zetten in de Netlify UI
  PUBLIC_NOINDEX = "true"

[context.deploy-preview.environment]
  PUBLIC_SITE_ENV = "preview"
  PUBLIC_NOINDEX = "true"

[context.branch-deploy.environment]
  PUBLIC_SITE_ENV = "preview"
  PUBLIC_NOINDEX = "true"

[[edge_functions]]
  function = "language"
  path = "/"

[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=(), interest-cohort=()"
    X-Frame-Options = "SAMEORIGIN"
    Content-Security-Policy-Report-Only = "default-src 'self'; script-src 'self' 'unsafe-inline' https://cloud.umami.is https://unpkg.com; connect-src 'self' https://cloud.umami.is https://api.github.com https://api.netlify.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self'; frame-ancestors 'self'"

[[headers]]
  for = "/_astro/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/admin/*"
  [headers.values]
    X-Robots-Tag = "noindex, nofollow"
```

De Content-Security-Policy start als `Report-Only`, zodat een te strenge regel niets breekt; na controle van de console in de testomgeving wordt hij afdwingend gemaakt. Naast de meta-tag `robots` krijgt elke niet-productiebuild via een kleine Astro-integratie ook de header `X-Robots-Tag: noindex` in een gegenereerd `dist/_headers`-bestand.

### Testomgeving

Tot de lancering heeft de Netlify-site als eigen domein `test.orbisneoconsulting.com` (CNAME bij TransIP) en draait productie met `PUBLIC_NOINDEX=true`: `noindex` op elke pagina, `Disallow: /` in robots.txt en geen Umami. Zo kan Daniel de echte productiebuild op een herkenbaar adres testen terwijl www.orbisneoconsulting.com nog de oude doorverwijzing heeft. Elke pull request heeft daarnaast een eigen deploy preview op `*.netlify.app`, ook met `noindex`. Bij de lancering wordt www.orbisneoconsulting.com het primaire domein, gaat `PUBLIC_NOINDEX` naar `false` en wordt `test.` verwijderd of omgezet naar een redirect.

### DNS-records bij TransIP (orbisneoconsulting.com)

De waarden voor Netlify komen uit de documentatie "Configure external DNS for a custom domain" (docs.netlify.com): een subdomein krijgt een CNAME naar de Netlify-subdomeinnaam van de site; het apexdomein krijgt bij voorkeur een ALIAS, ANAME of flattened CNAME naar `apex-loadbalancer.netlify.com`, met als terugvaloptie een A-record naar `75.2.60.5`. Netlify adviseert bij externe DNS een subdomein (www) als primair domein, wat hier het geval is. TransIP ondersteunt ALIAS-records voor het rootdomein (bron: transip.nl, knowledgebase "Een ALIAS-record instellen"), met de beperking dat er dan geen MX- of NS-record naar het rootdomein zelf mag verwijzen; de MX van Microsoft 365 verwijst naar een eigen hostnaam en valt daar niet onder.

| Naam | Type | Waarde | Doel | Wanneer |
|---|---|---|---|---|
| `@` | ALIAS | `apex-loadbalancer.netlify.com.` | Apex naar Netlify (Netlify stuurt door naar www) | Bij lancering |
| `@` | A (alleen als ALIAS niet werkt) | `75.2.60.5` | Terugvaloptie volgens Netlify | Bij lancering |
| `www` | CNAME | `<sitenaam>.netlify.app.` | Primaire site | Bij lancering |
| `test` | CNAME | `<sitenaam>.netlify.app.` | Testomgeving | Direct |
| `@` | MX | `0 <domein-met-streepjes>.mail.protection.outlook.com.` (exacte waarde uit Microsoft 365) | Mail naar Microsoft 365 | Bij toevoegen domein aan M365 |
| `@` | TXT | `v=spf1 include:spf.protection.outlook.com -all` | SPF | Idem |
| `@` | TXT | `MS=ms<nummer>` (uit Microsoft 365) | Domeinverificatie M365 | Idem |
| `autodiscover` | CNAME | `autodiscover.outlook.com.` | Outlook-configuratie | Idem |
| `selector1._domainkey` | CNAME | Exacte waarde `Selector1CNAME` uit Microsoft 365 | DKIM | Idem |
| `selector2._domainkey` | CNAME | Exacte waarde `Selector2CNAME` uit Microsoft 365 | DKIM | Idem |
| `_dmarc` | TXT | `v=DMARC1; p=none; rua=mailto:<rapportadres>; fo=1` | DMARC, eerst monitoren | Idem; na 4 weken `p=quarantine` |
| `@` | TXT | `google-site-verification=<code>` | Search Console | Vóór lancering |
| `@` | CAA (optioneel) | `0 issue "letsencrypt.org"` | Alleen nodig als er al CAA-records zijn; Netlify gebruikt Let's Encrypt | Vóór lancering |

Voor DKIM geldt dat Microsoft sinds mei 2025 voor nieuw toegevoegde domeinen een nieuw formaat gebruikt (`selector1-<domein-met-streepjes>._domainkey.<tenantprefix>.<partitieletter>-v1.dkim.mail.microsoft`), waarbij de partitieletter niet te voorspellen is (bron: learn.microsoft.com, "How to use DKIM for email in your custom domain"). De waarden worden daarom altijd letterlijk overgenomen uit het Microsoft Defender-portaal of uit `Get-DkimSigningConfig`, nooit afgeleid. De mailrecords worden niet aangeraakt door Netlify: Netlify gebruikt alleen de `@`-, `www`- en `test`-records, en formuliermeldingen worden door Netlify vanaf een eigen afzenderdomein verstuurd, zodat SPF daarvoor niet hoeft te worden aangepast. Bestaande standaardrecords van TransIP (zoals een MX naar de TransIP-mailserver of A-records naar de webhosting) worden eerst geïnventariseerd en alleen verwijderd als ze niet meer in gebruik zijn. De stap-voor-stapinstructie staat in het document "TransIP DNS" van het startpakket.

### Oude domeinen

orbisneo.nl en orbisneo.com worden als domeinaliassen aan dezelfde Netlify-site toegevoegd. Netlify geeft voor elk alias automatisch een TLS-certificaat uit. De DNS-records van die domeinen (A of ALIAS en www CNAME) worden naar Netlify gezet; de mailrecords van orbisneo.nl blijven ongewijzigd, zodat info@orbisneo.nl blijft werken. Waar de DNS van deze twee domeinen nu staat, is nog niet bekend (open punt 3).

## Migratieplan

### Fasen

| Fase | Inhoud | Resultaat | Akkoord |
|---|---|---|---|
| 0. Voorbereiding | Accounts (GitHub, Netlify, Umami), logobestanden uit OneDrive, feiten voor de cases, besluiten uit hoofdstuk 11 | Alle inputs compleet | Daniel |
| 1. Export | Pagina's en zes blogparen via de WordPress REST API naar Markdown met frontmatter; afbeeldingen downloaden en omzetten; Yoast-titels en -beschrijvingen bewaren; back-up van WordPress door Daniel of hoster | Map `src/content/` gevuld, export gearchiveerd | Vera controleert woordtellingen |
| 2. Bouw | Repository, design tokens, componenten, pagina's, Edge Function, formulier, Decap, Umami, redirects, CI | Werkende site op deploy previews | Per pull request door Daniel |
| 3. Test | Productiebuild op test.orbisneoconsulting.com met `noindex`; Vera test volgens de checklist uit de werkafspraak | Testrapport aan Daniel | Daniel |
| 4. Lancering | DNS van orbisneoconsulting.com naar Netlify, `noindex` uit, daarna orbisneo.nl en orbisneo.com naar Netlify met 301 | Site live, redirects actief | Daniel geeft startsein |
| 5. Nazorg (4 tot 8 weken) | Wekelijks Search Console en Umami controleren, 404's oplossen, Adreswijziging volgen | Alle canonieke URL's geïndexeerd | Daniel |
| 6. Afronding | WordPress offline, hostingpakketten opzeggen na minimaal drie maanden | Oude omgeving opgeruimd | Daniel |

Concepten 507, 518, 523, 493, 495 en 506 worden niet gemigreerd; ze blijven in de WordPress-back-up bewaard.

### Volgorde van de domeinwissel

De wissel gebeurt in twee stappen om het risico klein te houden. Eerst gaat www.orbisneoconsulting.com live op Netlify, terwijl orbisneo.nl nog de oude WordPress-site toont. Na een dag zonder problemen worden orbisneo.nl en orbisneo.com naar Netlify gezet, waarna de 301-regels voor de oude adressen actief worden. Bezoekers van orbisneo.nl merken pas iets in stap twee.

### Redirectkaart (301, oud naar nieuw)

Regels zonder domein gelden voor elk domein dat aan de site hangt, dus zowel voor www.orbisneoconsulting.com als voor de oude domeinen. Daarna volgen de domeinbrede regels met padbehoud. Netlify negeert bij het matchen een afsluitende slash, zodat `/about` en `/about/` hetzelfde behandeld worden.

| Oude URL | Nieuwe URL |
|---|---|
| `/` (orbisneo.nl en orbisneo.com) | `/` |
| `/en/`, `/en/home-2/` | `/` |
| `/nl/`, `/nl/home/` | `/welkom/` |
| `/services/`, `/en/services/` | `/services/` |
| `/about/`, `/en/about/` | `/about/` |
| `/contact-2/`, `/en/contact/`, `/en/contact-2/` | `/contact/` |
| `/blog-2/`, `/en/blog/` | `/blog/` |
| `/privacy-policy/` | `/privacy/` |
| `/nl/diensten/` | `/diensten/` |
| `/nl/over/` | `/over/` |
| `/nl/contact/` | `/kennismaken/` |
| `/nl/blog/` | `/blog/overzicht/` |
| `/nl/privacybeleid/`, `/privacybeleid/` | `/privacybeleid/` |
| `/ethical-ai-from-sentiment-to-working-agreements/` | `/blog/ethical-ai-from-sentiment-to-working-agreements/` |
| `/ai-without-the-hype/` | `/blog/ai-without-the-hype/` |
| `/is-ai-just-automation-with-a-new-label/` | `/blog/is-ai-just-automation-with-a-new-label/` |
| `/getting-started-with-ai/` | `/blog/getting-started-with-ai/` |
| `/ai-agents-in-organisations/` | `/blog/ai-agents-in-organisations/` |
| `/agent-sprawl-the-new-shadow-it/` | `/blog/agent-sprawl-the-new-shadow-it/` |
| `/nl/ethisch_ai/` | `/blog/ethische-ai/` |
| `/nl/ai-zonder-hype/` | `/blog/ai-zonder-hype/` |
| `/nl/aigewoonautomatiseringmetnieuwlabel/` | `/blog/ai-gewoon-automatisering-met-nieuw-label/` |
| `/nl/beginnen_met_ai/` | `/blog/beginnen-met-ai/` |
| `/nl/ai-agents-in-organisaties/` | `/blog/ai-agents-in-organisaties/` |
| `/nl/agent-sprawl-de-nieuwe-shadow-it/` | `/blog/agent-sprawl-de-nieuwe-shadow-it/` |
| `/category/*`, `/tag/*`, `/author/*` | `/blog/` |
| `/nl/category/*`, `/nl/tag/*`, `/nl/author/*` | `/blog/overzicht/` |
| `/feed/`, `/comments/feed/` | `/blog/feed.xml` |
| `/nl/feed/` | `/blog/overzicht/feed.xml` |
| `/wp-admin/*`, `/wp-login.php`, `/xmlrpc.php`, `/wp-json/*` | 410 |
| `/wp-content/uploads/*` | Eerst specifieke regels voor afbeeldingen die extern gelinkt zijn; de rest 410 |
| Overige paden op orbisneo.nl en orbisneo.com | Zelfde pad op www.orbisneoconsulting.com (leidt zo nodig tot de 404-pagina) |

```text
# public/_redirects
# 1. Oude WordPress-paden (gelden op alle domeinen van de site)
/en/                     https://www.orbisneoconsulting.com/                         301!
/en/home-2/              https://www.orbisneoconsulting.com/                         301!
/nl/                     https://www.orbisneoconsulting.com/welkom/                  301!
/nl/home/                https://www.orbisneoconsulting.com/welkom/                  301!
/en/services/            https://www.orbisneoconsulting.com/services/                301!
/en/about/               https://www.orbisneoconsulting.com/about/                   301!
/contact-2/              https://www.orbisneoconsulting.com/contact/                 301!
/en/contact/             https://www.orbisneoconsulting.com/contact/                 301!
/en/contact-2/           https://www.orbisneoconsulting.com/contact/                 301!
/blog-2/                 https://www.orbisneoconsulting.com/blog/                    301!
/en/blog/                https://www.orbisneoconsulting.com/blog/                    301!
/privacy-policy/         https://www.orbisneoconsulting.com/privacy/                 301!
/nl/diensten/            https://www.orbisneoconsulting.com/diensten/                301!
/nl/over/                https://www.orbisneoconsulting.com/over/                    301!
/nl/contact/             https://www.orbisneoconsulting.com/kennismaken/             301!
/nl/blog/                https://www.orbisneoconsulting.com/blog/overzicht/          301!
/nl/privacybeleid/       https://www.orbisneoconsulting.com/privacybeleid/           301!

/ethical-ai-from-sentiment-to-working-agreements/  https://www.orbisneoconsulting.com/blog/ethical-ai-from-sentiment-to-working-agreements/  301!
/ai-without-the-hype/                       https://www.orbisneoconsulting.com/blog/ai-without-the-hype/                    301!
/is-ai-just-automation-with-a-new-label/    https://www.orbisneoconsulting.com/blog/is-ai-just-automation-with-a-new-label/ 301!
/getting-started-with-ai/                   https://www.orbisneoconsulting.com/blog/getting-started-with-ai/                301!
/ai-agents-in-organisations/                https://www.orbisneoconsulting.com/blog/ai-agents-in-organisations/             301!
/agent-sprawl-the-new-shadow-it/            https://www.orbisneoconsulting.com/blog/agent-sprawl-the-new-shadow-it/         301!
/nl/ethisch_ai/                             https://www.orbisneoconsulting.com/blog/ethische-ai/                            301!
/nl/ai-zonder-hype/                         https://www.orbisneoconsulting.com/blog/ai-zonder-hype/                         301!
/nl/aigewoonautomatiseringmetnieuwlabel/    https://www.orbisneoconsulting.com/blog/ai-gewoon-automatisering-met-nieuw-label/ 301!
/nl/beginnen_met_ai/                        https://www.orbisneoconsulting.com/blog/beginnen-met-ai/                        301!
/nl/ai-agents-in-organisaties/              https://www.orbisneoconsulting.com/blog/ai-agents-in-organisaties/              301!
/nl/agent-sprawl-de-nieuwe-shadow-it/       https://www.orbisneoconsulting.com/blog/agent-sprawl-de-nieuwe-shadow-it/       301!

/category/*              https://www.orbisneoconsulting.com/blog/                    301!
/tag/*                   https://www.orbisneoconsulting.com/blog/                    301!
/author/*                https://www.orbisneoconsulting.com/blog/                    301!
/nl/category/*           https://www.orbisneoconsulting.com/blog/overzicht/          301!
/nl/tag/*                https://www.orbisneoconsulting.com/blog/overzicht/          301!
/nl/author/*             https://www.orbisneoconsulting.com/blog/overzicht/          301!
/feed/                   https://www.orbisneoconsulting.com/blog/feed.xml            301!
/comments/feed/          https://www.orbisneoconsulting.com/blog/feed.xml            301!
/nl/feed/                https://www.orbisneoconsulting.com/blog/overzicht/feed.xml  301!

/wp-admin/*              /410.html   410!
/wp-login.php            /410.html   410!
/xmlrpc.php              /410.html   410!
/wp-json/*               /410.html   410!
/wp-content/*            /410.html   410!

# 2. Oude domeinen: alles wat hierboven niet matcht, met padbehoud
https://orbisneo.nl/*        https://www.orbisneoconsulting.com/:splat  301!
https://www.orbisneo.nl/*    https://www.orbisneoconsulting.com/:splat  301!
https://orbisneo.com/*       https://www.orbisneoconsulting.com/:splat  301!
https://www.orbisneo.com/*   https://www.orbisneoconsulting.com/:splat  301!
http://orbisneo.nl/*         https://www.orbisneoconsulting.com/:splat  301!
http://www.orbisneo.nl/*     https://www.orbisneoconsulting.com/:splat  301!
http://orbisneo.com/*        https://www.orbisneoconsulting.com/:splat  301!
http://www.orbisneo.com/*    https://www.orbisneoconsulting.com/:splat  301!
```

De regels voor `/services/` en `/about/` zijn niet nodig op het nieuwe domein (de paden bestaan daar), en worden op de oude domeinen afgevangen door de domeinbrede regel met padbehoud. Hetzelfde geldt voor `/privacybeleid/`. Of Netlify statuscode 410 bij een rewrite accepteert, wordt bij de bouw getest; anders wordt het 404. Omdat de regels in sectie 1 ook op de testomgeving werken, kan de hele kaart vóór lancering worden getest op test.orbisneoconsulting.com, met de kanttekening dat het doel dan het (nog niet actieve) productiedomein is. `scripts/check-redirects.ts` controleert daarom het pad van elk doel tegen `dist/`.

### Lanceerchecklist

| # | Controle | Wie |
|---|---|---|
| 1 | Alle placeholders ingevuld; `check-content` slaagt zonder waarschuwingen | Bouwer, Daniel |
| 2 | Teksten per pagina vergeleken met de huidige site (woordtelling, geen verloren alinea's) | Vera |
| 3 | Formulier in EN en NL getest; meldingen komen aan op het gekozen adres | Daniel |
| 4 | Taalwisselaar op elke pagina naar de juiste tegenhanger; detectie op `/` getest met NL- en EN-browser en met een bot-user-agent (geen omleiding) | Vera |
| 5 | Canonical, hreflang en `x-default` per pagina gecontroleerd; sitemap valideert | Vera |
| 6 | Alle regels uit de redirectkaart getest (één stap, juiste status) | Vera |
| 7 | Lighthouse minimaal 95 op vier categorieën voor home, diensten, blogartikel en contact | Vera |
| 8 | Toegankelijkheid: axe zonder fouten, toetsenbord en schermlezer steekproef | Vera |
| 9 | Umami-website aangemaakt, website-id als omgevingsvariabele gezet | Daniel |
| 10 | Back-up van WordPress gemaakt en bewaard | Daniel of hoster |
| 11 | Mailrecords van orbisneoconsulting.com en orbisneo.nl genoteerd vóór elke DNS-wijziging | Daniel |
| 12 | TTL van te wijzigen records een dag vooraf verlaagd naar de laagste waarde die TransIP toestaat | Daniel |
| 13 | TransIP-webhosting-doorverwijzing van orbisneoconsulting.com uitgezet, DNS naar Netlify, certificaat actief | Daniel |
| 14 | `PUBLIC_NOINDEX` op `false`, nieuwe productiedeploy, robots.txt en meta gecontroleerd | Bouwer |
| 15 | Sitemap ingediend in Search Console en Bing | Daniel of Vera |
| 16 | Dag 2: orbisneo.nl en orbisneo.com naar Netlify; Adreswijziging in Search Console | Daniel |
| 17 | Testmail van en naar de nieuwe aliassen na de DNS-wijziging | Daniel |

### Terugvalplan

Voor problemen in de site zelf geldt: in Netlify met één klik een eerdere deploy publiceren, of een revert in GitHub. Voor problemen na de domeinwissel staan de oorspronkelijke DNS-waarden van beide domeinen genoteerd (checklistpunt 11). Terugzetten van de `@`- en `www`-records van orbisneoconsulting.com en het weer aanzetten van de TransIP-doorverwijzing herstelt de oude situatie; voor orbisneo.nl worden de oude records naar de WordPress-hosting teruggezet. WordPress en de bijbehorende hosting blijven daarom minimaal drie maanden na lancering beschikbaar, en mailrecords worden in geen enkele stap gewijzigd, zodat mail nooit deel van een terugval hoeft te zijn.

## Open punten

De taalstrategie is geen open punt meer: Nederlandse adressen zonder prefix, met `hreflang` en `x-default`, detectie alleen bij het eerste homepagebezoek en nooit voor bots, en een taalwisselaar die naar de tegenhanger springt en de keuze onthoudt, is vastgesteld (paragraaf 1.4). De volgende punten vragen nog een besluit of input van Daniel.

| # | Onderwerp | Vraag | Voorstel |
|---|---|---|---|
| 1 | Nederlandse adressen | Akkoord met `/welkom/` (NL-home), `/kennismaken/` (contact), `/blog/overzicht/` (blogoverzicht), `/privacybeleid/` en `/nieuws/`? | Akkoord; alternatief voor het blogoverzicht is `/visie/` |
| 2 | Detectie via IP | Mag het land (Nederland, België) meewegen als de browser Engels noch Nederlands opgeeft? | Standaard uit; alleen browsertaal |
| 3 | Hosting en domeinen | Daniel noemde een apart hostingpakket zonder WordPress én Netlify. Met Netlify als host is een apart TransIP-hostingpakket overbodig; TransIP blijft alleen voor DNS. Waar staan DNS en hosting van orbisneo.nl, orbisneo.com en de huidige WordPress, en mag de TransIP-webhosting van orbisneoconsulting.com na lancering worden opgezegd? | Netlify als enige host; TransIP alleen DNS; oude hosting na drie maanden opzeggen |
| 4 | Mail | Welke aliassen komen op orbisneoconsulting.com (bijvoorbeeld info@ en daniel@), welk adres staat op de site, waar komen formulierberichten binnen, en welk adres ontvangt DMARC-rapporten? Is het domein al aan de Microsoft 365-tenant toegevoegd? | info@orbisneoconsulting.com op de site en als formulierontvanger; info@orbisneo.nl blijft werken |
| 5 | Logobestanden | SVG of transparante PNG van beeldmerk en beeldmerk plus woordmerk uit OneDrive (Orbis Neo) | Daniel levert; tot dan `logo-transparant.png` als tijdelijke versie |
| 6 | Cases | Situatie en resultaat per case aanvullen; de interim Head of IT-opdracht: organisatie noemen of anoniem, periode en resultaat; klopt "Info Support, 2026 tot heden" nog? | Daniel levert feiten; niets wordt verzonnen |
| 7 | Klantlogo's | Mogen alle elf logo's blijven? Essent, Rijkswaterstaat, Rechtspraak/IVO, gemeente Rotterdam en Sopra Steria staan niet als werkgever in de loopbaan: in welke rol was Daniel daar betrokken? Kop "Organisations I have worked for" of "with"? | Info Support blijft; overige na bevestiging |
| 8 | Lettertype | Fraunces plus Source Sans 3, of Figtree plus Source Sans 3? | Fraunces plus Source Sans 3 |
| 9 | Umami | Umami Cloud (gratis Hobby-plan, EU-servers) of zelf hosten (eigen server en PostgreSQL)? | Umami Cloud, EU |
| 10 | Nieuws | Eigen pagina per editie (indexeerbaar) of alleen het blok op de homepage? Aantal items per week, onderwerpen, bronbeleid, ook in het Nederlands? | Eigen pagina's in beide talen, drie tot acht items |
| 11 | Vertalingen | Engelse versie van de footertekst en de ondertitels "Perspective" en "Insights on Organization, Strategy & AI" in het Nederlands | Vera levert concepten ter goedkeuring |
| 12 | Tekstcontrole Board scan | "For: CEO, CFO, CIO or board team" naast "Group size: 6 to 20 participants": klopt dat? | Daniel bevestigt of past aan |
| 13 | Blogafbeeldingen | Licentie van de huidige stockfoto's controleren, of eigen beelden gebruiken? | Controleren en bronvermelding in frontmatter |
| 14 | Kennismaking | Alleen het formulier, of ook een agendalink (bijvoorbeeld Microsoft Bookings) voor het gesprek van 15 minuten? Extra veld "Organisatie" in het formulier? | Alleen formulier; veld organisatie optioneel toevoegen |
| 15 | Reactietermijn | Welke termijn noemt de bedanktpagina? | Daniel bepaalt |
| 16 | Social links | X (`orbis_neo`) en Instagram (`orbisneo`) behouden naast LinkedIn? | Alleen actieve kanalen tonen |
| 17 | Accounts | GitHub-organisatie en Netlify-team op naam van Orbis Neo; GitHub-account voor Vera | Daniel maakt aan, zie "GitHub-repo stappen" |
| 18 | Privacyverklaring | Bijgewerkte tekst met Netlify, Umami, Microsoft 365, GitHub en de taalcookie | Vera levert concept |
| 19 | Lanceermoment | Wanneer gaat de site live, en wanneer worden WordPress en de oude hosting opgezegd? | Geen deadline; na akkoord op de test |

# Deel 2: Startopdracht Claude Code {.part}

## Versiebeheer {.unnumbered}

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | 15 oktober 2026 | Eerste versie van de startopdracht | Vera (Website & Voice) |

## Inleiding {.unnumbered}

### Doel van dit document {.unnumbered}

Dit document bevat de eerste opdracht (prompt) voor Claude Code, de AI-codebouwer die de nieuwe website van Orbis Neo bouwt. Het legt vast wat het doel is, welke bestanden eerst gelezen moeten worden, in welke volgorde het werk gebeurt, hoe er gewerkt wordt en welke vragen Claude Code eerst aan Daniel stelt. Hoofdstuk 6 is de letterlijke prompt die in Claude Code geplakt kan worden.

### Scope {.unnumbered}

| Binnen scope | Buiten scope |
|---|---|
| Bouw van de site volgens het productdocument, in kleine pull requests | Samenvoegen naar `main` (alleen Daniel) |
| Repository-inrichting, code, content-migratie, configuratie van Netlify-bestanden | DNS-wijzigingen bij TransIP |
| Tests en controles in GitHub Actions | Wijzigingen aan de live WordPress-site |
| Vragen stellen aan Daniel bij ontbrekende feiten | Verzinnen van feiten, klanten of prijzen |

### Doelgroep {.unnumbered}

Daniel Fokker (die de opdracht start en goedkeurt), Claude Code (uitvoerder) en Vera (die de previews test).

## Doel

Bouw de nieuwe, tweetalige website van Orbis Neo op www.orbisneoconsulting.com met Astro (statisch), Decap CMS, Netlify (hosting, Forms, Edge Functions, redirects, deploy previews), Umami en GitHub Actions, precies volgens `productdocument-nieuwe-website.md` versie 1.0. Het resultaat is een site die Daniel via deploy previews beoordeelt en die pas na zijn uitdrukkelijke akkoord live gaat.

## Te lezen bestanden

| Volgorde | Bestand | Waarom |
|---|---|---|
| 1 | `productdocument-nieuwe-website.md` (dit startpakket) | Volledige specificatie: leidend bij elke twijfel |
| 2 | `werkafspraak.md` | Hoe er wordt opgeleverd en getest |
| 3 | `github-repo-stappen.md` | Inrichting van repository en Netlify |
| 4 | `transip-dns.md` | Alleen ter informatie; DNS doet Daniel |
| 5 | `voorstel-nieuwe-website.md` en `palette.json` | Achtergrond: logo-analyse, kleuren, URL-inventaris |
| 6 | `html/` (opgehaalde pagina's van 15 oktober 2026) | Bron voor letterlijke teksten |
| 7 | `logo/` | Tijdelijke logobestanden tot de SVG of PNG van Daniel er is |

## Volgorde van het werk

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

## Werkwijze

Claude Code werkt in kleine, afgebakende pull requests met een duidelijke titel en een beschrijving volgens het sjabloon in `github-repo-stappen.md`: wat is gewijzigd, waarom, hoe te testen en welke open punten er zijn. Elke pull request krijgt automatisch een deploy preview van Netlify; de link staat in de pull request. Claude Code voegt nooit zelf samen naar `main`, pusht nooit rechtstreeks naar `main`, zet nooit `PUBLIC_NOINDEX` op `false` en wijzigt geen DNS. Ontbrekende feiten worden niet verzonnen maar als `[PLACEHOLDER: ...]` opgenomen en in de pull request genoemd. Teksten van de huidige site worden letterlijk overgenomen; tikfouten worden alleen gemarkeerd, niet stil verbeterd. Het em-streepje wordt nergens gebruikt, ook niet in code-commentaar of commitberichten. Bij twijfel over de specificatie stelt Claude Code een vraag in de pull request in plaats van een aanname te doen.

## Eerste vragen aan Daniel

Voordat stap 4 begint, stelt Claude Code de volgende vragen (in één bericht, genummerd):

1. Kun je de logobestanden uit je OneDrive (map Orbis Neo) aanleveren als SVG, of anders als PNG met transparante achtergrond, voor het beeldmerk en voor beeldmerk plus woordmerk?
2. Welke feiten wil je per case tonen (situatie en resultaat), en hoe wil je de interim Head of IT-opdracht noemen (organisatie of anoniem, periode, resultaat)? Klopt "Info Support, 2026 tot heden" nog?
3. Welke klantlogo's mogen op de site, en in welke rol was je betrokken bij Essent, Rijkswaterstaat, Rechtspraak/IVO, gemeente Rotterdam en Sopra Steria?
4. Kies je Umami Cloud (gratis Hobby-plan, EU-servers) of zelf hosten (eigen server met PostgreSQL)?
5. Is het Netlify-account (team) aangemaakt en gekoppeld aan de GitHub-repository, en welk e-mailadres ontvangt de formulierberichten?

## Prompt voor Claude Code

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

# Deel 3: GitHub-repo stappen {.part}

## Versiebeheer {.unnumbered}

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | 15 oktober 2026 | Eerste versie van de stappen voor GitHub en Netlify | Vera (Website & Voice) |

## Inleiding {.unnumbered}

### Doel van dit document {.unnumbered}

Dit document beschrijft stap voor stap hoe Daniel de private GitHub-repository voor de nieuwe website aanmaakt, `main` beschermt, Netlify koppelt, deploy previews inschakelt, de benodigde instellingen en geheimen vastlegt en Claude Code en Vera veilig toegang geeft. Na deze stappen kan Claude Code beginnen met pull request 1 uit de startopdracht.

### Scope {.unnumbered}

| Binnen scope | Buiten scope |
|---|---|
| GitHub-organisatie of -account, repository, beveiliging van `main`, CODEOWNERS | De code zelf (zie startopdracht) |
| Netlify-team, koppeling met GitHub, deploy previews, omgevingsvariabelen, OAuth voor Decap | DNS bij TransIP (zie TransIP DNS) |
| Toegang voor Claude Code en Vera met minimale rechten | Betaalgegevens en abonnementen invullen |

### Doelgroep {.unnumbered}

Daniel Fokker, die de accounts aanmaakt en beheert, en Claude Code en Vera, die moeten weten welke rechten ze hebben.

## Voorwaarden

Daniel heeft een eigen GitHub-account met tweestapsverificatie en een Netlify-account op een adres van Orbis Neo. Een belangrijk aandachtspunt: beschermde branches, verplichte reviewers en code owners zijn bij GitHub voor **private** repositories alleen beschikbaar met GitHub Pro (persoonlijk account) of GitHub Team (organisatie); met GitHub Free werken ze alleen in publieke repositories (bron: docs.github.com, "GitHub's plans" en "About rulesets", gecontroleerd oktober 2026). Omdat de afspraak "niets naar `main` zonder Daniel" op die bescherming steunt, is een van die plannen nodig, of moet Daniel bewust kiezen voor een publieke repository (de site is toch openbaar; er staan geen geheimen in de code). Dit is open punt 1 van dit document.

## Repository aanmaken

1. Maak bij voorkeur een GitHub-organisatie aan, bijvoorbeeld `orbisneo`, met Daniel als eigenaar. Een organisatie maakt het later eenvoudiger om toegang te geven en in te trekken.
2. Maak de repository `orbisneo-website` aan: zichtbaarheid Private, met een README, `.gitignore` voor Node en zonder licentie.
3. Zet onder Settings, General: standaardbranch `main`; alleen "Allow squash merging" aan; "Automatically delete head branches" aan.
4. Zet onder Settings, Code security: Dependabot alerts en security updates aan, en secret scanning met push protection aan (voor zover het plan dat biedt).

## Bescherming van main

Maak onder Settings, Rules, Rulesets een branch-ruleset "main beschermd" voor de standaardbranch, met:

| Regel | Instelling |
|---|---|
| Restrict deletions | Aan |
| Block force pushes | Aan |
| Require a pull request before merging | Aan, 1 goedkeuring |
| Require review from Code Owners | Aan |
| Dismiss stale approvals when new commits are pushed | Aan |
| Require approval of the most recent reviewable push | Aan, zodat niemand zijn eigen laatste wijziging goedkeurt |
| Require conversation resolution before merging | Aan |
| Require status checks to pass | Aan: `ci / build-and-check` en `netlify/deploy-preview` (namen verschijnen na de eerste run) |
| Bypass list | Leeg, of alleen Daniel voor noodgevallen |

Leg in de repository het bestand `.github/CODEOWNERS` vast, zodat elke wijziging Daniels goedkeuring vraagt:

```text
# .github/CODEOWNERS
*  @<github-gebruikersnaam-van-daniel>
```

En een sjabloon voor pull requests:

```markdown
<!-- .github/pull_request_template.md -->
## Wat is gewijzigd
## Waarom
## Hoe te testen (preview-URL en stappen)
## Placeholders en open vragen
## Checklist
- [ ] Geen verzonnen feiten, klanten of prijzen
- [ ] Geen em-streepjes
- [ ] Beide talen bijgewerkt
```

## GitHub Actions

De workflow controleert elke pull request. Netlify bouwt en publiceert zelf; Actions hoeft daarvoor geen geheimen te hebben.

```yaml
# .github/workflows/ci.yml
name: ci
on:
  pull_request:
  push:
    branches: [main]
permissions:
  contents: read
jobs:
  build-and-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci
      - run: npx astro check
      - run: npm run build
        env:
          CONTEXT: deploy-preview
          PUBLIC_NOINDEX: "true"
      # npm run build draait ook check-content en check-redirects
      - name: Linkcheck
        uses: lycheeverse/lychee-action@v2
        with:
          args: --offline --no-progress "dist/**/*.html"
      - name: Lokale server voor toegankelijkheidstest
        run: npx --yes serve dist -l 4321 &
      - name: Toegankelijkheid (axe)
        run: npx --yes wait-on http://localhost:4321 && npx --yes @axe-core/cli http://localhost:4321/ http://localhost:4321/welkom/ http://localhost:4321/contact/ http://localhost:4321/kennismaken/ --exit
```

Lighthouse wordt door Vera op de deploy preview gedraaid (zie werkafspraak); een automatische Lighthouse-run op de preview kan later met de Netlify Lighthouse-plugin worden toegevoegd.

## Netlify koppelen

1. Maak in Netlify een team aan op naam van Orbis Neo.
2. Kies "Add new project", "Import an existing project", GitHub, en geef de Netlify GitHub App alleen toegang tot `orbisneo-website` (niet tot alle repositories).
3. Buildinstellingen worden uit `netlify.toml` gelezen: command `npm run build`, publish `dist`.
4. Geef de site een herkenbare naam, bijvoorbeeld `orbisneo-website`; het Netlify-adres wordt dan `orbisneo-website.netlify.app`. Die naam is nodig voor de CNAME-records in "TransIP DNS".
5. Controleer onder Project configuration, Build and deploy, Branches and deploy contexts: production branch `main`; Deploy Previews voor alle pull requests naar `main` aan; branch deploys uit.
6. Zet onder Deploy notifications de GitHub-commitstatus en de pull-request-reactie met de preview-link aan.
7. Zet onder Forms de formulierdetectie aan en stel bij Form notifications het ontvangstadres in (open punt 4 van het productdocument).

## Omgevingsvariabelen en geheimen

| Naam | Waar | Waarde | Geheim |
|---|---|---|---|
| `PUBLIC_NOINDEX` | Netlify, alle contexten | `true` tot de lancering; productie daarna `false` | Nee |
| `PUBLIC_SITE_ENV` | `netlify.toml` per context | `production` of `preview` | Nee |
| `PUBLIC_UMAMI_WEBSITE_ID` | Netlify, productie | Website-id uit Umami | Nee (staat in de HTML) |
| `LANG_USE_GEO` | Netlify, alle contexten | `false` (open punt 2 productdocument) | Nee |
| GitHub OAuth client ID en secret | Netlify, Access and security, OAuth | Uit de GitHub OAuth App (zie hieronder) | Ja, alleen in Netlify |

Er staan geen geheimen in de repository. GitHub Actions heeft voor deze opzet geen eigen geheimen nodig.

## Inloggen in Decap (GitHub-backend)

1. Maak in GitHub onder Settings, Developer settings, OAuth Apps een nieuwe OAuth App "Orbis Neo CMS" met homepage `https://www.orbisneoconsulting.com` en callback-URL `https://api.netlify.com/auth/done`.
2. Voer in Netlify onder Project configuration, Access and security, OAuth bij "Install provider" GitHub de client ID en het client secret in.
3. In `public/admin/config.yml` staat `backend: name: github`, `repo: orbisneo/orbisneo-website` en `branch: main`.
4. Daniel en Vera loggen op `/admin/` in met hun eigen GitHub-account; ze hebben schrijfrechten op de repository, en door de ruleset komt alles als pull request binnen.

## Toegang voor Claude Code en Vera

| Wie | Hoe | Rechten | Niet toegestaan |
|---|---|---|---|
| Claude Code | Een fine-grained personal access token van een apart GitHub-account (bijvoorbeeld `orbisneo-builder`), alleen voor `orbisneo-website`, of de officiële Claude GitHub App alleen voor deze repository | Contents read and write, Pull requests read and write, Metadata read; vervaldatum maximaal 90 dagen | Admin, bypass van de ruleset, toegang tot andere repositories |
| Vera | Eigen GitHub-account of GitHub App, rol Write op deze repository | Branches en pull requests maken, reageren | Samenvoegen naar `main` zonder Daniels goedkeuring, rulesets wijzigen |
| Daniel | Eigenaar | Admin, enige code owner | n.v.t. |

Tokens worden niet in de repository of in chats geplakt, maar alleen in de omgeving waar Claude Code draait. Bij beëindiging van de opdracht trekt Daniel het token in of verwijdert hij het account uit de organisatie.

## Controle na inrichting

1. Claude Code opent een test-pull request; de Netlify-reactie met preview-link verschijnt.
2. De ruleset blokkeert samenvoegen zonder Daniels goedkeuring en zonder groene controles.
3. Een directe push naar `main` door Claude Code wordt geweigerd.
4. Daniel kan op de preview `/admin/` openen en inloggen.

## Open punten

| # | Vraag | Voorstel |
|---|---|---|
| 1 | Private repository met GitHub Pro of Team, of publieke repository met GitHub Free? | Private met Team (organisatie) of Pro; publiek kan ook, omdat er geen geheimen in staan |
| 2 | Naam van de GitHub-organisatie en de repository | `orbisneo` en `orbisneo-website` |
| 3 | Claude Code via apart account met token of via de Claude GitHub App? | Apart account met fine-grained token, 90 dagen |

# Deel 4: Werkafspraak bouw, test en goedkeuring {.part}

## Versiebeheer {.unnumbered}

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | 15 oktober 2026 | Eerste versie van de werkafspraak | Vera (Website & Voice) |

## Inleiding {.unnumbered}

### Doel van dit document {.unnumbered}

Deze werkafspraak legt vast hoe de bouw van de nieuwe website wordt opgeleverd, getest en goedgekeurd. De kern is eenvoudig: Claude Code levert alles via GitHub als pull request, Vera test elke preview en de testomgeving en rapporteert aan Daniel, en niets gaat live zonder Daniel.

### Scope {.unnumbered}

| Binnen scope | Buiten scope |
|---|---|
| Rollen en verantwoordelijkheden tijdens bouw, test en lancering | Inhoudelijke specificatie (zie productdocument) |
| Testchecklist en rapportageformat | Inrichting van accounts (zie GitHub-repo stappen) |
| Regels voor publicatie en lancering | DNS-stappen (zie TransIP DNS) |

### Doelgroep {.unnumbered}

Daniel Fokker, Claude Code en Vera.

## Rollen

| Rol | Wie | Verantwoordelijk voor |
|---|---|---|
| Opdrachtgever en goedkeurder | Daniel Fokker | Besluiten, feiten en teksten, goedkeuren en samenvoegen van pull requests, DNS en lancering |
| Bouwer | Claude Code | Code en configuratie, uitsluitend via pull requests met preview |
| Tester en rapporteur | Vera (Website & Voice) | Testen van elke preview en van de testomgeving, rapport aan Daniel, nieuwsedities als pull request |

## Afspraken

1. Claude Code levert alles via GitHub, in kleine pull requests met een beschrijving volgens het sjabloon en een deploy preview. Er wordt niets rechtstreeks naar `main` gepusht.
2. Vera test elke pull request op de deploy preview en vóór lancering de volledige testomgeving `test.orbisneoconsulting.com`, volgens de checklist in hoofdstuk 3.
3. Vera rapporteert aan Daniel per pull request (kort) en per testronde (volledig), in het format van hoofdstuk 4. Bevindingen gaan als reactie in de pull request; blokkerende punten krijgen het label `blokkerend`.
4. Alleen Daniel voegt samen naar `main`, zet `PUBLIC_NOINDEX` op `false`, wijzigt DNS en geeft het startsein voor de lancering. Niets gaat live zonder Daniel.
5. Niemand verzint feiten, klanten of prijzen. Ontbrekende informatie wordt een placeholder en een vraag aan Daniel.
6. Er wordt niets namens Orbis Neo verzonden of gepubliceerd buiten de site om, en de live WordPress-site wordt niet aangeraakt.
7. Elke actie die iets wijzigt (bestand, upload, instelling) wordt door Vera vastgelegd in de actielog van Orbis Neo.

## Testchecklist

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

## Rapportage

Per pull request plaatst Vera een korte reactie: geteste preview-URL, resultaat per relevant gebied (geslaagd of bevinding), en een advies (samenvoegen of eerst aanpassen). Per testronde stuurt Vera Daniel een rapport met deze opbouw: samenvatting in drie zinnen, tabel met de checklist en per regel geslaagd of niet, lijst met bevindingen op volgorde van ernst (blokkerend, belangrijk, cosmetisch) met schermafbeelding en URL, en een duidelijk advies of de site klaar is voor lancering. Het besluit ligt bij Daniel.

## Lancering

De lancering verloopt volgens de lanceerchecklist in het productdocument en de stappen in "TransIP DNS". Vera bevestigt vooraf schriftelijk dat de laatste testronde zonder blokkerende bevindingen is afgerond. Daniel geeft het startsein en voert de DNS-stappen uit, of geeft daar uitdrukkelijk opdracht voor. Na de lancering herhaalt Vera de checklist op het productiedomein en meldt zij het resultaat aan Daniel.

# Deel 5: TransIP DNS {.part}

## Versiebeheer {.unnumbered}

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | 15 oktober 2026 | Eerste versie van de DNS-instructie | Vera (Website & Voice) |

## Inleiding {.unnumbered}

### Doel van dit document {.unnumbered}

Deze instructie beschrijft de DNS-stappen bij TransIP voor de nieuwe website: orbisneoconsulting.com loskoppelen van de huidige 302-doorverwijzing via TransIP-webhosting, de records voor Netlify en de testomgeving zetten, de mailrecords voor Microsoft 365 behouden of aanmaken voor de nieuwe aliassen, en later orbisneo.nl en orbisneo.com met een 301 naar orbisneoconsulting.com laten doorsturen.

### Scope {.unnumbered}

| Binnen scope | Buiten scope |
|---|---|
| DNS van orbisneoconsulting.com bij TransIP | Inrichten van mailboxen en aliassen in Microsoft 365 |
| Records voor Netlify (apex, www, test) | Netlify-instellingen zelf (zie GitHub-repo stappen) |
| Mailrecords Microsoft 365 (MX, SPF, DKIM, DMARC, autodiscover) | Verhuizen van domeinregistraties |
| DNS-stappen voor orbisneo.nl en orbisneo.com | De 301-regels zelf (staan in `_redirects`) |

### Doelgroep {.unnumbered}

Daniel Fokker, die de wijzigingen in het TransIP-controlepaneel uitvoert, en Vera, die ze controleert.

### Bronnen {.unnumbered}

De Netlify-waarden komen uit "Configure external DNS for a custom domain" op docs.netlify.com: een subdomein krijgt een CNAME naar de Netlify-subdomeinnaam van de site; een apexdomein krijgt bij voorkeur een ALIAS, ANAME of flattened CNAME naar `apex-loadbalancer.netlify.com`, met als terugvaloptie een A-record naar het load-balancer-IP `75.2.60.5`; en bij externe DNS raadt Netlify een subdomein (zoals www) als primair domein aan. TransIP ondersteunt ALIAS-records, alleen voor het rootdomein en zonder dat een MX- of NS-record naar dat rootdomein zelf mag verwijzen (transip.nl, knowledgebase "Een ALIAS-record instellen"). De DKIM-opbouw komt uit "How to use DKIM for email in your custom domain" op learn.microsoft.com.

## Uitgangssituatie

orbisneoconsulting.com staat op de nameservers van TransIP. www.orbisneoconsulting.com stuurt nu met een 302 door naar orbisneo.nl via een TransIP-webhostingpakket. De nieuwe site draait op Netlify onder de naam `<sitenaam>.netlify.app` (bijvoorbeeld `orbisneo-website.netlify.app`, zie GitHub-repo stappen). Mail blijft op Microsoft 365.

## Stap 1: inventariseren (vóór elke wijziging)

1. Open in het TransIP-controlepaneel het domein orbisneoconsulting.com, tabblad DNS.
2. Maak een schermafbeelding of export van alle huidige records, en noteer ze in een tabel. Dit is de basis voor het terugvalplan.
3. Controleer of de optie om de standaardinstellingen van TransIP automatisch te beheren aan staat. Zo ja, dan worden records door TransIP gezet (bijvoorbeeld naar de webhosting of de TransIP-mail); zet dit pas om naar handmatig beheer op het moment dat de nieuwe records klaarstaan.
4. Noteer in het bijzonder: A- en AAAA-records voor `@` en `www` (webhosting), eventuele MX naar TransIP, en alles wat met mail te maken heeft.
5. Doe hetzelfde voor orbisneo.nl en orbisneo.com, waar die DNS ook staat (open punt 1).

## Stap 2: testomgeving

Voeg één record toe; de rest blijft ongewijzigd.

| Naam | Type | Waarde | TTL |
|---|---|---|---|
| `test` | CNAME | `<sitenaam>.netlify.app.` | 1 uur |

Voeg daarna in Netlify `test.orbisneoconsulting.com` als domein toe. Netlify geeft automatisch een certificaat uit. De testomgeving heeft `noindex`.

## Stap 3: mailrecords voor Microsoft 365

Voeg in het Microsoft 365-beheercentrum orbisneoconsulting.com als domein toe aan de tenant (als dat nog niet is gebeurd). Microsoft toont daarna de exacte waarden; neem die letterlijk over. De tabel geeft de opbouw.

| Naam | Type | Waarde | Toelichting |
|---|---|---|---|
| `@` | TXT | `MS=ms<nummer>` | Verificatie; exacte waarde uit Microsoft 365 |
| `@` | MX | prioriteit `0`, `<orbisneoconsulting-com>.mail.protection.outlook.com.` | Exacte hostnaam uit Microsoft 365 |
| `@` | TXT | `v=spf1 include:spf.protection.outlook.com -all` | SPF; slechts één SPF-record per domein |
| `autodiscover` | CNAME | `autodiscover.outlook.com.` | Automatische Outlook-configuratie |
| `selector1._domainkey` | CNAME | waarde `Selector1CNAME` uit Microsoft | DKIM; sinds mei 2025 formaat `selector1-<domein-met-streepjes>._domainkey.<tenantprefix>.<letter>-v1.dkim.mail.microsoft`, letter niet te voorspellen |
| `selector2._domainkey` | CNAME | waarde `Selector2CNAME` uit Microsoft | Idem |
| `_dmarc` | TXT | `v=DMARC1; p=none; rua=mailto:<rapportadres>; fo=1` | Eerst alleen rapporteren; na vier weken zonder problemen `p=quarantine` |

Zet DKIM daarna in het Microsoft Defender-portaal aan voor het domein. Maak de aliassen aan in Microsoft 365 en stuur een testmail van en naar elk alias. Verwijder een bestaande MX naar TransIP-mail alleen als die mail niet in gebruik is. Netlify heeft geen mailrecords nodig en verandert er niets aan.

## Stap 4: lancering van orbisneoconsulting.com

1. Verlaag een dag vooraf de TTL van de records voor `@` en `www` naar de laagste waarde die TransIP toestaat.
2. Voeg in Netlify `www.orbisneoconsulting.com` als primair domein toe; Netlify voegt het apexdomein automatisch toe en toont onder "Pending DNS verification" de exacte waarden voor deze site. Gebruik die als ze afwijken van de tabel hieronder.
3. Zet de doorverwijzing in het TransIP-webhostingpakket uit (de 302 naar orbisneo.nl), zodat het pakket het domein niet meer bedient.
4. Verwijder in de DNS de A- en AAAA-records voor `@` en `www` die naar de TransIP-webhosting wijzen. Let op AAAA: blijft dat staan, dan komen bezoekers met IPv6 nog op de oude hosting.
5. Zet de nieuwe records:

| Naam | Type | Waarde | Toelichting |
|---|---|---|---|
| `@` | ALIAS | `apex-loadbalancer.netlify.com.` | Aanbevolen door Netlify; TransIP ondersteunt ALIAS op het rootdomein |
| `@` | A | `75.2.60.5` | Alleen als ALIAS niet mogelijk is (terugvaloptie volgens Netlify); niet beide tegelijk |
| `www` | CNAME | `<sitenaam>.netlify.app.` | Primaire site |
| `@` | TXT | `google-site-verification=<code>` | Search Console, als nog niet gedaan |

6. Wacht tot Netlify het domein als geverifieerd toont en het certificaat actief is. Dat kan tot een dag duren, meestal veel korter.
7. Controleer: `https://www.orbisneoconsulting.com/` toont de nieuwe site, `https://orbisneoconsulting.com/` stuurt door naar www, en de mail werkt nog (testmail).
8. Verwijder het `test`-record of laat het staan als doorverwijzing; Daniel beslist.

## Stap 5: orbisneo.nl en orbisneo.com doorsturen

Pas als stap 4 minimaal een dag stabiel draait:

1. Voeg in Netlify orbisneo.nl, www.orbisneo.nl, orbisneo.com en www.orbisneo.com toe als domeinaliassen van dezelfde site.
2. Zet bij de DNS-beheerder van elk domein: `@` als ALIAS naar `apex-loadbalancer.netlify.com.` (of A naar `75.2.60.5` als ALIAS niet kan) en `www` als CNAME naar `<sitenaam>.netlify.app.`. Verwijder A- en AAAA-records naar de oude hosting.
3. Laat alle mailrecords van orbisneo.nl ongewijzigd (MX, SPF, DKIM, DMARC, autodiscover), zodat info@orbisneo.nl blijft werken.
4. De 301-regels in `_redirects` worden direct actief, met padbehoud. Vera test de redirectkaart.
5. Gebruik in Google Search Console de functie Adreswijziging van orbisneo.nl naar orbisneoconsulting.com.

## Terugvalplan

Bij problemen met de site: zet de genoteerde records van `@` en `www` terug en zet de TransIP-doorverwijzing weer aan; voor orbisneo.nl de oude records naar de WordPress-hosting. Mailrecords worden in geen enkele stap gewijzigd en hoeven dus niet te worden teruggezet. De WordPress-hosting blijft minimaal drie maanden beschikbaar.

## Open punten

| # | Vraag |
|---|---|
| 1 | Bij welke partij staan DNS en registratie van orbisneo.nl en orbisneo.com, en wie heeft daar toegang? |
| 2 | Is orbisneoconsulting.com al aan de Microsoft 365-tenant toegevoegd, en welke aliassen komen er? |
| 3 | Welk adres ontvangt de DMARC-rapporten? |
| 4 | Mag het TransIP-webhostingpakket van orbisneoconsulting.com na de lancering worden opgezegd? Met Netlify als host is het niet meer nodig. |
