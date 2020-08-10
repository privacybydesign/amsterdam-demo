import React from 'react';
import styled from 'styled-components';
import {
    Column,
    Footer as ASCFooter,
    FooterBottom,
    FooterTop,
    FooterHeading,
    Link,
    List,
    ListItem,
    Paragraph,
    Row,
    themeColor,
    themeSpacing,
    breakpoint
} from '@datapunt/asc-ui';
import ReactMarkDown from 'react-markdown';
import content from '@services/content';

interface IFooterProps {}

const Footer: React.FC<IFooterProps> = () => (
    <StyledASCFooter>
        <FooterTop>
            <StyledRow>
                <Column wrap span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}>
                    <FooterSection>
                        <ReactMarkDown source={content.footer.column1} renderers={FooterMarkDownRenderers} />
                    </FooterSection>
                </Column>
                <Column wrap span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}>
                    <FooterSection hideAt="tabletM">
                        <ReactMarkDown source={content.footer.column2} renderers={FooterMarkDownRenderers} />
                    </FooterSection>
                </Column>
                <Column wrap span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}>
                    <FooterSection hideAt="tabletM">
                        <ReactMarkDown source={content.footer.column3} renderers={FooterMarkDownRenderers} />
                    </FooterSection>
                </Column>
            </StyledRow>
        </FooterTop>
        <StyledFooterBottom>
            <StyledRow halign="flex-start">
                <ReactMarkDown source={content.footer.bottom} renderers={{ link: StyledLink }} />
            </StyledRow>
        </StyledFooterBottom>
    </StyledASCFooter>
);

interface IFooterLinkProps {
    href: string;
}

const FooterLink: React.FC<IFooterLinkProps> = ({ href, children }) => (
    <StyledLink darkBackground href={href}>
        {children}
    </StyledLink>
);

const FooterSection = styled.div`
    p,
    li {
        color: ${themeColor('tint', 'level1')};
    }
`;

const FooterMarkDownRenderers = {
    heading: FooterHeading,
    list: List,
    listItem: ListItem,
    link: FooterLink,
    paragraph: Paragraph
};

const StyledASCFooter = styled(ASCFooter)`
    background-color: ${themeColor('tint', 'level5')};
    width: auto;
    margin: 0 -${themeSpacing(6)};

    @media ${breakpoint('min-width', 'laptop')} {
        margin: 0 -220px;
        padding: 0 220px;
    }
`;

const StyledRow = styled(Row)`
    @media ${breakpoint('min-width', 'laptop')} {
        padding: 0;
    }
`;

const StyledFooterBottom = styled(FooterBottom)`
    margin: 0;

    @media ${breakpoint('min-width', 'laptop')} {
        margin: 0 -230px;
        padding: 0 230px;
    }
`;

const StyledLink = styled(Link).attrs({ variant: 'with-chevron' })`
    margin-right: ${themeSpacing(5)};
    a {
        color: ${themeColor('tint', 'level1')};
    }
`;

export default Footer;
