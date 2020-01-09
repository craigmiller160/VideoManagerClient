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
            <div className={ classes.list }>
                {
                    fileList.parentPath &&
                    <FileListItem
                        file={ { directory: true, fileName: '../', filePath: fileList.parentPath } }
                        hideSelect
                    />
                }
                {
                    fileList.files.map((file, index) => (
                        <FileListItem key={ index } file={ file } />
                    ))
                }
            </div>
        </div>
    );
};
FileListContainer.propTypes = {
    fileList: PropTypes.shape({
        rootPath: PropTypes.string.isRequired,
        parentPath: PropTypes.string.isRequired,
        files: PropTypes.arrayOf(
            PropTypes.shape({
                directory: PropTypes.bool.isRequired,
                fileName: PropTypes.string.isRequired,
                filePath: PropTypes.string.isRequired
            }).isRequired
        ).isRequired
    }).isRequired
};

export default FileListContainer;
