import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PageContainer, PageWrapper } from '../../AppStyle';
import { createIrmaSession } from '../../services/di';
import { scrollTop } from '../../services/layout';
import { ButtonStyleProps } from '../../shared/components/Button/ButtonStyle';
import Button from '../../shared/components/Button/Button';
import { DEFAULT_PHOTO } from './constants';

const StyledPageContainer = styled(PageContainer)`
  background-color: black;
  overflow: hidden;
`;

const StyledPageWrapper = styled(PageWrapper)`
  @media screen and (max-width: 1024px) {
    top: -100px;
  }
`;

const QRStyle = styled.div`
  position: absolute;
  top: 400px;
  left: calc((100% - 230px) / 2);
`;

const QR: React.FC = () => {
  return (
    <QRStyle>
      <canvas id="irma-qr" />
    </QRStyle>
  );
};

const PhotoStyle = styled.div`
  position: absolute;
  top: 269px;
  left: calc((100% - 560px) / 2);
  width: 210px;
  height: 260px;

  & > img {
    width: 100%;
  }
`;

const homeButtonPosition: ButtonStyleProps = {
  width: 1400,
  height: 1068,
  top: 0,
  left: 0,
};

const PHOTO_ATTRIBUTE = 'irma-demo.digidproef.personalData.photo';

const AlchoolResult: React.FC<{ authorized: boolean; photo: string }> = ({
  authorized,
  photo,
}) => {
  const history = useHistory();
  const goHome = () => {
    history.push('/');
    scrollTop();
  };
  const { theme } = useParams();
  return (
    <>
      {authorized ? (
        <>
          <img
            alt="Alcohol Kopen"
            src={`/assets/theme/${theme}/alchoolkopen-accept.png`}
            height="1068"
            width="1400"
            decoding="async"
          />
          <PhotoStyle>
            <img
              alt="Persoons foto"
              src={`data:image/png;base64,${photo}`}
              width="100%"
              decoding="async"
            />
          </PhotoStyle>
        </>
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
  const [authorized, setAutorized] = useState(false);
  const [photo, setPhoto] = useState(DEFAULT_PHOTO);

  useEffect(() => {
    (async () => {
      const data = await createIrmaSession('age', 'irma-qr');
      // eslint-disable-next-line no-unused-expressions
      data[PHOTO_ATTRIBUTE] && setPhoto(data[PHOTO_ATTRIBUTE]);
      setAuthorizing(false);
      const response =
        Object.entries(data).find(([key]) => key.indexOf('over18') > -1) || [];
      const success = response.length > 0 && response[1].match(/yes/gi);
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
          <AlchoolResult authorized={authorized} photo={photo} />
        )}
      </StyledPageWrapper>
    </StyledPageContainer>
  );
};

export default AlchoolKopenPage;
