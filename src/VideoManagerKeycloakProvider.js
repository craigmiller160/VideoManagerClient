import { KeycloakAuthProvider } from '@craigmiller160/react-keycloak';
import { BEARER_TOKEN_KEY } from '@craigmiller160/ajax-api';
import PropTypes from 'prop-types';

const ACCESS_TOKEN_EXP_SECS = 300;

const getRealm = () => {
	if (process.env.NODE_ENV !== 'test') {
		return import.meta.env.VITE_KEYCLOAK_REALM;
	}
	return '';
};

export const VideoManagerKeycloakProvider = (props) => (
	<KeycloakAuthProvider
		accessTokenExpirationSecs={ACCESS_TOKEN_EXP_SECS}
		realm={getRealm()}
		authServerUrl="https://auth-craigmiller160.ddns.net/"
		clientId="video-manager-client"
		bearerTokenLocalStorageKey={BEARER_TOKEN_KEY}
	>
		{props.children}
	</KeycloakAuthProvider>
);
VideoManagerKeycloakProvider.propTypes = {
	children: PropTypes.node
};
