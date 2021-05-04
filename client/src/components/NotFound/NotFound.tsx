import React from 'react';
import ReactMarkDown from 'react-markdown';
import styled from 'styled-components';
import content from '@services/content';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import { SkipLinkEntry } from '@components/SkipLink/SkipLink';
import { breakpoint, themeSpacing } from '@amsterdam/asc-ui';

export interface IProps {}

const NotFound: React.FC<IProps> = () => {
    return (
        <PageTemplate>
            {SkipLinkEntry}
            <StyledText>
                <ReactMarkDown source={content.notFound.title} renderers={{ heading: AscLocal.H1 }} />
                <ReactMarkDown
                    source={content.notFound.content}
                    renderers={{ paragraph: AscLocal.StrongParagraph, link: AscLocal.UnderlinedLink }}
                />
            </StyledText>
            <StyledImages>
                <StyledPicture>
                    <source media="(min-width: 1024px)" srcSet="/assets/404-huizen-desktop.svg" />
                    <img src="/assets/404-huizen-mobiel.svg" alt="" role="presentation" />
                </StyledPicture>
                <StyledFgImage src="/assets/404-dame.svg" role="presentation" alt=""></StyledFgImage>
            </StyledImages>
        </PageTemplate>
    );
};

const StyledText = styled.div`
    @media ${breakpoint('min-width', 'tabletM')} {
        width: 40%;
    }
`;

const StyledImages = styled.div`
    position: relative;
    margin: ${themeSpacing(12)} 0;
    @media ${breakpoint('min-width', 'tabletM')} {
        margin-bottom: ${themeSpacing(36)};
    }
`;

const StyledPicture = styled.picture`
    img {
        width: 100%;
    }
`;

const StyledFgImage = styled.img`
    position: absolute;
    left: 10%;
    top: -10%;
    width: 80%;
    @media ${breakpoint('min-width', 'tabletM')} {
        top: -63%;
        left: 28%;
        width: 60%;
    }
`;

export default NotFound;
