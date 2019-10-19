/* eslint-disable */  // TODO delete this
import React from 'react';
import PropTypes from 'prop-types';
import classes from './UserDetailsForm.scss';
import FlexRow from '../../../UI/Grid/FlexRow';
import Input from '../../../UI/form/Input/Input';
import Select from '../../../UI/form/Select/Select';
import { Button } from 'reactstrap';
import Form from '../../../UI/form/Form/Form';

const USER_DETAILS_FORM_NAME = 'UserDetailsForm';

const UserDetailsForm = (props) => {
    const {
        allRoles,
        initValues,
        saveUser,
        deleteUser,
        revokeUser
    } = props;

    const disableRoles = !allRoles || allRoles.length === 0;

    return (
        <Form
            form={ USER_DETAILS_FORM_NAME }
            onSubmit={ saveUser }
            className={ classes.UserDetailsForm }
            initialValues={ initValues }
        >
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
                    disabled={ disableRoles }
                    options={ allRoles }
                />
                <Input
                    label="Last Authenticated"
                    name="lastAuthenticated"
                    type="text"
                    divClassName={ classes.Input }
                    disabled
                />
            </FlexRow>
            <FlexRow className="mt-5" justifyContent="space-around">
                {
                    revokeUser &&
                    <Button color="info">Revoke Login</Button>
                }
                <Button color="primary">Save Changes</Button>
                {
                    deleteUser &&
                    <Button color="danger">Delete User</Button>
                }
            </FlexRow>
        </Form>
    )
};
UserDetailsForm.propTypes = {
    allRoles: PropTypes.array,
    initValues: PropTypes.object,
    saveUser: PropTypes.func,
    deleteUser: PropTypes.func,
    revokeUser: PropTypes.func
};
UserDetailsForm.defaultProps = {
    hasAdminRole: false,
    initValues: {},
    showRevokeLogin: false,
    showDelete: false,
    enableRoles: false
};

export default UserDetailsForm;
