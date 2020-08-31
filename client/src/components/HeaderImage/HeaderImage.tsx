import React from 'react';
import * as AscLocal from '@components/LocalAsc/LocalAsc';

export interface IHeaderImageProps {
    filename: string;
    alt: string;
}

const HeaderImage: React.FC<IHeaderImageProps> = ({ filename, alt }) => (
    <AscLocal.Image
        src={`/assets/${filename}-940.jpg`}
        srcSet={`/assets/${filename}-290.jpg 580w, /assets/${filename}-940.jpg 1880w`}
        alt={alt}
        data-testid="headerImage"
    />
);

export default HeaderImage;
