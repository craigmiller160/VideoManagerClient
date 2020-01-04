import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getDirectoriesFromDirectory } from '../../../services/LocalFileApiService';

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

    return (
        <div />
    );
};
FileChooser.propTypes = {

};

export default FileChooser;
