/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classes from './FileListItem.module.scss';
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
