import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { PageWrapper } from "../AppStyle";
import { createIrmaSession } from "../services/di";
import { QRModal, MijnAmsterdamInfo } from "../shared/components/Modal/QRModal";
import { ButtonStyleProps } from "../shared/components/Button/ButtonStyle";
import Button from "../shared/components/Button/Button";

const loginButtonPosition: ButtonStyleProps = {
  width: 224,
  height: 61,
  top: 744,
  left: 684
};

const homeButtonPosition: ButtonStyleProps = {
  width: 154,
  height: 67,
  top: 20,
  left: 200
};

const backButtonPosition: ButtonStyleProps = {
  width: 354,
  height: 32,
  top: 10,
  left: 855
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
          <Button onClick={login} {...loginButtonPosition}></Button>
        </>
      )}
      {!authorizing && (
        <Button onClick={goHome} {...homeButtonPosition}></Button>
      )}

      {authorizing && (
        <QRModal
          onClose={() => setAuthorizing(false)}
          Info={MijnAmsterdamInfo}
        />
      )}

      {authorized && (
        <>
          <img
            alt="Ingelogd | Mijn Amsterdam"
            src={`/assets/theme/${theme}/mijnamsterdam-authorized.png`}
            height="1068"
            width="1400"
            decoding="async"
          />
          <Button onClick={goBack} {...backButtonPosition}></Button>
        </>
      )}
    </PageWrapper>
  );
};

export default MijnAmsterdamPage;
