import React from 'react';
import styled from 'styled-components';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import content from '@services/content';
import { breakpoint, themeSpacing } from '@datapunt/asc-ui';

interface IProps {}

const DemoNotification: React.FC<IProps> = () => (
    <FullWidthAlert
        color={AscLocal.AlertColor.PRIMARY}
        iconUrl="assets/icon-info.svg"
        iconSize={14}
        heading={content.demoNotification.heading}
        content={content.demoNotification.content}
    />
);

const FullWidthAlert = styled(AscLocal.Alert)`
    @media ${breakpoint('max-width', 'tabletM')} {
        display: block;
        margin-left: -${themeSpacing(5)};
        margin-right: -${themeSpacing(5)};
        width: auto;
    }
`;

export default DemoNotification;
