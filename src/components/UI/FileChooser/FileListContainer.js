/* eslint-disable */ // TODO delete this
import React from 'react';
import PropTypes from 'prop-types';
import classes from './FileListContainer.scss';

const FileListContainer = (props) => {
    const {
        files
    } = props;

    return (
        <div className={ classes.FileListContainer }>
            <h1>Hello World</h1>
        </div>
    );
};
FileListContainer.propTypes = {
    files: PropTypes.array.isRequired // TODO be more specific
};

export default FileListContainer;
