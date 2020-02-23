import React from 'react';
import PropTypes from 'prop-types';
import classes from './ToolTip.scss';

// TODO needs unit test
const ToolTip = (props) => {
    const {
        children,
        text
    } = props;

    return (
        <div className={ classes.ToolTip }>
            { children }
            <span className={ classes.ToolTipText }>{ text }</span>
        </div>
    );
};
ToolTip.propTypes = {
    text: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.node, PropTypes.element
    ]).isRequired
};

export default ToolTip;