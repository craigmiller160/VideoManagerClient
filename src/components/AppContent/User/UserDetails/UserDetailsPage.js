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
    const {
        setup,
        pageTitle
    } = props;

    const hasAdminRole = useSelector(hasAdminRoleSelector);

    const [allRoles, setAllRoles] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const doSetup = async () => {
            const res = await setup();
            setAllRoles(res.roles);
            setUserDetails(res.userDetails);
            setLoading(false);
        };
        doSetup();
    }, []);

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
                    enableRoles={ hasAdminRole }
                    allRoles={ allRoles }
                    initValues={ userDetails }
                />
            }
        </div>
    );
};
UserDetailsPage.propTypes = {
    pageTitle: PropTypes.string,
    setup: PropTypes.func,
    showDelete: PropTypes.bool,
    showRevokeLogin: PropTypes.bool,
    enableRoles: PropTypes.bool
};
UserDetailsPage.defaultProps = {
    showDelete: false,
    showRevokeLogin: false,
    enableRoles: false
};

export default UserDetailsPage;
