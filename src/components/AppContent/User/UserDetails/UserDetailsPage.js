/* eslint-disable */ // TODO delete this
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import FlexRow from '../../../UI/Grid/FlexRow';
import Input from 'components/UI/form/Input/Input';
import Form from 'components/UI/form/Form/Form';

const USER_DETAILS_FORM_NAME = 'UserDetailsForm';

const UserDetailsPage = () => {
    const userDetails = useSelector(state => state.auth.userDetails, shallowEqual);

    const onSubmit = () => {};

    return (
        <Form
            form={ USER_DETAILS_FORM_NAME }
            onSubmit={ onSubmit }
        >
            <FlexRow>
                <Input
                    label="Username"
                    name="userName"
                    type="email"
                    disabled
                />
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    disabled
                />
            </FlexRow>
        </Form>
    );
};

export default UserDetailsPage;