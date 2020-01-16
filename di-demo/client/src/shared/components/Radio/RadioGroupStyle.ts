import styled from "@datapunt/asc-core";

export type Props = {
  name?: string;
};

export default styled.div<Props>`
  position: absolute;
  top: 0;
  left: 0;
`;
