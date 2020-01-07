import React from "react";
import { PageWrapper } from "../AppStyle";
import { useParams } from "react-router-dom";

const HalloIJburgPage: React.FC<{}> = () => {
  const { theme } = useParams();
  return (
    <PageWrapper>
      <img
        alt="Hallo IJburg"
        src={`/assets/theme/${theme}/halloijburg.png`}
        height="1068"
        width="1400"
        decoding="async"
      />
    </PageWrapper>
  );
};

export default HalloIJburgPage;
