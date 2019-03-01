import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import { Form as ReactForm } from 'reactstrap';
import { reduxForm } from 'redux-form';

const Form = (props) => {
    const {
        children,
        handleSubmit,
        className
    } = props;

    return (
        <ReactForm
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
        </ReactForm>
    );
};

const ReduxFormForm = reduxForm({})(Form);
ReduxFormForm.propTypes = {
    form: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func,
    className: PropTypes.string,
    initialValues: PropTypes.object
};

export default ReduxFormForm;