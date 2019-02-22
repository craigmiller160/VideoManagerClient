import React from 'react';
import PropTypes from 'prop-types';
import { Input as ReactInput, FormGroup, Label } from 'reactstrap';
import newid from '../../../../utils/newid';
import formStyles from '../FormStyles.scss';
import createField from "../createField";

const Input = (props) => {
    const {
        label,
        type,
        name,
        input,
    } = props;

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
                { ...input }
                type={ type }
                name={ name }
            />
        </FormGroup>
    );
};

Input.defaultProps = {
    type: 'text'
};

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string
};

export default createField(Input);