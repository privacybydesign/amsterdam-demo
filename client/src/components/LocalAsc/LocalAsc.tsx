import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import {
    Heading,
    breakpoint,
    Icon,
    Link,
    Paragraph as AscParagraph,
    themeSpacing,
    Alert as AscAlert,
    Header as AscHeader,
    Row as AscRow,
    Column as AscColumn,
    themeColor,
    Theme
} from '@datapunt/asc-ui';

const lineHeight = '24px';

export const H1 = styled(Heading)`
    line-height: ${lineHeight};
    margin: ${themeSpacing(4, 0, 4, 0)};
`;

export const H2 = styled.h2`
    line-height: ${lineHeight};
    margin: ${themeSpacing(3, 0)};
`;

export const Paragraph = styled(AscParagraph)`
    line-height: ${lineHeight};
    margin-top: ${themeSpacing(2)};
    margin-bottom: ${themeSpacing(2)};
`;

export const UL = styled.ul`
    line-height: ${lineHeight};
    list-style: none;
    margin-top: 0;
    padding: 0;

    li {
        margin-bottom: ${themeSpacing(4)};
        margin-left: ${themeSpacing(4)};
        display: flex;

        &:before {
            content: '■';
            font-size: 16px;
            position: relative;
            top: -1px;
            padding-right: ${themeSpacing(4)};
        }
    }
`;

export const OL = styled.ol`
    line-height: ${lineHeight};
    margin-top: 0;

    li p {
        margin-left: ${themeSpacing(4)};
    }
`;

export const Image = styled.img`
    width: 100%;
    margin-bottom: ${themeSpacing(2)};
`;

export const DownloadImage = styled.img`
    width: 120px;
    height: 40px;
    margin-right: ${themeSpacing(3)};
`;

export const LinkWithChevron = styled(Link).attrs({ variant: 'with-chevron' })`
    margin-right: ${themeSpacing(5)};
    a {
        color: ${themeColor('tint', 'level1')};
    }
`;

export const AccordionContainer = styled.div`
    margin: ${themeSpacing(5)} 0;
`;

export const AccordionHeading = styled(Heading).attrs({ as: 'h4' })`
    line-height: ${lineHeight};
    margin: 0;
`;

interface IAlertProps {
    className: string;
    children: React.ReactNode;
    color?: AlertColor;
    icon?: React.ReactNode;
    iconUrl?: string;
    iconSize?: number;
    heading?: string;
    content?: string;
}

export enum AlertColor {
    PRIMARY = 'primary',
    ERROR = 'error',
    SUCCESS = 'success'
}

export const Alert = styled(
    ({ children, icon, iconUrl, iconSize, className, heading, content, color }: IAlertProps) => {
        const themeContext = { theme: useContext(ThemeContext) as Theme.ThemeInterface };
        const iconColor =
            (color === AlertColor.PRIMARY || color === AlertColor.SUCCESS) &&
            themeColor('tint', 'level1')(themeContext);
        return (
            <AscAlert className={className}>
                <div className="alert-content">
                    {(icon || iconUrl) && (
                        <Icon className="icon" size={iconSize} iconUrl={iconUrl} color={iconColor}>
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
    }
)`
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
        align-items: ${({ iconSize }) => (iconSize > 18 ? 'flex-start' : 'baseline')};

        .icon {
            margin-right: ${themeSpacing(4)};
            min-width: ${({ iconSize }) => iconSize}px;
            background-repeat: no-repeat;
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

export const Header = styled(AscHeader).attrs(({ theme }) => ({
    css: {
        zIndex: 10,
        width: 'auto',
        flex: 1,
        '&::after': { backgroundColor: themeColor('tint', 'level2'), marginLeft: -188, marginRight: -188 },
        margin: `0 -${theme.spacing * 5}px`,
        paddingLeft: 32,
        [`@media ${theme.breakpoints.tabletM('min-width')}`]: {
            margin: `0 -${theme.spacing * 6}px`,
            paddingLeft: 38
        },
        [`@media ${theme.breakpoints.laptop('min-width')}`]: {
            margin: `0 -${theme.spacing * 8}px`,
            paddingLeft: 46
        },
        [`@media ${theme.breakpoints.laptopM('min-width')}`]: {
            paddingLeft: 0
        }
    }
}))`
    padding: 0;

    &&& {
        h1:first-child {
            margin-left: -28px;
        }

        @media ${breakpoint('min-width', 'laptopM')} {
            h1:first-child {
                margin-left: 0;
            }
        }

        nav {
            margin: 0;
        }
    }
`;

export const InlineLink = styled(Link).attrs({ variant: 'inline' })``;

export const Row = styled(AscRow)`
    padding: 0;
    margin: ${({ noMargin }) => (noMargin ? '0' : '0 auto')};
`;

export const Column = styled(AscColumn)`
    flex-direction: column;
    justify-content: flex-start;
`;

interface IStrongParagraphProps {}

export const StrongParagraph: React.FC<IStrongParagraphProps> = ({ children }) => (
    <Paragraph strong>{children}</Paragraph>
);
