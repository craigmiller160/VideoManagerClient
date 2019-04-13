/* eslint-disable */ // TODO delete this
import React from 'react';
import PropTypes from 'prop-types';
import { Input as ReactInput, FormGroup, Label } from 'reactstrap';
import newid from '../../../../utils/newid';
import formStyles from '../FormStyles.scss';
import createField from "../createField";

export const InputComponent = (props) => {
    const {
        label,
        type,
        input,
        textarea,
        inputProps
    } = props;

    console.log('Props', props); // TODO delete this

    const id = newid();
    const groupClasses = [formStyles['input-label']];
    if ('hidden' === type.toLowerCase()) {
        groupClasses.push(formStyles.hidden);
    }

    const inputClasses = [];
    if (!textarea || !textarea.resize) {
        inputClasses.push(formStyles['no-resize']);
    }

    return (
        <FormGroup className={ groupClasses.join(' ') }>
            <Label
                for={ id }
            >
                { label }
            </Label>
            <ReactInput
                id={ id }
                className={ inputClasses.join(' ') }
                { ...input }
                { ...inputProps }
                type={ type }
                name={ input ? input.name : '' }
                rows={ textarea ? textarea.rows : null }
                cols={ textarea ? textarea.cols : null }
            />
        </FormGroup>
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