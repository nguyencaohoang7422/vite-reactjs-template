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
  timekeeping: {
    staff: {
      pagination: `${BASE_URL}/TimekeepingUser/pagination`,
      insert: `${BASE_URL}/TimekeepingUser/insert`,
      insertMany: `${BASE_URL}/TimekeepingUser/insertMany`,
      update: `${BASE_URL}/TimekeepingUser/update`,
      delete: `${BASE_URL}/TimekeepingUser/delete`,
    },
  },
};

export default endpoints;
