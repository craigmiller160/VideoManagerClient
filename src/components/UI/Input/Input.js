import React from 'react';
import PropTypes from 'prop-types';
import { Input as ReactInput, FormGroup, Label } from 'reactstrap';
import newid from '../../../utils/newid';
import classes from './Input.scss';

const Input = (props) => {
    const {
        label,
        type,
        name,
        onChange,
        value
    } = props;

    const id = newid();
    return (
        <FormGroup className={classes.Input}>
            <Label
                for={ id }
            >
                { label }
            </Label>
            <ReactInput
                id={ id }
                type={ type }
                name={ name }
                onChange={ onChange }
                value={ value }
            />
        </FormGroup>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any
};

export default Input;