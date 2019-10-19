/* eslint-disable */  // TODO delete this
import React from 'react';
import PropTypes from 'prop-types';
import classes from './UserDetailsForm.scss';
import FlexRow from '../../../UI/Grid/FlexRow';
import Input from '../../../UI/form/Input/Input';
import Select from '../../../UI/form/Select/Select';
import { Button } from 'reactstrap';
import Form from '../../../UI/form/Form/Form';



const UserDetailsForm = (props) => {
    const {
        allRoles,
        initValues,
        saveUser,
        deleteUser,
        revokeUser
    } = props;



    return (
        <div />
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
