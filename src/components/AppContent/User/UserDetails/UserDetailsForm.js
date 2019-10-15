/* eslint-disable */ // TODO delete this
import React from 'react';
import PropTypes from 'prop-types';
import { saveUserProfile } from '../../../../store/auth/auth.actions';
import classes from './UserDetailsForm.scss';
import FlexRow from '../../../UI/Grid/FlexRow';
import Input from '../../../UI/form/Input/Input';
import Select from '../../../UI/form/Select/Select';
import { Button } from 'reactstrap';
import Form from '../../../UI/form/Form/Form';
import { useDispatch } from 'react-redux';

const USER_DETAILS_FORM_NAME = 'UserDetailsForm';

// TODO need formInitValues

const UserDetailsForm = (props) => {
    const dispatch = useDispatch();
    const {
        hasAdminRole,
        allRoles,
        initValues
    } = props;

    return (
        <Form
            form={ USER_DETAILS_FORM_NAME }
            onSubmit={ (values) => dispatch(saveUserProfile(values)) }
            className={ classes.UserDetailsForm }
            initialValues={ initValues }
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
                {
                    hasAdminRole &&
                    <Button color="info">Revoke Login</Button>
                }
                <Button color="primary">Save</Button>
                {
                    hasAdminRole &&
                    <Button color="danger">Delete User</Button>
                }
            </FlexRow>
        </Form>
    )
};
UserDetailsForm.propTypes = {
    hasAdminRole: PropTypes.bool,
    allRoles: PropTypes.array,
    initValues: PropTypes.object
};
UserDetailsForm.defaultProps = {
    hasAdminRole: false,
    allRoles: [],
    initValues: {}
};

export default UserDetailsForm;
