import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './UserListItem.scss';
import FlexRow from '../../../UI/Grid/FlexRow';
import { Button } from 'reactstrap';
import AnimateHeight from 'react-animate-height';

const UserListItem = (props) => {
    const {
        user,
        changeExpanded
    } = props;

    const fullName = `${user.firstName} ${user.lastName}`;

    const onItemClick = () => {
        if (!user.expanded) {
            changeExpanded(user.userId);
        }
    };

    const listItemClasses = [classes.UserListItem];
    if (user.expanded) {
        listItemClasses.push(classes.active);
    }

    const animateHeight = user.expanded ? 'auto' : 0;

    return (
        <div
            className={ listItemClasses.join(' ') }
            onClick={ onItemClick }
        >
            <FlexRow justifyContent="space-around">
                <p>{ user.userName }</p>
                <p>{ fullName }</p>
                <p>
                    {
                        user.roles.map((role) => (
                            <Fragment key={ role.roleId }>
                                <span key={ role.roleId }>{ role.name }</span>
                                <br />
                            </Fragment>
                        ))
                    }
                </p>
            </FlexRow>
            <AnimateHeight
                duration={ 500 }
                height={ animateHeight }
            >
                <FlexRow className="mt-4" justifyContent="flex-end">
                    <Link to={ `/users/${user.userId}` }>
                        <Button color="info">Edit</Button>
                    </Link>
                </FlexRow>
            </AnimateHeight>
        </div>

    );
};
UserListItem.propTypes = {
    user: PropTypes.object.isRequired,
    changeExpanded: PropTypes.func.isRequired
};

export default UserListItem;
