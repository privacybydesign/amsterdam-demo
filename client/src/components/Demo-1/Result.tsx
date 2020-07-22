import React from 'react';
import ReactMarkDown from 'react-markdown';
import styled from 'styled-components';
import content from '@services/content';

import { Paragraph, Link, themeSpacing } from '@datapunt/asc-ui';

export interface IProps { }

const StyledH2 = styled.h2`
  margin-top: ${themeSpacing(2)};
  margin-bottom: ${themeSpacing(3)};
`;

const StyledParagraph = styled(Paragraph)`
  margin-top: ${themeSpacing(2)};
  margin-bottom: ${themeSpacing(2)};
`;

const Result: React.FC<IProps> = () => {
  return (
    <>
      <ReactMarkDown source={content.demo1.result.intro1} renderers={{ paragraph: StyledParagraph }} />

      <ReactMarkDown source={content.demo1.result.wat} renderers={{ heading: StyledH2 }} />

      <ReactMarkDown source={content.demo1.result.list} />

      <ReactMarkDown source={content.demo1.result.anders} renderers={{ heading: StyledH2 }} />

      <ReactMarkDown source={content.demo1.result.intro2} renderers={{ paragraph: StyledParagraph }} />

      <ReactMarkDown source={content.demo1.result.list2} />

      <Link href={content.demo1.result.link.href} variant="inline">
        <ReactMarkDown source={content.demo1.result.link.label} />
      </Link>
    </>
  );
};

export default Result;
