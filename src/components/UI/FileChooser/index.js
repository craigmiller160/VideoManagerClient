/* eslint-disable */ // TODO delete this
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getDirectoriesFromDirectory } from '../../../services/LocalFileApiService';
import FileListContainer from './FileListContainer';

const FileChooser = (props) => {
    const [state, setState] = useState({
        files: [],
        selectedFile: null
    });

    useEffect(() => {
        const loadInitialFiles = async () => {
            const res = await getDirectoriesFromDirectory();
            setState((prevState) => ({
                ...prevState,
                files: res.data
            }));
        };

        loadInitialFiles();
    }, []);

    // TODO need a loading indicator

    return (
        <FileListContainer files={ state.files } />
    );
};
FileChooser.propTypes = {

};

export default FileChooser;
