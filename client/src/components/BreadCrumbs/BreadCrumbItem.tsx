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
        return <Link to={href}>{component}</Link>;
    }

    return component;
};

const Item = styled.span`
    a {
        color: ${themeColor('tint', 'level5')};
        text-decoration: none;
        text-decoration-color: ${themeColor('tint', 'level5')};
    }

    &:hover {
        text-decoration: underline;
    }
`;
