import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './VideoList.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VideoListItem from './VideoListItem/VideoListItem';
import { ListGroup } from 'reactstrap';
import { expandVideoFile, searchForVideos, setCurrentPage } from 'store/videoList/videoList.actions';
import Spinner from 'components/UI/Spinner/Spinner';
import { reset } from 'store/videoPlayer/videoPlayer.actions';
import VideoListPagination from './VideoListPagination';

export const VideoList = (props) => {
    const {
        searching,
        videoList,
        expandVideoFile,
        searchForVideos,
        currentPage,
        videoPlayerReset,
        itemsPerPage,
        totalItems,
        setCurrentPage
    } = props;

    useEffect(() => {
        searchForVideos();
    }, [currentPage]);

    const [ pager1, pager2 ] = [...Array(2).keys()].map((index) => (
        <VideoListPagination
            key={ index }
            currentPage={ currentPage }
            itemsPerPage={ itemsPerPage }
            setCurrentPage={ setCurrentPage }
            totalItems={ totalItems }
        />
    ));

    return (
        <div className={ classes.VideoList }>
            <div className={ classes['list-title'] }>
                <h3>Available Videos</h3>
            </div>
            {
                searching &&
                <Spinner />
            }
            {
                !searching && videoList.length > 0 &&
                <div>
                    { pager1 }
                    <ListGroup>
                        { videoList.map((videoFile) => (
                            <VideoListItem
                                key={ videoFile.fileId }
                                videoFile={ videoFile }
                                expandVideoFile={ expandVideoFile }
                                videoPlayerReset={ videoPlayerReset }
                            />
                        )) }
                    </ListGroup>
                    { pager2 }
                </div>
            }
            {
                !searching && videoList.length === 0 &&
                <div className={ classes['none-available'] }>
                    <h3>No Videos Available</h3>
                </div>
            }
        </div>
    );
};

VideoList.propTypes = {
    totalItems: PropTypes.number,
    itemsPerPage: PropTypes.number,
    searching: PropTypes.bool,
    videoList: PropTypes.array,
    expandVideoFile: PropTypes.func,
    searchForVideos: PropTypes.func,
    currentPage: PropTypes.number,
    videoPlayerReset: PropTypes.func,
    setCurrentPage: PropTypes.func
};

const mapStateToProps = (state) => ({
    totalItems: state.videoList.pagination.totalItems,
    itemsPerPage: state.videoList.pagination.itemsPerPage,
    currentPage: state.videoList.currentPage,
    videoList: state.videoList.videoList,
    searching: state.videoSearch.searching
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    searchForVideos,
    setCurrentPage,
    expandVideoFile,
    videoPlayerReset: reset
}, dispatch);

const VideoListConnected = connect(mapStateToProps, mapDispatchToProps)(VideoList);
VideoListConnected.propTypes = {};
export default VideoListConnected;