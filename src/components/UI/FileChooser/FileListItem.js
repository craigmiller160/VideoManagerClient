/* eslint-disable */ // TODO delete this
import React from 'react';
import PropTypes from 'prop-types';
import classes from './FileListItem.scss';

const FileListItem = (props) => {
    return (
        <div className={ classes.FileListItem }>

        </div>
    );
};
FileListItem.propTypes = {
    file: PropTypes.object.isRequired // TODO be more specific
};

export default FileListItem;
