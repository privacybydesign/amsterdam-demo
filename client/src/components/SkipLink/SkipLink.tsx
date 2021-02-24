import React from 'react';
import styled from 'styled-components';
import { Button, themeColor, themeSpacing } from '@amsterdam/asc-ui';
import content from '@services/content';

interface IProps {
    className?: string;
}

const LinkIds = { content: 'skiplink-entry', footer: 'skiplink-footer-entry' };

export const SkipLink: React.FC<IProps> = ({ className }) => {
    return (
        <SkipLinkContainer className={className}>
            <Button variant="secondary" as="a" href={`#${LinkIds.content}`}>
                {content.header.skipLink.content}
            </Button>
            <Button variant="secondary" as="a" href={`#${LinkIds.footer}`}>
                {content.header.skipLink.footer}
            </Button>
        </SkipLinkContainer>
    );
};

const SkipLinkContainer = styled.div`
    max-width: 400px;

    a {
        width: 0;
        height: 0;
        padding: 0;
        overflow: hidden;

        &:focus {
            width: auto;
            height: auto;
            padding: ${themeSpacing(3)} ${themeSpacing(4)};
            background-color: ${themeColor('secondary', 'main')};
        }
    }
`;

export const SkipLinkEntry = <div id={LinkIds.content} />;
export const SkipLinkFooterEntry = <div id={LinkIds.footer} />;
