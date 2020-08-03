import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Heading, Icon, themeColor, themeSpacing } from '@datapunt/asc-ui';
import { ChevronRight } from '@datapunt/asc-assets';
import HeaderImage from '@components/HeaderImage/HeaderImage';

export interface IProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    text?: string;
    href: string;
    className?: string;
}

const Container = styled.section`
    background-color: ${themeColor('tint', 'level2')};
    border-right: 2px solid black;
    padding-bottom: ${themeSpacing(4)};
    margin-bottom: ${themeSpacing(7)};;

    &:hover {
        border-color: ${themeColor('secondary', 'main')};

        h2 {
            color: ${themeColor('secondary', 'main')};
            text-decoration: underline;
        }

        svg {
            fill: ${themeColor('secondary', 'main')};
        }
    }

    a {
        color: ${themeColor('tint', 'level7')};
        text-decoration: none;
        display: flex;
        flex-direction: column;

        h2 {
            padding-left: ${themeSpacing(4)};
        }

        img {
            width: 100%;
            margin-bottom: ${themeSpacing(2)};
        }

        div {
            padding: 0 ${themeSpacing(6)} ${themeSpacing(3)} ${themeSpacing(4)};
        }

        span {
            margin-right: ${themeSpacing(3)};
            align-self: flex-end;
        }
    }
`;

const StyledH2 = styled(Heading)`
    margin-bottom: 8px;
`;

const Article: React.FC<IProps> = ({ imageSrc, imageAlt, title, children, href, className }) => {
    return (
        <Container className={className}>
            <Link to={href}>
                <HeaderImage filename={imageSrc} alt={imageAlt} />
                <StyledH2 $as="h2">{title}</StyledH2>
                <div>{children}</div>
                <Icon>
                    <ChevronRight />
                </Icon>
            </Link>
        </Container>
    );
};

export default Article;
