/* eslint-disable */ // TODO delete this
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';

// TODO update unit tests for this
const VideoPlayer = (props) => {
    const {
        fileId,
        videoToken
    } = props;
    const videoNode = useRef(null);
    const videoPlayer = useRef(null);

    const playerOptions = {
        autoplay: true,
        controls: true,
        nativeControlsForTouch: true,
        techOrder: ['html5'],
        sources: [
            {
                src: `/api/video-files/play/${fileId}?videoToken=${videoToken}`,
                type: 'video/mp4'
            }
        ]
    };

    useEffect(() => {
        videoPlayer.current = videojs(videoNode.current, playerOptions);
        return () => {
            if (videoPlayer.current) {
                videoPlayer.current.dispose();
            }
        };
    });

    return (
        <div data-vjs-player>
            <video ref={ videoNode } className="video-js" />
        </div>
    );
};
VideoPlayer.propTypes = {
    fileId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    videoToken: PropTypes.string.isRequired
};

export default VideoPlayer;
