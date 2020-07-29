import React, { useState } from 'react';
import createIrmaSession from '@services/createIrmaSession';
import content from '@services/content';
import ReactMarkDown from 'react-markdown';

import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { Accordion } from '@datapunt/asc-ui';
import CredentialSelector, { CredentialSource } from '@components/CredentialSelector/CredentialSelector';
import ExternalLink from '@components/ExternalLink/ExternalLink';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import QRCode from '@components/QRCode/QRCode';

export interface IProps {}

// @todo add error flow with incorrect data

const Demo1: React.FC<IProps> = () => {
    const [credentialSource, setCredentialSource] = useState(CredentialSource.PRODUCTION);
    const [isOver18, setIsOver18] = useState<boolean>(false);
    const [hasResult18, setHasResult18] = useState<boolean>(false);
    const [isOver65, setIsOver65] = useState<boolean>(false);
    const [hasResult65, setHasResult65] = useState<boolean>(false);

    const getSessionOver18 = async () => {
        const response = await createIrmaSession('demo1/18', 'irma-qr', credentialSource === CredentialSource.DEMO);
        setIsOver18(response['over18'] === 'Yes');
        setHasResult18(true);
    };

    const getSessionOver65 = async () => {
        const response = await createIrmaSession('demo1/65', 'irma-qr', credentialSource === CredentialSource.DEMO);
        setIsOver65(response['over65'] === 'Yes');
        setHasResult65(true);
    };

    return (
        <PageTemplate>
            <CredentialSelector credentialSource={credentialSource} setCredentialSource={setCredentialSource} />

            <ReactMarkDown
                source={content.demo1.breadcrumbs}
                renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
            />

            {!hasResult18 && !hasResult65 && (
                <AscLocal.BlueAlert heading={content.demo1.demo.heading} content={content.demo1.demo.content} />
            )}

            {hasResult18 && isOver18 && (
                <AscLocal.GreenAlert
                    heading={content.demo1.isOver18.heading}
                    content={content.demo1.isOver18.content}
                />
            )}
            {hasResult18 && !isOver18 && (
                <AscLocal.RedAlert
                    heading={content.demo1.isNotOver18.heading}
                    content={content.demo1.isNotOver18.content}
                />
            )}

            {hasResult65 && isOver65 && (
                <AscLocal.GreenAlert
                    heading={content.demo1.isOver65.heading}
                    content={content.demo1.isOver65.content}
                />
            )}
            {hasResult65 && !isOver65 && (
                <AscLocal.RedAlert
                    heading={content.demo1.isNotOver65.heading}
                    content={content.demo1.isNotOver65.content}
                />
            )}

            <ReactMarkDown
                source={content.demo1.title[hasResult18 || hasResult65 ? 'hasResult' : 'noResult']}
                renderers={{ heading: AscLocal.H1 }}
            />

            <AscLocal.Image src="/assets/demo_1.png" alt="foto van mensen in een café"></AscLocal.Image>

            {!hasResult18 && !hasResult65 ? (
                <>
                    <ReactMarkDown
                        source={content.demo1.intro}
                        renderers={{ heading: AscLocal.H2, paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                    />

                    <Accordion title={content.demo1.waarom.title}>
                        <ReactMarkDown
                            source={content.demo1.waarom.body}
                            renderers={{ paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                        />
                    </Accordion>

                    <QRCode getSession={getSessionOver18} label="18+ bewijzen met IRMA" />

                    <QRCode getSession={getSessionOver65} label="65+ bewijzen met IRMA" />

                    <ReactMarkDown
                        source={content.downloadIrma}
                        escapeHtml={false}
                        renderers={{ paragraph: AscLocal.Paragraph, link: ExternalLink }}
                    />
                </>
            ) : (
                <ReactMarkDown source={content.demo1.result} />
            )}
        </PageTemplate>
    );
};

export default Demo1;
