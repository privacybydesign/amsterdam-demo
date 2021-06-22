import React, { useContext, useCallback, useState, useLayoutEffect, ReactElement } from 'react';
import styled, { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';
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
    TextArea as AscTextArea,
    ErrorMessage as AscErrorMessage,
    themeColor,
    Theme,
    Button
} from '@amsterdam/asc-ui';
import { TextAreaProps as AscTextAreaProps } from '@amsterdam/asc-ui/lib/components/TextArea';

const lineHeight = '1.5em';

export const H1 = styled(Heading)`
    word-break: break-word;
    line-height: ${lineHeight};
    margin: ${themeSpacing(4, 0, 4, 0)};
`;

export const H2 = styled.h2`
    line-height: ${lineHeight};
    margin: ${themeSpacing(3, 0)};
`;

export const H3 = styled.h3`
    line-height: ${lineHeight};
    margin: ${themeSpacing(2, 0)};
`;

export const H4 = styled.h4`
    line-height: ${lineHeight};
    margin: ${themeSpacing(2, 0, 0, 0)};
`;

export const Paragraph = styled(AscParagraph)`
    line-height: ${lineHeight};
    margin-top: ${themeSpacing(2)};
    margin-bottom: ${themeSpacing(2)};
`;

export const UnderlinedLink = styled(Link)`
    text-decoration: underline;
    padding: 0;
`;

const TintedContainer = styled.div`
    padding: ${themeSpacing(4)} ${themeSpacing(6)};
    margin-bottom: ${themeSpacing(4)};
`;

export const TintedContainerLevel2 = styled(TintedContainer)`
    background-color: ${themeColor('tint', `level3`)};
`;

export const TintedContainerLevel3 = styled(TintedContainer)`
    background-color: ${themeColor('tint', `level3`)};
    padding: ${themeSpacing(4)} ${themeSpacing(6)};
    margin-bottom: ${themeSpacing(4)};
`;

export const UL = styled.ul`
    line-height: ${lineHeight};
    list-style: none;
    margin-top: ${themeSpacing(4)};
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

export const DL = styled.dl`
    margin: ${themeSpacing(0, 0, 2, 0)};
`;

export const DT = styled.dt`
    line-height: ${lineHeight};
    vertical-align: top;
    margin: 0;

    @media ${breakpoint('min-width', 'tabletM')} {
        display: inline-block;
        width: 40%;
    }
`;
export const DD = styled.dd`
    line-height: ${lineHeight};
    vertical-align: top;
    margin: 0;
    font-weight: bold;

    @media ${breakpoint('min-width', 'tabletM')} {
        display: inline-block;
        width: 60%;
    }
`;

export const DefinitionList = {
    definitionlist: DL,
    descriptionlist: DL,
    descriptionterm: DT,
    descriptiondetails: DD
};

export const Fieldset = styled.fieldset`
    padding: 0;
    border: 0;
    line-height: ${lineHeight};
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

export const LinkWithChevron = styled(Link).attrs({ inList: true })`
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

export const QRCodeButton: React.FC<any> = styled(Button).attrs(props => ({
    'data-testid': (props as any).dataTestId || 'qrCodeButton',
    variant: 'secondary',
    iconSize: 24,
    iconLeft: <IrmaLogoIcon />
}))`
    margin: ${themeSpacing(0, 6, 6, 0)};
`;

interface IAlertProps {
    className?: string;
    children?: React.ReactNode;
    color?: AlertColor;
    icon?: React.ReactNode;
    iconUrl?: string;
    iconSize?: number;
    heading?: string;
    content?: string;
    contentExtended?: string;
    dataTestId?: string;
}

export enum AlertColor {
    PRIMARY = 'primary',
    ERROR = 'error',
    SUCCESS = 'success'
}

type IExternalLinkRendererProps = {
    href: string;
};

export const ExternalLinkRenderer: React.FC<IExternalLinkRendererProps> = (props): ReactElement => {
    return (
        <a href={props.href} target="_blank" rel="noreferrer">
            {props.children}
        </a>
    );
};

export const Alert = styled(
    ({ children, icon, iconUrl, iconSize, className, heading, content, color, dataTestId }: IAlertProps) => {
        const themeContext = { theme: useContext(ThemeContext) as Theme.ThemeInterface };
        const iconColor =
            color === AlertColor.PRIMARY || color === AlertColor.SUCCESS
                ? themeColor('tint', 'level1')(themeContext)
                : '';

        // Override ASC tab index after rendering to remove focusability
        useLayoutEffect(() => {
            const alertEl = document.getElementById(`alert-${className}`);
            if (alertEl) {
                alertEl.tabIndex = -1;
            }
        }, [className]);

        return (
            <AscAlert className={className} data-testid={dataTestId} id={`alert-${className}`}>
                <div className="alert-content">
                    {(icon || iconUrl) && (
                        <Icon className="icon" size={iconSize} iconUrl={iconUrl} color={iconColor}>
                            {icon}
                        </Icon>
                    )}
                    <div>
                        {heading || content ? (
                            <>
                                {heading && <Heading forwardedAs="h2">{heading}</Heading>}
                                <ReactMarkdown source={content} renderers={{ paragraph: Paragraph }} />
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
    pointer-events: none;

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
        align-items: ${({ iconSize }) => (iconSize && iconSize > 18 ? 'flex-start' : 'baseline')};

        h2 {
            font-size: 18px;
        }

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

export const CroppedAlert = styled(Alert)`
    padding: ${themeSpacing(2)};

    h2,
    p {
        margin-bottom: 0;
    }

    p {
        margin-top: ${themeSpacing(1)};
    }
`;

export const Header = styled(AscHeader).attrs(({ theme }) => ({
    css: {
        zIndex: 10,
        width: 'auto',
        '&::after': {
            backgroundColor: themeColor('tint', 'level2'),
            marginLeft: -188,
            marginRight: -188,
            marginTop: 0
        },
        paddingLeft: 32,
        [`@media ${theme.breakpoints.laptopM('max-width')}`]: {
            marginLeft: '-32px',
            marginRight: '-32px',
            minHeight: 68
        },
        [`@media ${theme.breakpoints.tabletM('min-width')}`]: {
            marginLeft: '-38px',
            marginRight: '-38px',
            paddingLeft: 38
        },
        [`@media ${theme.breakpoints.laptop('min-width')}`]: {
            marginLeft: '-46px',
            marginRight: '-46px',
            paddingLeft: 46
        },
        [`@media ${theme.breakpoints.laptopM('min-width')}`]: {
            paddingLeft: 0
        }
    }
}))`
    &&& {
        flex-wrap: nowrap;
        padding: 0;

        @media ${breakpoint('max-width', 'laptopM')} {
            height: 68px;
            h1:first-child a {
                width: 110px;
                height: auto;
                margin-top: ${themeSpacing(2)};
            }
        }

        @media ${breakpoint('min-width', 'laptopM')} {
            h1:first-child {
                margin-left: 16px;
                margin-top: 0;
            }

            && {
                nav {
                    margin-top: 9px;
                    font-size: 1.8rem;
                }
            }
        }

        nav {
            margin: 4px 0 0 0;
            justify-content: flex-start;
            font-weight: 500;
            font-size: 1.2rem;
        }
    }
`;

export const InlineLink = styled(UnderlinedLink).attrs({ inList: true })``;

export const Row = styled(AscRow)`
    padding: 0;
    margin: ${({ hasMargin }) => (hasMargin ? '0' : '0 auto')};
`;

export const Column = styled(AscColumn)`
    flex-direction: column;
    justify-content: flex-start;
`;

interface IStrongParagraphProps {}

export const StrongParagraph: React.FC<IStrongParagraphProps> = ({ children }) => (
    <Paragraph strong>{children}</Paragraph>
);

interface ITextAreaProps {
    areaHeight?: number;
    showCounter?: boolean;
}

export const TextArea = styled(({ showCounter, className, ...props }: AscTextAreaProps & ITextAreaProps) => {
    const [counter, setCounter] = useState<number>(0);
    const onChange = useCallback(event => {
        setCounter(event.target.value.length);
    }, []);

    return (
        <div className={className}>
            <AscTextArea {...props} className="textarea" onChange={onChange} />
            {showCounter && props.maxLength && (
                <div className="counter">
                    {counter}/{props.maxLength} tekens
                </div>
            )}
        </div>
    );
})`
    .textarea {
        height: ${({ areaHeight }) => areaHeight || '150'}px;
    }
    .counter {
        color: ${themeColor('tint', 'level5')};
    }
`;

export const IrmaLogoIcon = styled.img.attrs({ src: '/assets/irma_logo.svg', alt: '', role: 'presentation' })`
    width: 24px;
`;

export const ErrorMessage = styled(AscErrorMessage)`
margin - top: ${themeSpacing(2)};
`;
