# Overdracht: van Claude Code naar Vera en Cursor cloud agents

Datum: 2 november 2026. Status: voorstel, ter controle door Daniel.

Dit document legt vast hoe het bouwwerk aan de website wordt overgenomen door Vera (opdrachten, controle) en Cursor cloud agents (uitvoering), wie waar toegang toe heeft, wat er nog open staat en wanneer Claude Code het project archiveert. Daniel blijft de enige die merget.

## 1. Rollen

| Taak | Tot nu | Straks |
|---|---|---|
| Opdracht formuleren | Vera schrijft `.vera/opdracht-….md` en een patch, Daniel geeft die door | Vera geeft de opdracht rechtstreeks aan een cloud agent, of Daniel vraagt Vera erom |
| Bouwen en PR openen | Claude Code op Daniels MacBook | Cursor cloud agent op een eigen branch in `OrbisNeo/orbisneo-website` |
| Controles draaien | Claude Code lokaal, plus GitHub Actions | De agent lokaal in zijn omgeving, plus GitHub Actions (blijft leidend) |
| Preview en teksten controleren | Vera | Vera, volgens `docs/startpakket/werkafspraak.md` en `docs/schrijfregels.md` |
| Merge naar `main` | Daniel | Daniel, ongewijzigd |
| DNS, lancering, `PUBLIC_NOINDEX`, WordPress, mailrecords | Daniel | Daniel, ongewijzigd |
| Weekeditie | Vera levert een patch, Claude Code maakt de PR | Een routine van Vera start een cloud agent die de PR maakt |

De regels voor agents staan in `AGENTS.md` in de root van de repo. Cloud agents lezen dat bestand zelf.

## 2. Werkstroom

1. Daniel vraagt Vera om een wijziging, of een routine van Vera (weekeditie) start er een.
2. Vera formuleert de opdracht en geeft die aan een cloud agent. Een goede opdracht noemt: doel, de bestanden die mogen veranderen, wat niet mag, en wat er teruggemeld moet worden.
3. De agent werkt op een eigen branch vanaf `origin/main`, draait alle controles uit `AGENTS.md` en opent een PR met het sjabloon.
4. GitHub Actions draait `build-and-check` en `lighthouse`. Netlify maakt de deploy preview.
5. Vera controleert de preview (build, links, schrijfregels, NL en EN gelijk) en meldt dat in de PR en aan Daniel.
6. Daniel bekijkt de PR en merget zelf op GitHub. Een merge door iemand anders is niet toegestaan.

## 3. Toegang: wat er nu is

Gecontroleerd op 2 november 2026 met `gh` (alleen lezen).

| Onderdeel | Stand |
|---|---|
| Repository | `OrbisNeo/orbisneo-website`, publiek. Standaardbranch `main`. |
| Collaborators | `Dafo72` (admin, Daniel), `orbisneo-builder` (rol read). |
| Ruleset "main beschermd" | Actief. Geen verwijderen van `main`, geen force push, PR verplicht (1 goedkeuring, code-ownerreview, laatste push moet goedgekeurd worden, gesprekken moeten opgelost zijn, alleen squash-merge). Bypass voor één gebruiker, Daniel (`always`). |
| CODEOWNERS | `* @Dafo72`. Elke PR heeft dus een review van Daniel nodig. |
| Verplichte statuscheck | Staat NIET in de ruleset, ook al noemt een comment in `.github/workflows/ci.yml` dat wel. Zie punt A hieronder. |
| Claude Code | Werkt via Daniels eigen `gh`-aanmelding op de MacBook (account `Dafo72`, tokenrechten `repo`, `workflow`, `read:org`, `gist`). Er is dus geen apart Claude-account en geen apart token om in te trekken. Netlify, TransIP, Umami en de mail heeft Claude Code nooit beheerd. |
| Vera | Leestoegang tot Netlify via een eigen token, genoeg om previews te controleren. Niets dat deploys of instellingen wijzigt. |
| Decap CMS | `/admin/` met GitHub-backend en OAuth via Netlify. Werkt met de eigen GitHub-accounts van Daniel en Vera. Eigen beheer, ongewijzigd. |

## 4. Wat Daniel moet doen (ik kan en mag dit niet voor je instellen)

- [ ] **A. Verplichte statuscheck toevoegen.** Voeg in de ruleset "main beschermd" de regel "Require status checks to pass" toe met `build-and-check` (de jobnaam in `ci.yml`, niet hernoemen). Zonder deze regel kan een agent-PR met rode controles toch gemerged worden. Daniel mag met zijn bypass al alles, dus dit beschermt vooral tegen een vergissing. Voeg `lighthouse` pas toe als je ook een flake wilt laten blokkeren.
- [ ] **B. Cursor GitHub-app installeren** voor de organisatie OrbisNeo, met toegang tot alleen `orbisneo-website` ("Only select repositories"). Geen toegang tot andere repositories geven.
- [ ] **C. Controleer na installatie** dat de app geen admin-rol of bypass heeft: in Settings, Collaborators and teams, en in de bypass-lijst van de ruleset. Alleen Write is nodig.
- [ ] **D. Cloud agent-omgeving:** Node 22 (`.nvmrc`), installatie met `npm ci`. Geen geheimen of tokens nodig voor build en checks. Zet geen Netlify- of DNS-gegevens in de agentomgeving.
- [ ] **E. GitHub Issues aanzetten** voor deze repo (Settings, Features, Issues) als dat nog niet zo is, en besluit of Vera de lijst in sectie 6 daar neerzet.
- [ ] **F. `orbisneo-builder`** (rol read): was bedoeld voor Claude Code maar wordt niet gebruikt. Verwijder het account uit de repo als je het niet meer nodig hebt.
- [ ] **G. Na de geslaagde test** (sectie 7): niets in te trekken voor Claude Code, want die gebruikt je eigen aanmelding. Wil je dat een lokale agent op je MacBook nooit meer kan pushen, meld dan `gh` af (`gh auth logout`) of laat Claude Code geen toegang meer tot de map.

## 5. Valkuilen die niet in de code staan

- **Node-versie:** de MacBook heeft standaard Node 24 (`.nvmrc` vraagt 22). Controles zijn op Node 22 gedaan, zoals CI en Netlify. Een cloud agent met een andere versie geeft andere resultaten.
- **Scriptnamen:** `check:content`, `check:redirects` en `check:links` hebben een dubbele punt, geen koppelteken. `npm run build` draait al `check-content` en `check-redirects`.
- **Foutmeldingen niet wegfilteren.** Een `grep` op de uitvoer van `astro check` heeft ooit een fout verborgen. Lees de samenvatting (0 errors, 0 warnings, 0 hints).
- **Lanceerbuild:** na de strikte build (`CONTEXT=production PUBLIC_NOINDEX=false`) altijd een gewone build draaien, anders staat `dist/_headers` niet meer op noindex.
- **Lighthouse-flake:** de mobiele homepage-run haalde eenmaal 0,89 (TBT 411 ms) en was bij herhaling groen. Alleen de gefaalde job opnieuw draaien.
- **Verouderde lokale `main`:** op de MacBook stond `main` nog op PR 14 zonder upstream. Een `git pull --ff-only` deed niets en patches pasten daardoor niet. Maak branches altijd vanaf `origin/main`.
- **Patches van Vera:** vroeger kwamen die via de map `.vera/` (staat in `.git/info/exclude`). Die route vervalt. Een agent maakt de wijziging zelf op een branch.
- **Hero-opmaak homepage:** de fotobox gebruikt een formule in `HomeOpening.astro` (`--photo-w`, `--photo-h`) die bewust één doorlopende maat geeft. Wijzig die niet zonder preview op 360, 768 en 1440 px.

## 6. Openstaande punten (voorstel voor GitHub Issues)

| Punt | Stand | Wie beslist |
|---|---|---|
| PR 35, review Willem verwerkt | Open, CI groen, wacht op merge | Daniel |
| Weekeditie W44 | Staat bij Vera klaar | Vera levert, Daniel keurt goed (`approvedBy`, `draft: false`) |
| CLS op het artikel agent sprawl | Eenmalig 0,129 gemeten, waarschijnlijk font swap bij het heroplaatje. Bewust niet in PR 34 meegenomen. | Daniel geeft akkoord, dan een aparte PR |
| Alt-teksten en CTA's (vervolgcommit van Vera) | Nog niet in een PR | Daniel geeft akkoord |
| Hero-CTA onder de vouw op 360 x 740 | Opties eerder voorgelegd: kleinere h1 onder ongeveer 380 px of tekst hoger laten beginnen | Daniel kiest |
| Maildienst en mailrecords | Keuze van de aanbieder staat open | Daniel |
| Lancering: DNS bij TransIP, WordPress uitzetten, `PUBLIC_NOINDEX` op `false` | Volgens `docs/startpakket/transip-dns.md` en de lanceerchecklist in het productdocument | Alleen Daniel |
| `PRIVACY_UPDATED` in `src/legal/meta.ts` | PR 34 wijzigde `privacy.nl.md` (alleen stijl) zonder de datum aan te passen | Daniel beslist of de datum mee moet |
| Verplichte statuscheck in de ruleset | Zie sectie 4, punt A | Daniel |

## 7. Testcriterium en archiveren

De overdracht geldt als geslaagd wanneer de weekeditie die Vera heeft voorbereid (W44) zo is verwerkt:

1. Vera geeft de opdracht aan een cloud agent, zonder `.vera/`-patch en zonder Claude Code.
2. De agent maakt een branch en een PR; alle controles uit `AGENTS.md` zijn groen, de streepjescheck geeft 0.
3. CI en deploy preview zijn groen.
4. Vera heeft de preview gecontroleerd en gerapporteerd (bronnen geopend, NL en EN gelijk, schrijfregels).
5. Daniel heeft de PR zelf gemerged.

Zijn deze vijf punten gehaald, dan zegt Daniel het in de chat en archiveert Claude Code dit project (de sessie met de website-ontwikkeling). Tot die tijd blijft Claude Code beschikbaar als terugvaloptie en voor vragen over deze overdracht, maar neemt het geen nieuwe opdrachten van Vera aan.
