/* eslint-disable */ // TODO delete this
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import classes from './FileListItem.scss';
import directoryIcon from '../../../assets/images/directory.png';
import fileIcon from '../../../assets/images/file.png';
import FileChooserContext from './FileChooserContext';

const FileListItem = (props) => {
    const {
        file
    } = props;

    const { directoriesOnly } = useContext(FileChooserContext);

    const icon = file.directory ? directoryIcon : fileIcon;
    const alt = file.directory ? 'Directory Icon' : 'File Icon';

    let btnColor;
    let btnLabel;
    if (directoriesOnly || file.directory) {
        btnColor = 'info';
        btnLabel = 'Open';
    } else {
        btnColor = 'primary';
        btnLabel = 'Select';
    }

    return (
        <div className={ classes.FileListItem }>
            <div className={ classes['label-container'] }>
                <img src={ icon } alt={ alt } />
                <p>{ file.fileName }</p>
            </div>
            <div className={ classes['btn-container'] }>
                <Button color={ btnColor }>{ btnLabel }</Button>
            </div>
        </div>
    );
};
FileListItem.propTypes = {
    file: PropTypes.object.isRequired // TODO be more specific
};

export default FileListItem;
