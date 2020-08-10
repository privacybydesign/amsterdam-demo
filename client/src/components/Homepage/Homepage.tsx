import React from 'react';
import styled from 'styled-components';
import BreadCrumbs from '@components/BreadCrumbs';
import { Accordion, themeSpacing, Button } from '@datapunt/asc-ui';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import ReactMarkDown from 'react-markdown';
import content from '@services/content';
import AppRoutes from '@app/AppRoutes';
import VerticalColumn from '@components/VerticalColumn/VerticalColumn';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import Article from '@components/Article/Article';

interface IProps {}

const Homepage: React.FC<IProps> = () => (
    <PageTemplate>
        <ReactMarkDown
            source={content.home.breadcrumbs}
            renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
        />
        <ReactMarkDown source={content.home.title} renderers={{ heading: AscLocal.H1 }} />
        {/* // TODO: Make this a responsive image */}
        <AscLocal.Image src="/assets/home.png"></AscLocal.Image>
        <VerticalColumn span={{ small: 1, medium: 2, big: 6, large: 9, xLarge: 9 }}>
            <ReactMarkDown source={content.home.intro} renderers={{ paragraph: AscLocal.StrongParagraph }} />
            <AscLocal.AccordionContainer>
                <Accordion title={content.home.requirements.title} id="nodig">
                    <ReactMarkDown
                        source={content.home.requirements.body}
                        renderers={{ heading: AscLocal.H2, list: AscLocal.UL, image: DownloadButton }}
                    />
                </Accordion>
            </AscLocal.AccordionContainer>
            <ReactMarkDown source={content.home.subtitle} renderers={{ heading: AscLocal.H2 }} />
            <Article
                imageSrc={content.images.demo1.header.src}
                imageAlt={content.images.demo1.header.alt}
                title={content.home.demo1Card.title}
                href={AppRoutes.DEMO1.path}
            >
                <ReactMarkDown source={content.home.demo1Card.body} />
            </Article>
            <Article
                imageSrc={content.images.demo2.header.src}
                imageAlt={content.images.demo2.header.alt}
                title={content.home.demo2Card.title}
                href={AppRoutes.DEMO2.path}
            >
                <ReactMarkDown source={content.home.demo2Card.body} />
            </Article>
            <Article
                imageSrc={content.images.demo3.header.src}
                imageAlt={content.images.demo3.header.alt}
                title={content.home.demo3Card.title}
                href={AppRoutes.DEMO3.path}
            >
                <ReactMarkDown source={content.home.demo2Card.body} />
            </Article>
        </VerticalColumn>
    </PageTemplate>
);

interface IDownloadButtonProps {
    alt: string;
    title: string;
    src: string;
    className: string;
}

const DownloadButton = styled(({ alt, title, src, className }: IDownloadButtonProps) => {
    return <Button variant="blank" icon={<AscLocal.Image src={src} alt={alt} title={title} />} className={className} />;
})`
    display: inline-block;
    width: auto;
    height: 40px;
    padding: 0;
    margin-right: ${themeSpacing(3)};

    span {
        width: 100%;
        height: 100%;
    }

    img {
        width: auto;
        height: 100%;
        margin: 0;
    }
`;

export default Homepage;
