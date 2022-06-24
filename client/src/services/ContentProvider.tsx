import React, { useContext } from 'react';
import { safeSessionStorage } from 'safe-storage';
import contentNL from './content-nl';
import contentEN from './content-en';

const STORAGE_KEY = 'irma-demo-lang';

export enum Language {
    NL = 'nl',
    EN = 'en'
}

export type Content = typeof contentNL;

type ContentContextType = {
    language: Language;
    content: Content;
    switchLanguage: (language: Language) => void;
};

const sessionLanguage = safeSessionStorage.getItem(STORAGE_KEY) ?? Language.NL;

const defaultContentContext = {
    language: sessionLanguage,
    content: sessionLanguage === Language.EN ? contentEN : contentNL,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    switchLanguage: (l: Language) => {}
};

export const ContentContext = React.createContext<ContentContextType>(defaultContentContext);

export const ContentProvider: React.FC = ({ children }) => {
    const sessionLanguage = safeSessionStorage.getItem(STORAGE_KEY) ?? Language.NL;

    return (
        <ContentContext.Provider
            value={{
                language: sessionLanguage,
                content: sessionLanguage === Language.NL ? contentNL : contentEN,
                switchLanguage: l => {
                    safeSessionStorage.setItem(STORAGE_KEY, l);
                    // eslint-disable-next-line no-self-assign
                    window.location = window.location;
                }
            }}
        >
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = (): Content => {
    const { content } = useContext(ContentContext);

    return content;
};

export const useSwichLanguage = (): ((language: Language) => void) => {
    const { switchLanguage } = useContext(ContentContext);

    return switchLanguage;
};

export const useCurrentLanguage = (): Language => {
    const { language } = useContext(ContentContext);

    return language;
};
