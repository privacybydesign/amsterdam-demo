import React from 'react';
import styled from 'styled-components';
import { Link, Icon, themeSpacing } from '@datapunt/asc-ui';
import { ExternalLink as ExternalLinkIcon } from '@datapunt/asc-assets';

interface IExternalLinkProps {
    href: string;
}

const ExternalLink: React.FC<IExternalLinkProps> = props => {
    const { href, children } = props;
    return (
        <Link href={href}>
            {children}
            <StyledIcon size={16}>
                <ExternalLinkIcon />
            </StyledIcon>
        </Link>
    );
};

const StyledIcon = styled(Icon)`
    && {
        width: 32px;
        margin-top: 2px;
        margin-left: ${themeSpacing(1)};
    }
`;

export default ExternalLink;
