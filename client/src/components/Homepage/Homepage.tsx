import React from 'react';
import BreadCrumbs from '@components/BreadCrumbs';
import { Accordion } from '@datapunt/asc-ui';
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
        <AscLocal.Image src="/assets/home.png"></AscLocal.Image>
        <VerticalColumn span={{ small: 1, medium: 2, big: 6, large: 9, xLarge: 9 }}>
            <ReactMarkDown source={content.home.intro} renderers={{ paragraph: AscLocal.StrongParagraph }} />
            <AscLocal.AccordionContainer>
                <Accordion title={content.home.requirements.title} id="nodig">
                    <ReactMarkDown source={content.home.requirements.body} renderers={{ list: AscLocal.UL }} />
                </Accordion>
            </AscLocal.AccordionContainer>
            <ReactMarkDown source={content.home.subtitle} renderers={{ heading: AscLocal.H2 }} />
            <Article imageSrc="/assets/demo_1.png" title={content.home.demo1Card.title} href={AppRoutes.DEMO1.path}>
                <ReactMarkDown source={content.home.demo1Card.body} />
            </Article>
            <Article imageSrc="/assets/demo_2.png" title={content.home.demo2Card.title} href={AppRoutes.DEMO2.path}>
                <ReactMarkDown source={content.home.demo2Card.body} />
            </Article>
        </VerticalColumn>
    </PageTemplate>
);

export default Homepage;
