const BASE_URL = import.meta.env.VITE_ENDPOINT;

const endpoints = {
  auth: {
    login: `${BASE_URL}/User/login`,
    logout: `${BASE_URL}/User/logout`,
    // register: `${BASE_URL}/User/register`,
  },
  user: {
    // info: `${BASE_URL}/User/info`,
  },
};

export default endpoints;
