import React from 'react';
import PropTypes from 'prop-types';

import classes from './Alert.scss';

const Alert = (props) => {
    const { alert: { color, message, show }, hideAlert } = props;
    const rootClasses = [classes.Alert, classes[color]];
    if (show) {
        rootClasses.push(classes.show);
    }

    return (
        <div className={ rootClasses.join(' ') }>
            <button aria-label="close" onClick={ () => hideAlert() }>
                <span aria-hidden="true">X</span>
            </button>
            <span>{ message }</span>
        </div>
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