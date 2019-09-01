import React from 'react';
import PropTypes from 'prop-types';
import classes from './Alert.scss';
import { useDispatch } from 'react-redux';
import { hideAlert } from '../../../store/alert/alert.actions';

const Alert = (props) => {
    const dispatch = useDispatch();
    const { alert: { color, message, show } } = props;
    const rootClasses = [classes.Alert, classes[color]];
    if (show) {
        rootClasses.push(classes.show);
    }

    // This is here to override the behavior in AppContent to close the alert on click
    const click = (event) => event.stopPropagation();

    return (
        <div className={ rootClasses.join(' ') } onClick={ click }>
            <button aria-label="close" onClick={ () => dispatch(hideAlert()) }>
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
    })
};

export default Alert;