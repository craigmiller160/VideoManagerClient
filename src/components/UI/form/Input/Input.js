import React from 'react';
import PropTypes from 'prop-types';
import StyledInput from '../../Styled/StyledInput';
import StyledLabel from '../../Styled/StyledLabel';
import newid from '../../../../utils/newid';
import createField from "../createField";
import StyledFormGroupDiv from '../../Styled/StyledFormGroupDiv';
import StyledTextArea from '../../Styled/StyledTextArea';

export const InnerComponent = (props) => {
    if (props.type === 'textarea') {
        return (
            <StyledTextArea { ...props } />
        );
    }

    return (
        <StyledInput { ...props } />
    );
};
InnerComponent.propTypes = {
    type: PropTypes.string
};

export const InputComponent = (props) => {
    const {
        label,
        type,
        input,
        textarea,
        inputProps,
        meta: { touched, error }
    } = props;

    const id = newid();
    const hasError = touched && !!error;

    return (
        <StyledFormGroupDiv hidden={ 'hidden' === type.toLowerCase() }>
            <StyledLabel
                htmlForm={ id }
            >
                { label }
            </StyledLabel>
            <InnerComponent
                id={ id }
                { ...input }
                { ...inputProps }
                type={ type }
                name={ input ? input.name : '' }
                rows={ textarea ? textarea.rows : null }
                cols={ textarea ? textarea.cols : null }
                resize={ textarea ? textarea.resize : false }
                hasError={ hasError }
            />
            {
                hasError &&
                    <span className="text-danger">{ error }</span>
            }
        </StyledFormGroupDiv>
    );
};

InputComponent.defaultProps = {
    type: 'text',
    textarea: {
        resize: false
    },
    inputProps: {}
};

InputComponent.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    input: PropTypes.shape({
        name: PropTypes.string.isRequired
    }),
    inputProps: PropTypes.object,
    textarea: PropTypes.shape({
        rows: PropTypes.number,
        cols: PropTypes.number,
        resize: PropTypes.bool
    }),
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string
    })
};

const Field = createField(InputComponent);
Field.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    validate: PropTypes.arrayOf(PropTypes.func)
};

export default Field;