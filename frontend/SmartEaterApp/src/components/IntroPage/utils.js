export const getImageUrl = (path) => {
    return new URL(`/src/components/IntroPage/images/${path}`, import.meta.url).href;
};