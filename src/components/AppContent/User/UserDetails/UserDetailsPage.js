/* eslint-disable */        // TODO delete this
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import moment from 'moment';
import { hasAdminRole as hasAdminRoleSelector } from '../../../../store/auth/auth.selectors';
import * as AuthApiService from 'services/AuthApiService';
import UserDetailsForm from './UserDetailsForm';
import Spinner from '../../../UI/Spinner/Spinner';
import classes from './UserDetailsPage.scss';
import FlexRow from '../../../UI/Grid/FlexRow';
import Input from '../../../UI/form/Input/Input';
import Select from '../../../UI/form/Select/Select';
import { Button } from 'reactstrap';
import Form from '../../../UI/form/Form/Form';
import { isRequired } from '../../../../utils/validations';

// TODO for the roles dropdown, admin users need to load all the roles from the server, then select only the ones from the user
// TODO revoke login needs to be made to work
// TODO need a saveUserDetails alternative to saveUserProfile
// TODO delete user needs to be made to work

const USER_DETAILS_FORM_NAME = 'UserDetailsForm';

const UserDetailsPage = (props) => {
    const form = useSelector((state) => state.form?.[USER_DETAILS_FORM_NAME], shallowEqual);
    const {
        loading,
        userDetails,
        roles,
        pageTitle,
        saveUser,
        deleteUser,
        revokeUser,
        enableUsername,
        requirePassword
    } = props;

    const disableRoles = !roles || roles.length === 0;
    const disableSave = !!form?.syncErrors;

    const passwordValidate = [];
    if (requirePassword) {
        passwordValidate.push(isRequired);
    }

    return (
        <div className={ classes.UserDetailsPage }>
            <FlexRow>
                <div className={ classes.title }>
                    <h3>{ pageTitle }</h3>
                </div>
            </FlexRow>
            {
                loading &&
                <Spinner />
            }
            {
                !loading &&
                <Form
                    form={ USER_DETAILS_FORM_NAME }
                    onSubmit={ saveUser }
                    className={ classes.UserDetailsForm }
                    initialValues={ userDetails }
                    enableReinitialize
                >
                    <FlexRow className="mt-3" justifyContent="space-around">
                        <Input
                            label="Username"
                            name="userName"
                            type="email"
                            disabled={ !enableUsername }
                            divClassName={ classes.Input }
                            validate={ [
                                isRequired
                            ] }
                        />
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            divClassName={ classes.Input }
                            validate={ passwordValidate }
                        />
                    </FlexRow>
                    <FlexRow justifyContent="space-around">
                        <Input
                            label="First Name"
                            name="firstName"
                            type="text"
                            divClassName={ classes.Input }
                            validate={ [
                                isRequired
                            ] }
                        />
                        <Input
                            label="Last Name"
                            name="lastName"
                            type="text"
                            divClassName={ classes.Input }
                            validate={ [
                                isRequired
                            ] }
                        />
                    </FlexRow>
                    <FlexRow justifyContent="space-around">
                        <Select
                            label="Roles"
                            name="roles"
                            divClassName={ classes.Input }
                            multi
                            disabled={ disableRoles }
                            options={ roles }
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
                            <Button
                                type="button"
                                color="info"
                                onClick={ revokeUser }
                            >
                                Revoke Login
                            </Button>
                        }
                        <Button
                            color="primary"
                            disabled={ disableSave }
                        >
                            Save Changes
                        </Button>
                        {
                            deleteUser &&
                            <Button
                                type="button"
                                color="danger"
                                onClick={ deleteUser }
                            >
                                Delete User
                            </Button>
                        }
                    </FlexRow>
                </Form>
            }
        </div>
    );
};
UserDetailsPage.propTypes = {
    pageTitle: PropTypes.string,
    loading: PropTypes.bool,
    userDetails: PropTypes.object,
    roles: PropTypes.array,
    saveUser: PropTypes.func,
    deleteUser: PropTypes.func,
    revokeUser: PropTypes.func,
    enableUsername: PropTypes.bool,
    requirePassword: PropTypes.bool
};
UserDetailsPage.defaultProps = {
    enableUsername: false,
    requirePassword: false
};

export default UserDetailsPage;
