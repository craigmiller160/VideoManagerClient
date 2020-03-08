/* eslint-disable */ // TODO delete this
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import videojs from 'videojs';

let player = null; // TODO I don't like this approach

// TODO update unit tests for this
const VideoPlayer = (props) => {
    const {
        playerOptions
    } = props;
    const videoNode = useRef(null);

    useEffect(() => {
        player = videojs(videoNode, playerOptions, () => console.log('Player is ready')); // TODO remove console.log
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
    // fileId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    // videoToken: PropTypes.string.isRequired,
    playerOptions: PropTypes.object // TODO be more specific
};

export default VideoPlayer;
