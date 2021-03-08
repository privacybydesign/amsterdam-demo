import React from 'react';
import ReactMarkDown from 'react-markdown';
import content from '@services/content';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import ContentBlock from '@components/ContentBlock/ContentBlock';
import { SkipLinkEntry } from '@components/SkipLink/SkipLink';

export interface IProps { }

const IESupport: React.FC<IProps> = () => {
    return (
        <PageTemplate>
            <ContentBlock>
                <ReactMarkDown
                    source={content.ieSupport.breadcrumbs}
                    renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
                />
                {SkipLinkEntry}
                <ReactMarkDown
                    source={content.ieSupport.content}
                    renderers={{ paragraph: AscLocal.Paragraph, link: AscLocal.ExternalLinkRenderer }}
                />
            </ContentBlock>
        </PageTemplate>
    );
};

export default IESupport;
