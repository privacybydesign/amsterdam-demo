import React from "react";
import { PageWrapper } from "../AppStyle";
import { useParams } from "react-router-dom";

const AlchoolKopenPage: React.FC<{}> = () => {
  const { theme } = useParams();
  return (
    <PageWrapper>
      <img
        alt="Alcohol Kopen"
        src={`/assets/theme/${theme}/alchoolkopen.png`}
        height="1182"
        width="1400"
        decoding="async"
      />
    </PageWrapper>
  );
};

export default AlchoolKopenPage;
