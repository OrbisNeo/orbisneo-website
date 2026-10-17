---
title: "TransIP DNS"
subtitle: "DNS-instructie voor orbisneoconsulting.com, Netlify en Microsoft 365"
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
| 1.0 | 15 oktober 2026 | Eerste versie van de DNS-instructie | Vera (Website & Voice) |

# Inleiding {.unnumbered}

## Doel van dit document {.unnumbered}

Deze instructie beschrijft de DNS-stappen bij TransIP voor de nieuwe website: orbisneoconsulting.com loskoppelen van de huidige 302-doorverwijzing via TransIP-webhosting, de records voor Netlify en de testomgeving zetten, de mailrecords voor Microsoft 365 behouden of aanmaken voor de nieuwe aliassen, en later orbisneo.nl en orbisneo.com met een 301 naar orbisneoconsulting.com laten doorsturen.

## Scope {.unnumbered}

| Binnen scope | Buiten scope |
|---|---|
| DNS van orbisneoconsulting.com bij TransIP | Inrichten van mailboxen en aliassen in Microsoft 365 |
| Records voor Netlify (apex, www, test) | Netlify-instellingen zelf (zie GitHub-repo stappen) |
| Mailrecords Microsoft 365 (MX, SPF, DKIM, DMARC, autodiscover) | Verhuizen van domeinregistraties |
| DNS-stappen voor orbisneo.nl en orbisneo.com | De 301-regels zelf (staan in `_redirects`) |

## Doelgroep {.unnumbered}

Daniel Fokker, die de wijzigingen in het TransIP-controlepaneel uitvoert, en Vera, die ze controleert.

## Bronnen {.unnumbered}

De Netlify-waarden komen uit "Configure external DNS for a custom domain" op docs.netlify.com: een subdomein krijgt een CNAME naar de Netlify-subdomeinnaam van de site; een apexdomein krijgt bij voorkeur een ALIAS, ANAME of flattened CNAME naar `apex-loadbalancer.netlify.com`, met als terugvaloptie een A-record naar het load-balancer-IP `75.2.60.5`; en bij externe DNS raadt Netlify een subdomein (zoals www) als primair domein aan. TransIP ondersteunt ALIAS-records, alleen voor het rootdomein en zonder dat een MX- of NS-record naar dat rootdomein zelf mag verwijzen (transip.nl, knowledgebase "Een ALIAS-record instellen"). De DKIM-opbouw komt uit "How to use DKIM for email in your custom domain" op learn.microsoft.com.

# Uitgangssituatie

orbisneoconsulting.com staat op de nameservers van TransIP. www.orbisneoconsulting.com stuurt nu met een 302 door naar orbisneo.nl via een TransIP-webhostingpakket. De nieuwe site draait op Netlify onder de naam `<sitenaam>.netlify.app` (bijvoorbeeld `orbisneo-website.netlify.app`, zie GitHub-repo stappen). Mail blijft op Microsoft 365.

# Stap 1: inventariseren (vóór elke wijziging)

1. Open in het TransIP-controlepaneel het domein orbisneoconsulting.com, tabblad DNS.
2. Maak een schermafbeelding of export van alle huidige records, en noteer ze in een tabel. Dit is de basis voor het terugvalplan.
3. Controleer of de optie om de standaardinstellingen van TransIP automatisch te beheren aan staat. Zo ja, dan worden records door TransIP gezet (bijvoorbeeld naar de webhosting of de TransIP-mail); zet dit pas om naar handmatig beheer op het moment dat de nieuwe records klaarstaan.
4. Noteer in het bijzonder: A- en AAAA-records voor `@` en `www` (webhosting), eventuele MX naar TransIP, en alles wat met mail te maken heeft.
5. Doe hetzelfde voor orbisneo.nl en orbisneo.com, waar die DNS ook staat (open punt 1).

# Stap 2: testomgeving

Voeg één record toe; de rest blijft ongewijzigd.

| Naam | Type | Waarde | TTL |
|---|---|---|---|
| `test` | CNAME | `<sitenaam>.netlify.app.` | 1 uur |

Voeg daarna in Netlify `test.orbisneoconsulting.com` als domein toe. Netlify geeft automatisch een certificaat uit. De testomgeving heeft `noindex`.

# Stap 3: mailrecords voor Microsoft 365

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

# Stap 4: lancering van orbisneoconsulting.com

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

# Stap 5: orbisneo.nl en orbisneo.com doorsturen

Pas als stap 4 minimaal een dag stabiel draait:

1. Voeg in Netlify orbisneo.nl, www.orbisneo.nl, orbisneo.com en www.orbisneo.com toe als domeinaliassen van dezelfde site.
2. Zet bij de DNS-beheerder van elk domein: `@` als ALIAS naar `apex-loadbalancer.netlify.com.` (of A naar `75.2.60.5` als ALIAS niet kan) en `www` als CNAME naar `<sitenaam>.netlify.app.`. Verwijder A- en AAAA-records naar de oude hosting.
3. Laat alle mailrecords van orbisneo.nl ongewijzigd (MX, SPF, DKIM, DMARC, autodiscover), zodat info@orbisneo.nl blijft werken.
4. De 301-regels in `_redirects` worden direct actief, met padbehoud. Vera test de redirectkaart.
5. Gebruik in Google Search Console de functie Adreswijziging van orbisneo.nl naar orbisneoconsulting.com.

# Terugvalplan

Bij problemen met de site: zet de genoteerde records van `@` en `www` terug en zet de TransIP-doorverwijzing weer aan; voor orbisneo.nl de oude records naar de WordPress-hosting. Mailrecords worden in geen enkele stap gewijzigd en hoeven dus niet te worden teruggezet. De WordPress-hosting blijft minimaal drie maanden beschikbaar.

# Open punten

| # | Vraag |
|---|---|
| 1 | Bij welke partij staan DNS en registratie van orbisneo.nl en orbisneo.com, en wie heeft daar toegang? |
| 2 | Is orbisneoconsulting.com al aan de Microsoft 365-tenant toegevoegd, en welke aliassen komen er? |
| 3 | Welk adres ontvangt de DMARC-rapporten? |
| 4 | Mag het TransIP-webhostingpakket van orbisneoconsulting.com na de lancering worden opgezegd? Met Netlify als host is het niet meer nodig. |
