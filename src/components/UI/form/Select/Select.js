import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import newid from '../../../../utils/newid';
import createField from "../createField";
import StyledLabel from '../../Styled/StyledLabel';
import StyledFormGroupDiv from '../../Styled/StyledFormGroupDiv';

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
        <StyledFormGroupDiv>
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
                onBlur={ (event) => event.preventDefault() }
                onChange={ input.onChange }
                options={ options }
                isSearchable
                isClearable
                isMulti={ multi }
            />
        </StyledFormGroupDiv>
    );
};

SelectComponent.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any
    })),
    input: PropTypes.shape({
        name: PropTypes.string,
        onChange: PropTypes.func
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