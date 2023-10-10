const calculateUploadedTime = (timeDiff) => {
    const minutesInMillis = 60 * 1000;
    const hoursInMillis = minutesInMillis * 60;
    const daysInMillis = hoursInMillis * 24;
    const monthsInMillis = daysInMillis * 30;
    const yearsInMillis = monthsInMillis * 365;

    if (timeDiff < minutesInMillis) {
        return '1 minute ago';
    } else if (timeDiff < hoursInMillis) {
        const minutes = Math.floor(timeDiff / minutesInMillis);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (timeDiff < daysInMillis) {
        const hours = Math.floor(timeDiff / hoursInMillis);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (timeDiff < monthsInMillis) {
        const days = Math.floor(timeDiff / daysInMillis);
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (timeDiff < yearsInMillis) {
        const months = Math.floor(timeDiff / monthsInMillis);
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
        const years = Math.floor(timeDiff / yearsInMillis);
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
}

export default calculateUploadedTime;