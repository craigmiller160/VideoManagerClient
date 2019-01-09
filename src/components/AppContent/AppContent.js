import React from 'react';
import VideoNavbar from './VideoNavbar/VideoNavbar';
import VideoListLayout from './VideoListLayout/VideoListLayout';

const AppContent = () => {
    return (
        <div>
            <VideoNavbar />
            <VideoListLayout />
        </div>
    );
};

export default AppContent;