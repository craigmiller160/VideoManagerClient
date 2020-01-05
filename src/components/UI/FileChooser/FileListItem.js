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
        file
    } = props;

    const { directoriesOnly } = useContext(FileChooserContext);

    const icon = file.directory ? directoryIcon : fileIcon;
    const alt = file.directory ? 'Directory Icon' : 'File Icon';

    const showSelectBtn = (file.directory && directoriesOnly) || !file.directory;

    return (
        <div className={ classes.FileListItem }>
            <div className={ classes['label-container'] }>
                <img src={ icon } alt={ alt } />
                <p>{ file.fileName }</p>
            </div>
            <div className={ classes['btn-container'] }>
                {
                    file.directory &&
                    <Button color="info">Open</Button>
                }
                {
                    showSelectBtn &&
                    <Button color="primary">Select</Button>
                }
            </div>
        </div>
    );
};
FileListItem.propTypes = {
    file: PropTypes.object.isRequired // TODO be more specific
};

export default FileListItem;
