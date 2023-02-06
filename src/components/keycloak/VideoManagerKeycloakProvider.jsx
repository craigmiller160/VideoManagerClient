import {
	KeycloakAuthContext,
	KeycloakAuthProvider
} from '@craigmiller160/react-keycloak';
import { BEARER_TOKEN_KEY } from '@craigmiller160/ajax-api';
import PropTypes from 'prop-types';
import { VideoManagerKeycloakMapper } from './VideoManagerKeycloakMapper';
import { useContext, useEffect } from 'react';

const getRealm = () => {
	if (process.env.NODE_ENV !== 'test') {
		return import.meta.env.VITE_KEYCLOAK_REALM;
	}
	return '';
};

const requiredRoles = {
	client: {
		['video-manager-server']: ['access']
	}
};

const Explorer = (props) => {
	const { status, error, tokenParsed } = useContext(KeycloakAuthContext);
	console.error('KEYCLOAK STATUS', status, error, tokenParsed);
	useEffect(() => {
		if (error) {
			alert('There is an error');
		}
	}, [error]);
	return <>{props.children}</>;
};
Explorer.propTypes = {
	children: PropTypes.node
};

export const VideoManagerKeycloakProvider = (props) => (
	<KeycloakAuthProvider
		realm={getRealm()}
		clientId="video-manager-client"
		localStorageKey={BEARER_TOKEN_KEY}
		requiredRoles={requiredRoles}
		doAccessDeniedRedirect={false}
	>
		<Explorer>
			<VideoManagerKeycloakMapper>
				{props.children}
			</VideoManagerKeycloakMapper>
		</Explorer>
	</KeycloakAuthProvider>
);
VideoManagerKeycloakProvider.propTypes = {
	children: PropTypes.node
};
