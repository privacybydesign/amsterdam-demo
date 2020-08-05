import React from 'react';
import styled from 'styled-components';
import { breakpoint, Icon } from '@datapunt/asc-ui';

import {
    Heading,
    Paragraph as AscParagraph,
    themeSpacing,
    Alert as AscAlert,
    Header as AscHeader,
    themeColor
} from '@datapunt/asc-ui';

export const H1 = styled(Heading)`
    line-height: 1.5em;
    margin: ${themeSpacing(4, 0, 4, 0)};
`;

export const H2 = styled.h2`
    line-height: 1.5em;
    margin: ${themeSpacing(3, 0)};
`;

export const Paragraph = styled(AscParagraph)`
    line-height: 1.5em;
    margin-top: ${themeSpacing(2)};
    margin-bottom: ${themeSpacing(2)};
`;

export const UL = styled.ul`
    line-height: 1.5em;
    margin-top: 0;
    line-height: 22px;
`;

export const OL = styled.ol`
    line-height: 1.5em;
    margin-top: 0;
    line-height: 22px;
`;

export const Image = styled.img`
    width: 100%;
    margin-bottom: ${themeSpacing(3)};
`;

export const DownloadImage = styled.img`
    width: 120px;
    height: 40px;
    margin-right: ${themeSpacing(3)};
`;

export const AccordionContainer = styled.div`
    margin-bottom: ${themeSpacing(5)};
`;

export const AccordionHeading = styled(Heading).attrs({ as: 'h4' })`
    line-height: 1.5em;
    margin: 0;
`;

interface IAlertProps {
    className: string;
    children: React.ReactNode;
    color?: AlertColor;
    icon?: React.ReactNode;
    iconUrl?: string;
    heading?: string;
    content?: string;
}

export enum AlertColor {
    PRIMARY = 'primary',
    ERROR = 'error',
    SUCCESS = 'success'
}

export const Alert = styled(({ children, icon, iconUrl, className, heading, content, color }: IAlertProps) => {
    const iconColor = (color === AlertColor.PRIMARY || color === AlertColor.SUCCESS) && themeColor('tint', 'level1');
    return (
        <AscAlert className={className}>
            <div className="alert-content">
                {(icon || iconUrl) && (
                    <Icon className="icon" size={14} iconUrl={iconUrl} color={iconColor}>
                        {icon}
                    </Icon>
                )}
                <div>
                    {heading || content ? (
                        <>
                            {heading && <Heading forwardedAs="h3">{heading}</Heading>}
                            <Paragraph>{content}</Paragraph>
                        </>
                    ) : (
                        children
                    )}
                </div>
            </div>
        </AscAlert>
    );
})`
    margin-bottom: ${themeSpacing(4)};

    background-color: ${({ color }) => {
        switch (color) {
            default:
            case AlertColor.PRIMARY:
                return themeColor('primary', 'main');
            case AlertColor.ERROR:
                return themeColor('support', 'focus');
            case AlertColor.SUCCESS:
                return '#0c8836';
        }
    }};

    .alert-content {
        display: flex;
        align-items: baseline;

        .icon {
            margin-right: ${themeSpacing(4)};
        }

        * {
            color: ${({ color }) => {
                switch (color) {
                    default:
                    case AlertColor.PRIMARY:
                    case AlertColor.SUCCESS:
                        return themeColor('tint', 'level1');
                    case AlertColor.ERROR:
                        return themeColor('tint', 'level7');
                }
            }};
        }
    }
`;

export const Header = styled(AscHeader).attrs({
    css: {
        zIndex: 10,
        '&::after': { backgroundColor: themeColor('tint', 'level2'), marginLeft: -220, marginRight: -220 }
    }
})`
    &&& {
        padding: 0;

        @media ${breakpoint('min-width', 'laptopM')} {
            h1:first-child {
                margin-left: -30px;
            }
        }

        nav {
            margin: 0;
        }
    }
`;

interface IStrongParagraphProps {}

export const StrongParagraph: React.FC<IStrongParagraphProps> = ({ children }) => (
    <Paragraph strong>{children}</Paragraph>
);
