import { ascDefaultTheme, Theme } from '@datapunt/asc-ui';
import { sizes } from '@datapunt/asc-ui/lib/theme/default/breakpoints';

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
            min: sizes.tabletM
        },
        medium: {
            columns: 2,
            margin: 20,
            gutter: 20,
            max: sizes.tabletM,
            min: sizes.mobileL
        },
        small: {
            columns: 1,
            margin: 20,
            max: sizes.mobileL
        }
    }
};

export default theme;
