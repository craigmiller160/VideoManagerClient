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
            const videoElem = component.find('video').getDOMNode();
            const playerOptions = {
                autoplay: true,
                controls: true,
                nativeControlsForTouch: true,
                sources: [
                    {
                        src: `/api/video-files/play/${defaultProps.fileId}?videoToken=${defaultProps.videoToken}`,
                        type: 'video/mp4'
                    }
                ]
            };

            expect(videojs).toHaveBeenCalledWith(videoElem, playerOptions);
            expect(dispose).not.toHaveBeenCalled();
        });

        it('disposes of videojs on unmount', () => {
            const { component } = doMount();
            component.unmount();
            expect(dispose).toHaveBeenCalled();
        });
    });
});
