import styled from 'styled-components';
import { themeColor, themeSpacing } from '@datapunt/asc-ui';

export default styled.div`
    background-color: ${themeColor('tint', 'level2')};
    padding-left: 220px;
    padding-right: 220px;
    margin: ${themeSpacing(3)} -220px;
`;
