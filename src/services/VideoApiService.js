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

const getVideoFile = (fileId) => {
    return API.get(`/video-files/${fileId}`);
};

const recordNewVideoPlay = (fileId) => {
    return API.get(`/video-files/record-play/${fileId}`);
};

const searchForVideos = (searchConfig) => {
    return API.post('/video-files/search', searchConfig);
};

export default {
    addVideoFile,
    updateVideoFile,
    startVideoScan,
    isVideoScanRunning,
    searchForVideos,
    getVideoFile,
    recordNewVideoPlay
}