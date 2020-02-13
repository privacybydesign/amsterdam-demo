import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PageContainer, PageWrapper } from '../AppStyle';
import { createIrmaSession } from '../services/di';
import { scrollTop } from '../services/layout';
import { ButtonStyleProps } from '../shared/components/Button/ButtonStyle';
import Button from '../shared/components/Button/Button';

const StyledPageContainer = styled(PageContainer)`
  background-color: black;
`;

const StyledPageWrapper = styled(PageWrapper)`
  @media screen and (max-width: 1024px) {
    top: -100px;
  }
`;

const QRStyle = styled.div`
  position: absolute;
  top: 445px;
  left: calc((100% - 230px) / 2);
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
      <Button onClick={goHome} {...homeButtonPosition} />
    </>
  );
};

const AlchoolKopenPage: React.FC<{}> = () => {
  const { theme } = useParams();
  const [authorizing, setAuthorizing] = useState(true);
  const [authorized, setAutorized] = useState(true);
  useEffect(() => {
    (async () => {
      await createIrmaSession('age', 'irma-qr');
      setAuthorizing(false);
      const success = true;
      setAutorized(success);
      scrollTop();
    })();
  }, []);

  return (
    <StyledPageContainer>
      <StyledPageWrapper>
        {authorizing ? (
          <>
            <img
              alt="Alcohol Kopen"
              src={`/assets/theme/${theme}/alchoolkopen.png`}
              height="1068"
              width="1400"
              decoding="async"
            />
            <QR />
          </>
        ) : (
          <AlchoolResult authorized={authorized} />
        )}
      </StyledPageWrapper>
    </StyledPageContainer>
  );
};

export default AlchoolKopenPage;
