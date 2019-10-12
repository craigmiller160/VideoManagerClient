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
        inputProps,
        divClassName,
        disabled
    } = props;

    const id = newid();
    return (
        <StyledFormGroupDiv className={ divClassName }>
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
                isDisabled={ disabled }
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
    inputProps: PropTypes.object,
    divClassName: PropTypes.string,
    disabled: PropTypes.bool
};

SelectComponent.defaultProps = {
    options: [],
    multi: false,
    inputProps: {},
    disabled: false
};

const Field = createField(SelectComponent);
Field.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    multi: PropTypes.bool,
    divClassName: PropTypes.string,
    disabled: PropTypes.bool
};
export default Field;