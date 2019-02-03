import { getSelectedVideo } from 'store/videoList/videoList.selectors';

const state = {
    videoList: {
        videoList: [
            { fileId: 1, expanded: false },
            { fileId: 2, expanded: true }
        ]
    }
};

describe('videoList.selectors', () => {
    it('gets selected video', () => {
        const result = getSelectedVideo(state);
        expect(result).toEqual({ fileId: 2, expanded: true });
    });
});