import { isMobile } from './createIrmaSession';

// This function preloads the responsive images that are used in the demo
// srcArray contains only the filename without the -940 or -290 postfixes. e.g. 'ouder-dan'
const preloadDemoImages = (srcArray: string[]): void => {
    const fullSrcArray = srcArray.map(src => {
        if (!src.length) return null;
        if (isMobile()) {
            return `/assets/${src}-290.jpg`;
        } else {
            return `/assets/${src}-940.jpg`;
        }
    });

    fullSrcArray.map(src => {
        if (src) {
            const image = new Image();
            image.src = src;
            return image;
        }
    });
};

export default preloadDemoImages;
