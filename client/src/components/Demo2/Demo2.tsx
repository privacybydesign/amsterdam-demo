import React, { useState, useMemo } from 'react';
import createIrmaSession from '@services/createIrmaSession';
import getGGW from '@services/getGGW';
import content from '@services/content';
import ReactMarkDown from 'react-markdown';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { Link, Accordion } from '@datapunt/asc-ui';
import CredentialSelector, { CredentialSource } from '@components/CredentialSelector/CredentialSelector';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import QRCode from '@components/QRCode/QRCode';
import DemoNotification from '@components/DemoNotification/DemoNotification';
import ExternalLink from '@components/ExternalLink/ExternalLink';
import HeaderImage, { IHeaderImageProps } from '@components/HeaderImage/HeaderImage';
import EmphasisBlock from '@components/EmphasisBlock/EmphasisBlock';

export interface IProps { }

const Demo2: React.FC<IProps> = () => {
    const [credentialSource, setCredentialSource] = useState(CredentialSource.PRODUCTION);
    const [isOver18, setIsOver18] = useState<boolean>(false);
    const [isPostcodeInArea, setIsPostcodeInArea] = useState<boolean>(false);
    const [hasResult, setHasResult] = useState<boolean>(false);
    const [wijk, setWijk] = useState<string>('');
    const [code, setCode] = useState<string>('');

    const getSession = async () => {
        const response = await createIrmaSession('demo2', 'irma-qr', credentialSource === CredentialSource.DEMO);
        setIsOver18(response['over18'] === 'Yes');
        const postcode = response['zipcode'].replace(/ /, '');
        const postcode4digit = parseInt(postcode, 10);
        setHasResult(true);

        const ggwResponse = await getGGW(postcode);

        if (ggwResponse) {
            setIsPostcodeInArea(postcode4digit >= 1000 && postcode4digit <= 1099);
            setWijk(ggwResponse.buurtcombinatieNamen);
            setCode(ggwResponse.ggwCode);
        } else {
            // error flow if location is not in Amsterdam
            setIsPostcodeInArea(false);
        }
        window.scrollTo(0, 0);
    };

    // Define dynamic header image
    const headerImg = useMemo((): IHeaderImageProps => {
        if (wijk) {
            return { filename: `wijken/${code}`, alt: `Een foto in wijk ${wijk}` };
        } else if (!hasResult) {
            return { filename: content.images.demo2.header.src, alt: content.images.demo2.header.alt };
        } else if (isOver18 && isPostcodeInArea) {
            return {
                filename: content.images.demo2.ageAndPostcodePositive.src,
                alt: content.images.demo2.ageAndPostcodePositive.alt
            };
        } else if (!isOver18 && isPostcodeInArea) {
            return { filename: content.images.demo2.ageNegative.src, alt: content.images.demo2.ageNegative.alt };
        } else if (isOver18 && !isPostcodeInArea) {
            return {
                filename: content.images.demo2.postcodeNegative.src,
                alt: content.images.demo2.postcodeNegative.alt
            };
        } else if (!isOver18 && !isPostcodeInArea) {
            return {
                filename: content.images.demo2.ageAndPostcodeNegative.src,
                alt: content.images.demo2.ageAndPostcodeNegative.alt
            };
        }
    }, [hasResult, wijk, isOver18, isPostcodeInArea]);

    const alertBox: JSX.Element = useMemo(() => {
        const regExp = /\[\]/;

        if (!hasResult) {
            return <DemoNotification />;
        } else if (isOver18 && isPostcodeInArea) {
            return (
                <AscLocal.GreenAlert
                    heading={content.demo2.proven.alert.title}
                    content={content.demo2.proven.alert.bodyAgeAndPostcodePositive.replace(regExp, wijk)}
                />
            );
        } else if (!isOver18 && isPostcodeInArea) {
            return (
                <AscLocal.RedAlert
                    heading={content.demo2.proven.alert.title}
                    content={content.demo2.proven.alert.bodyAgeNegative.replace(regExp, wijk)}
                />
            );
        } else if (isOver18 && !isPostcodeInArea) {
            return (
                <AscLocal.RedAlert
                    heading={content.demo2.proven.alert.title}
                    content={content.demo2.proven.alert.bodyPostcodeNegative}
                />
            );
        } else if (!isOver18 && !isPostcodeInArea) {
            return (
                <AscLocal.RedAlert
                    heading={content.demo2.proven.alert.title}
                    content={content.demo2.proven.alert.bodyAgeAndPostcodeNegative}
                />
            );
        }
    }, [hasResult, isOver18, isPostcodeInArea, wijk]);

    return (
        <PageTemplate>
            <CredentialSelector credentialSource={credentialSource} setCredentialSource={setCredentialSource} />
            {alertBox}
            <ReactMarkDown
                source={content.demo2.breadcrumbs}
                renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
            />
            <ReactMarkDown
                source={content.demo2[hasResult ? 'proven' : 'unproven'].title}
                renderers={{ heading: AscLocal.H1 }}
            />

            <HeaderImage filename={headerImg.filename} alt={headerImg.alt} />

            {!hasResult ? (
                <>
                    <ReactMarkDown
                        source={content.demo2.intro}
                        renderers={{ heading: AscLocal.H2, list: AscLocal.UL }}
                    />
                    <AscLocal.AccordionContainer>
                        <Accordion title={content.demo2.why.title}>
                            <ReactMarkDown
                                source={content.demo2.why.body}
                                renderers={{ paragraph: AscLocal.Paragraph, heading: AscLocal.AccordionHeading }}
                            />
                        </Accordion>
                    </AscLocal.AccordionContainer>
                    <QRCode getSession={getSession} label={content.demo2.button} />
                    <ReactMarkDown
                        source={content.downloadIrma}
                        renderers={{ paragraph: AscLocal.Paragraph, link: ExternalLink }}
                    />
                </>
            ) : (
                    <>
                        <ReactMarkDown
                            source={content.noSavePromise}
                            renderers={{ heading: AscLocal.H2, paragraph: AscLocal.Paragraph, link: Link }}
                        />
                        <EmphasisBlock>
                            <ReactMarkDown
                                source={content.demo2.result}
                                renderers={{ heading: AscLocal.H2, paragraph: AscLocal.Paragraph, link: Link }}
                            />
                        </EmphasisBlock>
                        <ReactMarkDown source={content.callToAction} />
                    </>
                )}
        </PageTemplate>
    );
};

export default Demo2;
