import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';

let player = null; // TODO I don't like this approach

// TODO update unit tests for this
const VideoPlayer = (props) => {
    const {
        playerOptions
    } = props;
    const videoNode = useRef(null);

    useEffect(() => {
        player = videojs(videoNode.current, playerOptions);
        return () => {
            if (player) {
                player.dispose();
                player = null;
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
    playerOptions: PropTypes.shape({
        autoplay: PropTypes.bool,
        controls: PropTypes.bool,
        sources: PropTypes.arrayOf(PropTypes.shape({
            src: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired
        })).isRequired
    }).isRequired
};

export default VideoPlayer;
