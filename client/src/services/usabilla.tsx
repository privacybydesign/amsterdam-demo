import React, { useEffect } from 'react';
import '@services/lightning.js';
import { Language, useCurrentLanguage } from './ContentProvider';
import { isMobile } from './createIrmaSession';

let usabilla_live: any;

const initUsabilla = (language: Language): void => {
    if (isMobile()) {
        usabilla_live = (window as any)['lightningjs'].require(
            `usabilla_live_${language}`,
            `//w.usabilla.com/${language === Language.NL ? '7eb436c19ab1' : '4c100286aae6'}.js`
        );
    } else {
        usabilla_live = (window as any)['lightningjs'].require(
            `usabilla_live_${language}`,
            `//w.usabilla.com/${language === Language.NL ? '1400b371716f' : '9e345fa8df43'}.js`
        );
    }
};

export const updatePageView = (): void => {
    if (usabilla_live) {
        usabilla_live('virtualPageView');
    }
};

export const startSurvey = (timeout = 2000): void => {
    if (usabilla_live) {
        setTimeout(() => usabilla_live('trigger', 'survey'), timeout);
    }
};

export const UsabillaProvider: React.FC = () => {
    const language = useCurrentLanguage();

    useEffect(() => {
        initUsabilla(language);
    }, [language]);

    return <></>;
};
