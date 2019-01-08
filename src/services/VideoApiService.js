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

const playVideo = (videoFile) => {
    return API.post('/video-files/play', videoFile);
};

const searchForVideos = (search, page, sortDirection) => {
    return API.post('/video-files/search', search, {
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
    searchForVideos,
    playVideo
}