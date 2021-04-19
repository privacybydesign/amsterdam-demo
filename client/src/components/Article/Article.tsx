import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon, themeColor, themeSpacing } from '@amsterdam/asc-ui';
import { ChevronRight } from '@amsterdam/asc-assets';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import ResponsiveImage from '@components/ResponsiveImage/ResponsiveImage';

export interface IProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    text?: string;
    href: string;
    className?: string;
}

const Container = styled.section`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${themeColor('tint', 'level2')};
    border-right: 2px solid black;
    padding-bottom: ${themeSpacing(4)};

    &:hover {
        border-color: ${themeColor('secondary', 'main')};

        h3 {
            color: ${themeColor('secondary', 'main')};
        }

        svg {
            fill: ${themeColor('secondary', 'main')};
        }
    }
`;

const LinkBox = styled(Link).attrs({ variant: 'blank' })`
    color: ${themeColor('tint', 'level7')};
    display: flex;
    cursor: pointer;
    margin-bottom: ${themeSpacing(7)};
    text-decoration: none;

    s {
        color: pink;
    }

    img {
        margin-bottom: ${themeSpacing(2)};
    }

    .text {
        padding: 0 ${themeSpacing(6)} ${themeSpacing(3)} ${themeSpacing(4)};
    }

    span {
        margin-right: ${themeSpacing(3)};
        align-self: flex-end;
    }

    &:focus section {
        outline: auto;
        outline-color: ${themeColor('support', 'focus')};
        outline-style: solid;
        outline-width: 2px;
    }

    &:hover h3 {
        color: ${themeColor('secondary', 'main')};
    }
`;

const Article: React.FC<IProps> = ({ imageSrc, imageAlt, title, children, href, className }) => {
    return (
        <LinkBox to={href}>
            <Container className={className}>
                <ResponsiveImage filename={imageSrc} alt={imageAlt} />
                <div className="text">
                    <AscLocal.H3>{title}</AscLocal.H3>
                    {children}
                </div>
                <Icon>
                    <ChevronRight />
                </Icon>
            </Container>
        </LinkBox>
    );
};

export default Article;
