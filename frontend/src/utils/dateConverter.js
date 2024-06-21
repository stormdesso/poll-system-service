export const getDate = (isoDate) => {
    const dateObject = new Date(isoDate);
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();
    return `${year}-${month}-${day}`
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
};

export const toISOString = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString();
}