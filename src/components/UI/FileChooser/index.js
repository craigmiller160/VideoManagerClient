/* eslint-disable */ // TODO delete this
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    getDirectoriesFromDirectory,
    getFilesFromDirectory
} from '../../../services/LocalFileApiService';
import FileListContainer from './FileListContainer';
import FileChooserContext from './FileChooserContext';

const FileChooser = (props) => {
    const {
        directoriesOnly
    } = props;

    const [state, setState] = useState({
        fileList: { rootPath: '', files: [] },
        selectedFile: null
    });

    useEffect(() => {
        const loadInitialFiles = async () => {
            let res;
            if (directoriesOnly) {
                res = await getDirectoriesFromDirectory();
            } else {
                res = await getFilesFromDirectory();
            }

            setState((prevState) => ({
                ...prevState,
                fileList: res.data
            }));
        };

        loadInitialFiles();
    }, []);

    // TODO need a loading indicator

    const context = {
        directoriesOnly
    };

    return (
        <FileChooserContext.Provider value={ context }>
            <FileListContainer fileList={ state.fileList } />
        </FileChooserContext.Provider>
    );
};
FileChooser.propTypes = {
    directoriesOnly: PropTypes.bool
};
FileChooser.defaultProps = {
    directoriesOnly: false
};

export default FileChooser;
