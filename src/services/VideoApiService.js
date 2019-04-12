import API from './API';

const addVideoFile = (videoFile) => {
    return API.post('/video-files', videoFile);
};

const updateVideoFile = (videoFileId, videoFile) => {
    return API.put(`/video-files/${videoFileId}`, videoFile);
};

const startVideoScan = () => {
    return API.post('/video-files/scanner');
};

const isVideoScanRunning = () => {
    return API.get('/video-files/scanner');
};

const searchForVideos = (searchConfig) => {
    const {
        searchText,
        categoryId,
        starId,
        seriesId,
        page = 0,
        sortDirection = 'ASC'
    } = searchConfig;

    const payload = {
        searchText,
        seriesId,
        starId,
        categoryId
    };

    return API.post('/video-files/search', payload, {
        params: {
            page,
            sortDirection
        }
    });
};

export default {
    addVideoFile,
    updateVideoFile,
    startVideoScan,
    isVideoScanRunning,
    searchForVideos
}