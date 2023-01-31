import PropTypes from 'prop-types';
import {useContext, useEffect} from "react";
import {KeycloakAuthContext} from "@craigmiller160/react-keycloak";
import {useDispatch} from "react-redux";
import {setIsAuth, setUserDetails} from "../../store/auth/auth.actions";

const mapUserDetails = (token) => ({
	firstName: '',
	lastName: '',
	username: '',
	roles: []
});

export const VideoManagerKeycloakMapper = (props) => {
	const keycloakAuth = useContext(KeycloakAuthContext);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setIsAuth(keycloakAuth.isAuthorized));
		if (keycloakAuth.isAuthorized) {
			dispatch(setUserDetails(mapUserDetails(keycloakAuth.token)));
		}
	}, [dispatch, keycloakAuth]);
	return props.children;
};
VideoManagerKeycloakMapper.propTypes = {
	children: PropTypes.node
};
