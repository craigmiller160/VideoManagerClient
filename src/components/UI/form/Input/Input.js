import React from 'react';
import PropTypes from 'prop-types';
import StyledInput from '../../Styled/StyledInput';
import StyledLabel from '../../Styled/StyledLabel';
import newid from '../../../../utils/newid';
import createField from "../createField";
import StyledFormGroupDiv from '../../Styled/StyledFormGroupDiv';
import StyledTextArea from '../../Styled/StyledTextArea';

const Component = (props) => {
    if (props.type === 'textarea') {
        return (
            <StyledTextArea { ...props } />
        );
    }

    return (
        <StyledInput { ...props } />
    );
};

export const InputComponent = (props) => {
    const {
        label,
        type,
        input,
        textarea,
        inputProps
    } = props;

    const id = newid();

    // const component = 'textarea' === type ? StyledTextArea : StyledInput;

    return (
        <StyledFormGroupDiv hidden={ 'hidden' === type.toLowerCase() }>
            <StyledLabel
                htmlForm={ id }
            >
                { label }
            </StyledLabel>
            <Component
                id={ id }
                { ...input }
                { ...inputProps }
                type={ type }
                name={ input ? input.name : '' }
                rows={ textarea ? textarea.rows : null }
                cols={ textarea ? textarea.cols : null }
            />
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
    })
};

const Field = createField(InputComponent);
Field.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired
};

export default Field;