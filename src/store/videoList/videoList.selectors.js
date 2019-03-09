import { createSelector } from 'redux-starter-kit';
import { convertFileToFilters } from '../../utils/videoFileConverter';

const findSelectedVideo = (videoList) => {
    const matches = videoList.filter(file => file.expanded);
    if (matches.length > 0) {
        return matches[0];
    }
    return {};
};

export const getSelectedVideo = createSelector(
    [ 'videoList.videoList' ],
    (videoList = []) => findSelectedVideo(videoList)
);

export const getSelectedVideoWithFilters = createSelector(
    [ 'videoList.videoList' ],
    (videoList = []) => {
        const selectedVideo = findSelectedVideo(videoList);
        return convertFileToFilters(selectedVideo);
    }
);