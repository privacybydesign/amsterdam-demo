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

//
// === Amsterdam ===
//
// const loginButtonPosition: ButtonStyleProps = {
//   width: 224,
//   height: 61,
//   top: 744,
//   left: 684,
// };
//
// const homeButtonPosition: ButtonStyleProps = {
//   width: 154,
//   height: 67,
//   top: 20,
//   left: 200,
// };
//
// const backButtonPosition: ButtonStyleProps = {
//   width: 354,
//   height: 32,
//   top: 10,
//   left: 855,
// };

const loginButtonPosition: ButtonStyleProps = {
  width: 239,
  height: 76,
  left: 59 + 78,
  top: 318 + 157,
};

const homeButtonPosition: ButtonStyleProps = {
  width: 154,
  height: 67,
  top: 20,
  left: 200,
};

const backButtonPosition: ButtonStyleProps = {
  width: 417,
  height: 83,
  top: 0,
  left: 0,
};

const PageContainer: React.FC = styled.div`
  background-color: transparant;
  position: relative;
  width: 100%;
  height: 100vh;
`;

const UserName: React.FC = styled.div`
  position: absolute;
  top: 290px;
  left: 146px;
  font-size: 51px;
  color: #505454;
  font-family: Rambla, sans-serif;
`;

const StyledPageWrapper = styled(PageWrapper)`
  left: calc((100% - 1400px) / 2);
  position: absolute;
`;

const MijnStadPage: React.FC = () => {
  const { theme } = useParams();
  const [authorizing, setAuthorizing] = useState(false);
  const [authorized, setAutorized] = useState(false);
  const [username, setUsername] = useState('');
  const history = useHistory();

  let irmadata = {};

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
        irmadata = await createIrmaSession('bsn', 'irma-qr');
        setUsername(
          `${irmadata['pbdf.bzkpilot.personalData.firstnames']} ${irmadata['pbdf.bzkpilot.personalData.familyname']}`
        );
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
        <link
          href="https://fonts.googleapis.com/css?family=Rambla&display=swap"
          rel="stylesheet"
        />
        <StyledPageWrapper>
          {!authorized && (
            <>
              <img
                alt="Mijn Haarlem"
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
                alt="Ingelogd | Mijn Haarlem"
                src={`/assets/theme/${theme}/mijnstad-authorized.png`}
                width="1400"
                height="1400"
                decoding="async"
              />
              <Button onClick={goBack} {...backButtonPosition} />
              <UserName>Welkom {username}</UserName>
            </>
          )}
        </StyledPageWrapper>
      </PageContainer>
    </>
  );
};

export default MijnStadPage;
