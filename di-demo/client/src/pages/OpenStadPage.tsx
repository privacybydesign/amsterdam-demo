import React, { useState, useEffect } from "react";
import { PageWrapper, IrmaBaseButtonStyle } from "../AppStyle";
import styled from "@datapunt/asc-core";
import { useParams, useHistory } from "react-router-dom";
import { createIrmaSession } from "../services/di";
import { QRModal, OpeStadInfo } from "../shared/components/Modal/QRModal";
import Radio, { RadioGroup } from "@datapunt/asc-ui/lib/components/Radio/Radio";

const IrmaButtonStyle = styled(IrmaBaseButtonStyle)`
  width: 224px;
  height: 61px;
  position: absolute;
  top: 966px;
  left: 586px;
`;

const HomeButtonStyle = styled(IrmaBaseButtonStyle)`
  width: 154px;
  height: 67px;
  position: absolute;
  top: 20px;
  left: 200px;
`;

const StyledRadioGroup = styled(RadioGroup)`
  position: absolute;
  top: 200px;
  left: 200px;
  height: 100px;
  width: 100%;
`;

const OpenStadPage: React.FC<{}> = () => {
  const { theme } = useParams();
  const [authorizing, setAuthorizing] = useState(false);
  const [authorized, setAutorized] = useState(false);
  const history = useHistory();

  const vote = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setAuthorizing(true);
  };

  const goHome = () => {
    history.push("/");
  };

  useEffect(() => {
    if (authorizing) {
      (async () => {
        console.log("voting changed: ", authorizing);
        const identifier = await createIrmaSession("email", "irma-qr");
        console.log("irma session created", identifier);
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
            alt="Open Stad"
            src={`/assets/theme/${theme}/openstad.png`}
            height="1458"
            width="1400"
            decoding="async"
          />
          <IrmaButtonStyle onClick={vote}></IrmaButtonStyle>
          {/* <StyledRadioGroup horizontal={true} >
            <Radio id="1" label={"test1"} name="name" value="test-1" />
            <Radio id="2" label={"test2"} name="name2" value="test-2" />
          </StyledRadioGroup> */}
        </>
      )}

      {!authorizing && <HomeButtonStyle onClick={goHome}></HomeButtonStyle>}
      {authorizing && (
        <QRModal onClose={() => setAuthorizing(false)} Info={OpeStadInfo} />
      )}
    </PageWrapper>
  );
};

export default OpenStadPage;
