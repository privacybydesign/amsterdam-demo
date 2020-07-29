import styled from 'styled-components';
import { themeColor, themeSpacing } from '@datapunt/asc-ui';

export default styled.div`
    background-color: ${themeColor('tint', 'level2')};
    margin-left: -100%;
    padding-left: 100%;
    margin-right: -100%;
    padding-right: 100%;
    margin-bottom: ${themeSpacing(3)};
`;
