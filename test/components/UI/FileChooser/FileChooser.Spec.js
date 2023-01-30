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
import { act } from 'react-dom/test-utils';
import {
	getDirectoriesFromDirectory,
	getFilesFromDirectory
} from 'services/LocalFileApiService';
import mountTestComponent from '../../../exclude/testUtil/mountTestComponent';
import FileChooser from 'components/UI/FileChooser';
import resolveComponent from '../../../exclude/testUtil/resolveComponent';
import Spinner from 'components/UI/Spinner/Spinner';

jest.mock('services/LocalFileApiService', () => ({
	getDirectoriesFromDirectory: jest.fn(),
	getFilesFromDirectory: jest.fn()
}));

jest.mock('components/UI/FileChooser/FileListContainer', () => {
	const FileChooserContext =
		require('components/UI/FileChooser/FileChooserContext').default;
	const { useContext } = require('react');
	const FileListContainer = () => {
		const value = useContext(FileChooserContext);
		return <div id="context-div" {...value} />;
	};
	return FileListContainer;
});

const selectFile = jest.fn();
const initialDir = '/home/user/videos';

const defaultProps = {
	directoriesOnly: false,
	selectFile
};

const defaultStoreState = {};

const doMount = mountTestComponent(FileChooser, {
	defaultProps,
	defaultStoreState,
	defaultUseThunk: true
});

const getFilesData = { type: 'files' };
const getDirsData = { type: 'dirs' };

const testRendering = (
	component,
	{ loading = false, loadDirs = false, initialDir } = {}
) => {
	if (loading) {
		expect(component.find(Spinner)).toHaveLength(1);
		expect(component.find('FileListContainer')).toHaveLength(0);
		return;
	}

	const fileList = loadDirs ? getDirsData : getFilesData;

	expect(component.find('FileListContainer')).toHaveLength(1);
	expect(component.find('FileListContainer').props()).toEqual({
		fileList
	});

	if (loadDirs) {
		expect(getDirectoriesFromDirectory).toHaveBeenLastCalledWith(
			initialDir
		);
	} else {
		expect(getFilesFromDirectory).toHaveBeenLastCalledWith(initialDir);
	}
};

describe('FileChooser', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('rendering', () => {
		it('renders while loading', () => {
			// Deliberately not using act() here because I want to see the state before
			// the asynchronous updates are resolved
			const { component } = doMount();
			testRendering(component, {
				loading: true
			});
		});

		it('renders after loading files and directories', async () => {
			getFilesFromDirectory.mockResolvedValue({
				data: getFilesData
			});

			const { component } = doMount();
			await resolveComponent(component);
			testRendering(component);
		});

		it('renders after loading only directories', async () => {
			getDirectoriesFromDirectory.mockResolvedValue({
				data: getDirsData
			});

			const { component } = doMount({
				props: {
					...defaultProps,
					directoriesOnly: true
				}
			});
			await resolveComponent(component);
			testRendering(component, {
				loadDirs: true
			});
		});

		it('renders after loading files and directories, with initialDir', async () => {
			getFilesFromDirectory.mockResolvedValue({
				data: getFilesData
			});

			const { component } = doMount({
				props: {
					...defaultProps,
					initialDir
				}
			});
			await resolveComponent(component);
			testRendering(component, {
				initialDir
			});
		});

		it('renders after loading only directories, with initialDir', async () => {
			getDirectoriesFromDirectory.mockResolvedValue({
				data: getDirsData
			});

			const { component } = doMount({
				props: {
					...defaultProps,
					directoriesOnly: true,
					initialDir
				}
			});
			await resolveComponent(component);
			testRendering(component, {
				loadDirs: true,
				initialDir
			});
		});
	});

	describe('actions', () => {
		it('openDirectory', async () => {
			getFilesFromDirectory.mockResolvedValue({
				data: getFilesData
			});

			const { component } = doMount();
			await resolveComponent(component);
			await act(async () => {
				await component
					.find('div#context-div')
					.props()
					.openDirectory({ filePath: 'path' });
			});
			expect(getFilesFromDirectory).toHaveBeenNthCalledWith(2, 'path');
		});

		it('selectFile', async () => {
			getFilesFromDirectory.mockResolvedValue({
				data: getFilesData
			});

			const { component } = doMount();
			await resolveComponent(component);
			component
				.find('div#context-div')
				.props()
				.selectFile({ fileName: 'file' });
			expect(selectFile).toHaveBeenCalledWith({ fileName: 'file' });
		});

		it('handles loading error', async () => {
			getFilesFromDirectory.mockRejectedValue({
				message: 'It failed'
			});

			const { component, store } = doMount();
			await resolveComponent(component);

			expect(store.getActions()).toEqual([
				{
					type: 'alert/showErrorAlert',
					payload: 'Error: Error loading files. Message: It failed'
				}
			]);
		});
	});
});
