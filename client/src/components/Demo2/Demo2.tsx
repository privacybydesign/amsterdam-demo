import React, { useState } from 'react';
import createIrmaSession from '@services/createIrmaSession';
import content from '@services/content';
import ReactMarkDown from 'react-markdown';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { Link, Accordion } from '@datapunt/asc-ui';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import QRCode from '@components/QRCode/QRCode';
import ExternalLink from '@components/ExternalLink/ExternalLink';

export interface IProps { }

const Demo2: React.FC<IProps> = () => {
    const [isOver18, setIsOver18] = useState<boolean>(false);
    const [isPostcodeInArea, setIsPostcodeInArea] = useState<boolean>(false);
    const [hasResult, setHasResult] = useState<boolean>(false);

    const getSession = async () => {
        // TODO: Make combined over18 + postcode request and update state accordingly
        const response = await createIrmaSession('age', 'irma-qr');
        setIsOver18(response['pbdf.gemeente.personalData.over18'] === 'Yes');
        setIsPostcodeInArea(response['pbdf.gemeente.personalData.over18'] === 'Yes');
        setHasResult(true);
    };

    let alertBox;
    if (!hasResult) {
        alertBox = (
            <AscLocal.BlueAlert
                heading={content.demo2.unproven.alert.title}
                content={content.demo2.unproven.alert.body}
            />
        );
    } else if (isOver18 && isPostcodeInArea) {
        alertBox = (
            <AscLocal.GreenAlert heading={content.demo2.proven.alert.title} content={content.demo2.proven.alert.bodyPositive} />
        );
    } else if (!isOver18 && isPostcodeInArea) {
        alertBox = (
            <AscLocal.RedAlert
                heading={content.demo2.proven.alert.title}
                content={content.demo2.proven.alert.bodyAgeNegative}
            />
        );
    } else if (isOver18 && !isPostcodeInArea) {
        alertBox = (
            <AscLocal.RedAlert
                heading={content.demo2.proven.alert.title}
                content={content.demo2.proven.alert.bodyPostcodeNegative}
            />
        );
    } else if (!isOver18 && !isPostcodeInArea) {
        alertBox = (
            <AscLocal.RedAlert
                heading={content.demo2.proven.alert.title}
                content={content.demo2.proven.alert.bodyAgeAndPostcodeNegative}
            />
        );
    }

    return (
        <PageTemplate>
            {alertBox}
            <ReactMarkDown
                source={content.demo2.breadcrumbs}
                renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
            />
            <ReactMarkDown
                source={content.demo2[hasResult ? 'proven' : 'unproven'].title}
                renderers={{ heading: AscLocal.H1 }}
            />
            {/* // TODO: Add local image */}
            <img src="/assets/demo_1.png" alt="Woonwijk" />
            {!hasResult ? (
                <>
                    <ReactMarkDown source={content.demo2.intro} renderers={{ heading: AscLocal.H2, list: AscLocal.UL }} />
                    <AscLocal.AccordionContainer>
                        <Accordion title={content.demo2.why.title}>
                            <ReactMarkDown
                                source={content.demo2.why.body}
                                renderers={{ paragraph: AscLocal.Paragraph, heading: AscLocal.AccordionHeading }}
                            />
                        </Accordion>
                    </AscLocal.AccordionContainer>
                    <QRCode getSession={getSession} />
                    <ReactMarkDown
                        source={content.downloadIrma}
                        escapeHtml={false}
                        renderers={{ paragraph: AscLocal.Paragraph, link: ExternalLink }}
                    />
                </>
            ) : (
                    <ReactMarkDown
                        source={content.demo2.result}
                        renderers={{ heading: AscLocal.H2, paragraph: AscLocal.Paragraph, link: Link }}
                    />
                )}
        </PageTemplate>
    );
};

// const AccordionContainer = styled.div`
// margin-bottom: ${themeSpacing(4)};
// `;

export default Demo2;
