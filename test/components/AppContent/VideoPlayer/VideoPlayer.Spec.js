import VideoPlayer from 'components/AppContent/VideoPlayer/VideoPlayer';
import mountTestComponent from '../../../exclude/testUtil/mountTestComponent';

jest.mock('video.js', () => jest.fn());
import videojs from 'video.js'; // eslint-disable-line import/first

const dispose = jest.fn();
videojs.mockImplementation(() => ({ dispose }));

const defaultProps = {
    fileId: 1,
    videoToken: 'token'
};

const doMount = mountTestComponent(VideoPlayer, {
    defaultProps
});

describe('VideoPlayer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('rendering', () => {
        it('renders correctly', () => {
            const { component } = doMount();
            expect(component.find('div#video-player-player').getElement().props['data-vjs-player']).toEqual(true);
            expect(component.find('video')).toHaveLength(1);
        });
    });

    describe('videojs', () => {
        it('configures videojs on mount', () => {
            const { component } = doMount();
            expect(videojs).toHaveBeenCalled();
        });

        it('disposes of videojs on unmount', () => {
            throw new Error();
        });
    });
});
