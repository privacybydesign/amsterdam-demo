import React from 'react';
import styled from '@datapunt/asc-core';
import { Heading, Paragraph } from '@datapunt/asc-ui';

const AttributeInfoStyle = styled.div``;
const AttributeInfo = ({
  title,
  headingType = 'h5',
  children,
  ...otherProps
}) => {
  return (
    <AttributeInfoStyle {...otherProps}>
      <Heading as={headingType}>{title}-</Heading>
      <Paragraph>{children}</Paragraph>
    </AttributeInfoStyle>
  );
};

export default AttributeInfo;
