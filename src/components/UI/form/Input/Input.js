import React from 'react';
import PropTypes from 'prop-types';
import { Input as ReactInput, FormGroup, Label } from 'reactstrap';
import newid from '../../../../utils/newid';
import formStyles from '../FormStyles.scss';

const Input = (props) => {
    const {
        label,
        type,
        name,
        onChange,
        value
    } = props;

    const onChangeFn = onChange ? (event) => {
        onChange({name, value: event.target.value});
    } : null;

    const id = newid();
    return (
        <FormGroup className={ formStyles['input-label'] }>
            <Label
                for={ id }
            >
                { label }
            </Label>
            <ReactInput
                id={ id }
                type={ type }
                name={ name }
                onChange={ onChangeFn }
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