import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { FormGroup, Label } from 'reactstrap';
import newid from '../../../../utils/newid';
import formStyles from '../FormStyles.scss';

const Select = (props) => {
    const {
        label,
        name,
        options,
        onChange,
        value
    } = props;

    const onChangeFn = onChange ? (value) => {
        onChange({name, value: value.value});
    } : null;

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
                name={ name }
                options={ options }
                onChange={ onChangeFn }
                isSearchable={ true }
                value={ value }
            />
        </FormGroup>
    );
};

Select.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default Select;