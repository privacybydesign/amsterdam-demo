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
    themeColor
} from '@datapunt/asc-ui';

interface IFooterProps {}

const Footer: React.FC<IFooterProps> = () => (
    <ASCFooter>
        <FooterTop>
            <Row>
                <Column wrap span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}>
                    <FooterSection>
                        <FooterHeading>Contact</FooterHeading>
                        <Paragraph>
                            Hebt u een vraag en kunt u het antwoord niet vinden op deze website? Neem dan contact met
                            ons op.
                        </Paragraph>
                    </FooterSection>
                </Column>
                <Column wrap span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}>
                    <FooterSection title="Some share links" hideAt="tabletM">
                        <FooterHeading>Volg de Gemeente</FooterHeading>
                        <List>
                            <ListItem>
                                <Link darkBackground href="/" variant="with-chevron">
                                    Lorem ipsum dolor sit.
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link darkBackground href="/" variant="with-chevron">
                                    Lorem.
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link darkBackground href="/" variant="with-chevron">
                                    Lorem ipsum.
                                </Link>
                            </ListItem>
                        </List>
                    </FooterSection>
                </Column>
                <Column wrap span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}>
                    <FooterSection title="Questions?" hideAt="tabletM">
                        <FooterHeading>Uit in Amsterdam</FooterHeading>
                        <Paragraph gutterBottom={8}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolor doloremque ea eos
                            facere hic ipsum nobis provident quidem voluptates.
                        </Paragraph>
                    </FooterSection>
                </Column>
            </Row>
        </FooterTop>
        <FooterBottom>
            <Link href="/" linkType="with-chevron">
                Privacy and cookies
            </Link>
            <Link href="/" linkType="with-chevron">
                About this site
            </Link>
        </FooterBottom>
    </ASCFooter>
);

const FooterSection = styled.div`
    p {
        color: ${themeColor('tint', 'level1')};
    }
`;

export default Footer;
