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

// TODO for the roles dropdown, admin users need to load all the roles from the server, then select only the ones from the user
// TODO revoke login needs to be made to work
// TODO need a saveUserDetails alternative to saveUserProfile
// TODO delete user needs to be made to work

const formatRoles = (roles) => roles?.map(role => ({ value: role.roleId, label: role.name }));
const formatUser = (user) => ({
    ...user,
    roles: formatRoles(user?.roles),
    lastAuthenticated: user?.lastAuthenticated ? moment(user.lastAuthenticated).format(TIMESTAMP_FORMAT) : ''
});
const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';

const UserDetailsPage = (props) => {
    const { location, match } = props;

    const authUserDetails = useSelector(state => state.auth.userDetails, shallowEqual);
    const hasAdminRole = useSelector(hasAdminRoleSelector);

    const [allRoles, setAllRoles] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState({});

    const isUserDetailsPage = /^\/users\/\d{1,3}/.test(location.pathname);

    useEffect(() => {
        const adminSetup = async () => {
            const apis = [AuthApiService.getRoles()];
            if (isUserDetailsPage) {
                apis.push(AuthApiService.getUser(match.params.userId));
            }

            const resArray = await Promise.all(apis);
            setAllRoles(formatRoles(resArray[0].data));

            if (isUserDetailsPage) {
                setUserDetails(resArray[1].data);
            }
            setLoading(false);
        };

        if (hasAdminRole) {
            adminSetup();
        }
    }, []);

    let formInitValues = {};
    if (isUserDetailsPage) {
        formInitValues = formatUser(userDetails);
    } else {
        formInitValues = formatUser(authUserDetails);
    }

    let pageTitle = '';
    if (isUserDetailsPage) {
        pageTitle = 'User Details';
    } else {
        pageTitle = 'User Profile';
    }

    return (
        <div className={ classes.UserDetailsPage }>
            <FlexRow>
                <div className={ classes.title }>
                    <h3>{ pageTitle }</h3>
                </div>
            </FlexRow>
            {
                isLoading &&
                <Spinner />
            }
            {
                !isLoading &&
                <UserDetailsForm
                    showDelete={ hasAdminRole }
                    showRevokeLogin={ hasAdminRole }
                    allRoles={ allRoles }
                    initValues={ formInitValues }
                />
            }
        </div>
    );
};
UserDetailsPage.propTypes = {
    location: PropTypes.object,
    match: PropTypes.object
};

export default UserDetailsPage;
