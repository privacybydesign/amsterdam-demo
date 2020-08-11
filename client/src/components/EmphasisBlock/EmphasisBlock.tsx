import styled from 'styled-components';
import { themeColor, themeSpacing, breakpoint } from '@datapunt/asc-ui';

export default styled.div`
    background-color: ${themeColor('tint', 'level2')};
    margin: 0 -${themeSpacing(6)} ${themeSpacing(3)} -${themeSpacing(6)};
    padding: ${themeSpacing(4)} ${themeSpacing(6)};

    @media ${breakpoint('min-width', 'tabletM')} {
        background-color: transparent;
        padding: 0;
        margin: 0;
    }
`;
