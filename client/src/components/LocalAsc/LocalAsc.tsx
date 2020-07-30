import React from 'react';
import styled from 'styled-components';

import { Heading, Paragraph as AscParagraph, themeSpacing, Alert, themeColor } from '@datapunt/asc-ui';

interface IProps {}

export const H1 = styled(Heading)`
    margin: ${themeSpacing(4, 0, 6, 0)};
`;

export const H2 = styled.h2`
    margin: ${themeSpacing(3, 0)};
`;

export const Paragraph = styled(AscParagraph)`
    margin-top: ${themeSpacing(2)};
    margin-bottom: ${themeSpacing(2)};
`;

export const UL = styled.ul`
    margin-top: 0;
`;

export const OL = styled.ol`
    margin-top: 0;
`;

export const Image = styled.img`
    width: 100%;
    margin-bottom: ${themeSpacing(3)};
`;

export const DownloadImage = styled.img`
    width: 120px;
    height: 40px;
    margin-right: ${themeSpacing(3)};
`;

export const AccordionContainer = styled.div`
    margin-bottom: ${themeSpacing(5)};
`;

export const AccordionHeading = styled(Heading).attrs({ as: 'h4' })`
    margin: 0;
`;

export const BlueAlert = styled(Alert).attrs({ level: 'attention' })`
    margin-top: ${themeSpacing(4)};
`;

export const RedAlert = styled(Alert).attrs({ level: 'error' })`
    margin-top: ${themeSpacing(4)};
`;

export const GreenAlert = styled(Alert)`
    margin-top: ${themeSpacing(4)};
    background-color: ${themeColor('support', 'valid')};
    * {
        color: ${themeColor('tint', 'level1')};
    }
`;

export const StrongParagraph: React.FC<IProps> = ({ children }) => <Paragraph strong>{children}</Paragraph>;
