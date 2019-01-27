import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as ReactPagination, PaginationItem, PaginationLink } from 'reactstrap';

const Pagination = (props) => {
    console.log('Pagination', props); // TODO delete this
    return (
        <ReactPagination>
            {
                [ ...Array(props.totalPages).keys() ].map((index) => (
                    <PaginationItem>
                        <PaginationLink>{ index + 1 }</PaginationLink>
                    </PaginationItem>
                ))
            }
        </ReactPagination>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
};

export default Pagination;