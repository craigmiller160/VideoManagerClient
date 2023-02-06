import { KeycloakAuthProvider } from '@craigmiller160/react-keycloak';
import { BEARER_TOKEN_KEY } from '@craigmiller160/ajax-api';
import PropTypes from 'prop-types';
import { VideoManagerKeycloakMapper } from './VideoManagerKeycloakMapper';

const getRealm = () => {
	if (process.env.NODE_ENV !== 'test') {
		return import.meta.env.VITE_KEYCLOAK_REALM;
	}
	return '';
};

export const VideoManagerKeycloakProvider = (props) => (
	<KeycloakAuthProvider
		realm={getRealm()}
		clientId="video-manager-client"
		localStorageKey={BEARER_TOKEN_KEY}
	>
		<VideoManagerKeycloakMapper>
			{props.children}
		</VideoManagerKeycloakMapper>
	</KeycloakAuthProvider>
);
VideoManagerKeycloakProvider.propTypes = {
	children: PropTypes.node
};
