import React, { Component } from 'react';
import classes from './VideoList.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VideoListItem from './VideoListItem/VideoListItem';
import { ListGroup } from 'reactstrap';
import { expandVideoFile, searchForVideos } from '../../../../store/videoList/videoList.actions';
import Spinner from '../../../UI/Spinner/Spinner';
import Pagination from '../../../UI/Pagination/Pagination';

class VideoList extends Component {

    componentDidMount() {
        this.props.searchForVideos();
    }

    getPagination() {
        const { totalItems, itemsPerPage, currentPage } = this.props;
        if (totalItems === 0) {
            return <div />;
        }

        const totalPages = Math.ceil(totalItems / itemsPerPage);
        // totalPages += (totalItems % itemsPerPage > 0 ? 1 : 0);

        return (
            <Pagination
                totalPages={ totalPages }
                currentPage={ currentPage }
            />
       );
    }

    render() {


        return (
            <div className={ classes.VideoList }>
                <h3>Available Videos</h3>
                {
                    this.props.searching &&
                        <Spinner />
                }
                {
                    !this.props.searching > 0 &&
                        <>
                            { this.getPagination() }
                            <ListGroup>
                                { this.props.videoList.map((videoFile) => (
                                    <VideoListItem
                                        key={ videoFile.fileId }
                                        videoFile={ videoFile }
                                        expandVideoFile={ this.props.expandVideoFile }
                                    />
                                )) }
                            </ListGroup>
                        </>
                }
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    totalItems: state.videoList.pagination.totalItems,
    itemsPerPage: state.videoList.pagination.itemsPerPage,
    currentPage: state.videoList.currentPage,
    videoList: state.videoList.videoList,
    searching: state.videoSearch.searching
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    searchForVideos,
    expandVideoFile
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);