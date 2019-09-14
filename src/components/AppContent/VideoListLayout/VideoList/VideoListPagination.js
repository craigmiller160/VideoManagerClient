import React from 'react';
import Pagination, { RIGHT_ALIGN } from '../../../UI/Pagination/Pagination';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setCurrentPage } from '../../../../store/videoList/videoList.actions';

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
