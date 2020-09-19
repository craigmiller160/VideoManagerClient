/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import Spinner from '../../../UI/Spinner/Spinner';
import classes from './UserDetailsPage.scss';
import FlexRow from '../../../UI/Grid/FlexRow';
import Input from '../../../UI/form/Input/Input';
import Select from '../../../UI/form/Select/Select';
import { Button } from 'reactstrap';
import Form from '../../../UI/form/Form/Form';
import { isRequired } from '../../../../utils/validations';

export const USER_DETAILS_FORM_NAME = 'UserDetailsForm';

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
                    <h3 id="user-details-title">{ pageTitle }</h3>
                </div>
            </FlexRow>
            {
                loading &&
                <Spinner id="user-details-spinner" />
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
                                id="user-details-revoke"
                                type="button"
                                color="info"
                                onClick={ revokeUser }
                            >
                                Revoke Login
                            </Button>
                        }
                        <Button
                            id="user-details-save"
                            type="submit"
                            color="primary"
                            disabled={ disableSave }
                        >
                            Save Changes
                        </Button>
                        {
                            deleteUser &&
                            <Button
                                id="user-details-delete"
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
