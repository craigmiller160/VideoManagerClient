import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import newid from '../../../../utils/newid';
import createField from "../createField";
import StyledLabel from '../../Styled/StyledLabel';

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
        <div>
            <StyledLabel
                htmlFor={ id }
            >
                { label }
            </StyledLabel>
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
        </div>
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