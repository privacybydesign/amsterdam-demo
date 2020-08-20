import 'lightningjs/lightningjs-embed.js';

let usabilla_live_feedback;
let usabilla_live_survey;

export const initUsabilla = async (): Promise<void> => {
    // usabilla_live_feedback = await window['lightningjs'].require('usabilla_live', '//w.usabilla.com/1400b371716f.js');
    // usabilla_live_survey = await window['lightningjs'].require('usabilla_live', '//w.usabilla.com/f87e3e0dea79.js');
    // toggleUsabillaFeedback(true);
    // toggleSurvey(false);
};

/*
export const toggleUsabillaFeedback = (flag: boolean): void => {
    if (!usabilla_live_feedback) return;
    // usabilla_live_feedback(flag ? 'show' : 'hide');
    usabilla_live_survey('click');
};

export const toggleSurvey = (flag: boolean): void => {
    if (!usabilla_live_survey) return;
    usabilla_live_survey(flag ? 'show' : 'hide');
};*/
