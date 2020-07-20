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
    themeSpacing
} from '@datapunt/asc-ui';
import content from '@services/content.json';

interface IFooterProps {}

const Footer: React.FC<IFooterProps> = () => (
    <ASCFooter>
        <FooterTop>
            <Row>
                <Column wrap span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}>
                    <FooterSection>
                        <FooterHeading>{content.footer.column1.title}</FooterHeading>
                        <Paragraph>{content.footer.column1.body}</Paragraph>
                    </FooterSection>
                </Column>
                <Column wrap span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}>
                    <FooterSection title="Some share links" hideAt="tabletM">
                        <FooterHeading>{content.footer.column2.title}</FooterHeading>
                        <List>
                            {content.footer.column2.body.map((link, index) => (
                                <ListItem key={String(index)}>
                                    <FooterLink darkBackground href={link.url} variant="with-chevron">
                                        {link.label}
                                    </FooterLink>
                                </ListItem>
                            ))}
                        </List>
                    </FooterSection>
                </Column>
                <Column wrap span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}>
                    <FooterSection title="Questions?" hideAt="tabletM">
                        <FooterHeading>{content.footer.column3.title}</FooterHeading>
                        <Paragraph gutterBottom={8}>{content.footer.column3.body}</Paragraph>
                    </FooterSection>
                </Column>
            </Row>
        </FooterTop>
        <StyledFooterBottom>
            <Row halign="flex-start">
                {content.footer.bottom.map((link, index) => (
                    <FooterLink key={String(index)} href={link.url} linkType="with-chevron">
                        {link.label}
                    </FooterLink>
                ))}
            </Row>
        </StyledFooterBottom>
    </ASCFooter>
);

const FooterSection = styled.div`
    p {
        color: ${themeColor('tint', 'level1')};
    }
`;

const StyledFooterBottom = styled(FooterBottom)`
    margin: ${themeSpacing(3)} 0;
`;

const FooterLink = styled(Link)`
    margin-right: ${themeSpacing(5)};
`;

export default Footer;
