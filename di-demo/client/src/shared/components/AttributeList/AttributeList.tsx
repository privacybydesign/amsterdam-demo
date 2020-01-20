import React from 'react';
import styled from "@datapunt/asc-core";

const AttributeListStyle = styled.ul`
  font-size: 16px;
  padding-left: 30px;

  li {
    line-height: 30px;
  }
}
`;

const AttributeList = ({ values }) => {
  return (
    <AttributeListStyle>
      {values.map(item => (
        <li key={item}>{item}</li>
      ))}
    </AttributeListStyle>
  );
};

export default AttributeList