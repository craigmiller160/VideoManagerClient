/* eslint-disable */ // TODO delete this
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import FlexRow from '../../../UI/Grid/FlexRow';
import Input from 'components/UI/form/Input/Input';
import Form from 'components/UI/form/Form/Form';
import Select from 'components/UI/form/Select/Select';
import classes from './UserDetailsPage.scss';
import { Button } from 'reactstrap';
import useReactRouter from 'use-react-router';
import { ROLE_ADMIN } from '../../../../utils/securityConstants';

const USER_DETAILS_FORM_NAME = 'UserDetailsForm';

// TODO for the roles dropdown, admin users need to load all the roles from the server, then select only the ones from the user

const UserDetailsPage = () => {
    const { location } = useReactRouter();
    const userDetails = useSelector(state => state.auth.userDetails, shallowEqual);

    let formInitValues = {};
    if (location.pathname === '/profile') {
        formInitValues = {
            ...userDetails,
            roles: userDetails.roles.map(role => ({ value: role.roleId, label: role.name }))
        }
    }

    const hasAdminRole = !!userDetails.roles.find((role) => role.name === ROLE_ADMIN);

    const onSubmit = () => {}; // TODO need better onSubmit

    return (
        <Form
            form={ USER_DETAILS_FORM_NAME }
            onSubmit={ onSubmit }
            className={ classes.UserDetailsPage }
            initialValues={ formInitValues }
        >
            <FlexRow>
                <div className={ classes.title }>
                    <h3>User Profile</h3>
                </div>
            </FlexRow>
            <FlexRow className="mt-3" justifyContent="space-around">
                <Input
                    label="Username"
                    name="userName"
                    type="email"
                    disabled
                    divClassName={ classes.Input }
                />
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    divClassName={ classes.Input }
                />
            </FlexRow>
            <FlexRow justifyContent="space-around">
                <Input
                    label="First Name"
                    name="firstName"
                    type="text"
                    divClassName={ classes.Input }
                />
                <Input
                    label="Last Name"
                    name="lastName"
                    type="text"
                    divClassName={ classes.Input }
                />
            </FlexRow>
            <FlexRow justifyContent="space-around">
                <Select
                    label="Roles"
                    name="roles"
                    divClassName={ classes.Input }
                    multi
                    disabled={ !hasAdminRole }
                />
                <Input
                    label="Last Authenticated"
                    name="lastAuth"
                    type="text"
                    divClassName={ classes.Input }
                    disabled
                />
            </FlexRow>
            <FlexRow className="mt-5" justifyContent="space-around">
                <Button color="primary">Save</Button>
                {/*<Button color="info">Revoke Login</Button>*/}
            </FlexRow>
        </Form>
    );
};

export default UserDetailsPage;
