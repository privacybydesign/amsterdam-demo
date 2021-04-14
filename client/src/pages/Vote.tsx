import styled, { css } from 'styled-components';
import createIrmaVoteSession, { reduceIrmaResult } from '@services/createIrmaVoteSession';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IReduceIrmaResult, IQueryObj } from '../services/createIrmaVoteSession';
import { isMobile as mobile } from '@services/createIrmaSession';

export const HOLDER_ELEMENT_ID = 'irma-web-form';

const VotePage: React.FC = () => {
    const searchParams = useLocation().search;
    const isMobile: boolean = mobile();
    const [sessionResult, setSessionResult] = useState<IReduceIrmaResult>();
    const [isExpanded, setIsExpanded] = useState(false);
    const [showLogo, setShowLogo] = useState(true);
    const [queryObj, setQueryObj] = useState<IQueryObj>({});

    useEffect(() => {
        const queryObj: IQueryObj = {};
        const query = new URLSearchParams(searchParams);
        if (searchParams) {
            query.forEach((value: string, key: string) => {
                queryObj[key] = value;
            });
        }
        setQueryObj(queryObj);
    }, [searchParams]);

    useEffect(() => {
        const callBackMapping = {
            ShowingQRCode: () => {
                setShowLogo(true);
            },
            ShowingQRCodeInstead: () => {
                setShowLogo(true);
            },
            rest: () => {
                setShowLogo(false);
            }
        };
        const { redirectUrl, ...rest } = queryObj;
        const fn = async () => {
            const response = await createIrmaVoteSession(rest, callBackMapping);
            if (response) {
                setSessionResult(reduceIrmaResult(response));
            }
        };
        fn();
    }, [queryObj]);

    useEffect(() => {
        const { redirectUrl } = queryObj;
        if (sessionResult) {
            setTimeout(() => {
                window.location.href = redirectUrl + '?result=' + encodeURIComponent(JSON.stringify(sessionResult));
            }, 1000);
        }
    }, [queryObj, sessionResult]);

    return (
        <>
            {!useLocation().search ? (
                <p>No query parameters</p>
            ) : (
                <StyledContainer>
                    <div className="header"></div>
                    <StyledMainContainer isMobile={isMobile} showLogo={showLogo}>
                        <StyledLogoImg isMobile={isMobile} src="/assets/vote/images/irma-logo-mono.svg" alt="logo" />
                        <article className="card with-help">
                            <section className="title">
                                <h1>Stemmen</h1>
                            </section>
                            <section className="content">
                                <div className="content__qr-code">
                                    <div id="irma-web-form"></div>
                                </div>
                                <div className="content__info">
                                    <p>Stem op de door u gekozen projecten met uw stempas.</p>
                                    <div id="irma-web-form-mobile"></div>
                                </div>
                            </section>
                            <StyledNeedHelp isOpen={isExpanded}>
                                {/* eslint-disable jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events*/}
                                <div
                                    className="need-help__title"
                                    role="button"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                >
                                    <span>
                                        Hulp nodig bij QR-code scannen?
                                        <svg
                                            className="need-help__arrow"
                                            fill="#767676"
                                            viewBox="0 0 32 32"
                                            focusable="false"
                                        >
                                            <path
                                                d="M16 25.757l-16-16 2.91-2.9L16 19.937l13.09-13.08 2.91 2.9z"
                                                fillRule="evenodd"
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                                <div className="need-help__content">
                                    <ol>
                                        <li>Ga op uw telefoon naar de Irma app</li>
                                        <li>Tik rechtsonder op de QR-scanner. </li>
                                        <li>Richt uw telefoon camera op de QR-code op het computerscherm.</li>
                                    </ol>
                                </div>
                            </StyledNeedHelp>
                            <section className="try-again">
                                <h1>Verkiezing niet gevonden</h1>
                                <p>Weet u zeker dat de verkiezing bestaat?</p>
                                <button>Probeer opnieuw</button>
                            </section>
                        </article>
                    </StyledMainContainer>
                    <StyledFooter>
                        <p>Powered by SIDN</p>
                    </StyledFooter>
                </StyledContainer>
            )}
        </>
    );
};

interface IIsMobileProps {
    isMobile: boolean;
}

interface IStyledMainProps extends IIsMobileProps {
    showLogo: boolean;
}

const StyledContainer = styled.div`
    display: grid;
    grid-template-rows: 60px 1fr 60px;
    height: 100vh;
    background-color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;
    @media (min-width: 768px) {
        grid-template-rows: 80px 1fr 80px;
    }
`;

const StyledMainContainer = styled.div<IStyledMainProps>`
    position: relative;
    width: 100%;
    background: center / cover no-repeat url('/assets/vote/images/abstract.svg');
    display: flex;
    align-items: center;
    justify-content: center;
    .card {
        display: grid;
        grid-gap: 32px;
        max-width: 730px;
        background-color: white;
        padding: 55px;
        border-radius: 70px;
        overflow: hidden;
        &.with-help {
            padding: 55px 55px 0 55px;
        }
        #irma-web-form-mobile {
            display: none;
        }
        .try-again {
            display: none;
        }
        &.election-not-found {
            section:not(.try-again) {
                display: none;
            }
            .try-again {
                display: block;
            }
        }
        .content {
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-gap: 16px;
        }
        .final__paragraph p {
            margin: 0;
        }
        .linkBtn {
            padding: 14px;
            border-radius: 8px;
            background-color: #004699;
            color: white;
            font-weight: bold;
            text-decoration: none;
        }
    }

    h1,
    h2 {
        margin: 0;
    }

    p {
        font-size: 16px;
        line-height: 25px;
    }

    #irma-web-form {
        width: 230px;
        min-width: auto;
        max-width: none;
        height: 230px;
        min-height: auto;
        & .irma-web-header {
            display: none;
        }
        & .irma-web-content {
            position: relative;
            margin: 0;
            justify-content: start;
            & .irma-web-centered {
                position: relative;
                width: 100%;
                height: 100%;
            }
        }
        .irma-web-checkmark-animation {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            border: 1px solid #2bc194;
            border-radius: 17px;
            &:before {
                content: '';
                position: absolute;
                width: 70%;
                height: 70%;
                background: center / cover no-repeat url('/assets/vote/images/check-circle-1.svg');
                border: none;
                transform: none;
                animation: none;
            }
            & + p {
                display: none;
            }
        }
    }

    ${props =>
        props.showLogo &&
        css`
            #irma-web-form .irma-web-centered:after {
                content: url('/assets/vote/images/irma-logo.svg');
                position: absolute;
                width: 65px;
                height: 65px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        `}

    ${props =>
        props.isMobile &&
        css`
        width: calc(100% - 30px);
        padding-right: 15px;
        padding-left: 15px;
        background-image: url('/assets/vote/images/mobile.svg');
        h1 {
            font-size: 30px;
        }
        h2 {
            font-size: 18px;
        }
        .card {
            border-radius: 30px;
            padding: 25px;
        }
        .need-help {
            display: none;
        }
        .content {
            grid-template-columns: auto;
            &__qr-code {
                display: none;
            }
        }
        .content__info {
            #irma-web-form-mobile {
                display: block;
                width: auto;
                height: auto;
                min-height: auto;
                & .irma-web-header {
                    display: none;
                }
                & .irma-web-content {
                    margin: 0;
                    justify-content: flex-start;
                }
                & .irma-web-button-link {
                    position: relative;
                    display: flex;
                    align-items: center;
                    color: white;
                    text-decoration: none;
                    &:before {
                        content: url('/assets/vote/images/irma-logo.svg');
                        position: absolute;
                        width: 30px;
                        height: 27px;
                        left: 14px;
                    }
                    & + p {
                        display: none;
                    }
                    button {
                        padding: 14px 14px 14px 50px;
                        border: none;
                        border-radius: 8px;
                        box-shadow: none;
                    }
                }
            }
        `};
`;

const StyledNeedHelp = styled.section<{ isOpen: boolean }>`
    transition: 0.3s ease;
    max-height: 68px;
    color: #767676;
    & .need-help__content {
        visibility: hidden;
        padding: 25px 0;
        ol {
            margin: 0;
            list-style: none;
            counter-reset: li;
            li {
                counter-increment: li;
                &:not(:last-child) {
                    padding-bottom: 12px;
                }
                &::before {
                    margin-right: 10px;
                    padding: 4px 8px;
                    border-radius: 50%;
                    content: counter(li);
                    background-color: #eeecec;
                }
                &:first-child {
                    &:before {
                        padding: 4px 9px;
                    }
                }
            }
        }
    }
    & .need-help__title {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 -55px;
        padding: 25px 0;
        background: #eeecec;
        span {
            cursor: pointer;
        }
        svg {
            width: 16px;
            height: 16px;
            margin-left: 4px;
            vertical-align: bottom;
            transition: 0.3s ease;
            .is-open & {
                transform: rotate(180deg);
            }
        }
    }

    ${props =>
        props.isOpen &&
        css`
            max-height: 200px;
            .need-help__content {
                visibility: visible;
            }
            .need-help__arrow {
                transform: rotate(180deg);
            }
        `}
`;

const StyledLogoImg = styled.img<IIsMobileProps>`
    position: absolute;
    left: 50%;
    top: -66px;
    transform: translateX(-50%);
    width: 160px;
    height: 132px;
    ${props =>
        props.isMobile &&
        css`
            width: 140px;
            height: 100px;
            top: -50px;
        `};
`;

const StyledFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #004c92;
`;

export default VotePage;
