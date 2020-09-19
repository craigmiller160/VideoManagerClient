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

import { createReducer } from 'redux-starter-kit';
import { setVideoList, setPagination, setCurrentPage, expandVideoFile } from './videoList.actions';

export const initialState = {
    videoList: [],
    pagination: {
        totalItems: 0,
        itemsPerPage: 0
    },
    currentPage: 0
};

const handleSetVideoList = (state, action) => ({
    ...state,
    videoList: action.payload ? action.payload.map((videoFile) => ({
        ...videoFile,
        expanded: false
    })) : []
});

const handleSetPagination = (state, action) => ({
    ...state,
    pagination: action.payload
});

const handleSetCurrentPage = (state, action) => ({
    ...state,
    currentPage: action.payload
});

const handleExpandVideoFile = (state, action) => ({
    ...state,
    videoList: state.videoList.map((videoFile) => {
        if (action.payload === videoFile.fileId) {
            return {
                ...videoFile,
                expanded: true
            }
        }
        return {
            ...videoFile,
            expanded: false
        }
    })
});

export default createReducer(initialState, {
    [setVideoList]: handleSetVideoList,
    [setPagination]: handleSetPagination,
    [setCurrentPage]: handleSetCurrentPage,
    [expandVideoFile]: handleExpandVideoFile
});

