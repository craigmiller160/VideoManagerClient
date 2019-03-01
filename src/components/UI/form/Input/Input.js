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
        input,
    } = props;

    const id = newid();
    const classes = [formStyles['input-label']];
    if ('hidden' === type.toLowerCase()) {
        classes.push(formStyles.hidden);
    }

    return (
        <FormGroup className={ classes.join(' ') }>
            <Label
                for={ id }
            >
                { label }
            </Label>
            <ReactInput
                id={ id }
                { ...input }
                type={ type }
                name={ input.name }
            />
        </FormGroup>
    );
};

Input.defaultProps = {
    type: 'text'
};

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    input: PropTypes.shape({
        name: PropTypes.string.isRequired
    })
};

const Field = createField(Input);
Field.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired
};

export default Field;