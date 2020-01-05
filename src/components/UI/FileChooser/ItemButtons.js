import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import FileChooserContext from './FileChooserContext';
import classes from './ItemButtons.scss';

// TODO delete if unused

const ItemButtons = (props) => {
    const {
        directory
    } = props;
    const { directoriesOnly } = useContext(FileChooserContext);

    const showSelectBtn = (directory && directoriesOnly) || !directory;

    return (
        <div className={ classes.ItemButtons }>
            {
                directory &&
                <Button color="info">Open</Button>
            }
            {
                showSelectBtn &&
                <Button color="primary">Select</Button>
            }
        </div>
    );
};
ItemButtons.propTypes = {
    directory: PropTypes.bool
};
ItemButtons.defaultProps = {
    directory: false
};

export default ItemButtons;
