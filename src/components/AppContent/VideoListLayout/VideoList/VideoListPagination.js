import React from 'react';
import Pagination, { RIGHT_ALIGN } from '../../../UI/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../../../store/videoList/videoList.actions';
import shallowEqual from 'react-redux/es/utils/shallowEqual';

const VideoListPagination = () => {
    const dispatch = useDispatch();
    const { totalItems, itemsPerPage } = useSelector((state) => state.videoList.pagination, shallowEqual);
    const currentPage = useSelector((state) => state.videoList.currentPage, shallowEqual);

    if (totalItems === 0) {
        return <div />;
    }

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <Pagination
            totalPages={ totalPages }
            currentPage={ currentPage }
            align={ RIGHT_ALIGN }
            onClick={ (value) => dispatch(setCurrentPage(value)) }
        />
    );
};

export default VideoListPagination;