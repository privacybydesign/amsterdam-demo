import React from 'react';
import styled from 'styled-components';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { breakpoint, themeSpacing } from '@datapunt/asc-ui';

const FullWidthContainer = styled(AscLocal.Alert)`
    @media ${breakpoint('max-width', 'tabletM')} {
        display: block;
        margin-left: -${themeSpacing(5)};
        margin-right: -${themeSpacing(5)};
        width: auto;
    }
`;

export default FullWidthContainer;
