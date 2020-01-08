import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { PageWrapper, IrmaBaseButtonStyle } from "../AppStyle";
import { createIrmaSession } from "../services/di";

const IrmaButtonStyle = styled(IrmaBaseButtonStyle)`
  width: 293px;
  height: 99px;
  position: absolute;
  top: 675px;
  left: 375px;
`;

const HomeButtonStyle = styled(IrmaBaseButtonStyle)`
  width: 154px;
  height: 67px;
  position: absolute;
  top: 20px;
  left: 200px;
`;

const BackButtonStyle = styled(IrmaBaseButtonStyle)`
  width: 354px;
  height: 32px;
  position: absolute;
  top: 10px;
  left: 855px;
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
  const [authorized, setAutorized] = useState(false);
  const history = useHistory();

  const login = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setAuthorizing(true);
  };

  const goHome = () => {
    history.push("/");
  };

  const goBack = () => {
    setAutorized(false);
  };

  useEffect(() => {
    if (authorizing) {
      (async () => {
        const identifier = await createIrmaSession("email", "irma-qr");
        console.log("irma session created", identifier);
        setAuthorizing(false);
        setAutorized(true);
      })();
    }
  }, [authorizing]);

  return (
    <PageWrapper>
      {!authorized && (
        <>
          <img
            alt="Mijn Amsterdam"
            src={`/assets/theme/${theme}/mijnamsterdam.png`}
            height="1471"
            width="1400"
            decoding="async"
          />
          <IrmaButtonStyle onClick={login}></IrmaButtonStyle>
        </>
      )}
      {!authorizing && <HomeButtonStyle onClick={goHome}></HomeButtonStyle>}
      {authorizing && <ScanQR />}
      {authorized && (
        <>
          <img
            alt="Ingelogd | Mijn Amsterdam"
            src={`/assets/theme/${theme}/mijnamsterdam-authorized.png`}
            height="1068"
            width="1400"
            decoding="async"
          />
          <BackButtonStyle onClick={goBack}></BackButtonStyle>
        </>
      )}
    </PageWrapper>
  );
};

export default MijnAmsterdamPage;
