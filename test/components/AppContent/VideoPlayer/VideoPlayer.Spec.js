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
            expect(component.find('video')).toHaveLength(1);
            expect(component.find('source')).toHaveLength(1);
            expect(component.find('source').props()).toEqual({
                src: '/api/video-files/play/1?videoToken=token'
            });
        });
    });
});
