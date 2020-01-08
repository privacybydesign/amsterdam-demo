import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { PageWrapper, IrmaBaseButtonStyle } from "../AppStyle";

const IrmaButtonStyle = styled(IrmaBaseButtonStyle)`
  width: 293px;
  height: 99px;
  position: absolute;
  top: 675px;
  left: 375px;
`;



const MijnAmsterdamPage: React.FC<{}> = () => {
  const { theme } = useParams();
  return (
    <PageWrapper>
      <img
        alt="Mijn Amsterdam"
        src={`/assets/theme/${theme}/mijnamsterdam.png`}
        height="1471"
        width="1400"
        decoding="async"
      />
      <IrmaButtonStyle onClick={() => alert("irma!")}></IrmaButtonStyle>
    </PageWrapper>
  );
};

export default MijnAmsterdamPage;
