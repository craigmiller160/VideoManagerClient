import React from 'react';
import PropTypes from 'prop-types';
import classes from './Pagination.scss';
import { Pagination as ReactPagination, PaginationItem, PaginationLink } from 'reactstrap';

export const LEFT_ALIGN = 'left';
export const CENTER_ALIGN = 'center';
export const RIGHT_ALIGN = 'right';
const NUM_BUTTONS = 5;

export const getAlignClassName = (stringName) => {
    switch(stringName) {
        case LEFT_ALIGN:
            return classes.left;
        case CENTER_ALIGN:
            return classes.center;
        case RIGHT_ALIGN:
            return classes.right;
        default:
            throw new Error(`Invalid string align class name: ${stringName}`);
    }
};

const createPageButtons = (currentPage, totalPages, onClick) =>
    [...Array(totalPages).keys()]
        .filter((index) => index > currentPage - NUM_BUTTONS &&
            index < currentPage + NUM_BUTTONS)
        .map((index) => (
            <PaginationItem
                key={ index }
                active={ index === currentPage }
                onClick={ () => onClick(`${index}`) }
            >
                <PaginationLink style={ { zIndex: 0 } }>
                    { index + 1 }
                </PaginationLink>
            </PaginationItem>
        ));

const Pagination = (props) => {
    const { currentPage, totalPages, align, onClick } = props;
    const showPrevious = currentPage > 0;
    const showNext = currentPage < totalPages - 1;
    const classNames = [ classes.Pagination, getAlignClassName(align) ].join(' ');

    return (
        <ReactPagination className={ classNames }>
            {
                showPrevious &&
                    <>
                        <PaginationItem onClick={ () => onClick('<<') }>
                            <PaginationLink first />
                        </PaginationItem>
                        <PaginationItem onClick={ () => onClick('<') }>
                            <PaginationLink previous />
                        </PaginationItem>
                    </>
            }
            {
                createPageButtons(currentPage, totalPages, onClick)
            }
            {
                showNext &&
                    <>
                        <PaginationItem onClick={ () => onClick('>') }>
                            <PaginationLink next />
                        </PaginationItem>
                        <PaginationItem onClick={ () => onClick('>>') }>
                            <PaginationLink last />
                        </PaginationItem>
                    </>
            }
        </ReactPagination>
    );
};

Pagination.defaultProps = {
    align: LEFT_ALIGN,
    onClick: () => {}
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    align: PropTypes.oneOf([LEFT_ALIGN, CENTER_ALIGN, RIGHT_ALIGN]),
    onClick: PropTypes.func
};

export default Pagination;