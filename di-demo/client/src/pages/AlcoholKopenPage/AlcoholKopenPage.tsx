import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PageContainer, PageWrapper } from '../../AppStyle';
import { createIrmaSession } from '../../services/di';
import { scrollTop } from '../../services/layout';
import { ButtonStyleProps } from '../../shared/components/Button/ButtonStyle';
import Button from '../../shared/components/Button/Button';

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

  & canvas {
    width: 230px !important;
    height: 230px !important;
  }
`;

const QR: React.FC = () => {
  return (
    <QRStyle>
      <div id="irma-qr" />
    </QRStyle>
  );
};

const homeButtonPosition: ButtonStyleProps = {
  width: 1400,
  height: 1068,
  top: 0,
  left: 0,
};

const PHOTO_ATTRIBUTE = 'pbdf.bzkpilot.personalData.photo';

const AlcoholResult: React.FC<{ authorized: boolean; photo: string }> = ({
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
            src={`/assets/theme/${theme}/alcoholkopen-accept.png`}
            height="1068"
            width="1400"
            decoding="async"
          />
        </>
      ) : (
        <img
          alt="Alcohol Kopen"
          src={`/assets/theme/${theme}/alcoholkopen-reject.png`}
          height="1068"
          width="1400"
          decoding="async"
        />
      )}
      <Button onClick={goHome} {...homeButtonPosition} />
    </>
  );
};

const AlcoholKopenPage: React.FC<{}> = () => {
  const { theme } = useParams();
  const [authorizing, setAuthorizing] = useState(true);
  const [authorized, setAutorized] = useState(false);
  const [photo, setPhoto] = useState('');
  // throw {};
  useEffect(() => {
    (async () => {
      const data = await createIrmaSession('age', 'irma-qr');
      console.log('data', data);
      console.log(PHOTO_ATTRIBUTE, data[PHOTO_ATTRIBUTE]);
      const response: [string, any] = Object.entries(data).find(
        ([key]) => key.indexOf('over18') > -1
      ) || ['', ''];
      console.log('found over18', response);
      const success = response.length > 0 && response[1].match(/yes/gi);
      // eslint-disable-next-line no-unused-expressions
      data[PHOTO_ATTRIBUTE] && setPhoto(data[PHOTO_ATTRIBUTE]);
      setAuthorizing(false);
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
              src={`/assets/theme/${theme}/alcoholkopen.png`}
              height="1068"
              width="1400"
              decoding="async"
            />
            <QR />
          </>
        ) : (
          <AlcoholResult authorized={authorized} photo={photo} />
        )}
      </StyledPageWrapper>
    </StyledPageContainer>
  );
};

export default AlcoholKopenPage;
