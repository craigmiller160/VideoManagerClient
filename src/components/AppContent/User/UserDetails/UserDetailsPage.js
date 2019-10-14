/* eslint-disable */ // TODO delete this
import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FlexRow from '../../../UI/Grid/FlexRow';
import Input from 'components/UI/form/Input/Input';
import Form from 'components/UI/form/Form/Form';
import Select from 'components/UI/form/Select/Select';
import { Button } from 'reactstrap';
import useReactRouter from 'use-react-router';
import classes from './UserDetailsPage.scss';
import { hasAdminRole as hasAdminRoleSelector } from '../../../../store/auth/auth.selectors';
import * as AuthApiService from 'services/AuthApiService';
import { saveUserProfile } from '../../../../store/auth/auth.actions';

const USER_DETAILS_FORM_NAME = 'UserDetailsForm';

// TODO for the roles dropdown, admin users need to load all the roles from the server, then select only the ones from the user
// TODO revoke login needs to be made to work
// TODO need a saveUserDetails alternative to saveUserProfile

const formatRoles = (roles) => roles.map(role => ({ value: role.roleId, label: role.name }));
const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';

const UserDetailsPage = () => {
    const dispatch = useDispatch();
    const { location, match } = useReactRouter();
    const userDetails = useSelector(state => state.auth.userDetails, shallowEqual);
    const hasAdminRole = useSelector(hasAdminRoleSelector);
    const [allRoles, setAllRoles] = useState([]);

    console.log(location, match); // TODO delete this

    useEffect(() => {
        const loadRoles = async () => {
            const res = await AuthApiService.getRoles();
            setAllRoles(formatRoles(res.data));
        };

        if (hasAdminRole) {
            loadRoles();
        }
    }, []);

    let formInitValues = {};
    if (location.pathname === '/profile') {
        formInitValues = {
            ...userDetails,
            roles: formatRoles(userDetails.roles),
            lastAuthenticated: moment(userDetails.lastAuthenticated).format(TIMESTAMP_FORMAT)
        }
    }

    return (
        <Form
            form={ USER_DETAILS_FORM_NAME }
            onSubmit={ (values) => dispatch(saveUserProfile(values)) }
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
                <Button color="primary">Save</Button>
                {
                    hasAdminRole &&
                    <Button color="info">Revoke Login</Button>
                }
            </FlexRow>
        </Form>
    );
};

export default UserDetailsPage;
