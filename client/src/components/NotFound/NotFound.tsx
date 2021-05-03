import React from 'react';
import ReactMarkDown from 'react-markdown';
import styled from 'styled-components';
import content from '@services/content';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import ContentBlock from '@components/ContentBlock/ContentBlock';
import { SkipLinkEntry } from '@components/SkipLink/SkipLink';
import userAgent from '@services/userAgent';
import { breakpoint, themeSpacing } from '@amsterdam/asc-ui';

export interface IProps {}

const BgImgSrc =
    userAgent === 'iOS' || userAgent === 'Android' ? '/assets/404-huizen-mobiel.svg' : '/assets/404-huizen-desktop.svg';

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
                <StyledBgImage src={BgImgSrc} role="presentation" alt=""></StyledBgImage>
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

const StyledBgImage = styled.img`
    width: 100%;
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
