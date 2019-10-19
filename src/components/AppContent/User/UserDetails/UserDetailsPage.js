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

const UserDetailsPage = (props) => {
    const {
        loading,
        userDetails,
        roles,
        pageTitle,
        saveUser,
        deleteUser,
        revokeUser
    } = props;

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
                <UserDetailsForm
                    deleteUser={ deleteUser }
                    revokeUser={ revokeUser }
                    allRoles={ roles }
                    initValues={ userDetails }
                    saveUser={ saveUser }
                />
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
    revokeUser: PropTypes.func
};
UserDetailsPage.defaultProps = {
    showDelete: false,
    showRevokeLogin: false,
    enableRoles: false
};

export default UserDetailsPage;
