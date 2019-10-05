import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = (props) => {
    const {
        fileId,
        videoToken
    } = props;
    const videoUri = `/api/video-files/play/${fileId}?videoToken=${videoToken}`;
    return (
        <video controls autoPlay="autoPlay">
            <source src={ videoUri } />
        </video>
    );
};
VideoPlayer.propTypes = {
    fileId: PropTypes.number.isRequired,
    videoToken: PropTypes.string.isRequired
};

export default VideoPlayer;
