import React, { useContext } from 'react';
import ReactMarkDown from 'react-markdown';
import styled, { ThemeContext } from 'styled-components';
import content from '@services/content';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import { SkipLinkEntry } from '@components/SkipLink/SkipLink';
import { breakpoint, themeSpacing, Theme } from '@amsterdam/asc-ui';

export interface IProps {}

const NotFound: React.FC<IProps> = () => {
    const themeContext = { theme: useContext(ThemeContext) as Theme.ThemeInterface };
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
                    <source
                        media={`${breakpoint('min-width', 'tabletM')(themeContext)}`}
                        srcSet="/assets/404-huizen-desktop.svg"
                    />
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
    left: 18%;
    top: 2%;
    width: 65%;

    @media ${breakpoint('min-width', 'tabletM')} {
        top: -55%;
        left: 29%;
        width: 58%;
    }
`;

export default NotFound;
