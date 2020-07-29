import React, { useState, useMemo } from 'react';
import createIrmaSession from '@services/createIrmaSession';
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

export interface IProps {}

const Demo2: React.FC<IProps> = () => {
    const [credentialSource, setCredentialSource] = useState(CredentialSource.PRODUCTION);
    const [isOver18, setIsOver18] = useState<boolean>(false);
    const [isPostcodeInArea, setIsPostcodeInArea] = useState<boolean>(false);
    const [hasResult, setHasResult] = useState<boolean>(false);

    const getSession = async () => {
        const response = await createIrmaSession('demo2', 'irma-qr', credentialSource === CredentialSource.DEMO);
        setIsOver18(response['over18'] === 'Yes');
        // TODO: Substitute this logic for postal code > area mapping
        const postcode = parseInt(response['zipcode'].substr(0, 4));
        setIsPostcodeInArea(postcode >= 1000 && postcode <= 1099);
        setHasResult(true);
        window.scrollTo(0, 0);
    };

    // Define dynamic header image
    // TODO: Implement correct images
    const headerImg = useMemo((): IHeaderImageProps => {
        if (!hasResult) {
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
    }, [hasResult, isOver18, isPostcodeInArea]);

    const alertBox: JSX.Element = useMemo(() => {
        if (!hasResult) {
            return <DemoNotification />;
        } else if (isOver18 && isPostcodeInArea) {
            return (
                <AscLocal.GreenAlert
                    heading={content.demo2.proven.alert.title}
                    content={content.demo2.proven.alert.bodyAgeAndPostcodePositive}
                />
            );
        } else if (!isOver18 && isPostcodeInArea) {
            return (
                <AscLocal.RedAlert
                    heading={content.demo2.proven.alert.title}
                    content={content.demo2.proven.alert.bodyAgeNegative}
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
    }, [hasResult, isOver18, isPostcodeInArea]);

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
                    <ReactMarkDown
                        source={content.demo2.result}
                        renderers={{ heading: AscLocal.H2, paragraph: AscLocal.Paragraph, link: Link }}
                    />
                    <ReactMarkDown source={content.callToAction} />
                </>
            )}
        </PageTemplate>
    );
};

export default Demo2;
