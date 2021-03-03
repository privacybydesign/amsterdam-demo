import React from 'react';
import ReactMarkDown from 'react-markdown';
import content from '@services/content';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import ContentBlock from '@components/ContentBlock/ContentBlock';
import { SkipLinkEntry } from '@components/SkipLink/SkipLink';

export interface IProps {}

const A11Y: React.FC<IProps> = () => {
    return (
        <PageTemplate>
            <ContentBlock>
                <ReactMarkDown
                    source={content.a11y.breadcrumbs}
                    renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
                />
                {SkipLinkEntry}
                <ReactMarkDown
                    source={content.a11y.intro}
                    renderers={{
                        paragraph: AscLocal.Paragraph,
                        list: AscLocal.UL,
                        link: AscLocal.ExternalLinkRenderer
                    }}
                />
                <ReactMarkDown
                    source={content.a11y.article}
                    renderers={{
                        paragraph: AscLocal.Paragraph,
                        list: AscLocal.UL,
                        link: AscLocal.ExternalLinkRenderer
                    }}
                />
            </ContentBlock>
        </PageTemplate>
    );
};

export default A11Y;
