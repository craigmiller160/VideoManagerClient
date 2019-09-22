import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = (props) => {
    const {
        fileId
    } = props;
    const videoUri = `/api/video-files/play/${fileId}`;
    return (
        <video controls autoPlay="autoPlay">
            <source src={ videoUri } />
        </video>
    );
};
VideoPlayer.propTypes = {
    fileId: PropTypes.number
};

export default VideoPlayer;
