import React from "react";
import { PageWrapper } from "../AppStyle";
import { useParams } from "react-router-dom";

const RommelMeldenPage: React.FC<{}> = () => {
  const { theme } = useParams();
  return (
    <PageWrapper>
      <img
        alt="Rommel Melden"
        src={`/assets/theme/${theme}/rommelmelden.png`}
        height="1350"
        width="1400"
        decoding="async"
      />
    </PageWrapper>
  );
};

export default RommelMeldenPage;
