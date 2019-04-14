/* eslint-disable */ // TODO delete this
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classes from './VideoPlayer.scss';
import Spinner from '../../UI/Spinner/Spinner';
import { loadDataForPlayback } from 'store/videoPlayer/videoPlayer.actions';
import { Helmet } from 'react-helmet';

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
        <>
            <Helmet
                title={ getFileName(videoFile) }
            />
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
                    <>
                        <Row>
                            <Col className="text-center">
                                <h3 className={ classes.title }>{ getFileName(videoFile) }</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <video controls autoPlay="autoPlay">
                                    <source src={ `/api/video-files/play/${params.fileId}` } />
                                </video>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-2 text-center">
                                <p className={ classes.bold }>{ videoFile.fileName }</p>
                            </Col>
                        </Row>
                        <Row className="text-center">
                            <Col md="6">
                                <p className={ classes.bold }>Description</p>
                                <p>{ videoFile.description }</p>
                            </Col>
                            <Col md="6">
                                <p className={ classes.bold }>Categories</p>
                                <p>{
                                    videoFile.categories
                                        .map((cat) => cat.categoryName)
                                        .join(', ')
                                }</p>
                                <p className={ classes.bold }>Series</p>
                                <p>{
                                    videoFile.series
                                        .map((series) => series.seriesName)
                                        .join(', ')
                                }</p>
                                <p className={ classes.bold }>Stars</p>
                                <p>{
                                    videoFile.stars
                                        .map((star) => star.starName)
                                        .join(', ')
                                }</p>
                            </Col>
                        </Row>
                    </>
                }
            </div>
        </>
    );
};
VideoPlayer.propTypes = {
    loading: PropTypes.bool.isRequired,
    videoFile: PropTypes.object.isRequired,
    loadDataForPlayback: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.object
    })
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