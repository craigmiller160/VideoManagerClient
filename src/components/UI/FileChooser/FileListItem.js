/* eslint-disable */    // TODO delete this
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classes from './FileListItem.scss';
import directoryIcon from '../../../assets/images/directory.png';
import fileIcon from '../../../assets/images/file.png';
import { Button } from 'reactstrap';
import FileChooserContext from './FileChooserContext';

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

    const icon = file.directory ? directoryIcon : fileIcon;
    const alt = file.directory ? 'Directory Icon' : 'File Icon';

    const showSelectBtn = !hideSelect && ((file.directory && directoriesOnly) || !file.directory);

    return (
        <div className={ classes.FileListItem }>
            <div className={ classes['label-container'] }>
                <img src={ icon } alt={ alt } />
                <p>{ file.fileName }</p>
            </div>
            <div className={ classes['btn-container'] }>
                {
                    file.directory &&
                    <Button
                        color="info"
                        onClick={ () => openDirectory(file) }
                    >
                        Open
                    </Button>
                }
                {
                    showSelectBtn &&
                    <Button
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
    file: PropTypes.object.isRequired, // TODO be more specific
    hideSelect: PropTypes.bool
};
FileListItem.defaultProps = {
    hideSelect: false
};

export default FileListItem;
