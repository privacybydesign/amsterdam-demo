import React from 'react';
import styled from 'styled-components';

import { Heading, Paragraph as AscParagraph, themeSpacing } from '@datapunt/asc-ui';

interface IProps { }

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

export const AccordionContainer = styled.div`
  margin-bottom: ${themeSpacing(5)};
`;


export const StrongParagraph: React.FC<IProps> = ({ children }) => <Paragraph strong>{children}</Paragraph>;
