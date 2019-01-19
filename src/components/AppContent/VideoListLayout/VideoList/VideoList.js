import React, { Component } from 'react';
import classes from './VideoList.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VideoListItem from './VideoListItem/VideoListItem';
import { ListGroup } from 'reactstrap';
import { searchForVideos } from '../../../../store/videoList/videoList.actions';

class VideoList extends Component {

    componentDidMount() {
        this.props.searchForVideos(); // TODO might want to relocate this eventually
    }

    render() {
        return (
            <div className={ classes.VideoList }>
                <h3>Available Videos</h3>
                <ListGroup>
                    { this.props.videoList.map((videoFile) => (
                        <VideoListItem
                            key={ videoFile.fileId }
                            videoFile={ videoFile }
                        />
                    )) }
                </ListGroup>
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
    searchForVideos
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);