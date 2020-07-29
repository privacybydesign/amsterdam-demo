import React from 'react';
import * as AscLocal from '@components/LocalAsc/LocalAsc';

interface IProps {
    filename: string;
    alt: string;
}

const HeaderImage: React.FC<IProps> = ({ filename, alt }) => (
    <AscLocal.Image
        src={`/assets/${filename}-940.jpg`}
        srcSet={`/assets/${filename}-290.jpg 580w, /assets/${filename}-940.jpg 1880w`}
        alt={alt}
    />
);

export default HeaderImage;
