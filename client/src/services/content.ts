/* eslint-disable no-irregular-whitespace */
// This file contains all textual content in Markdown markup
// Content values can be changed freely, but don't change the data structure of this file.

export default {
    home: {
        breadcrumbs: `- [Home](/)`,
        title: `# Probeer IRMA uit`,
        intro: `IRMA is een app waarmee u online kunt aantonen wie u bent.
        IRMA biedt een nieuwe manier van inloggen, anders dan u kent van bijvoorbeeld DigiD.

Binnenkort kunt u IRMA gebruiken in Amsterdam.

Ervaar nu vast wat u met IRMA kunt via verschillende demo’s.
        `,
        requirements: {
            title: `Wat heeft u nodig?`,
            body: `U kunt de demo&apos;s met IRMA doen als u de IRMA-app op uw telefoon heeft geïnstalleerd en als u in IRMA de volgende gegevens heeft toegevoegd:
- Uw persoonsgegevens
- Uw adres
- Uw e-mailadres
- Uw telefoonnummer

## IRMA downloaden

Download de IRMA-app voor iOS of Android:  \n
[![App Store](/assets/download-app-store.svg "Download IRMA in de App Store")](https://apps.apple.com/nl/app/irma-authenticatie/id1294092994)
[![Play Store](/assets/download-play-store.svg "Download IRMA in de Play Store")](https://play.google.com/store/apps/details?id=org.irmacard.cardemu)

Wilt u meer weten over IRMA?
Ga naar de [website van IRMA](https://irma.app/)`
        },
        subtitle: `## Aan de slag met IRMA`,
        demo1Card: {
            title: `Demo 1: Leeftijd aantonen`,
            body: `Bewijs dat u ouder dan 18 of 65 bent zonder uw geboortedatum prijs te geven.`
        },
        demo2Card: {
            title: `Demo 2: Ideeën voor uw buurt`,
            body: `Bewijs met uw postcode dat u in een bepaalde Amsterdamse wijk woont en dat u ouder bent dan 18 jaar.`
        },
        demo3Card: {
            title: `Demo 3: Inloggen met IRMA`,
            body: `Bekijk hoe u straks kunt inloggen met IRMA in Mijn Amsterdam.            `
        },
        sidebar: {
            box: `Eenvoudig en veilig in Amsterdam met IRMA
![](/assets/irma_logo.svg "Lees meer over IRMA")
[Waarom IRMA?](https://irma.app/)
          `,
            bottom: `# IRMA voor Amsterdammers
[Hoe is IRMA getest met Amsterdammers?](https://irma.app/)`
        }
    },

    demoNotification: {
        heading: `Dit is een demosite`,
        content: `U kunt hier ervaren wat u met uw IRMA-app kunt. Uw gegevens worden niet bewaard.`
    },
    downloadIrma: `Heeft u nog geen IRMA?  \n[Download IRMA](https://irma.app/)`,
    noSavePromise: `De gegevens die u zojuist via IRMA heeft doorgegeven, worden niet bewaard.`,
    callToAction: `[Probeer de andere demo’s](/)`,
    demoErrorAlert: {
        heading: `Niets doorgegeven`,
        content: `U heeft uw gegevens niet doorgegeven aan de demosite van de gemeente Amsterdam.`
    },
    demo1: {
        breadcrumbs: `- [Home](/)
- [Demo 1: Leeftijd aantonen](/leeftijd-aantonen)`,
        title: {
            noResult: `# Demo 1: Leeftijd aantonen`,
            hasResult: `# Demo 1: Uw leeftijd`
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
        intro: `Met IRMA kunt u bewijzen hoe oud u bent zonder uw geboortedatum prijs te geven. U blijft dus anoniem.
# Probeer het uit
Bewijs dat u ouder bent dan 18 jaar of 65 jaar door uzelf bekend te maken met de volgende gegevens:
- Ouder dan 18
- Ouder dan 65
      `,
        why: {
            title: 'Waarom worden deze gegevens gevraagd?',
            body:
                '**Ouder dan 18, Ouder dan 65**  \nDe gemeente kan u dan toegang geven tot dienstverlening op basis van uw leeftijd.'
        },
        button18: `18+ bewijzen met IRMA`,
        button65: `65+ bewijzen met IRMA`,
        result: {
            title: `## Wat heeft u zojuist gedaan?`,
            isOver18: `- U heeft IRMA gebruikt om door te geven dat u ouder bent dan 18 jaar.
- U heeft uw geboortedatum (en andere gegevens) niet doorgegeven.`,
            isNotOver18: `- U heeft IRMA gebruikt om door te geven dat u jonger bent dan 18 jaar.
- U heeft uw geboortedatum (en andere gegevens) niet doorgegeven.`,
            isOver65: `- U heeft IRMA gebruikt om door te geven dat u ouder bent dan 65 jaar.
- U heeft uw geboortedatum (en andere gegevens) niet doorgegeven.`,
            isNotOver65: `- U heeft IRMA gebruikt om door te geven dat u jonger bent dan 65 jaar.
- U heeft uw geboortedatum (en andere gegevens) niet doorgegeven.`,
            whatsDifferentWithIrma: `## Wat is er anders met IRMA?  \nAls u via IRMA uw leeftijd doorgeeft, is bij de website bekend of u aan de leeftijdsgrens voldoet. U blijft anoniem.  \nDit kan worden gebruikt voor:
- Toegang en korting op basis van uw leeftijd.
- Alcohol kopen.
- Stemmen voor lokale initiatieven.
`
        }
    },

    demo2: {
        breadcrumbs: `- [Home](/)
- [Demo 2: Ideeën voor uw buurt](/ideeen-voor-uw-buurt)`,
        intro: `Met IRMA kunt u bewijzen in welke wijk u woont en zo meebeslissen over ideeën voor uw buurt zonder uw woonadres en geboortedatum prijs te geven. U blijft dus anoniem.
# Probeer het uit
Bewijs in welke wijk u woont en dat u ouder bent dan 18 jaar door uzelf bekend te maken met de volgende gegevens:
- Postcode
- Ouder dan 18`,
        unproven: {
            title: `# Demo 2: Ideeën voor uw buurt`
        },
        proven: {
            title: `# Demo 2: Uw postcode en leeftijd`,
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
            body: `**Uw postcode**  \nDe gemeente weet dan in welke wijk u woont.  \n  \n**Ouder dan 18 jaar**  \nDe gemeente weet dan of u mag stemmen.`
        },
        button: `Bewijzen met IRMA`,
        result: `## Wat heeft u zojuist gedaan?
- U heeft IRMA gebruikt om door te geven in welke wijk u woont.
- U heeft IRMA gebruikt om door te geven of u ouder bent dan 18 jaar.
- U heeft geen persoonlijke informatie zoals uw naam, adres en geboortedatum doorgegeven.

## Wat is er anders met IRMA?
Als u via IRMA uw postcode en leeftijd doorgeeft, is bekend waar u ongeveer woont en dat u aan de leeftijdsgrens voldoet. U blijft anoniem.

Dit kan worden gebruikt voor:
- Stemmen voor lokale initiatieven.
- Toegang en korting op basis van uw leeftijd in uw buurt.
- Voorzieningen speciaal voor Amsterdammers.`
    },

    demo3: {
        breadcrumbs: `- [Home](/)
- [Demo 3: Inloggen met IRMA](/inloggen-met-irma)`,
        unproven: {
            title: `# Demo 3: Inloggen met IRMA`,
            alert: {
                title: `Uw naam en burgerservicenummer`,
                body: `U kunt hier ervaren wat u met uw IRMA-app kunt. Uw gegevens worden niet bewaard.`
            },
            intro: `Met IRMA kunt u inloggen bij websites zonder eerst een gebruikersnaam en wachtwoord en/of een profiel aan te maken.
## Probeer het uit
Login op de demosite van Mijn Amsterdam door uzelf bekend te maken met de volgende gegevens:
- Uw volledige naam
- Uw burgerservicenummer (BSN)`,
            why: {
                title: `Waarom worden deze gegevens gevraagd?`,
                body: `**Uw volledige naam**  \n
De gemeente wil u binnen Mijn Amsterdam graag aanspreken met uw naam.  \n
  \n
**Uw burgerservicenummer (BSN)**  \n
De gemeente wil zeker weten dat u het bent. Als u dat met IRMA bewijst, toont de gemeente binnen Mijn Amsterdam welke gegevens ze van u heeft vastgelegd en hoe het met uw aanvragen staat.`
            }
        },
        proven: {
            title: `# Demo 3: Uw Naam en Burgerservicenummer`,
            alert: {
                title: `Uw naam en burgerservicenummer  `,
                body: `U heeft bewezen dat u [] bent en u heeft uw burgerservicenummer (BSN) gedeeld.`
            }
        },
        button: 'Inloggen met IRMA',
        result: `De gegevens die u zojuist via IRMA heeft doorgegegeven, worden niet bewaard.

## Wat heeft u zojuist gedaan?
- U heeft IRMA gebruikt om in te loggen.
- U heeft uw burgerservicenummer (BSN) en uw naam aan de demosite van Mijn Amsterdam doorgegeven via IRMA.
- Met uw burgerservicenummer (BSN) kan de gemeente uw gegevens ophalen en in ‘Mijn Amsterdam’ aan u tonen.

## Wat is er anders met IRMA?
De gemeente Amsterdam biedt u straks een keuze. U kunt straks inloggen in Mijn Amsterdam met DigiD of met IRMA.
`
    },

    images: {
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
            header: { src: 'probeer-irma', alt: '' },
            headerResult: { src: 'mijn-amsterdam', alt: '' }
        }
    },

    footer: {
        column1: `# Contact
Heeft u een vraag en kunt u het antwoord niet vinden op deze website? Neem dan contact met ons op.
- [Contactformulier](https://formulieren.amsterdam.nl/tripleforms/DirectRegelen/formulier/nl-NL/evAmsterdam/Klachtenformulier.aspx)
- **[Bel het telefoonnummer 14 020](tel:14020)**\n  maandag tot en met vrijdag van 08.00 tot 18.00 uur
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
[Cookies op deze site](https://www.amsterdam.nl/privacy/cookies-site/)`
    },

    qrcode: {
        title: '### Maak uzelf bekend',
        stappen: `Doorloop de volgende stappen  \n
1. Scan de QR-code hieronder met uw IRMA-app.  \n
2. Kies in uw IRMA-app of u de gevraagde gegevens wilt doorgeven om in te loggen op Mijn Amsterdam.`,
        knop: 'Inloggen met IRMA'
    }
};
