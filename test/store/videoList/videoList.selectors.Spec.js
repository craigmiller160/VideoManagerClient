import { getSelectedVideo, getSelectedVideoWithFilters } from 'store/videoList/videoList.selectors';
import { NEW_VIDEO_FILE_FULL, NEW_VIDEO_FILE_FULL_FILTERS } from '../../exclude/mock/mockData/videoFileData';

const state = {
    videoList: {
        videoList: [
            { fileId: 1, expanded: false },
            { fileId: 2, expanded: false },
            {
                ...NEW_VIDEO_FILE_FULL,
                expanded: true
            }
        ]
    }
};

describe('videoList.selectors', () => {
    it('getSelectedVideo', () => {
        const result = getSelectedVideo(state);
        expect(result).toEqual({
            ...NEW_VIDEO_FILE_FULL,
            expanded: true
        });
    });

    it('getSelectedVideoWithFilters', () => {
        const result = getSelectedVideoWithFilters(state);
        expect(result).toEqual({
            ...NEW_VIDEO_FILE_FULL_FILTERS,
            expanded: true
        })
    });
});