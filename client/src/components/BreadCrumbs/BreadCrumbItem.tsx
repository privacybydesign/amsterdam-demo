import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { themeColor } from '@datapunt/asc-ui';

export interface IBreadCrumbItemProps {
    className?: string;
    href?: string;
}

export const BreadCrumbItem: React.FC<IBreadCrumbItemProps> = ({ className, href, children }) => {
    const component: JSX.Element = <Item className={className}>{children}</Item>;

    if (href) {
        return <StyledLink to={href}>{component}</StyledLink>;
    }

    return component;
};

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const Item = styled.span`
    color: ${themeColor('tint', 'level5')};

    text-decoration-color: ${themeColor('tint', 'level5')};

    &:hover {
        text-decoration: underline;
    }
`;
