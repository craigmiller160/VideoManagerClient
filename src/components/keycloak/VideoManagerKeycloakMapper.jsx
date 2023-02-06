import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { KeycloakAuthContext } from '@craigmiller160/react-keycloak';
import { useDispatch } from 'react-redux';
import { setIsAuth, setUserDetails } from '../../store/auth/auth.actions';

const mapRoles = (roles) => roles.map((role) => `ROLE_${role}`);

const mapUserDetails = (token) => ({
	firstName: token.given_name,
	lastName: token.family_name,
	username: token.preferred_username,
	roles: mapRoles(token.resource_access['video-manager-server']?.roles ?? [])
});

export const VideoManagerKeycloakMapper = (props) => {
	const keycloakAuth = useContext(KeycloakAuthContext);
	const dispatch = useDispatch();
	useEffect(() => {
		const isAuthorized = keycloakAuth.status === 'authorized';
		dispatch(setIsAuth(isAuthorized));
		if (isAuthorized) {
			dispatch(setUserDetails(mapUserDetails(keycloakAuth.token)));
		}
	}, [dispatch, keycloakAuth]);
	return props.children;
};
VideoManagerKeycloakMapper.propTypes = {
	children: PropTypes.node
};
