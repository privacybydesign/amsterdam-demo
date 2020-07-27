import React from 'react';
import { Link, Icon } from '@datapunt/asc-ui';
import { ExternalLink as ExternalLinkIcon } from '@datapunt/asc-assets';

interface IExternalLinkProps {
    href: string;
}

const ExternalLink: React.FC<IExternalLinkProps> = props => {
    const { href, children } = props;

    return (
        <Link
            href={href}
            variant="inline"
            icon={
                <Icon size={16}>
                    <ExternalLinkIcon />
                </Icon>
            }
        >
            {children}
        </Link>
    );
};

export default ExternalLink;
