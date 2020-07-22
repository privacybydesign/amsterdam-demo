// This file contains all textual content in Markdown markup
// Content values can be changed freely, but don't change the data structure of this file.

export default {
    home: {
        breadcrumbs: `- [Home](/)`,
        title: `# Probeer IRMA uit`,
        intro: `IRMA is een app waarmee je overal kunt aantonen wie u bent.
        IRMA biedt een nieuwe manier van inloggen anders dan u kent van misschien DigiD.

Binnenkort kunt u IRMA gebruiken in Amsterdam. Waarom IRMA?

Ervaar nu vast wat u met IRMA kunt via verschillende demo's.
        `,
        requirements: {
            title: `Wat heeft u nodig?`,
            body: `U kunt de demo&apos;s met IRMA doen als u de IRMA-app op uw telefoon heeft geïnstalleerd en als u de IRMA de volgende gegevens heeft toegevoegd:
- Uw persoonsgegevens
- Uw adres
- Uw e-mailadres
- Uw telefoonnummer`
        },
        subtitle: `## Aan de slag met IRMA`,
        demo1: {
            title: `Demo 1: Leeftijd aantonen`,
            body: `Bewijs dat u ouder bent dan 18 jaar zonder uw geboortedatum prijs te geven.`
        },
        demo2: {
            title: `Demo 2: Ideeën voor uw buurt`,
            body: `Bewijs dat u in een bepaalde Amsterdamse wijk woont en dat u ouder bent dan 18 jaar.`
        }
    },
    footer: {
        column1: `# Contact
Hebt u een vraag en kunt u het antwoord niet vinden op deze website? Neem dan contact met ons op.`,
        column2: `# Volg de Gemeente
- [Lorem ipsum dolor sit.](/)
- [Lorem.](/)
- [Lorem ipsum .](/)`,
        column3: `# Uit in Amsterdam
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolor doloremque ea eos facere hic ipsum nobis provident quidem voluptates.`,
        bottom: `[Privacy and cookies.](/)
[Privacy and cookies.](/)`
    },
    qrcode: {
        title: '### Maak uzelf bekend',
        stappen: `Doorloop de volgende stappen  \n
1. Scan de QR-code hieronder met uw IRMA-app.
2. Kies in uw IRMA- app of u de gevraagde gegevens wilt doorgeven om in te loggen op Mijn Amsterdam.< /li>`
    },
    demo1: {
        breadcrumbs: `- [Home](/)
- [Innovatie](/)
- [Probeer IRMA uit](/)`,
        title: {
            noResult: '# Demo 1: Leeftijd aantonen',
            hasResult: '# Demo 1: Uw leeftijd'
        },
        isOver18: {
            heading: 'Uw leeftijd',
            content: 'U heeft bewezen dat u ouder bent dan 18 jaar.'
        },
        isNotOver18: {
            heading: 'Uw leeftijd',
            content: 'U heeft niet bewezen dat u ouder bent dan 18 jaar.'
        },
        demo: {
            heading: 'Dit is een demosite',
            content: 'U kunt hier ervaren wat u met uw IRMA-app kunt. Uw gegevens worden niet bewaard.'
        },
        intro1: 'Met IRMA kunt u inloggen bij websites zonder eerst een gebruikersnaam en wachtwoord en/of een profiel aan te maken.',
        tryIt: '## Probeer het uit',
        intro2: `Login op de demosite van Mijn Amsterdam door uzelf bekend te maken met de volgende gegevens:
- Uw volledige naam
- Uw burgerservicenummer(BSN)`,
        waarom: {
            title: 'Waarom worden deze gegevens gevraagd?',
            body: '** Uw volledige naam **  \nDe gemeente wil u binnen Mijn Amsterdam graag aanspreken met uw naam.  \n  \n** Uw burgerservicenummer (BSN) **  \nDe gemeente wil zeker weten dat u het bent. Als u dat met IRMA bewijst, toont de gemeente binnen Mijn Amsterdam welke gegevens ze van u heeft vastgelegd en hoe het met uw aanvragen staat.',
        },
        irma: {
            question: 'Heeft u nog geen IRMA?',
            label: 'Download IRMA',
            href: '/'
        },
        result: {
            intro1: 'De gegevens die u zojuist via IRMA heeft doorgegegeven, worden niet bewaard.',
            wat: '## Wat heeft u zojuist gedaan?',
            list: `- U heeft IRMA gebruikt om door te geven dat u ouder bent dan 18 jaar.
- U heeft uw geboortedatum (en andere gegevens) niet doorgegeven.`,
            anders: '## Wat is er anders met IRMA?',
            intro2: 'Als u via IRMA uw leeftijd doorgeeft, is bij de website bekend of u aan de leeftijdsgrens voldoet. U blijft anoniem.',
            list2: `Dit kan worden gebruikt voor:  \n
- Alcohol kopen.
- Stemmen voor lokale initiatieven.
- Toegang en korting op basis van uw leeftijd.`,
            link: {
                label: 'Probeer de andere demo’s',
                href: '/'
            }
        }
    }
};
