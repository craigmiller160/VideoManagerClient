/* eslint-disable */ // TODO delete this
import React from 'react';
import PropTypes from 'prop-types';
import classes from './FileListItem.scss';

const FileListItem = (props) => {
    const {
        file
    } = props;
    return (
        <div className={ classes.FileListItem }>
            <p>{ file.fileName }</p>
        </div>
    );
};
FileListItem.propTypes = {
    file: PropTypes.object.isRequired // TODO be more specific
};

export default FileListItem;
