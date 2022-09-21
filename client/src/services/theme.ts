import { ascDefaultTheme, Theme } from '@amsterdam/asc-ui';
import { sizes } from '@amsterdam/asc-ui/lib/theme/default/breakpoints';

const theme: Partial<Theme.ThemeInterface> = {
    ...ascDefaultTheme,
    maxGridWidth: 1400,
    layouts: {
        ...ascDefaultTheme.layouts,
        xLarge: {
            columns: 12,
            margin: 220,
            gutter: 20,
            min: sizes.laptopM
        },
        large: {
            columns: 12,
            margin: 32,
            gutter: 20,
            max: sizes.laptopM,
            min: sizes.laptop
        },
        big: {
            columns: 6,
            margin: 24,
            gutter: 20,
            max: sizes.laptop,
            min: 700
        },
        medium: {
            columns: 2,
            margin: 20,
            gutter: 20,
            max: 700,
            min: sizes.mobileL
        },
        small: {
            columns: 1,
            margin: 20,
            max: sizes.mobileL
        }
    },
    typography: { ...ascDefaultTheme.typography, fontFamily: 'Amsterdam Sans, Arial, Helvetica, sans-serif' }
};

// SIZES:
// mobileS: 320,
// mobileM: 375,
// mobileL: 414,
// tabletS: 540,
// tabletM: 700,
// laptop: 1024,
// laptopM: 1200,
// laptopL: 1430,
// desktop: 1920,
// desktopL: 2560

export default theme;
