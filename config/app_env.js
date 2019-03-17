
const addAppEnv = (env) => {
    if (env.NODE_ENV === 'production') {
        env.API_HOST = 'video-server:8080';
    }
    else {
        env.API_HOST = 'http://localhost:8080';
    }
};

module.exports = {
    addAppEnv
};