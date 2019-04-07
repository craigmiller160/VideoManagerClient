import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const AddButton = (props) => (
    <Button
        color="info"
        onClick={ props.addItem }
    >
        +
    </Button>
);
AddButton.propTypes = {
    addItem: PropTypes.func
};

export default AddButton;
