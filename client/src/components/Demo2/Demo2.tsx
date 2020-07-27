import React, { useState } from 'react';
import styled from 'styled-components';
import createIrmaSession from '@services/createIrmaSession';
import content from '@services/content';
import ReactMarkDown from 'react-markdown';
import { Heading, Paragraph, Link, Accordion, Alert, themeColor, themeSpacing } from '@datapunt/asc-ui';
import CredentialSelector, { CredentialSource } from '@components/CredentialSelector/CredentialSelector';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import QRCode from '@components/QRCode/QRCode';
import ExternalLink from '@components/ExternalLink/ExternalLink';

export interface IProps {}

const Demo2: React.FC<IProps> = () => {
    const [credentialSource, setCredentialSource] = useState(CredentialSource.PRODUCTION);
    const [isOver18, setIsOver18] = useState<boolean>(false);
    const [isPostcodeInArea, setIsPostcodeInArea] = useState<boolean>(false);
    const [hasResult, setHasResult] = useState<boolean>(false);

    const getSession = async () => {
        const response = await createIrmaSession('demo2', 'irma-qr', credentialSource === CredentialSource.DEMO);
        setIsOver18(response['pbdf.gemeente.personalData.over18'] === 'Yes');
        setIsPostcodeInArea(response['pbdf.gemeente.personalData.over18'] === 'Yes');
        setHasResult(true);
    };

    let alertBox;
    if (!hasResult) {
        alertBox = (
            <Alert
                level="attention"
                heading={content.demo2.unproven.alert.title}
                content={content.demo2.unproven.alert.body}
            />
        );
    } else if (isOver18 && isPostcodeInArea) {
        alertBox = (
            <StyledAlert heading={content.demo2.proven.alert.title} content={content.demo2.proven.alert.bodyPositive} />
        );
    } else if (!isOver18 && isPostcodeInArea) {
        alertBox = (
            <StyledAlert
                heading={content.demo2.proven.alert.title}
                content={content.demo2.proven.alert.bodyAgeNegative}
            />
        );
    } else if (isOver18 && !isPostcodeInArea) {
        alertBox = (
            <StyledAlert
                heading={content.demo2.proven.alert.title}
                content={content.demo2.proven.alert.bodyPostcodeNegative}
            />
        );
    } else if (!isOver18 && !isPostcodeInArea) {
        alertBox = (
            <StyledAlert
                heading={content.demo2.proven.alert.title}
                content={content.demo2.proven.alert.bodyAgeAndPostcodeNegative}
            />
        );
    }

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
                renderers={{ heading: StyledH1 }}
            />
            {/* // TODO: Add local image */}
            <img src="/assets/demo_1.png" alt="Woonwijk" />
            {!hasResult ? (
                <>
                    <ReactMarkDown source={content.demo2.intro} renderers={{ heading: StyledH2 }} />
                    <AccordionContainer>
                        <Accordion title={content.demo2.why.title}>
                            <ReactMarkDown
                                source={content.demo2.why.body}
                                renderers={{ paragraph: Paragraph, heading: AccordionHeading }}
                            />
                        </Accordion>
                    </AccordionContainer>
                    <QRCode getSession={getSession} />
                    <ReactMarkDown
                        source={content.downloadIrma}
                        escapeHtml={false}
                        renderers={{ paragraph: Paragraph, link: ExternalLink }}
                    />
                </>
            ) : (
                <ReactMarkDown
                    source={content.demo2.result}
                    renderers={{ heading: StyledH2, paragraph: Paragraph, link: Link }}
                />
            )}
        </PageTemplate>
    );
};

const StyledH1 = styled(Heading)`
    margin-top: ${themeSpacing(4)};
    margin-bottom: ${themeSpacing(6)};
`;

const StyledH2 = styled(Heading).attrs({ as: 'h2' })``;

const AccordionHeading = styled(Heading).attrs({ as: 'h4' })`
    margin: 0;
`;

const StyledAlert = styled(Alert)`
    background-color: ${themeColor('support', 'valid')};

    * {
        color: ${themeColor('tint', 'level1')};
    }
`;

const AccordionContainer = styled.div`
    margin-bottom: ${themeSpacing(4)};
`;

export default Demo2;
