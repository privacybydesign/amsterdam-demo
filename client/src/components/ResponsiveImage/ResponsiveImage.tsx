import React from 'react';
import styled from 'styled-components';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { themeSpacing } from '@amsterdam/asc-ui';

export interface IHeaderImageProps {
    filename: string;
    alt: string;
}

const ResponsiveImage: React.FC<IHeaderImageProps> = ({ filename, alt }) => (
    <Container>
        <figure>
            <StyledImage
                src={`/assets/${filename}-940.jpg`}
                srcSet={`/assets/${filename}-290.jpg 580w, /assets/${filename}-940.jpg 1880w`}
                alt={alt}
                data-testid="headerImage"
            />
            <figcaption>{alt}</figcaption>
        </figure>
    </Container>
);

const Container = styled.div`
    figure {
        margin: 0;
    }

    figcaption {
        display: none;
    }
`;

const StyledImage = styled(AscLocal.Image)`
    flex: 0 0 auto;
    margin-bottom: ${themeSpacing(4)};
`;

export default ResponsiveImage;
