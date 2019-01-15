import React from 'react';
import PropTypes from 'prop-types';
import { Form as ReactForm } from 'reactstrap';
import { reduxForm } from 'redux-form';

const Form = (props) => {
    const {
        handleSubmit,
        children
    } = props;

    return (
        <ReactForm onSubmit={ handleSubmit }>
            { children }
        </ReactForm>
    );
};

const ReduxFormForm = reduxForm({})(Form);
ReduxFormForm.propTypes = {
    form: PropTypes.string.isRequired
};

export default ReduxFormForm;