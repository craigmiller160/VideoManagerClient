import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert as ReactAlert } from 'reactstrap';
import { hideAlert } from '../../../store/alert/alert.actions';

const Alert = (props) => {
    const { color, message, show, hideAlert } = props;
    return (
        <ReactAlert
            color={ color }
            isOpen={ show }
            toggle={ hideAlert }
        >
            { message }
        </ReactAlert>
    );
};

const mapStateToProps = (state) => ({
    color: state.alert.color,
    message: state.alert.message,
    show: state.alert.show
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    hideAlert
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Alert);