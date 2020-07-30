import styled from 'styled-components';
import { themeColor, themeSpacing } from '@datapunt/asc-ui';

export default styled.div`
    background-color: ${themeColor('tint', 'level2')};
    margin-left: -220px;
    padding-left: 220px;
    margin-right: -220px;
    padding-right: 220px;
    margin-bottom: ${themeSpacing(3)};
`;
