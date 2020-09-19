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
