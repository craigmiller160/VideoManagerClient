import moment from 'moment';

const SERVER_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
const DATE_TIME_FORMAT = 'YYYY-MM-DD hh:mm a';

class VideoDate {

    #date;

    constructor(date) {
        this.#date = moment(date, SERVER_DATE_TIME_FORMAT);
    }

    formatDateTime() {
        return this.#date.format(DATE_TIME_FORMAT);
    }

    getDate() {
        return this.#date;
    }
}

export default VideoDate;