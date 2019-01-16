import React from 'react';
import { Field } from 'redux-form';

export default (component) => (props) => (
    <Field
        { ...props }
        component={ component }
    />
);