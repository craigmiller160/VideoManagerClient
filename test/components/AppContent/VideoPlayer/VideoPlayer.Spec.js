import VideoPlayer from 'components/AppContent/VideoPlayer/VideoPlayer';
import mountTestComponent from '../../../exclude/testUtil/mountTestComponent';

const defaultProps = {
    fileId: 1,
    videoToken: 'token'
};

const doMount = mountTestComponent(VideoPlayer, {
    defaultProps
});

describe('VideoPlayer', () => {
    describe('rendering', () => {
        it('renders correctly', () => {
            const { component } = doMount();
            expect(component.find('div#video-player-player').getElement().props['data-vjs-player']).toEqual(true);
            expect(component.find('video')).toHaveLength(1);
        });
    });

    describe('videojs', () => {
        it('can this be tested', () => {
            throw new Error();
        });
    });
});
