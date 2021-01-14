import React from 'react';
import ReactMarkDown from 'react-markdown';
import content from '@services/content';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import ContentBlock from '@components/ContentBlock/ContentBlock';

export interface IProps {}

const IESupport: React.FC<IProps> = () => {
    return (
        <PageTemplate>
            <ContentBlock>
                <ReactMarkDown
                    source={content.ieSupport.breadcrumbs}
                    renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
                />
                <ReactMarkDown source={content.ieSupport.intro} renderers={{ paragraph: AscLocal.Paragraph }} />
                <br />
                <ReactMarkDown
                    source={content.ieSupport.explanation}
                    renderers={{ paragraph: AscLocal.Paragraph, link: AscLocal.ExternalLinkRenderer }}
                />
            </ContentBlock>
        </PageTemplate>
    );
};

export default IESupport;
