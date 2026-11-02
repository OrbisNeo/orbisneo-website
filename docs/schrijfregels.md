# Schrijfregels: AI-toon en komma's

Herkomst: audit van Vera van 27 oktober 2026 (basis voor PR 34). Hieronder staan de checklist, de kommaregel en het advies over humanizer-tools. De tellingen per bestand uit de audit zijn weggelaten, omdat ze alleen voor die ene patch golden. Gebruik dit document bij elke tekstwijziging en bij elke review van een tekst.

## 1. Checklist met bronnen

Alle bronnen hieronder heb ik vandaag geopend.

| Patroon | Wat je ziet | Bron |
|---|---|---|
| Typische AI-woorden (EN) | crucial, pivotal, robust, delve, landscape, underscore, showcase, enhance, foster, "In reality", "essentially" | [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing); [Kobak e.a., excess vocabulary](https://arxiv.org/abs/2406.07016) |
| Typische AI-woorden (NL) | cruciaal, essentieel, naadloos, optimaal, bovendien, kortom, "speelt een belangrijke rol", "zorgt ervoor dat", "in het huidige landschap" | [Vizibly: AI-tekst herkennen](https://vizibly.nl/ai-tekst-herkennen-en-herschrijven/) |
| Niet X, maar Y | "Het is geen X, het is Y", "niet alleen ... maar ook", "Y rather than X" | Wikipedia (Negative parallelisms); Vizibly nr. 2 |
| Regel van drie | drie bijvoeglijke naamwoorden of drie korte zinsdelen, alinea na alinea | Wikipedia (Rule of three); Vizibly nr. 4 |
| Vraag met antwoord erachter | "Het resultaat? ..." en reeksen retorische vragen | Vizibly nr. 3 |
| Samenvattende slotzin, tegeltjeswijsheid | "Kortom", een moraal als laatste zin, "maakt het verschil" | Vizibly nr. 9 en 10 |
| Vetgedrukte kopjes in lijsten | lijstitem dat begint met **Kopje:** en dan tekst | Wikipedia (Inline-header vertical lists, Overuse of boldface) |
| Kopjes als vraag, Title Case | "Wat moet het eerste gesprek opleveren?", "Van Chaos naar Helderheid" | Wikipedia (Title case) |
| Lange gedachtestreepjes | em-streep midden in een zin | Wikipedia; Vizibly nr. 1 |
| Zwaar aangezette betekenis | "speelt een sleutelrol", "markeert een verschuiving" | Wikipedia (Undue emphasis on significance) |
| Holle voorzichtigheid | "waar mogelijk", "desgewenst" zonder te zeggen wat | Vizibly nr. 8 |

Belangrijk voorbehoud uit beide bronnen: één kenmerk bewijst niets. Het gaat om de dichtheid en om tekst die nergens concreet wordt. Wikipedia raadt ook af om alleen op detectors te vertrouwen.

## 2. De kommaregel

- **Komma voor "en" tussen twee hoofdzinnen is meestal overbodig.** Gebruik hem alleen in lange zinnen of als de lezer anders op het verkeerde been wordt gezet. Na een deel dat op een bijzin eindigt, is hij wel nodig. ([Taaladvies.net: Komma voor en](https://taaladvies.net/komma-voor-en/); [Onze Taal: komma voor 'en'](https://onzetaal.nl/taalloket/komma-voor-en))
- Het voorbeeld "dit is een boom, en dat is een plant", is zo'n korte zin. Daar kan de komma weg.
- Onze Taal noemt ook een alternatief: maak er twee zinnen van. Dat heb ik bij lange zinnen vaak gedaan.
- **Voor "of"** geldt hetzelfde als voor "en" (Onze Taal).
- **Voor "maar" en "want"** komt meestal wel een komma, zeker in lange zinnen. In heel korte zinnen mag hij weg. ([Taaladvies.net: Komma voor maar en want](https://taaladvies.net/komma-voor-maar-en-want/))
- **Hoofdzin en bijzin**: voor "dat" vrijwel nooit een komma. Voor "omdat", "doordat", "als", "terwijl" en "zodat" vaak wel, behalve na een korte hoofdzin. Staat de bijzin vooraan, dan komt er een komma, zeker als twee werkwoorden naast elkaar staan. ([Taaladvies.net: Komma tussen hoofdzin en bijzin](https://taaladvies.net/komma-tussen-hoofdzin-en-bijzin-bij-onderschikkende-voegwoorden/))
- Er zijn geen officiële kommaregels, het zijn conventies. De vuistregel is: zet een komma waar je bij het voorlezen een pauze hoort. ([Onze Taal: komma, algemene regels](https://onzetaal.nl/taalloket/komma-algemene-regels))

Zo heb ik het toegepast (voorzichtig en consequent):

- komma weg bij korte nevenschikking met "en" of "of";
- lange zinnen met een ander onderwerp gesplitst in twee zinnen;
- komma laten staan na een opsomming die zelf al op "en" eindigt (bijvoorbeeld "aannames, scenario's en beslismomenten, en een plan"), omdat Taaladvies dat aanraadt tegen een verkeerde lezing;
- komma laten staan bij bijstellingen ("Vera, de assistent van Orbis Neo, en ...") en bij twee werkwoorden naast elkaar ("Voor je het weet, heeft").

## 3. Humanizer-tools: mijn advies

Humanizers zijn herschrijftools die AI-tekst zo omzetten dat detectors hem niet meer herkennen. De meeste zijn zelf een taalmodel met een instructie als "schrijf conversationeel".

- In een onderzoek naar 19 humanizers en parafraseertools voegden de zwakste tools onzinzinnen en verzonnen bronnen toe en verdraaiden ze de betekenis. Alle tools gingen in kwaliteit achteruit, ook de betere. ([DAMAGE, Masrour e.a., 2025](https://arxiv.org/abs/2501.03437); de auteurs werken bij detectorbedrijf Pangram, dus dat is een belanghebbende partij.)
- Detectors lopen tegelijk achter elkaar aan. Sommige missen een groot deel van de "gehumaniseerde" tekst, andere vinden hem toch. Wikipedia waarschuwt dat detectors niet betrouwbaar genoeg zijn om op te vertrouwen.
- Vizibly zegt het kort: een humanizer husselt woorden, maar er staat daarna nog steeds niets in wat alleen jij weet.

**Advies:** gebruik geen humanizer voor de site. Het risico op betekenisverschuiving is groot bij juist de teksten waar het op aankomt: bronnen, cijfers, jouw ervaring en juridische nuances. Herschrijf liever op basis van een vaste regelset (deze checklist) en lees de tekst daarna hardop. Daar ging PR 34 van uit.

