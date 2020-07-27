import React from 'react';
import ReactMarkDown from 'react-markdown';
import styled from 'styled-components';
import content from '@services/content';

import { Paragraph, Link, themeSpacing } from '@datapunt/asc-ui';

export interface IProps { }

const Result: React.FC<IProps> = () => {
  return (
    <>
      <ReactMarkDown source={content.demo1.result.intro1} renderers={{ paragraph: StyledParagraph, list: StyledUL }} />

      <ReactMarkDown source={content.demo1.result.wat} renderers={{ heading: StyledH2 }} />

      <ReactMarkDown source={content.demo1.result.list} renderers={{ list: StyledUL }} />

      <ReactMarkDown source={content.demo1.result.anders} renderers={{ heading: StyledH2 }} />

      <ReactMarkDown source={content.demo1.result.intro2} renderers={{ paragraph: StyledParagraph, list: StyledUL }} />

      <ReactMarkDown source={content.demo1.result.list2} renderers={{ list: StyledUL }} />

      <Link href={content.demo1.result.link.href} variant="inline">
        <ReactMarkDown source={content.demo1.result.link.label} />
      </Link>
    </>
  );
};

const StyledH2 = styled.h2`
  margin-top: ${themeSpacing(2)};
  margin-bottom: ${themeSpacing(3)};
`;

const StyledParagraph = styled(Paragraph)`
  margin-top: ${themeSpacing(2)};
  margin-bottom: ${themeSpacing(2)};
`;

const StyledUL = styled.ul`
  margin-top: 0;
`;

export default Result;
