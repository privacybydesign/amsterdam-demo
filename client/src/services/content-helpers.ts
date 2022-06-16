import { Content } from './ContentProvider';

export const insertInPlaceholders = (sentence: string, values: string | string[]): string => {
    if (!(values instanceof Array)) {
        return sentence.replace('[]', values as string);
    } else {
        values.forEach((value: string) => {
            sentence = sentence.replace('[]', value);
        });
        return sentence;
    }
};

export const reduceAndTranslateEmptyVars = (emptyVars: string[], content: Content): string => {
    return emptyVars
        .reduce((acc, varToTranslate) => acc + `${(content.translatedIrmaAttributes as any)[varToTranslate]}, `, '')
        .slice(0, -2);
};
