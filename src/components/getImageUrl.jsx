const getImageUrl = (catItem, cat, order) => {
    if (!catItem || catItem === '') {
        return '';
    }

    const imageArray = JSON.parse(catItem);
    if (!imageArray || !Array.isArray(imageArray) || imageArray.length <= order) {
        return '';
    }

    return baseUrl + `dist/uploads/${cat}/` + imageArray[order];
};

const baseUrl = 'https://lafagency.com/meditation/';

export default getImageUrl;