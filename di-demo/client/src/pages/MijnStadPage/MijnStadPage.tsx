import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BackDrop } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';
import { PageWrapper } from '../../AppStyle';
import { createIrmaSession } from '../../services/di';
import { QRModal } from '../../shared/components/Modal/QRModal';
import { ButtonStyleProps } from '../../shared/components/Button/ButtonStyle';
import Button from '../../shared/components/Button/Button';
import MijnStadInfo from './MijnStadInfo';
import { scrollTop } from '../../services/layout';

const loginButtonPosition: ButtonStyleProps = {
  width: 224,
  height: 61,
  top: 744,
  left: 684,
};

const homeButtonPosition: ButtonStyleProps = {
  width: 154,
  height: 67,
  top: 20,
  left: 200,
};

const backButtonPosition: ButtonStyleProps = {
  width: 354,
  height: 32,
  top: 10,
  left: 855,
};

const PageContainer: React.FC = styled.div`
  background-color: transparant;
  position: relative;
  width: 100%;
  height: 100vh;
`;

const StyledPageWrapper = styled(PageWrapper)`
  left: calc((100% - 1400px) / 2);
  position: absolute;
`;

const MijnStadPage: React.FC = () => {
  const { theme } = useParams();
  const [authorizing, setAuthorizing] = useState(false);
  const [authorized, setAutorized] = useState(false);
  const history = useHistory();

  const login = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setAuthorizing(true);
    scrollTop();
  };

  const goHome = () => {
    history.push('/');
    scrollTop();
  };

  const goBack = () => {
    setAutorized(false);
    scrollTop();
  };

  useEffect(() => {
    if (authorizing) {
      (async () => {
        await createIrmaSession('bsn', 'irma-qr');
        setAuthorizing(false);
        setAutorized(true);
        scrollTop();
      })();
    }
  }, [authorizing]);

  return (
    <>
      {authorizing && (
        <QRModal onClose={() => setAuthorizing(false)} Info={MijnStadInfo} />
      )}
      {authorizing && <BackDrop onClick={() => {}} hideOverFlow={false} />}
      <PageContainer>
        <StyledPageWrapper>
          {!authorized && (
            <>
              <img
                alt="Mijn Amsterdam"
                src={`/assets/theme/${theme}/mijnstad.png`}
                width="1400"
                height="1926"
                decoding="async"
              />
              <Button onClick={login} {...loginButtonPosition} />
            </>
          )}
          {!authorizing && <Button onClick={goHome} {...homeButtonPosition} />}

          {authorized && (
            <>
              <img
                alt="Ingelogd | Mijn Amsterdam"
                src={`/assets/theme/${theme}/mijnstad-authorized.png`}
                width="1400"
                height="1400"
                decoding="async"
              />
              <Button onClick={goBack} {...backButtonPosition} />
            </>
          )}
        </StyledPageWrapper>
      </PageContainer>
    </>
  );
};

export default MijnStadPage;
