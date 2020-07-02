import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Heading, Icon } from '@datapunt/asc-ui';
import { ChevronRight } from '@datapunt/asc-assets';

export interface Props {
    imageSrc: string;
    title: string;
    text: string;
    href: string;
    className: string;
}

const StyledH2 = styled(Heading)`
    margin-bottom: 8px;
`;

const Article: React.FC<Props> = ({ imageSrc, title, children, href, className }) => {
    return (
        <section className={className}>
            <Link to={href}>
                <img src={imageSrc} alt=""></img>
                <StyledH2 $as="h2">{title}</StyledH2>
                <div>{children}</div>
                <Icon>
                    <ChevronRight />
                </Icon>
            </Link>
        </section>
    );
};

export default Article;
