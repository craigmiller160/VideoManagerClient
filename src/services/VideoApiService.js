import axios from 'axios';
import { apiRoot } from './serviceConstants';

const api = axios.create({
    baseURL: `${apiRoot}/video-files`
});

const addVideoFile = (videoFile) => {
    return api.post('/', videoFile);
};

const updateVideoFile = (videoFileId, videoFile) => {
    return api.put(`/${videoFileId}`, videoFile);
};

const startVideoScan = () => {
    return api.post('/scanner');
};

const isVideoScanRunning = () => {
    return api.get('/scanner');
};

const playVideo = (videoFile) => {
    return api.post('/play', videoFile);
};

const searchForVideos = (search, page, sortDirection) => {
    return api.post('/search', search, {
        params: {
            page,
            sortDirection
        }
    });
};

export default {
    getVideoFile,
    addVideoFile,
    updateVideoFile,
    startVideoScan,
    isVideoScanRunning,
    searchForVideos,
    playVideo
}