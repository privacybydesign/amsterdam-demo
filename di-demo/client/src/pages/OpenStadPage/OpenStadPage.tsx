import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { BackDrop } from '@datapunt/asc-ui';
import styled from 'styled-components';
import { PageWrapper } from '../../AppStyle';
import { createIrmaSession } from '../../services/di';
import { QRModal } from '../../shared/components/Modal/QRModal';
import Radio, { RadioGroup } from '../../shared/components/RadioOS';
import { ButtonStyleProps } from '../../shared/components/Button/ButtonStyle';
import Button from '../../shared/components/Button/Button';
import OpenStadInfo from './OpenStadInfo';
import { scrollTop } from '../../services/layout';

const loginButtonPosition: ButtonStyleProps = {
  width: 224,
  height: 61,
  top: 966,
  left: 586,
};

const homeButtonPosition: ButtonStyleProps = {
  width: 154,
  height: 67,
  top: 20,
  left: 200,
};

const OpenStadPage: React.FC<{}> = () => {
  const { theme } = useParams();
  const [voting, setVoting] = useState(false);
  const [voted, setVoted] = useState(false);
  const [votedConfirmed, setVotedConfirmed] = useState(false);
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const vote = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setVoting(true);
    scrollTop();
  };

  const goHome = () => {
    history.push('/');
    scrollTop();
  };

  useEffect(() => {
    if (voting) {
      (async () => {
        await createIrmaSession('postcode', 'irma-qr');
        setVotedConfirmed(true);
        setTimeout(() => {
          setVoting(false);
          setVoted(true);
          scrollTop();
        }, 1000);
      })();
    }
  }, [voting]);

  return (
    <PageWrapper>
      {!voted && (
        <>
          <img
            alt="Open Stad"
            src={`/assets/theme/${theme}/openstad.png`}
            height="1458"
            width="1400"
            decoding="async"
          />
          <Button
            onClick={vote}
            inactive={selectedOption == null}
            {...loginButtonPosition}
          />
          <RadioGroup name="vote">
            <Radio
              id="brug"
              name="brug"
              value="test-1"
              onChange={() => setSelectedOption('brug')}
              top={845}
              left={222}
            />
            <Radio
              id="kabelbaan"
              name="kabelbaan"
              value="test-2"
              onChange={() => setSelectedOption('kabelbaan')}
              top={845}
              left={596}
            />
          </RadioGroup>
        </>
      )}
      {!voting && <Button onClick={goHome} {...homeButtonPosition} />}
      {voting &&
        selectedOption &&
        (votedConfirmed ? (
          <VotedConfirmed />
        ) : (
          <QRModal onClose={() => setVoting(false)} Info={OpenStadInfo} />
        ))}

      {voting && selectedOption && (
        <BackDrop onClick={() => {}} hideOverFlow={false} />
      )}
      {voted && <Voted />}
    </PageWrapper>
  );
};

const VotedConfirmedStyle = styled.div`
  display: block;
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0);
  z-index: 100;
`;

const VotedConfirmed = () => {
  const { theme } = useParams();
  return (
    <VotedConfirmedStyle>
      <img
        alt="Openstad"
        src={`/assets/theme/${theme}/openstad-voted-confirm.png`}
        height="400"
        width="500"
        decoding="async"
      />
    </VotedConfirmedStyle>
  );
};

const Voted = () => {
  const { theme } = useParams();
  return (
    <img
      alt="Openstad"
      src={`/assets/theme/${theme}/openstad-voted.png`}
      height="1119"
      width="1400"
      decoding="async"
    />
  );
};

export default OpenStadPage;
