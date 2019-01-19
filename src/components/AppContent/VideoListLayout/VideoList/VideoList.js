import React, { Component } from 'react';
import classes from './VideoList.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VideoListItem from './VideoListItem/VideoListItem';

class VideoList extends Component {

    render() {
        return (
            <div className={ classes.VideoList }>
                <h3>VideoList</h3>
                <VideoListItem />
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    totalItems: state.videoList.pagination.totalItems,
    itemsPerPage: state.videoList.pagination.itemsPerPage,
    currentPage: state.videoList.currentPage,
    videoList: state.videoList.videoList
});

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);