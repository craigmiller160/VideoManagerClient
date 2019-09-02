import PropTypes from 'prop-types';
import React from 'react';
import Pagination, { RIGHT_ALIGN } from '../../../UI/Pagination/Pagination';

const VideoListPagination = (props) => {
    const {
        totalItems,
        itemsPerPage,
        currentPage,
        setCurrentPage
    } = props;

    if (totalItems === 0) {
        return <div />;
    }

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <Pagination
            totalPages={ totalPages }
            currentPage={ currentPage }
            align={ RIGHT_ALIGN }
            onClick={ (value) => {
                setCurrentPage(value);
            } }
        />
    );
};
VideoListPagination.propTypes = {
    totalItems: PropTypes.number,
    itemsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func
};

export default VideoListPagination;