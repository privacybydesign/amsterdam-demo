import React from "react";
import { PageWrapper, IrmaBaseButtonStyle } from "../AppStyle";
import styled from "styled-components";

const IrmaButtonStyle = styled(IrmaBaseButtonStyle)`
  width: 293px;
  height: 99px;
  position: absolute;
  top: 675px;
  left: 375px;
`;

const MijnAmsterdamPage: React.FC<{}> = () => {
  return (
    <PageWrapper>
      <img
        alt="Mijn Amsterdam"
        src="https://s3.invisionapp-cdn.com/storage.invisionapp.com/screens/files/398337771.png?x-amz-meta-iv=3&amp;response-cache-control=max-age%3D2419200&amp;x-amz-meta-ck=6c5383e9abd1130f655ddd13ea0bf466&amp;AWSAccessKeyId=AKIAJFUMDU3L6GTLUDYA&amp;Expires=1580515200&amp;Signature=A5LMXd3ditV%2BwmYJrojTCW8JPeo%3D"
        height="1471"
        width="1400"
        decoding="async"
      />
      <IrmaButtonStyle onClick={() => alert("irma!")}></IrmaButtonStyle>
    </PageWrapper>
  );
};

export default MijnAmsterdamPage;
