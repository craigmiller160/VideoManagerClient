import VideoDate from 'model/VideoDate';

describe('VideoDate', () => {
    it('test moment instance', () => {
        const dateString = '2019-01-01 01:00';
        const date = new VideoDate('2019-01-01T01:00:00');
        expect(date.getDate().format('YYYY-MM-DD HH:mm')).toEqual(dateString);
    });

    it('test date time format', () => {
        const dateString = '2019-01-01 01:00 am';
        const date = new VideoDate('2019-01-01T01:00:00');
        expect(date.formatDateTime()).toEqual(dateString);
    });
});