/* eslint-disable */ // TODO delete this
import moment from 'moment';

const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';

// TODO unit tests

export const formatRoles = (roles) => roles?.map(role => ({ value: role.roleId, label: role.name }));

export const formatUser = (user) => ({
    ...user,
    roles: formatRoles(user?.roles),
    lastAuthenticated: user?.lastAuthenticated ? moment(user.lastAuthenticated).format(TIMESTAMP_FORMAT) : ''
});

export const unFormatRoles = (roles) => roles?.map((role) => ({ roleId: role.value, name: role.label }));
