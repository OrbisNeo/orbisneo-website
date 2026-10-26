---
title: "AI controleert AI: wie draagt dan nog de verantwoordelijkheid?"
translationKey: ai-controleert-ai
urlSlug: ai-controleert-ai
description: "Als AI het werk van AI controleert, wie is dan nog eigenaar? Verantwoordelijkheid zonder inzicht en zeggenschap is een handtekening, geen eigenaarschap."
pubDate: 2026-10-26
category: "AI in organisations"
author: "Daniel Fokker"
draft: false
heroImage: "../../../assets/blog/ai-controleert-ai-hero.jpg"
heroAlt: "Robotarmen controleren elkaars werk op een productielijn, terwijl mensen toekijken naast een stopknop"
---

Wie aanspreekbaar is op werk waar hij geen inzicht in heeft en waarover hij niets te zeggen heeft, is geen eigenaar. Die zet een handtekening. Dat is voor mij de kern van de vraag die opkomt nu AI steeds vaker het werk van AI controleert. Half oktober beschreef Anthropic hoe het team achter Claude Code daarmee omgaat. Het antwoord is niet minder controle, maar controle op een andere plek: machines lezen het werk, mensen beoordelen de risico's en blijven verantwoordelijk voor wat er live gaat. Ik herken er veel in uit de organisatiekunde. Maar het roept ook de vraag op die er voor bestuurders het meest toe doet: als niemand het werk zelf nog doet of leest, wie draagt dan de verantwoordelijkheid, en heeft die persoon genoeg inzicht en zeggenschap om dat waar te maken?

## Wat Anthropic beschrijft

De aanleiding is volume. In de grote centrale codebase van Anthropic, de monorepo, ging het aantal wijzigingen per dag volgens het bedrijf van ongeveer 2.500 in mei naar meer dan 30.000 in september. Claude Code heeft een eigen, aparte codebase, maar ook daar neemt de druk toe. Dat leest geen team meer regel voor regel. Anthropic stelt daarom een andere vraag. Niet "heeft een mens dit gelezen?", maar: wat kan er misgaan met deze wijziging, en welke controle, door een machine of door een mens, vangt dat het beste op?

Het antwoord is een reeks controles in plaats van één poort aan het eind. De AI moet eerst laten zien dat zijn werk werkt, met de uitkomst van een test, in plaats van te melden dat het klaar is. Daarna beoordeelt een AI-reviewer elke wijziging. Automatische checks blokkeren wijzigingen die niet aan de ingestelde controles voldoen. Hoeveel mensen er daarna nog naar kijken, hangt af van het risico. Een documentatiewijziging kan zonder menselijke goedkeuring door, een gewone wijziging vraagt één persoon, de gevoeligste code twee. Die lichte route geldt wel onder voorwaarden. Alleen vertrouwde auteurs, meestal het team dat de code beheert, mogen die route gebruiken. En onderdelen die als gevoelig zijn aangemerkt, zoals de bestanden die de automatische test- en buildstraat aansturen, vragen altijd een mens. De goedkeuring van een agent telt bovendien nooit als die van een mens, en wie de AI de opdracht gaf, is verantwoordelijk voor de uitkomst. Anthropic vat het samen in één zin: "A person is accountable for every change that ships, whoever typed it."

## Een bril uit de organisatiekunde

Ik lees dit door een bril die ik in Nijmegen meekreeg. In 2015 en 2016 volgde ik aan de Radboud Universiteit colleges bij Jan Achterbergh en Dirk Vriens, en bij Vriens ben ik afgestudeerd. Samen schreven ze *Organizations: Social Systems Conducting Experiments* (Springer, 2009, herziene druk 2010). Ze beschrijven organisaties als sociale systemen die voortdurend experimenteren met hun eigen voortbestaan, door te sleutelen aan doelen, inrichting en werkprocessen. Regelen gebeurt daarbij op drie niveaus: bij het kiezen van doelen, bij het ontwerpen van de organisatie en in het dagelijkse werk. Een van de bouwstenen is de Nederlandse sociotechniek van Ulbo de Sitter.

De werkwijze van Anthropic doet mij denken aan die sociotechniek: problemen zo dicht mogelijk bij het werk kunnen signaleren en oplossen. Review was vroeger een poort aan het eind. Nu loopt de controle mee tijdens het werk, "more like spellcheck while you write", zoals Anthropic het noemt. Maar automatische controle tijdens het werk is nog niet hetzelfde als zeggenschap voor de mensen die ervoor verantwoordelijk blijven. Je kunt controles technisch dichter bij het werk zetten en tegelijk de beslisruimte van mensen kleiner maken. Of dat gebeurt, hangt niet af van de techniek, maar van hoe je de organisatie eromheen inricht.

## Wat ik herken

Twee dingen in de aanpak spreken me aan. Als de automatische controleur steeds hetzelfde vindt, lossen ze het op bij de bron, in de instructies voor de AI of met een nieuwe regel. Vanuit het perspectief van het boek lees ik dat als regelen door ontwerp. Je behandelt niet elke keer opnieuw dezelfde melding. Je past de werkwijze aan om herhaling van dezelfde fout te beperken. Daarnaast maakt Anthropic van oude incidenten een toets die de automatische controleur elke dag opnieuw moet halen. Die incidentgeschiedenis maakt de toets specifiek voor jullie systemen en werkwijze.

Vanuit dat perspectief lees ik ook de volgorde die Anthropic kiest. Ze rollen nieuwe functies eerst intern uit en kunnen de meeste fouten binnen minuten terugdraaien. Hun advies is om streng te beginnen en pas losser te worden als het bewijs er is. In dit softwarevoorbeeld is snel terugdraaien een belangrijke voorwaarde voor minder menselijke controle. Maar niet elk gevolg laat zich herstellen. Een gelekt gegeven wordt niet ongelekt door de code terug te zetten. Wie deze aanpak buiten software wil toepassen, moet dus eerst weten welke fouten omkeerbaar zijn en welke niet.

## Twee AI's zijn nog geen twee meningen

Anthropic is open over de kuren van een AI-controleur. Hij kan te veel melden, of eindeloos heen en weer gaan met de AI die de code schreef. Eén wijziging ging in één nacht door meer dan vijftig rondes controle en herstel, totdat iemand het stopte. Er speelt nog iets fundamentelers. Een tweede AI-oordeel is niet vanzelf een onafhankelijke controle. Twee agents kunnen dezelfde verkeerde aanname delen of hetzelfde probleem over het hoofd zien. Dan ontstaat overeenstemming, zonder dat de kwaliteit is vastgesteld. Een tweede AI-oordeel is pas bruikbaar als duidelijk is wat die controle kan missen. Welke fouten vangen tests met een bekende uitkomst op? Waar blijft menselijke beoordeling nodig? En wie onderzoekt of schrijver en controleur dezelfde blinde vlek delen?

## Een andere lezing

AI-commentator David Shapiro besprak dezelfde post op YouTube en kwam tot een conclusie die op de mijne lijkt: "The principle underneath all of this is not new at all." Hij wijst op techniek en boekhouding, waar machines elkaar al lang controleren en mensen de controles ontwerpen. Daarna gaat hij een stap verder. Hij verwacht agents die werken, toezicht houden, coördineren en auditen, met "an org chart all of their own", en op termijn een volledig geautomatiseerde technische laag, gevolgd door de zakelijke.

Daar ben ik het niet mee eens. Toetsen aan een gekozen norm is iets anders dan besluiten welke norm past. Een machine kan nagaan of werk voldoet aan wat is afgesproken. Maar wat goed genoeg is, voor wie en waarom, is een keuze die steeds opnieuw gemaakt moet worden. AI kan dat gesprek ondersteunen, met analyses, scenario's en tegenvragen. Mensen blijven verantwoordelijk voor het kiezen en herzien van de normen. Anthropic laat ook de beslissing of iets gebouwd moet worden bewust bij mensen.

## Verantwoordelijkheid zonder zeggenschap

Mijn grootste zorg zit in wat er overblijft voor de mens. Als machines werken, controleren en coördineren, kan menselijke verantwoordelijkheid langzaam uitgehold raken. Iemand blijft formeel aanspreekbaar, maar heeft geen zicht meer op wat er gebeurt en geen middelen om in te grijpen. Verantwoordelijkheid raakt dan zo verdeeld over mensen en systemen dat niemand haar echt draagt. Dat is mijn lezing van het risico. De organisatiekunde dwingt je te kijken naar wie welke informatie heeft en wie mag ingrijpen. Anthropic heeft daar een goede regel voor: wie niet kan zeggen wat de controles zouden missen, vraagt om een echte review in plaats van snel goed te keuren. Maar een regel is geen garantie. De inspanning voor sommige bouwtaken neemt af, terwijl beoordeling en verantwoordelijkheid aandacht blijven vragen. Die aandacht moet ergens georganiseerd worden.

## De vraag voor de directie

Voor bestuurders is de les niet dat alles nu door AI gecontroleerd moet worden. De les is dat controle een ontwerpvraag is, en geen kwestie van meer of minder mensen. De verantwoordelijke persoon moet bewijs kunnen opvragen, zoals testuitkomsten en bevindingen, de werkwijze en controles kunnen aanpassen als ze tekortschieten, en de uitvoering kunnen stoppen. Als AI het werk doet en AI het controleert, blijft menselijke verantwoordelijkheid alleen betekenisvol wanneer iemand de uitkomsten kan begrijpen, de controles kan aanpassen en de uitvoering kan stoppen. De vraag voor de directie is welke informatie en bevoegdheden daarvoor nodig zijn, en of die ook werkelijk zijn georganiseerd.

## Bronnen

- [Anthropic: How the Claude Code team does code review (15 oktober 2026)](https://claude.dev/blog/solving-code-review-at-anthropic/)
- [Jan Achterbergh en Dirk Vriens: Organizations: Social Systems Conducting Experiments (Springer, herziene druk 2010)](https://link.springer.com/book/10.1007/978-3-642-14316-8)
- [David Shapiro: Anthropic Is Living In The Future (YouTube, 24 oktober 2026)](https://youtu.be/VmrNsOVOAt4)
