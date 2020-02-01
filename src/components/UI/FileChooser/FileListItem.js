import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classes from './FileListItem.scss';
import directoryIcon from '../../../assets/images/directory.png';
import fileIcon from '../../../assets/images/file.png';
import { Button } from 'reactstrap';
import FileChooserContext from './FileChooserContext';
import { filePropType } from './fileChooserPropTypes';

const FileListItem = (props) => {
    const {
        file,
        hideSelect
    } = props;

    const {
        directoriesOnly,
        selectFile,
        openDirectory
    } = useContext(FileChooserContext);

    const icon = file.isDirectory ? directoryIcon : fileIcon;
    const alt = file.isDirectory ? 'Directory Icon' : 'File Icon';

    const showSelectBtn = !hideSelect && ((file.isDirectory && directoriesOnly) || !file.isDirectory);

    return (
        <div className={ classes.FileListItem }>
            <div className={ classes['label-container'] }>
                <img src={ icon } alt={ alt } />
                <p>{ file.fileName }</p>
            </div>
            <div className={ classes['btn-container'] }>
                {
                    file.isDirectory &&
                    <Button
                        data-name="open-btn"
                        color="info"
                        onClick={ () => openDirectory(file) }
                    >
                        Open
                    </Button>
                }
                {
                    showSelectBtn &&
                    <Button
                        data-name="select-btn"
                        color="primary"
                        onClick={ () => selectFile(file) }
                    >
                        Select
                    </Button>
                }
            </div>
        </div>
    );
};
FileListItem.propTypes = {
    file: filePropType,
    hideSelect: PropTypes.bool
};
FileListItem.defaultProps = {
    hideSelect: false
};

export default FileListItem;
