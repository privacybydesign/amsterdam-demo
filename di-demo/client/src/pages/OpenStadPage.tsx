import React, { useState, useEffect } from "react";
import { PageWrapper, IrmaBaseButtonStyle } from "../AppStyle";
import styled, { css } from "@datapunt/asc-core";
import { useParams, useHistory } from "react-router-dom";
import { createIrmaSession } from "../services/di";
import { QRModal, OpeStadInfo } from "../shared/components/Modal/QRModal";
import Radio, { RadioGroup } from "../shared/components/Radio";

const IrmaButtonStyle = styled(IrmaBaseButtonStyle)<{ isActive: boolean }>`
  width: 224px;
  height: 61px;
  position: absolute;
  top: 966px;
  left: 586px;

  ${({ isActive }) =>
    !isActive &&
    css`
      background-color: rgba(255, 255, 255, 0.5);
      &:hover {
        cursor: not-allowed;
      }
    `}
`;

const HomeButtonStyle = styled(IrmaBaseButtonStyle)`
  width: 154px;
  height: 67px;
  position: absolute;
  top: 20px;
  left: 200px;
`;

const OpenStadPage: React.FC<{}> = () => {
  const { theme } = useParams();
  const [voting, setVoting] = useState(false);
  const [voted, setVoted] = useState(false);
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const vote = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setVoting(true);
  };

  const goHome = () => {
    history.push("/");
  };

  useEffect(() => {
    if (voting) {
      (async () => {
        const identifier = await createIrmaSession("email", "irma-qr");
        setVoting(false);
        setVoted(true);
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
          <IrmaButtonStyle
            onClick={vote}
            isActive={selectedOption !== null}
          ></IrmaButtonStyle>
          <RadioGroup name="vote">
            <Radio
              id="brug"
              name="brug"
              value="test-1"
              onChange={() => setSelectedOption("brug")}
              top={845}
              left={222}
            />
            <Radio
              id="kabelbaan"
              name="kabelbaan"
              value="test-2"
              onChange={() => setSelectedOption("kabelbaan")}
              top={845}
              left={596}
            />
          </RadioGroup>
        </>
      )}

      {!voting && <HomeButtonStyle onClick={goHome}></HomeButtonStyle>}
      {voting && selectedOption && (
        <QRModal onClose={() => setVoting(false)} Info={OpeStadInfo} />
      )}

      {voted && (
        <>
          <img
            alt="Openstad"
            src={`/assets/theme/${theme}/openstad-voted.png`}
            height="1119"
            width="1400"
            decoding="async"
          />
        </>
      )}
    </PageWrapper>
  );
};

export default OpenStadPage;
