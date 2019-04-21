import moment from 'moment';

const SERVER_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
const DATE_TIME_FORMAT = 'YYYY-MM-DD hh:mm a';

class VideoDate {

    constructor(date) {
        this._date = moment(date, SERVER_DATE_TIME_FORMAT);
    }

    formatDateTime() {
        return this._date.format(DATE_TIME_FORMAT);
    }

    getDate() {
        return this._date;
    }
}

export default VideoDate;