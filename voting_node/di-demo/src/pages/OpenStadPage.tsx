import React from "react";
import { PageWrapper, IrmaBaseButtonStyle } from "../AppStyle";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const IrmaButtonStyle = styled(IrmaBaseButtonStyle)`
  width: 293px;
  height: 99px;
  position: absolute;
  top: 1846px;
  left: 425px;
`;

const OpenStadPage: React.FC<{}> = () => {
  const { theme } = useParams();
  return (
    <PageWrapper>
      <img
        alt="Open Stad"
        src={`/assets/theme/${theme}/openstad.png`}
        height="2410"
        width="1400"
        decoding="async"
      />
      <IrmaButtonStyle onClick={() => alert("irma!")}></IrmaButtonStyle>
    </PageWrapper>
  );
};

export default OpenStadPage;
