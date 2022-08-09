const API_VERSION = 1;
const preffix = `/api/v${API_VERSION}`;

const AUTH = {
    LOGIN: `${preffix}/auth/login`,
    REGISTER: `${preffix}/auth/register`,
    VERIFY: `${preffix}/auth/verify`,
    GET_ALL: `${preffix}/auth`,
    GET_ONE: `${preffix}/auth/`,
    UPDATE: `${preffix}/auth/`,
    DELETE: `${preffix}/auth/`,
};

export default {
    AUTH,
};
