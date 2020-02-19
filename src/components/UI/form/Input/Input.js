import React, { forwardRef, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import StyledInput from '../../Styled/StyledInput';
import StyledLabel from '../../Styled/StyledLabel';
import newid from '../../../../utils/newid';
import createField from "../createField";
import StyledFormGroupDiv from '../../Styled/StyledFormGroupDiv';
import StyledTextArea from '../../Styled/StyledTextArea';

export const InnerComponent = forwardRef((props, ref) => { // eslint-disable-line react/display-name
    if (props.type === 'textarea') {
        return (
            <StyledTextArea { ...props } ref={ ref } />
        );
    }

    return (
        <StyledInput { ...props } ref={ ref } />
    );
});
InnerComponent.propTypes = {
    type: PropTypes.string
};

export const InputComponent = (props) => {
    const inputRef = useRef(null);
    const {
        id = newid(),
        label,
        type,
        input,
        textarea,
        inputProps,
        meta: { touched, error },
        focusOnRender,
        disabled,
        divClassName,
        inputClassName
    } = props;

    const hasError = touched && !!error;

    useEffect(() => {
        if (focusOnRender) {
            inputRef.current?.focus();
        }
    }, []);

    return (
        <StyledFormGroupDiv id={ id } className={ divClassName } hidden={ 'hidden' === type.toLowerCase() }>
            <StyledLabel
                htmlFor={ `${id}-input` }
            >
                { label }
            </StyledLabel>
            <InnerComponent
                id={ `${id}-input` }
                { ...input }
                { ...inputProps }
                type={ type }
                name={ input ? input.name : '' }
                rows={ textarea ? textarea.rows : null }
                cols={ textarea ? textarea.cols : null }
                resize={ textarea ? textarea.resize : false }
                hasError={ hasError }
                ref={ inputRef }
                disabled={ disabled }
                className={ inputClassName }
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
    inputProps: {},
    focusOnRender: false,
    disabled: false
};

InputComponent.propTypes = {
    id: PropTypes.string,
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
    }),
    focusOnRender: PropTypes.bool,
    disabled: PropTypes.bool,
    divClassName: PropTypes.string,
    inputClassName: PropTypes.string
};

const Field = createField(InputComponent);
Field.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    validate: PropTypes.arrayOf(PropTypes.func),
    focusOnRender: PropTypes.bool,
    disabled: PropTypes.bool,
    divClassName: PropTypes.string,
    inputClassName: PropTypes.string
};

export default Field;