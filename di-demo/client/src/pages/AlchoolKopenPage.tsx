import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PageWrapper } from '../AppStyle';
import { createIrmaSession } from '../services/di';
import { scrollTop } from '../services/layout';
import { ButtonStyleProps } from '../shared/components/Button/ButtonStyle';
import Button from '../shared/components/Button/Button';

const StyledPageWrapper = styled(PageWrapper)`
  background-color: black;
`;

const QRStyle = styled.div`
  position: absolute;
  top: 445px;
  left: 587px;
`;

const QR: React.FC = () => {
  return (
    <QRStyle>
      <canvas id="irma-qr" />
    </QRStyle>
  );
};

const homeButtonPosition: ButtonStyleProps = {
  width: 1400,
  height: 1068,
  top: 0,
  left: 0,
};

const PageContainer: React.FC = styled.div`
  background-color: black;
`;

const AlchoolResult: React.FC<{ authorized: boolean }> = ({ authorized }) => {
  const history = useHistory();
  const goHome = () => {
    history.push('/');
    scrollTop();
  };
  const { theme } = useParams();
  return (
    <>
      {authorized ? (
        <img
          alt="Alcohol Kopen"
          src={`/assets/theme/${theme}/alchoolkopen-accept.png`}
          height="1068"
          width="1400"
          decoding="async"
        />
      ) : (
        <img
          alt="Alcohol Kopen"
          src={`/assets/theme/${theme}/alchoolkopen-reject.png`}
          height="1068"
          width="1400"
          decoding="async"
        />
      )}
      <Button onClick={goHome} {...homeButtonPosition} />}
    </>
  );
};

const AlchoolKopenPage: React.FC<{}> = () => {
  const { theme } = useParams();
  const [authorizing, setAuthorizing] = useState(true);
  const [authorized, setAutorized] = useState(true);
  useEffect(() => {
    (async () => {
      await createIrmaSession('email', 'irma-qr');
      setAuthorizing(false);
      const success = true;
      setAutorized(success);
      scrollTop();
    })();
  }, []);

  return (
    <PageContainer>
      <StyledPageWrapper>
        {authorizing ? (
          <>
            <img
              alt="Alcohol Kopen"
              src={`/assets/theme/${theme}/alchoolkopen.png`}
              height="1182"
              width="1400"
              decoding="async"
            />
            <QR />
          </>
        ) : (
          <AlchoolResult authorized={authorized} />
        )}
      </StyledPageWrapper>
    </PageContainer>
  );
};

export default AlchoolKopenPage;
