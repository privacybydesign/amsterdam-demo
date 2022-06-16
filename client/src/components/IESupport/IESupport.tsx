import React from 'react';
import ReactMarkDown from 'react-markdown';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import ContentBlock from '@components/ContentBlock/ContentBlock';
import { SkipLinkEntry } from '@components/SkipLink/SkipLink';
import { useContent } from '@services/ContentProvider';

export interface IProps {}

const IESupport: React.FC<IProps> = () => {
    const content = useContent();

    return (
        <PageTemplate>
            <ContentBlock>
                <ReactMarkDown
                    source={content.ieSupport.breadcrumbs}
                    renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item, link: AscLocal.MarkDownToLink }}
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
