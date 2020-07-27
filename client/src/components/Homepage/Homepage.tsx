import React from 'react';
import styled from 'styled-components';
import BreadCrumbs from '@components/BreadCrumbs';
import { Accordion, Heading, Paragraph, themeSpacing, breakpoint } from '@datapunt/asc-ui';
import ReactMarkDown from 'react-markdown';
import content from '@services/content';
import VerticalColumn from '@components/VerticalColumn/VerticalColumn';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import Article from '@components/Article/Article';

interface IProps { }

const Homepage: React.FC<IProps> = () => (
    <PageTemplate>
        <ReactMarkDown
            source={content.home.breadcrumbs}
            renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
        />
        <ReactMarkDown source={content.home.title} renderers={{ heading: StyledH1 }} />
        <StyledImage src="/assets/home.png"></StyledImage>
        <VerticalColumn span={{ small: 1, medium: 2, big: 6, large: 9, xLarge: 9 }}>
            <ReactMarkDown source={content.home.intro} renderers={{ paragraph: StrongParagraph }} />
            <AccordionContainer>
                <Accordion title={content.home.requirements.title} id="nodig">
                    <ReactMarkDown source={content.home.requirements.body} />
                </Accordion>
            </AccordionContainer>
            <ReactMarkDown source={content.home.subtitle} renderers={{ heading: StyledH2 }} />
            <Article imageSrc="/assets/demo_1.png" title={content.home.demo1.title} href={content.home.demo1.href}>
                <ReactMarkDown source={content.home.demo1.body} />
            </Article>
            <Article imageSrc="/assets/demo_2.png" title={content.home.demo2.title} href="test2">
                <ReactMarkDown source={content.home.demo1.body} />
            </Article>
        </VerticalColumn>
    </PageTemplate>
);

const StrongParagraph: React.FC<IProps> = ({ children }) => <Paragraph strong>{children}</Paragraph>;

const StyledImage = styled.img`
    width: 100%;
    margin-bottom: ${themeSpacing(3)};
`;

const StyledH1 = styled(Heading)`
    margin: ${themeSpacing(5)} 0;

    @media ${breakpoint('min-width', 'laptopM')} {
        margin: ${themeSpacing(8)} 0;
    }
`;

const StyledH2 = styled(Heading)`
    margin-bottom: ${themeSpacing(3)};
`;

const AccordionContainer = styled.div`
    margin-bottom: ${themeSpacing(5)};
`;

export default Homepage;
