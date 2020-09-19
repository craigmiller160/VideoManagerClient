/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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