import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classes from './VideoPlayer.scss';
import Spinner from '../../UI/Spinner/Spinner';
import { loadDataForPlayback } from 'store/videoPlayer/videoPlayer.actions';

const getFileName = (videoFile) => {
    return videoFile.displayName || videoFile.fileName;
};

const VideoPlayer = (props) => {
    const {
        loading,
        videoFile,
        loadDataForPlayback,
        match: { params }
    } = props;

    useEffect(() => {
        loadDataForPlayback(params.fileId)
    }, []);

    return (
        <div className={ classes.VideoPlayer }>
            {
                loading &&
                <Row>
                    <Col className="text-center">
                        <Spinner />
                    </Col>
                </Row>
            }
            {
                !loading &&
                <Row>
                    <Col className="text-center">
                        <h3 className={ classes.title }>{ getFileName(videoFile) }</h3>
                    </Col>
                </Row>
            }
        </div>
    );
};
VideoPlayer.propTypes = {
    loading: PropTypes.bool.isRequired,
    videoFile: PropTypes.object.isRequired,
    loadDataForPlayback: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    loading: state.videoPlayer.loading,
    videoFile: state.videoPlayer.videoFile
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadDataForPlayback
}, dispatch);

const VideoPlayerConnected = connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
VideoPlayerConnected.propTypes = {};
export default VideoPlayerConnected;