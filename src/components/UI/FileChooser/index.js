import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FileChooser = (props) => {
    const [state, setState] = useState({
        files: [],
        selectedFile: null
    });

    return (
        <div />
    );
};
FileChooser.propTypes = {

};

export default FileChooser;
