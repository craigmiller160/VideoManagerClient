import moment from './UserDetailsPage';

export const formatRoles = (roles) => roles?.map(role => ({ value: role.roleId, label: role.name }));
export const formatUser = (user) => ({
    ...user,
    roles: formatRoles(user?.roles),
    lastAuthenticated: user?.lastAuthenticated ? moment(user.lastAuthenticated).format(TIMESTAMP_FORMAT) : ''
});
