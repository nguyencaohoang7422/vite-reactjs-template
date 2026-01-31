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
  file: {
    upload: 'File/uploadFile',
  },
  timekeeping: {
    staff: {
      pagination: `${BASE_URL}/TimekeepingUser/pagination`,
      insert: `${BASE_URL}/TimekeepingUser/insert`,
      insertMany: `${BASE_URL}/TimekeepingUser/insertMany`,
      update: `${BASE_URL}/TimekeepingUser/update`,
      delete: `${BASE_URL}/TimekeepingUser/delete`,
    },
    shift: {
      find: `${BASE_URL}/TimekeepingShift/find`,
      insert: `${BASE_URL}/TimekeepingShift/insert`,
      insertMany: `${BASE_URL}/TimekeepingShift/insertMany`,
      update: `${BASE_URL}/TimekeepingShift/update`,
      delete: `${BASE_URL}/TimekeepingShift/delete`,
    },
  },
};

const getEndpoint = (path: string): string | undefined => {
  return path.split('.').reduce((obj, key) => (obj?.[key] ? obj[key] : undefined), endpoints as any);
};

export { getEndpoint };
export default endpoints;
