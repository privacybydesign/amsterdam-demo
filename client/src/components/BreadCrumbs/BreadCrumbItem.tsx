import React from 'react';
import styled from 'styled-components';
import { themeColor } from '@amsterdam/asc-ui';
import { UnderlinedLink } from '@components/LocalAsc/LocalAsc';

export interface IBreadCrumbItemProps {
    className?: string;
    href?: string;
}

export const BreadCrumbItem: React.FC<IBreadCrumbItemProps> = ({ className, href, children }) => {
    const component: JSX.Element = <Item className={className}>{children}</Item>;

    if (href) {
        return <UnderlinedLink to={href}>{component}</UnderlinedLink>;
    }

    return component;
};

const Item = styled.span`
    a {
        color: ${themeColor('tint', 'level5')};
        text-decoration-color: ${themeColor('tint', 'level5')};

        &:hover {
            color: ${themeColor('secondary', 'main')};
            text-decoration: underline;
        }

        *:focus {
            outline: auto;
            outline-color: ${themeColor('support', 'focus')};
            outline-style: solid;
            outline-width: 2px;
            outline-offset: 4px;
        }
    }
`;
