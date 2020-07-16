import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from '@datapunt/asc-assets';

interface IBreadCrumbsProps {
    className?: string;
}

export const BreadCrumbs: React.FC<IBreadCrumbsProps> = ({ children, className }) => {
    const c = children instanceof Array ? children : [children];
    return (
        <div className={className}>
            {c.map(child => (
                <>
                    {child}
                    <ChevronRight />
                </>
            ))}
        </div>
    );
};

interface IItemProps {
    className?: string;
    href?: string;
}

export const Item: React.FC<IItemProps> = ({ className, href, children }) => {
    const component: JSX.Element = <span className={className}>{children}</span>;

    if (href) {
        return <Link to={href}>{component}</Link>;
    }

    return component;
};
