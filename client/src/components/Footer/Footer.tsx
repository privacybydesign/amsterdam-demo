import React from 'react';
import styled from 'styled-components';
import {
    Column,
    Footer as ASCFooter,
    FooterBottom,
    FooterTop,
    FooterHeading,
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
import { LinkWithChevron } from '@components/LocalAsc/LocalAsc';

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
                <ReactMarkDown source={content.footer.bottom} renderers={{ link: LinkWithChevron }} />
            </StyledRow>
        </StyledFooterBottom>
    </StyledASCFooter>
);

interface IFooterLinkProps {
    href: string;
}

const FooterLink: React.FC<IFooterLinkProps> = ({ href, children }) => (
    <LinkWithChevron darkBackground href={href}>
        {children}
    </LinkWithChevron>
);

const FooterSection = styled.div`
    p,
    li {
        color: ${themeColor('tint', 'level1')};

        blockquote {
            margin: 0 0 0 ${themeSpacing(4)};
        }
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

export default Footer;
