import moment from 'moment';

export const calculateTotalCost = (startDate, endDate, rentCost) => {
    const start = moment(startDate);
    const end = moment(endDate);
    const days = end.diff(start, 'days');
    return days * rentCost;
}

export const parseDate = (date) => {
    const momentDate = moment(date);
    return momentDate.format('DD.MM.YYYY');
}