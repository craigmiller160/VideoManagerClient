import { createSelector } from 'redux-starter-kit';

export const getSelectedVideo = createSelector(
    [ 'videoList.videoList' ],
    (videoList = []) => {
        const matches = videoList.filter(file => file.expanded);
        if (matches.length > 0) {
            return matches[0];
        }
        return {};
    }
);