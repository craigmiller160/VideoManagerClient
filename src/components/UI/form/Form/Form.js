import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import { reduxForm } from 'redux-form';

const Form = (props) => {
    const {
        children,
        handleSubmit,
        className
    } = props;

    return (
        <form
            className={ className }
            onSubmit={ (event) => {
                event.preventDefault();
                handleSubmit(event);
            } }
            onKeyDown={ (event) => {
                if (keycode(event.keyCode) && keycode(event.keyCode).toLowerCase() === 'enter') {
                    event.preventDefault();
                    handleSubmit(event);
                }
            } }
        >
            { children }
        </form>
    );
};

Form.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    className: PropTypes.string,
};

const ReduxFormForm = reduxForm({})(Form);
ReduxFormForm.propTypes = {
    form: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    className: PropTypes.string,
    initialValues: PropTypes.object,
    children: PropTypes.element,
    destroyOnUnmount: PropTypes.bool
};

export default ReduxFormForm;