import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { FormGroup, Label } from 'reactstrap';
import newid from '../../../../utils/newid';
import formStyles from '../FormStyles.scss';
import createField from "../createField";

const Select = (props) => {
    const {
        label,
        input,
        name,
        options
    } = props;

    const id = newid();
    return (
        <FormGroup className={ formStyles['input-label'] }>
            <Label
                for={ id }
            >
                { label }
            </Label>
            <ReactSelect
                id={ id }
                { ...input }
                name={ name }
                onBlur={ () => input.onBlur(input.value) }
                options={ options }
                isSearchable={ true }
            />
        </FormGroup>
    );
};

Select.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    name: PropTypes.string
};

export default createField(Select);