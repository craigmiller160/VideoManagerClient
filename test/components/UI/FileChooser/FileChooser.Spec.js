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
    const FileChooserContext = require('components/UI/FileChooser/FileChooserContext').default;
    const { useContext } = require('react');
    const FileListContainer = () => {
        const value = useContext(FileChooserContext);
        return (
            <div id="context-div" { ...value } />
        );
    };
    return FileListContainer;
});

const selectFile = jest.fn();

const defaultProps = {
    directoriesOnly: false,
    selectFile
};

const defaultStoreState = {};

const doMount = mountTestComponent(FileChooser, {
    defaultProps,
    defaultStoreState
});

const getFilesData = { type: 'files' };
const getDirsData = { type: 'dirs' };

const testRendering = (component, { loading = false, loadDirs = false } = {}) => {
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
        expect(getDirectoriesFromDirectory).toHaveBeenLastCalledWith(null);
    } else {
        expect(getFilesFromDirectory).toHaveBeenLastCalledWith(null);
    }
};

describe('FileChooser', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('rendering', () => {
        it('renders while loading', () => {
            const { component } = doMount();
            testRendering(component, {
                loading: true
            });
        });

        it('renders after loading completed', async () => {
            getFilesFromDirectory.mockResolvedValue({
                data: getFilesData
            });

            const { component } = doMount();
            await resolveComponent(component);
            testRendering(component);
        });

        it('loads only directories', async () => {
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
    });

    describe('actions', () => {
        it('openDirectory', async () => {
            getFilesFromDirectory.mockResolvedValue({
                data: getFilesData
            });

            const { component } = doMount();
            await resolveComponent(component);
            await act(async () => {
                await component.find('div#context-div').props().openDirectory({ filePath: 'path' });
            });
            expect(getFilesFromDirectory).toHaveBeenNthCalledWith(2, 'path');
        });

        it('selectFile', async () => {
            getFilesFromDirectory.mockResolvedValue({
                data: getFilesData
            });

            const { component } = doMount();
            await resolveComponent(component);
            component.find('div#context-div').props().selectFile({ fileName: 'file' });
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
                    payload: 'Error loading files: It failed'
                }
            ]);
        });
    });
});