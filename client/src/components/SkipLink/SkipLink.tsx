import React from 'react';
import styled from 'styled-components';
import { Button, themeSpacing } from '@amsterdam/asc-ui';
import content from '@services/content';

interface IProps {
    className?: string;
}

export const SkipLinkTargetIds = { content: 'skiplink-entry', footer: 'skiplink-footer-entry' };

export const SkipLink: React.FC<IProps> = ({ className }) => {
    return (
        <SkipLinkContainer className={className}>
            <Button variant="textButton" as="a" href={`#${SkipLinkTargetIds.content}`}>
                {content.header.skipLink.content}
            </Button>
            <Button variant="textButton" as="a" href={`#${SkipLinkTargetIds.footer}`}>
                {content.header.skipLink.footer}
            </Button>
        </SkipLinkContainer>
    );
};

const SkipLinkContainer = styled.div`
    width: 400px;

    a {
        display: block;
        left: -5000px;
        padding: ${themeSpacing(3)} ${themeSpacing(4)};
        position: absolute;
        top: -5000px;

        &:focus {
            height: auto;
            left: 0;
            top: 0;
            width: auto;
            text-align: center;
            z-index: 999;
        }
    }
`;

export const SkipLinkEntry = <div id={SkipLinkTargetIds.content} />;
export const SkipLinkFooterEntry = <div id={SkipLinkTargetIds.footer} />;
