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

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
	getDirectoriesFromDirectory,
	getFilesFromDirectory
} from '../../../services/LocalFileApiService';
import FileListContainer from './FileListContainer';
import FileChooserContext from './FileChooserContext';
import Spinner from '../Spinner/Spinner';
import { handleApiError } from '../../../store/alert/alert.actions';

const loadFiles = (path, directoriesOnly) => {
	if (directoriesOnly) {
		return getDirectoriesFromDirectory(path);
	}

	return getFilesFromDirectory(path);
};

const FileChooser = (props) => {
	const dispatch = useDispatch();
	const { directoriesOnly, selectFile, initialDir } = props;

	const [state, setState] = useState({
		fileList: { rootPath: '', parentPath: '', files: [] },
		selectedFile: null,
		loading: true
	});

	useEffect(() => {
		const loadInitialFiles = async () => {
			try {
				const res = await loadFiles(initialDir, directoriesOnly);

				setState((prevState) => ({
					...prevState,
					fileList: res.data,
					loading: false
				}));
			} catch (ex) {
				dispatch(handleApiError(ex, 'Error loading files.'));
			}
		};

		loadInitialFiles();
	}, [directoriesOnly, selectFile, initialDir, dispatch]);

	const openDirectory = async (file) => {
		try {
			const res = await loadFiles(file.filePath, directoriesOnly);
			setState((prevState) => ({
				...prevState,
				fileList: res.data
			}));
		} catch (ex) {
			dispatch(handleApiError(ex, 'Error loading files'));
		}
	};

	if (state.loading) {
		return <Spinner />;
	}

	const context = {
		directoriesOnly,
		selectFile,
		openDirectory
	};

	return (
		<FileChooserContext.Provider value={context}>
			<FileListContainer fileList={state.fileList} />
		</FileChooserContext.Provider>
	);
};
FileChooser.propTypes = {
	directoriesOnly: PropTypes.bool,
	selectFile: PropTypes.func,
	initialDir: PropTypes.string
};
FileChooser.defaultProps = {
	directoriesOnly: false,
	selectFile: () => {}
};

export default FileChooser;
