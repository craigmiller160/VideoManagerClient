/* eslint-disable */ // TODO delete this
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    getDirectoriesFromDirectory,
    getFilesFromDirectory
} from '../../../services/LocalFileApiService';
import FileListContainer from './FileListContainer';
import FileChooserContext from './FileChooserContext';
import Spinner from '../Spinner/Spinner';

const loadFiles = (path, directoriesOnly) => {
    if (directoriesOnly) {
        return getDirectoriesFromDirectory(path);
    }

    return getFilesFromDirectory(path);
};

const FileChooser = (props) => {
    const {
        directoriesOnly,
        selectFile
    } = props;

    const [state, setState] = useState({
        fileList: { rootPath: '', parentPath: '', files: [] },
        selectedFile: null,
        loading: true
    });

    useEffect(() => {
        const loadInitialFiles = async () => {
            const res = await loadFiles(null, directoriesOnly);
            // TODO add error handling here

            setState((prevState) => ({
                ...prevState,
                fileList: res.data,
                loading: false
            }));
        };

        loadInitialFiles();
    }, []);

    const openDirectory = async (file) => {
        const res = await loadFiles(file.filePath, directoriesOnly);
        setState((prevState) => ({
            ...prevState,
            fileList: res.data
        }));
    };

    // TODO I kind of want the border at this level, so it wraps around the loading indicator
    if (state.loading) {
        return <Spinner />
    }

    const context = {
        directoriesOnly,
        selectFile,
        openDirectory
    };

    return (
        <FileChooserContext.Provider value={ context }>
            <FileListContainer fileList={ state.fileList } />
        </FileChooserContext.Provider>
    );
};
FileChooser.propTypes = {
    directoriesOnly: PropTypes.bool,
    selectFile: PropTypes.func
};
FileChooser.defaultProps = {
    directoriesOnly: false,
    selectFile: () => {}
};

export default FileChooser;
