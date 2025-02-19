/* eslint-disable no-irregular-whitespace */
// This file contains all textual content in Markdown markup
// Content values can be changed freely, but don't change the data structure of this file.

const content = {
    header: {
        title: `Probeer Yivi uit`,
        homeLink: `https://amsterdam.nl/`,
        skipLink: {
            content: `Direct naar hoofdinhoud`,
            footer: `Direct naar footer`
        }
    },
    home: {
        breadcrumbs: `- [Home](/)`,
        title: `# Ontdek Yivi via vijf demo’s`,
        intro: `Yivi is een app waarmee u online kunt aantonen wie u bent. Yivi biedt een nieuwe manier van inloggen, anders dan u kent van bijvoorbeeld DigiD.

Wilt u Yivi uitproberen? Dat kan via verschillende demo’s. U doet de demo's met uw eigen gegevens. De gemeente Amsterdam slaat deze gegevens niet op.
        `,
        requirements: {
            title: `Wat heeft u nodig?`,
            body: `U kunt de demo&apos;s met Yivi doen als u de Yivi-app op uw telefoon heeft geïnstalleerd en als u in Yivi de volgende gegevens heeft toegevoegd:
- Uw persoonsgegevens
- Uw adres
- Uw e-mailadres
- Uw telefoonnummer\n

U voegt uw persoonsgegevens en uw adres toe aan Yivi door eenmalig met uw DigiD in te loggen bij de Gemeente Nijmegen. U logt dus niet in bij de gemeente Amsterdam. Gemeente Nijmegen verstrekt de gegevens uit de Basisregistratie Personen aan alle Yivi-gebruikers.


## Yivi installeren

Download de Yivi-app voor iOS of Android:  \n
[![App Store](/assets/download-app-store.svg "Download Yivi in de App Store")](https://apps.apple.com/nl/app/irma-authenticatie/id1294092994)
[![Play Store](/assets/download-play-store.svg "Download Yivi in de Play Store")](https://play.google.com/store/apps/details?id=org.irmacard.cardemu&pli=1)

Wilt u meer weten over Yivi?
[Ga naar de website van Yivi](https://yivi.app)`
        },
        subtitle: `## Aan de slag met Yivi`,
        demo1Card: {
            title: `Demo 1: Leeftijd aantonen`,
            body: `Bewijs dat u ouder dan 18 of 65 bent zonder uw geboortedatum prijs te geven.`
        },
        demo2Card: {
            title: `Demo 2: Ideeën voor uw buurt`,
            body: `Bewijs met uw postcode dat u in een bepaalde Amsterdamse wijk woont en dat u ouder bent dan 18 jaar.`
        },
        demo3Card: {
            title: `Demo 3: Inloggen`,
            body: `Login met uw naam en e-mailadres.`
        },
        demo4Card: {
            title: `Demo 4: Geveltuin aanvragen`,
            body: `Vul een formulier snel in met uw gegevens.`
        },
        demo5Card: {
            title: `Demo 5: Overlast melden`,
            body: `Doe een melding van overlast en blijf op de hoogte door uw contactgegevens vrij te geven.`
        },
        sidebar: {
            box: `Eenvoudig en op maat online aantonen wie je bent met Yivi
![Yivi Logo](/assets/yivi_logo.svg "Lees meer over Yivi")
# Waarom Yivi?`,
            boxLink: `https://www.amsterdam.nl/innovatie/digitalisering-technologie/digitalisering/yivi-nieuwe-manier-inloggen`,
            boxLabel: `Waarom Yivi?`
        }
    },
    demoNotification: {
        heading: `Dit is een demosite`,
        content: `U kunt hier ervaren wat u met uw Yivi-app kunt. Uw gegevens worden niet bewaard.`
    },
    downloadIrma: `Heeft u nog geen Yivi?  \n[Download Yivi](https://yivi.app/download)`,
    noSavePromise: `**De gegevens die u zojuist via Yivi heeft doorgegeven, worden niet bewaard.**`,
    callToAction: `[Probeer de andere demo’s](/)`,
    demoErrorAlert: {
        heading: `Niets doorgegeven`,
        content: `U heeft uw gegevens niet doorgegeven aan de demosite van de gemeente Amsterdam.`
    },
    ieSupport: {
        breadcrumbs: `- [Home](/)`,
        content: `# Internet Explorer niet meer ondersteund
**Deze demosite werkt niet goed in Internet Explorer. We raden je aan een andere browser te gebruiken. We adviseren je zo snel mogelijk over te stappen naar een andere browser zoals Firefox of Chrome.**
  &nbsp;

  &nbsp;

De website **Probeer Yivi uit** maakt gebruik van de meest recente technologie en webstandaarden. De verouderde browser Internet Explorer van Microsoft kan daar steeds minder goed mee overweg. Het ondersteunen van die browser is daardoor een drempel voor het optimaliseren van de functionaliteit van de site.

Concreet betekent het niet meer ondersteunen van Internet Explorer dat de site in die browser (veel) trager werkt dan in moderne browsers, pagina's er anders uitzien dan ze zijn ontworpen en meer complexe functies (bijvoorbeeld in de interactieve kaart) niet goed werken.

Als je nog gebruik maakt van Internet Explorer, adviseren we je om zo snel mogelijk een andere browser te gaan gebruiken, zoals [Firefox](https://www.mozilla.org/nl/firefox/new/) en [Chrome](https://www.google.com/intl/nl_nl/chrome/). Ook Microsoft zelf [raadt aan](https://docs.microsoft.com/nl-nl/lifecycle/faq/internet-explorer-microsoft-edge#what-is-the-lifecycle-policy-for-internet-explorer) een andere browser te gebruiken.`,
        errorAlert: {
            heading: `Let op`,
            content: `Deze demosite werkt niet goed in Internet Explorer. We raden je aan een andere browser te gebruiken.

[Wat kan ik doen?](/ie-support)`
        }
    },
    notFound: {
        title: `# Sorry, pagina niet gevonden`,
        content: `De pagina die u zoekt bestaat niet meer of is verhuisd. Gelukkig zijn de Yivi-demo’s er nog wel.`,
        link: `Kijkt u maar op [Probeer Yivi uit](/).`
    },
    demoEmptyVarsAlert: {
        heading: `Ontbrekende gegevens`,
        content: `U heeft niet alle gegevens doorgegeven die nodig zijn.  \n
De volgende gegevens ontbreken: `
    },
    demo1: {
        breadcrumbs: `- [Home](/)
- [Demo 1: Leeftijd aantonen](/leeftijd-aantonen)`,
        title: {
            noResult: `# Demo 1: Leeftijd aantonen`,
            hasResult: `# Demo 1: Leeftijd aantonen`
        },
        isOver18: {
            heading: `Uw leeftijd`,
            content: `U heeft bewezen dat u ouder bent dan 18 jaar.`
        },
        isNotOver18: {
            heading: `Uw leeftijd`,
            content: `U bent jonger dan 18 jaar.`
        },
        isOver65: {
            heading: `Uw leeftijd`,
            content: `U heeft bewezen dat u ouder bent dan 65 jaar.`
        },
        isNotOver65: {
            heading: `Uw leeftijd`,
            content: `U bent jonger dan 65 jaar.`
        },
        intro: `**Met Yivi kunt u bewijzen hoe oud u bent zonder uw geboortedatum prijs te geven. U blijft dus anoniem.**
# Probeer het uit
Bewijs dat u ouder bent dan 18 jaar of 65 jaar door uzelf bekend te maken met de volgende gegevens:
- Ouder dan 18
- Ouder dan 65
      `,
        why: {
            title: 'Waarom worden deze gegevens gevraagd?',
            body: '**Ouder dan 18, Ouder dan 65**  \nDe gemeente kan u dan toegang geven tot dienstverlening op basis van uw leeftijd.'
        },
        button18: `18+ bewijzen met Yivi`,
        button65: `65+ bewijzen met Yivi`,
        result: {
            title: `## Wat heeft u zojuist gedaan?`,
            isOver18: `- U heeft Yivi gebruikt om door te geven dat u ouder bent dan 18 jaar.
- U heeft uw geboortedatum (en andere gegevens) niet doorgegeven.`,
            isNotOver18: `- U heeft Yivi gebruikt om door te geven dat u jonger bent dan 18 jaar.
- U heeft uw geboortedatum (en andere gegevens) niet doorgegeven.`,
            isOver65: `- U heeft Yivi gebruikt om door te geven dat u ouder bent dan 65 jaar.
- U heeft uw geboortedatum (en andere gegevens) niet doorgegeven.`,
            isNotOver65: `- U heeft Yivi gebruikt om door te geven dat u jonger bent dan 65 jaar.
- U heeft uw geboortedatum (en andere gegevens) niet doorgegeven.`,
            whatsDifferentWithIrma: `## Wat is er anders met Yivi?  \nAls u via Yivi uw leeftijd doorgeeft, is bij de website bekend of u aan de leeftijdsgrens voldoet. U blijft anoniem.  \n  \nDit kan worden gebruikt voor:
- Toegang en/of korting op basis van uw leeftijd.
- Alcohol kopen.
- Stemmen voor lokale initiatieven.
`
        },
        showQrOnMobile: {
            link18: `Toon QR-code voor 18+ bewijzen`,
            link65: `Toon QR-code voor 65+ bewijzen`
        }
    },

    demo2: {
        breadcrumbs: `- [Home](/)
- [Demo 2: Ideeën voor uw buurt](/ideeen-voor-uw-buurt)`,
        intro: `**Met Yivi kunt u bewijzen in welke wijk u woont en zo meebeslissen over ideeën voor uw buurt zonder uw woonadres en geboortedatum prijs te geven. U blijft dus anoniem.**
# Probeer het uit
Bewijs in welke wijk u woont en dat u ouder bent dan 18 jaar door uzelf bekend te maken met de volgende gegevens:
- Postcode
- Ouder dan 18`,
        unproven: {
            title: `# Demo 2: Ideeën voor uw buurt`
        },
        proven: {
            title: `# Demo 2: Ideeën voor uw buurt`,
            alert: {
                title: `Uw postcode en leeftijd`,
                // [] will be replaced by the wijken
                bodyAgeNegative: `U heeft bewezen dat u in [] woont en dat u jonger bent dan 18 jaar. U mag nog niet meebeslissen over ideeën voor uw buurt.`,
                bodyPostcodeNegative: `U heeft bewezen dat u niet in Amsterdam woont en dat u ouder bent dan 18 jaar. U mag niet meebeslissen over ideeën voor een Amsterdamse buurt.`,
                // [] will be replaced by the wijken
                bodyAgeAndPostcodePositive: `U heeft bewezen dat u in [] woont en dat u ouder bent dan 18 jaar. U mag meebeslissen over ideeën voor uw buurt.`,
                bodyAgeAndPostcodeNegative: `U heeft bewezen dat u niet in Amsterdam woont en dat u jonger bent dan 18 jaar. U mag niet meebeslissen over ideeën voor een Amsterdamse buurt.`
            }
        },
        why: {
            title: `Waarom worden deze gegevens gevraagd?`,
            body: `**Uw postcode**  \nDe gemeente weet dan in welke wijk u woont.\n
**Ouder dan 18 jaar**  \nDe gemeente weet dan of u mag stemmen.`
        },
        button: `Bewijzen met Yivi`,
        result: `## Wat heeft u zojuist gedaan?
- U heeft Yivi gebruikt om door te geven in welke wijk u woont.
- U heeft Yivi gebruikt om door te geven of u ouder bent dan 18 jaar.
- U heeft geen persoonlijke informatie zoals uw naam, adres en geboortedatum doorgegeven.

## Wat is er anders met Yivi?
Als u via Yivi uw postcode en leeftijd doorgeeft, is bekend waar u ongeveer woont en dat u aan de leeftijdsgrens voldoet. U blijft anoniem.

Dit kan worden gebruikt voor:
- Stemmen voor lokale initiatieven.
- Toegang en korting op basis van uw leeftijd in uw buurt.
- Voorzieningen speciaal voor Amsterdammers.`
    },

    demo3: {
        breadcrumbs: `- [Home](/)
- [Demo 3: Inloggen](/inloggen)`,
        unproven: {
            title: `# Demo 3: Inloggen`,
            alert: {
                title: `Uw naam en e-mailadres`,
                body: `U kunt hier ervaren wat u met uw Yivi-app kunt. Uw gegevens worden niet bewaard.`
            },
            intro: `**Met Yivi kunt u inloggen bij websites zonder eerst een gebruikersnaam en wachtwoord aan te maken.**
## Probeer het uit
Login bij de gemeente door uzelf bekend te maken met de volgende gegevens:
- Uw volledige naam
- Uw e-mailadres`,
            why: {
                title: `Waarom worden deze gegevens gevraagd?`,
                body: `**Uw volledige naam**  \nDe gemeente wil u graag aanspreken met uw naam.\n
**Uw e-mailadres**  \nVoor diensten waarbij de gemeente niet om uw BSN mag vragen, kan uw e-mailadres gevraagd worden om in te loggen.`
            }
        },
        proven: {
            title: `# Demo 3: Uw naam en e-mailadres`,
            alert: {
                title: `Uw naam en e-mailadres`,
                body: `U heeft bewezen dat u [] bent en dat u toegang heeft tot e-mail die naar [] wordt gestuurd.`
            }
        },
        button: 'Inloggen met Yivi',
        result: `## Wat heeft u zojuist gedaan?
- U heeft Yivi gebruikt om in te loggen.
- U heeft uw e-mailadres en uw naam aan de demosite doorgegeven via Yivi.

## Wat is er anders met Yivi?
Inloggen met Yivi is anders dan u nu op websites gewend bent. U hoeft geen profiel aan te maken en allerlei persoonlijke gegevens prijs te geven.
U hoeft geen profiel aan te maken en allerlei persoonlijke gegevens prijs te geven.
- Met uw e-mailadres kan de gemeente gegevens van uw aanvraag of melding tonen.
- Als u via Yivi uw e-mailadres deelt, kan de gemeente u berichten sturen over de status van uw aanvraag of melding.`
    },

    demo4: {
        breadcrumbs: `- [Home](/)
- [Demo 4: Geveltuin aanvragen](/geveltuin-aanvragen)`,
        unproven: {
            title: `# Demo 4: Geveltuin aanvragen`,
            alert: {
                title: `Dit is een demo`,
                body: `Uw demo-aanvraag wordt niet naar de gemeente verstuurd.`
            },
            intro1: `**Met Yivi kunt u een aanvraag doen en hierin gegevens gebruiken die in uw Yivi-app staan.**\n
**U hoeft minder in te vullen en de gemeente weet zeker dat u de aanvraag doet en dat de gegevens juist zijn.**

## Probeer het uit
Doe een demo-aanvraag door uzelf bekend te maken met de volgende gegevens:
- Volledige naam
- Straat
- Huisnummer
- Postcode
- Woonplaats
- Mobiel telefoonnummer
- E-mailadres
`,
            why: {
                title: `Waarom worden deze gegevens gevraagd?`,
                body: `**Volledige naam**  \nDe gemeente wil u graag aanspreken met uw naam.\n
**Woonadres**  \nDe gemeente heeft uw straat, huisnummer en woonplaats nodig om te weten voor welke locatie de aanvraag is.\n
**Mobiel telefoonnummer**  \nDe gemeente wil u kunnen bereiken voor vragen over uw aanvraag.\n
**E-mailadres**  \nDe gemeente wil u een e-mail sturen met de bevestiging van uw aanvraag.\n
`
            },
            intro2: `
## Gegevens aanvullen met Yivi
Vul uw demo-aanvraag aan met uw gegevens uit Yivi.
`
        },
        proven: {
            title: `# Demo 4: Geveltuin aanvragen`,
            alert: {
                title: `Uw persoons- en contactgegevens`,
                body: `U heeft een formulier ingevuld  met uw naam, adres en contactgegevens.`
            }
        },
        form: {
            owner: 'Bent u eigenaar van de woning waar de geveltuin komt?',
            required: 'Vergeet niet om aan te geven of u eigenaar bent van de woning waar de geveltuin komt.',
            optionYes: 'Ja',
            optionNo: 'Nee'
        },
        button: 'Aanvullen met Yivi',
        result: {
            intro: `**De gegevens die u zojuist via Yivi heeft doorgegeven, worden niet bewaard.\nDit is een demo; u bent geen aanvraag voor een geveltuin gestart.**

Hieronder vindt u alle gegevens van uw demo-aanvraag:`,
            yourDemoRequest: `### Uw demo-aanvraag
Uw keuze  \n
:   geveltuin  \n
Bent u de eigenaar van de woning waar de geveltuin komt?  \n
:   [owner]
`,
            yourDetails: `### Uw gegevens\n
Naam  \n
:   [name]  \n
Straat en huisnummer  \n
:   [street] [houseNumber]\n
Postcode en plaats  \n
:   [zipcode], [city]\n
Telefoonnummer  \n
:   [telephone]  \n
E-mail  \n
:   [email]  \n
`,
            rest: `## Wat heeft u zojuist gedaan?
- U heeft Yivi gebruikt om een formulier in te vullen met uw gegevens.
- U heeft een formulier ingevuld met gegevens uit officiële bronnen. De gemeente weet dat deze gegevens kloppen en kan zo’n aanvraag sneller behandelen.

## Wat is er anders met Yivi?
Als u via Yivi een formulier invult, kunt u geen fouten maken bij invullen en is het zeker dat de gegevens kloppen.
Dit kan worden gebruikt voor:
- Aanvragen die u op de website van de gemeente Amsterdam doet.
- Formulieren op andere websites.
`
        }
    },

    demo5: {
        breadcrumbs: `- [Home](/)
- [Demo 5: Overlast melden](/overlast-melden)`,
        unproven: {
            title: `# Demo 5: Overlast melden`,
            intro1: `**Met Yivi kunt u een melding van overlast aanvullen met het 06-nummer waarop u bereikbaar bent voor vragen en het e-mailadres waarop u een statusupdate wilt ontvangen.**\n
**U gebruikt gegevens die in uw Yivi-app staan. De gemeente kan u dan benaderen en informeren.**

## Probeer het uit
Doe een demo-melding door uzelf bekend te maken met de volgende gegevens:
- E-mailadres
- Mobiel telefoonnummer
`,
            why: {
                title: `Waarom worden deze gegevens gevraagd?`,
                body: `**Mobiel telefoonnummer**  \nDe gemeente kan u dan vragen stellen over uw melding.\n
**E-mailadres**  \nDe gemeente kan u op de hoogte houden over uw melding. En u kunt met dit e-mailadres de voortgang volgen in Mijn Amsterdam.\n
`
            },
            alert: {
                title: `Dit is een demo`,
                body: `Uw demo-melding wordt niet naar de gemeente verstuurd.`
            },
            callToAction: `## Gegevens aanvullen met Yivi
Vul uw demo-aanvraag aan met uw e-mail en/of telefoonnummer uit Yivi.`,
            callToActionNoIRMA: `## Anonieme melding
Doe uw demo-melding zonder uw e-mailadres en/of telefoonnummer vrij te geven met Yivi.`
        },
        proven: {
            title: `# Demo 5: Overlast melden`,
            alertPhoneEmail: {
                title: `Uw contactgegevens`,
                body: `U heeft een formulier aangevuld met uw telefoonnummer en uw e-mailadres.`
            },
            alertEmail: {
                title: `Uw contactgegevens`,
                body: `U heeft een formulier aangevuld met uw e-mailadres.`
            },
            alertPhone: {
                title: `Uw contactgegevens`,
                body: `U heeft een formulier aangevuld met uw telefoonnummer.`
            },
            alertNone: {
                title: `Geen contactgegevens`,
                body: `U heeft ervoor gekozen geen contactgegevens vrij te geven.`
            }
        },
        form: {
            title: `# Demo-melding van overlast`,
            location: {
                label: `### Waar is het?
Typ het dichstbijzijnde adres of klik de locatie aan op de kaart.`,
                mapLabel: 'Kaart',
                locationInputLabel: 'Locatie',
                required: `Vergeet niet om een locatie te selecteren.`
            },
            report: {
                label: `### Waar gaat het om?
Typ geen persoonsgegevens in deze omschrijving, dit wordt apart gevraagd.`,
                ariaLabel: `Omschrijving van de melding`,
                required: 'Vergeet niet om uw melding te omschrijven.'
            },
            optionPhone: {
                label: `Mogen we u bellen voor vragen?`,
                remark: `Zo kunt u ons helpen het probleem sneller of beter op te lossen.`,
                optionYes: 'Ja',
                optionNo: 'Nee',
                required: 'Vergeet niet om aan te geven of we u mogen bellen voor vragen.'
            },
            optionEmail: {
                label: `Wilt u op de hoogte blijven?`,
                remark: `We mailen om u te vertellen wat we met uw melding doen en wanneer het klaar is.`,
                optionYes: 'Ja',
                optionNo: 'Nee',
                required: 'Vergeet niet om aan te geven of u op de hoogte gehouden wilt worden.'
            }
        },
        button: 'Aanvullen met Yivi',
        buttonNoIRMA: 'Demo-melding doen',
        result: {
            intro: `**De gegevens die u zojuist via Yivi heeft doorgegeven, worden niet bewaard of verstuurd.\nDit is een demo; u heeft geen melding overlast gedaan.**

Hieronder vindt u alle gegevens van uw demo-melding:`,
            yourReportBeforeMap: `### Uw demo-melding overlast\n
Locatie  \n
:   [location]  \n`,
            yourReportAfterMap: `
Beschrijving  \n
:   [report]  \n`,
            yourMobileNumber: `
Uw telefoonnummer  \n
:   [mobilenumber]  \n`,
            yourEmail: `
Uw e-mailadres  \n
:   [email]  \n`,
            rest: `## Wat heeft u zojuist gedaan?
- U heeft Yivi gebruikt om uw telefoonnummer en/of e-mailadres door te geven.
- U heeft een melding gedaan met uw gegevens uit officiële bronnen.\n De gemeente weet dat deze gegevens kloppen en kan zo'n formulier sneller behandelen. \n
## Wat is er anders met Yivi?
Als u via Yivi een melding overlast doet, kunt u geen fouten maken bij invullen en is het zeker dat de gegevens kloppen.\n
Dit kan worden gebruikt voor:
- Meldingen die u op de website van de gemeente Amsterdam doet.
- U toegang te geven om de voortgang van uw melding te volgen via Mijn Amsterdam.`,
            restNoIRMA: `## Wat heeft u zojuist gedaan?
- U heeft geen gegevens uit Yivi gebruikt.`,
            disclaimerError: `Dit is een demo; u heeft geen melding overlast gedaan.`
        }
    },

    showQrOnMobile: {
        label: `Heeft u Yivi op een ander apparaat?`,
        link: `Toon QR-code`
    },

    cookies: {
        breadcrumbs: `- [Home](/)
- [Cookies](/cookies)`,
        intro: `# Cookies op deze site en privacy
**Een cookie is een klein bestandje, dat met pagina's van deze website wordt meegestuurd en door uw browser op uw computer wordt opgeslagen. Wij gebruiken cookies om de website goed te laten functioneren en om het gebruik van de website te analyseren.**`,
        explanation: {
            title: `Hoe werken cookies?`,
            body: `We kennen drie typen cookies.
### Functionele cookies
Deze cookies zijn nodig om de website te laten functioneren en instellingen of voorkeuren vast te houden tijdens een bezoek aan de website of tot een volgend bezoek. Bijvoorbeeld taalinstellingen, of ingevulde velden in een formulier.
### Analytische cookies
Deze cookies laten zien hoe u de website gebruikt. Wij weten dan welke delen van de website interessant zijn en welke niet, of de website goed werkt en hoe we de website kunnen verbeteren.
### Cookies van websites van derden
Bij onderdelen van de website zetten websites van derden cookies. Het gaat dan om handige extra’s: zoals een Google-plattegrond met interactieve routebeschrijving, een 'like'-knop van Facebook, of de mogelijkheid om iets door te twitteren. Door deze cookies 'weet' de website die u bekijkt, of u bij Google, Facebook of Twitter bent ingelogd.
        `
        },
        list: `
Hieronder volgt een overzicht van de cookies die binnen deze site in gebruik zijn:

### SiteImprove
De cookies 'AWSELB / AWSELBCOR' en 'nmstat' worden gezet door SiteImprove. Wij gebruiken deze statistiekendienst om inzicht te krijgen welke pagina's worden bezocht. De gegevens in de cookies zijn geanonimiseerd en zijn dus niet te herleiden naar een persoon.

### Lettertype licenties
Er worden een aantal cookies gebruikt om het gebruik van lettertypen en bijbehorende licenties te checken.

### Campaign ID voor feedbackformulier
Ten behoeve van het feedbackformulier slaan we een campaign ID op in localStorage.
Zo kunnen wij u na het doorlopen van een demo eenmalig om feedback vragen.
`,
        delete: {
            title: `Cookies verwijderen`,
            body: `U kunt uw cookies verwijderen via de instelling van uw browser. Ook kunt u via de instelling van uw browser de plaatsing van cookies helemaal of ten dele uitsluiten. Meer informatie over cookies en het uitschakelen van cookies vindt u op [veiliginternetten.nl](https://www.veiliginternetten.nl). Voor professionals: [Nationaal Cyber Security Centrum](https://www.ncsc.nl/).`
        },
        outro: `[Terug naar de homepage](/)`
    },

    a11y: {
        breadcrumbs: `- [Home](/)
- [Toegankelijkheidsverklaring](/toegankelijkheidsverklaring)`,
        intro: `# Volledige toegankelijkheidsverklaring
**De gemeente Amsterdam wil dat iedereen de website ‘Probeer Yivi uit’ kan gebruiken.**`,
        article: `
## Toegankelijk ‘Probeer Yivi uit’
Iedereen moet websites van de overheid kunnen gebruiken. Dit is wat wij doen om ‘Probeer Yivi uit’ toegankelijk te maken en te houden voor iedereen:
- Wij ontwikkelen ‘Probeer Yivi uit’ samen met u, de Amsterdammer.
- We doen regelmatig gebruikersonderzoek en testen ‘Probeer Yivi uit’ op toegankelijkheid.
- We lossen knelpunten op.
- Onze medewerkers houden hun kennis over toegankelijkheid op peil.
## Onderdelen die nog niet toegankelijk zijn
- Als stylesheets uitstaan, verschijnt de Yivi-QR-code onderin de pagina. De QR-code kan dan alleen via toetsenbord focus krijgen.
- In het Usabilla feedback panel mist de tekst ‘Powered by GetFeedback’ een taalattribuut 'UK'.
- In het Usabilla feedback panel is ‘Iets specifieks melden’ niet goed herkenbaar voor een screenreader.\n
Komt u nog een pagina tegen die u niet kunt lezen of gebruiken? Meld het via ons [contactformulier](https://formulieren.amsterdam.nl/TripleForms/DirectRegelen/formulier/nl-NL/evAmsterdam/Klachtenformulier.aspx).

## Wat kunt u van ons verwachten?
- Binnen 5 werkdagen krijgt u een ontvangstbevestiging.
- We informeren u over de voortgang en de uitkomst.
- Binnen 3 weken is uw verzoek afgehandeld.\n

## Handhavingsprocedure
Bent u niet tevreden met de manier waarop uw vraag of klacht is behandeld? Of hebben we niet op tijd gereageerd?
Dan kunt u contact opnemen via het [klachtenformulier van de nationale ombudsman](https://www.nationaleombudsman.nl/klacht-indienen/uw-klacht).

## Toegankelijkheidsverklaring
De website ‘Probeer Yivi uit’ voldoet gedeeltelijk aan het Besluit digitale toegankelijkheid overheid.
De toegankelijkheidsverklaring is beschikbaar in het [Register van toegankelijkheidsverklaringen](https://www.toegankelijkheidsverklaring.nl/register/4096).
Deze verklaring is gebaseerd op de [Toegankelijkheidcheck 'Probeer Yivi uit'](/assets/toegankelijkheidscheck_website_Probeer_IRMA_uit.pdf). In deze check vindt u alle WCAG 2.1 succescriteria waarop deze website is getoetst.
`
    },

    responsiveImages: {
        home: { src: 'home', alt: 'Gebruiker opent QR-code scanner op telefoon.' },
        demo1: {
            header: { src: 'leeftijd', alt: 'Stadsbeeld van een terras' },
            isOver18: { src: 'ouder-dan-18', alt: 'Foto van mensen in een café' },
            isNotOver18: { src: 'jonger-dan-18', alt: 'Foto van een plein met kinderen' },
            isOver65: { src: 'ouder-dan-65', alt: 'Foto van dansende ouderen' },
            isNotOver65: { src: 'jonger-dan-65', alt: 'Straatbeeld van volwassenen op fiets' }
        },
        demo2: {
            header: { src: 'ideeen-voor-buurt', alt: 'Straat met zingende meisjes' },
            headerWithWijk: { src: '', alt: 'Foto uit []' },
            headerWithAmsterdam: { src: 'amsterdam-algemeen', alt: 'Foto van het Centraal Station' },
            postcodeNegative: { src: 'niet-amsterdammer-18plus', alt: 'Foto van verhuizing naar Amsterdam' },
            ageAndPostcodeNegative: {
                src: 'niet-amsterdammer-18min',
                alt: 'Foto van kinderen die een huis in Amsterdam bekijken'
            }
        },
        demo3: {
            header: { src: 'inloggen', alt: 'Gebruiker opent beelden van amsterdam op tablet' },
            headerResult: { src: 'inloggen', alt: 'Gebruiker opent beelden van amsterdam op tablet' }
        },
        demo4: {
            header: { src: 'geveltuin', alt: 'Foto van geveltuin in straat' },
            headerResult: { src: 'geveltuin-overzicht', alt: 'Foto van geveltuin in straat' }
        },
        demo5: {
            header: { src: 'overlast-melden-straatafval', alt: 'Foto van straatafval' },
            headerResult: { src: 'overlast-melden-bloembakken', alt: 'Foto van ondergrondse afvalbakken' }
        }
    },

    footer: {
        column1: `# Contact
Heeft u een vraag en kunt u het antwoord niet vinden op deze website? Neem dan contact met ons op.
- [Contactformulier](https://formulieren.amsterdam.nl/tripleforms/DirectRegelen/formulier/nl-NL/evAmsterdam/Klachtenformulier.aspx)
- [Bel het telefoonnummer 14 020](tel:14020)  \n> maandag tot en met vrijdag van 08.00 tot 18.00 uur
- [Contactgegevens en openingstijden](https://www.amsterdam.nl/contact/)`,
        column2: `# Volg de Gemeente
- [Nieuwsbrief amsterdam.nl](https://action.spike.email/104050/Subscribe/9f53558f-601d-4db8-97d6-a78bccd6e39d?culture=nl-NL)
- [Twitter](https://twitter.com/AmsterdamNL)
- [Facebook](https://www.facebook.com/gemeenteamsterdam)
- [Instagram](https://www.instagram.com/gemeenteamsterdam/)
- [LinkedIn](https://www.linkedin.com/company/gemeente-amsterdam)
- [Werkenbij](https://www.amsterdam.nl/bestuur-organisatie/werkenbij/)`,
        column3: `# Wat is er te doen in Amsterdam?
Informatie over toerisme, cultuur, uitgaan, evenementen en meer vindt u op [I amsterdam](https://www.iamsterdam.com/nl)`,
        bottom: `[Over deze site](https://www.amsterdam.nl/overdezesite/)
[Privacy](https://www.amsterdam.nl/privacy/)
[Toegankelijkheid](/toegankelijkheidsverklaring)
[Cookies op deze site](/cookies)`
    },

    qrcode: {
        title: '### Maak uzelf bekend',
        steps: `Doorloop de volgende stappen: \n
1. Scan de QR-code hieronder met uw Yivi-app.  \n
2. Kies in uw Yivi-app of u de gevraagde gegevens wilt doorgeven.`,
        button: 'Inloggen met Yivi',
        close: 'Sluiten',
        counter: 'Deze QR-code is nog [] geldig.',
        minute: 'minuut',
        minutePlural: 'minuten',
        second: 'seconde',
        secondPlural: 'seconden'
    },
    translatedIrmaAttributes: {
        name: 'naam',
        fullname: 'volledige naam',
        street: 'straat',
        housenumber: 'huisnummer',
        city: 'woonplaats',
        zipcode: 'postcode',
        email: 'email',
        telephone: 'telefoonnummer mobiel',
        over18: 'ouder dan 18'
    }
};

export default content;
