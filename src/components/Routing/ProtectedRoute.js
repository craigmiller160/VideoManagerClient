import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

// TODO need unit tests for this

const ProtectedRoute = (props) => {
    const {
        rules,
        path,
        componentProps,
        component
    } = props;

    const failedRule = rules.find((rule) => !rule.allow());
    if (failedRule) {
        return <Redirect to={ failedRule.redirect } />
    }

    const Component = component;

    return (
        <Route
            path={ path }
            render={ (routeProps) => (
                <Component
                    { ...routeProps }
                    { ...componentProps }
                />
            ) }
        />
    );
};
ProtectedRoute.propTypes = {
    path: PropTypes.string.isRequired,
    componentProps: PropTypes.object,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.func]).isRequired,
    rules: PropTypes.arrayOf(PropTypes.shape({
        allow: PropTypes.func,
        redirect: PropTypes.string
    }))
};
ProtectedRoute.defaultProps = {
    rules: []
};

export default ProtectedRoute;