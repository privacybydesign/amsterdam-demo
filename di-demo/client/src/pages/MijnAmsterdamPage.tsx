import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { PageWrapper, IrmaBaseButtonStyle } from "../AppStyle";
import { createIrmaSession } from "../services/di";
import AppRoutes from "../AppRoutes";

const IrmaButtonStyle = styled(IrmaBaseButtonStyle)`
  width: 293px;
  height: 99px;
  position: absolute;
  top: 675px;
  left: 375px;
`;

const ScanQRStyle = styled.div`
  width: 500px;
  height: 400px;
  position: absolute;
  top: 300px;
  left: 375px;
  background-color: aqua;
`;

const ScanQR: React.FC = () => {
  return (
    <ScanQRStyle>
      <canvas id="irma-qr"></canvas>
    </ScanQRStyle>
  );
};

const MijnAmsterdamPage: React.FC = () => {
  const { theme } = useParams();
  const [authorizing, setAuthorizing] = useState(false);
  const history = useHistory();

  const login = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setAuthorizing(true);
  };

  useEffect(() => {
    if (authorizing) {
      (async () => {
        const identifier = await createIrmaSession("email", "irma-qr");
        console.log("irma session created", identifier);
        setAuthorizing(false);
        setTimeout(() => history.push(AppRoutes.HOME.path), 300);
      })();
    }
  }, [authorizing]);

  return (
    <PageWrapper>
      <img
        alt="Mijn Amsterdam"
        src={`/assets/theme/${theme}/mijnamsterdam.png`}
        height="1471"
        width="1400"
        decoding="async"
      />
      <IrmaButtonStyle onClick={login}></IrmaButtonStyle>
      {authorizing && <ScanQR />}
    </PageWrapper>
  );
};

export default MijnAmsterdamPage;
