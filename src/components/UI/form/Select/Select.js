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
        name,
        options,
        multi
    } = props;

    console.log('Multi', multi); // TODO delete this

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
    multi: PropTypes.bool
};

SelectComponent.defaultProps = {
    options: [],
    multi: false
};

const Field = createField(SelectComponent);
Field.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    multi: PropTypes.bool
};
export default Field;