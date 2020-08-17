import React from 'react';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import content from '@services/content';
import FullWidthContainer from '@components/FullWidthContainer/FullWidthContainer'

interface IProps { }

const DemoNotification: React.FC<IProps> = () => (
    <FullWidthContainer
        color={AscLocal.AlertColor.PRIMARY}
        iconUrl="assets/icon-info.svg"
        iconSize={14}
        heading={content.demoNotification.heading}
        content={content.demoNotification.content}
    />
);

export default DemoNotification;
