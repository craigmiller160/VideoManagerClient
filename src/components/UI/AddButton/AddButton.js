import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const AddButton = (props) => (
    <Button
        id={ props.id }
        color="info"
        onClick={ props.addItem }
    >
        +
    </Button>
);
AddButton.propTypes = {
    id: PropTypes.string,
    addItem: PropTypes.func
};

export default AddButton;
