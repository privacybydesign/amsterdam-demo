import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { themeColor, themeSpacing } from '@datapunt/asc-ui';
import content from '@services/content';

interface IProps {}

const WhyIRMA: React.FC<IProps> = () => {
    return (
        <Container>
            <ReactMarkdown
                source={content.home.sidebar.box}
                renderers={{
                    heading: AscLocal.H2,
                    paragraph: AscLocal.StrongParagraph,
                    link: AscLocal.LinkWithChevron,
                    image: IRMALogo
                }}
            />
        </Container>
    );
};

const Container = styled.div`
    background-color: ${themeColor('tint', 'level2')};
    padding: ${themeSpacing(4)};
`;

const IRMALogo = styled.img`
    width: 82px;
    margin: ${themeSpacing(1)} 0 ${themeSpacing(4)} ${themeSpacing(6)};
`;

export default WhyIRMA;
