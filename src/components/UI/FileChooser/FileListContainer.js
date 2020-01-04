/* eslint-disable */ // TODO delete this
import React from 'react';
import PropTypes from 'prop-types';

const FileListContainer = (props) => {
    const {
        files
    } = props;

    return (
        <div>
            <h1>Hello World</h1>
        </div>
    );
};
FileListContainer.propTypes = {
    files: PropTypes.array.isRequired
};

export default FileListContainer;
