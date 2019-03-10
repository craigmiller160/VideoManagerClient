import React from 'react';
import { Field } from 'redux-form';

const createField = (component) => (props) => ( //eslint-disable-line react/display-name
    <Field
        { ...props }
        component={ component }
    />
);

export default createField;