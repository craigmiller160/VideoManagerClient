import React from 'react';
import PropTypes from 'prop-types';
import { Alert as ReactAlert } from 'reactstrap';

import classes from './Alert.scss';

const Alert = (props) => {
    console.log('Alert is starting'); // TODO delete this
    const { alert: { color, message, show }, hideAlert } = props;
    return (
        <ReactAlert
            className={ classes.Alert }
            color={ color }
            isOpen={ show }
            toggle={ () => hideAlert() }
        >
            { message }
        </ReactAlert>
    );
};

Alert.propTypes = {
    alert: PropTypes.shape({
        color: PropTypes.string,
        message: PropTypes.string,
        show: PropTypes.bool
    }),
    hideAlert: PropTypes.func
};

export default Alert;