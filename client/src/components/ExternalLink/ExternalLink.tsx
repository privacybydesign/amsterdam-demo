import React from 'react';
import styled from 'styled-components';
import { Icon, themeSpacing } from '@amsterdam/asc-ui';
import { ExternalLink as ExternalLinkIcon } from '@amsterdam/asc-assets';
import { UnderlinedLink } from '@components/LocalAsc/LocalAsc';

interface IExternalLinkProps {
    href: string;
}

const ExternalLink: React.FC<IExternalLinkProps> = props => {
    const { href, children } = props;
    return (
        <UnderlinedLink href={href}>
            {children}
            <StyledIcon size={16}>
                <ExternalLinkIcon />
            </StyledIcon>
        </UnderlinedLink>
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
