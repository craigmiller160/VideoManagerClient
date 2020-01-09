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
            <h3 className={ classes.path }>
                <span className={ classes.bold }>Path:</span> { fileList.rootPath }
            </h3>
            {
                fileList.parentPath &&
                    <FileListItem file={ { directory: true, fileName: '../', filePath: fileList.parentPath } } />
            }
            {
                fileList.files.map((file, index) => (
                    <FileListItem key={ index } file={ file } />
                ))
            }
        </div>
    );
};
FileListContainer.propTypes = {
    fileList: PropTypes.object.isRequired // TODO make more detailed
};

export default FileListContainer;
