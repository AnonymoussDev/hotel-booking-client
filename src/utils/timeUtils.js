const moment = require('moment');

export function formatDateISO(date) {
    return date.toISOString().split('T')[0];
}
export function formatDateView(date) {
    return date.split('-').reverse().join('/');
}

export function formatDateRating(date) {
    return moment(date, 'YYYY-MM-DD HH:mm:ss').format('DD MMM YYYY');
}

export const getCurrentDateRating = () => {
    return moment().format('DD MMM YYYY');
};
