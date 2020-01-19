import React from "react";
import { styles } from "@datapunt/asc-ui";
import styled from "@datapunt/asc-core";

const { InputStyle } = styles;
interface Props {
  rows?: number;
};

const TextArea: React.FC<
  Props & React.HTMLAttributes<HTMLTextAreaElement>
> = props => <textarea {...props} />;

const StyledArea = styled(TextArea)`
  ${InputStyle.componentStyle.rules}
  font-family: inherit;
`;

export default StyledArea;
