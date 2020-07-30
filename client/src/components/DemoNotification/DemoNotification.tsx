import React from 'react';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import content from '@services/content';

interface IProps {}

const DemoNotification: React.FC<IProps> = () => (
    <AscLocal.BlueAlert heading={content.demoNotification.heading} content={content.demoNotification.content} />
);

export default DemoNotification;
