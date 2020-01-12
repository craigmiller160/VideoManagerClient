import React from 'react';
import classes from './FileListContainer.scss';
import FileListItem from './FileListItem';
import { fileListPropType } from './fileChooserPropTypes';

const FileListContainer = (props) => {
    const {
        fileList
    } = props;

    return (
        <div className={ classes.FileListContainer }>
            <h3 className={ classes.path } data-name="file-list-title">
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
    fileList: fileListPropType
};

export default FileListContainer;
