import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { FormGroup, Label } from 'reactstrap';
import newid from '../../../../utils/newid';
import formStyles from '../FormStyles.scss';
import createField from "../createField";

export const SelectComponent = (props) => {
    const {
        label,
        input,
        options,
        multi,
        inputProps
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
                { ...inputProps }
                name={ input && input.name }
                onBlur={ () => input.onBlur(input.value) }
                options={ options }
                isSearchable
                isClearable
                isMulti={ multi }
            />
        </FormGroup>
    );
};

SelectComponent.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    input: PropTypes.shape({
        name: PropTypes.string
    }),
    multi: PropTypes.bool,
    inputProps: PropTypes.object
};

SelectComponent.defaultProps = {
    options: [],
    multi: false,
    inputProps: {}
};

const Field = createField(SelectComponent);
Field.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    multi: PropTypes.bool
};
export default Field;