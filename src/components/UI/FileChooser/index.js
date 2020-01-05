/* eslint-disable */ // TODO delete this
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getDirectoriesFromDirectory } from '../../../services/LocalFileApiService';
import FileListContainer from './FileListContainer';

const FileChooser = (props) => {
    const [state, setState] = useState({
        fileList: { rootPath: '', files: [] },
        selectedFile: null
    });

    useEffect(() => {
        const loadInitialFiles = async () => {
            const res = await getDirectoriesFromDirectory();
            setState((prevState) => ({
                ...prevState,
                fileList: res.data
            }));
        };

        loadInitialFiles();
    }, []);

    // TODO need a loading indicator

    return (
        <FileListContainer fileList={ state.fileList } />
    );
};
FileChooser.propTypes = {

};

export default FileChooser;
