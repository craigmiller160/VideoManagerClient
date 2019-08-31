import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const {
        rules,
        path,
        componentProps,
        component,
        exact
    } = props;

    const failedRule = rules.find((rule) => !rule.allow());
    if (failedRule) {
        return <Redirect to={ failedRule.redirect } />
    }

    const Component = component;

    return (
        <Route
            path={ path }
            exact={ exact }
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
    exact: PropTypes.bool,
    componentProps: PropTypes.object,
    component: PropTypes.any.isRequired,
    rules: PropTypes.arrayOf(PropTypes.shape({
        allow: PropTypes.func,
        redirect: PropTypes.string
    }))
};
ProtectedRoute.defaultProps = {
    rules: [],
    exact: false
};

export default ProtectedRoute;