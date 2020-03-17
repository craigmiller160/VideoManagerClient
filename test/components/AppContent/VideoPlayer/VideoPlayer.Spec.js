import VideoPlayer from 'components/AppContent/VideoPlayer/VideoPlayer';
import enzymeCreator from 'react-enzyme-utils';

const defaultProps = {
    fileId: 1,
    videoToken: 'token'
};

const mounter = enzymeCreator({
    component: VideoPlayer,
    props: defaultProps
});

describe('VideoPlayer', () => {
    describe('rendering', () => {
        it('renders correctly', () => {
            const { component } = mounter();
            expect(component.find('video')).toHaveLength(1);
            expect(component.find('source')).toHaveLength(1);
            expect(component.find('source').props()).toEqual({
                src: '/api/video-files/play/1?videoToken=token'
            });
        });
    });
});
