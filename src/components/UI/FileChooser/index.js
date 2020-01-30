import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getDirectoriesFromDirectory, getFilesFromDirectory } from '../../../services/LocalFileApiService';
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
            try {
                const res = await loadFiles(null, directoriesOnly);

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
    }, []);

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
