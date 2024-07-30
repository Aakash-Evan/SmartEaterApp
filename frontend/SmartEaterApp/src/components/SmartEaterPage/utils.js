export const getImageUrl = (path) => {
    return new URL(`/src/components/SmartEaterPage/images/${path}`, import.meta.url).href;
};