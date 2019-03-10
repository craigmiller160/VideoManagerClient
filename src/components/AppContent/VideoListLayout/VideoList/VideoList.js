import React, { useEffect } from 'react';
import classes from './VideoList.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VideoListItem from './VideoListItem/VideoListItem';
import { ListGroup } from 'reactstrap';
import { expandVideoFile, searchForVideos, setCurrentPage } from 'store/videoList/videoList.actions';
import Spinner from 'components/UI/Spinner/Spinner';
import Pagination, { RIGHT_ALIGN } from '../../../UI/Pagination/Pagination';

const getPagination = (props) => {
    const { totalItems, itemsPerPage, currentPage, setCurrentPage } = props;
    if (totalItems === 0) {
        return <div />;
    }

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <Pagination
            totalPages={ totalPages }
            currentPage={ currentPage }
            align={ RIGHT_ALIGN }
            onClick={ (value) => paginationClick(value, props) }
        />
    );
};

export const paginationClick = (value, props) => {
    const {
        currentPage,
        setCurrentPage,
        searchForVideos
    } = props;
    let newPage = currentPage;
    if (newPage != value) { // eslint-disable-line
        if ('<' === value) {
            newPage--;
        }
        else if ('>' === value) {
            newPage++;
        }
        else {
            newPage = parseInt(value);
        }

        setCurrentPage(newPage);
        searchForVideos();
    }
};

export const VideoList = (props) => {
    const {
        searching,
        videoList,
        expandVideoFile,
        searchForVideos,
        currentPage
    } = props;

    useEffect(() => {
        searchForVideos();
    }, [currentPage]);

    console.log('Rendering'); // TODO delete this

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
                    { getPagination(props) }
                    <ListGroup>
                        { videoList.map((videoFile) => (
                            <VideoListItem
                                key={ videoFile.fileId }
                                videoFile={ videoFile }
                                expandVideoFile={ expandVideoFile }
                            />
                        )) }
                    </ListGroup>
                    { getPagination(props) }
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
    expandVideoFile
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);