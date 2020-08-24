import 'lightningjs/lightningjs-embed.js';

let usabilla_live;

const initUsabilla = (): void => {
    usabilla_live = window['lightningjs'].require('usabilla_live', '//w.usabilla.com/1400b371716f.js');
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

initUsabilla();
