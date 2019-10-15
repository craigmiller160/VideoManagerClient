/* eslint-disable */  // TODO delete this
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import useReactRouter from 'use-react-router';
import { hasAdminRole as hasAdminRoleSelector } from '../../../../store/auth/auth.selectors';
import * as AuthApiService from 'services/AuthApiService';
import UserDetailsForm from './UserDetailsForm';

// TODO for the roles dropdown, admin users need to load all the roles from the server, then select only the ones from the user
// TODO revoke login needs to be made to work
// TODO need a saveUserDetails alternative to saveUserProfile
// TODO delete user needs to be made to work

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
        <div>
            <UserDetailsForm
                hasAdminRole={ hasAdminRole }
                allRoles={ allRoles }
                initValues={ formInitValues }
            />
        </div>
    );
};

export default UserDetailsPage;
