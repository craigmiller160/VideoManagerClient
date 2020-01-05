/* eslint-disable */ // TODO delete this
import React from 'react';
import PropTypes from 'prop-types';
import classes from './FileListContainer.scss';
import FileListItem from './FileListItem';

const FileListContainer = (props) => {
    const {
        fileList
    } = props;

    return (
        <div className={ classes.FileListContainer }>
            <h3 className={ classes.path }>Path: { fileList.rootPath }</h3>
            {
                fileList.files.map((file) => (
                    <FileListItem file={ file } />
                ))
            }
        </div>
    );
};
FileListContainer.propTypes = {
    fileList: PropTypes.object.isRequired // TODO make more detailed
};

export default FileListContainer;
