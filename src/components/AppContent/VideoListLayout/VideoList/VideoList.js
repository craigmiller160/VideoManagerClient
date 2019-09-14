import React, { useEffect } from 'react';
import classes from './VideoList.scss';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import VideoListItem from './VideoListItem/VideoListItem';
import { ListGroup } from 'reactstrap';
import { searchForVideos } from 'store/videoList/videoList.actions';
import Spinner from 'components/UI/Spinner/Spinner';
import VideoListPagination from './VideoListPagination';

const VideoList = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.videoList.currentPage, shallowEqual);
    const videoList = useSelector((state) => state.videoList.videoList, shallowEqual);
    const searching = useSelector((state) => state.videoSearch.searching, shallowEqual);

    useEffect(() => {
        dispatch(searchForVideos());
    }, [currentPage]);

    const [ pager1, pager2 ] = [...Array(2).keys()].map((index) => (
        <VideoListPagination
            key={ index }
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

export default VideoList;
