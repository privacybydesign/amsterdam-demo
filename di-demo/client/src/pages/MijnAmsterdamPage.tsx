import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import styled from "@datapunt/asc-core";
import { PageWrapper, IrmaBaseButtonStyle } from "../AppStyle";
import { createIrmaSession } from "../services/di";
import { QRModal, MijnAmsterdamInfo } from "../shared/components/Modal/QRModal";

const IrmaButtonStyle = styled(IrmaBaseButtonStyle)`
  width: 224px;
  height: 61px;
  position: absolute;
  top: 744px;
  left: 684px;
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
            height="1926"
            width="1400"
            decoding="async"
          />
          <IrmaButtonStyle onClick={login}></IrmaButtonStyle>
        </>
      )}
      {!authorizing && <HomeButtonStyle onClick={goHome}></HomeButtonStyle>}

      {authorizing && <QRModal onClose={() => setAuthorizing(false)} Info={MijnAmsterdamInfo} />}

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
