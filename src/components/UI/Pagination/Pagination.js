/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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

export const getClickValue = (value, currentPage, totalPages) => {
    let newPage = currentPage;
    if (newPage !== value) {
        if ('<' === value) {
            newPage--;
        }
        else if ('>' === value) {
            newPage++;
        }
        else if ('>>' === value) {
            newPage = totalPages - 1;
        }
        else if ('<<' === value) {
            newPage = 0;
        }
        else {
            newPage = value;
        }
    }

    return newPage;
};

export const createPageButtons = ({ currentPage, totalPages, onClick }) =>
    [...Array(totalPages).keys()]
        .filter((index) => index > currentPage - NUM_BUTTONS &&
            index < currentPage + NUM_BUTTONS)
        .map((index) => (
            <PaginationItem
                key={ index }
                active={ index === currentPage }
                onClick={ () => onClick(getClickValue(index, currentPage, totalPages)) }
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
                        <PaginationItem onClick={ () => onClick(getClickValue('<<', currentPage, totalPages)) }>
                            <PaginationLink first />
                        </PaginationItem>
                        <PaginationItem onClick={ () => onClick(getClickValue('<', currentPage, totalPages)) }>
                            <PaginationLink previous />
                        </PaginationItem>
                    </>
            }
            {
                createPageButtons({ currentPage, totalPages, onClick })
            }
            {
                showNext &&
                    <>
                        <PaginationItem onClick={ () => onClick(getClickValue('>', currentPage, totalPages)) }>
                            <PaginationLink next />
                        </PaginationItem>
                        <PaginationItem onClick={ () => onClick(getClickValue('>>', currentPage, totalPages)) }>
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