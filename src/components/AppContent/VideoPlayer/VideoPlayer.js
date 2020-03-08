/* eslint-disable */ // TODO delete this
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';
import videojsChromecast from '@silvermine/videojs-chromecast';

// TODO need to integrate dev dependencies from this one into my project... maybe...
videojsChromecast(videojs, {
    preloadWebComponents: true
});

let player = null; // TODO I don't like this approach

// TODO update unit tests for this
const VideoPlayer = (props) => {
    const {
        fileId,
        videoToken
    } = props;
    const videoNode = useRef(null);

    const playerOptions = {
        autoplay: true,
        controls: true,
        nativeControlsForTouch: true,
        techOrder: ['chromecast', 'html5'],
        sources: [
            {
                src: `/api/video-files/play/${fileId}?videoToken=${videoToken}`,
                type: 'video/mp4'
            }
        ],
        plugins: {
            chromecast: {}
        }
    };

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
    fileId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    videoToken: PropTypes.string.isRequired
};

export default VideoPlayer;
