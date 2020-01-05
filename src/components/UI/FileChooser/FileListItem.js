/* eslint-disable */ // TODO delete this
import React from 'react';
import PropTypes from 'prop-types';
import classes from './FileListItem.scss';
import directoryIcon from '../../../assets/images/directory.png';
import fileIcon from '../../../assets/images/file.png';

const FileListItem = (props) => {
    const {
        file
    } = props;

    const icon = file.directory ? directoryIcon : fileIcon;
    const alt = file.directory ? 'Directory Icon' : 'File Icon';

    return (
        <div className={ classes.FileListItem }>
            <img src={ icon } alt={ alt } />
            <p>{ file.fileName }</p>
        </div>
    );
};
FileListItem.propTypes = {
    file: PropTypes.object.isRequired // TODO be more specific
};

export default FileListItem;
