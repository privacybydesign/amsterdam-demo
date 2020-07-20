import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Heading, Icon, themeColor, themeSpacing } from '@datapunt/asc-ui';
import { ChevronRight } from '@datapunt/asc-assets';

export interface IProps {
    imageSrc: string;
    title: string;
    text?: string;
    href: string;
    className?: string;
}

const Container = styled.section`
    border-right: 2px solid black;
    padding-bottom: 16px;
    margin-bottom: 28px;

    a {
        color: ${themeColor('tint', 'level7')};
        text-decoration: none;
        display: flex;
        flex-direction: column;

        h2 {
            margin-bottom: ${themeSpacing(5)};
        }

        img {
            width: 100%;
            margin-bottom: ${themeSpacing(4)};
        }

        div {
            margin-bottom: ${themeSpacing(3)};
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

const Article: React.FC<IProps> = ({ imageSrc, title, children, href, className }) => {
    return (
        <Container className={className}>
            <Link to={href}>
                <img src={imageSrc} alt=""></img>
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
