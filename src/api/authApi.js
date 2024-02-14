import instance from './axiosInstance';

const register = async (username, password) => {
  return await instance.post('/user/register', {
    username,
    password,
  });
}

const login = async (username, password) => {
  return await instance.post('/user/login', {
    username,
    password,
  });
}

const logout = async () => {
  return await instance.post('/user/logout', {
    id: localStorage.getItem('refreshToken')
  });
}

const endSession = async (id) => {
  return await instance.post('/user/end-session', {
    id
  });
}

const changePassword = async (oldPassword, newPassword) => {
  return await instance.post('/user/change-password', {
    oldPassword,
    newPassword,
  });
}

const toggleTfa = async (tfaCode) => {
  return await instance.post('/user/toggle-tfa', {
    tfaCode
  });
}

const getTfaCode = async () => {
  return await instance.get('/user/get-tfa-key');
}

const getSessions = async () => {
  return await instance.get('/user/get-sessions');
}

const getUsers = async () => {
  return await instance.get('/admin/get-users');
}

const getRoles = async () => {
  return await instance.get('/admin/get-roles');
}

const createUser = async (userName, email) => {
  return await instance.post('/admin/create-user', {
    userName,
    email,
  });
}

const updateUser = async ({id, name, email}) => {
  return await instance.post('/admin/update-user', {
    id,
    name,
    email,
  });
}

const getUser = async (id) => {
  return await instance.get('/admin/get-user?id=' + id);
}

const createRole = async (name) => {
  return await instance.post('/admin/create-role', {
    name,
  });
}

const getRole = async (id) => {
  return await instance.get('/admin/get-role?id=' + id);
}

const updateRole = async (id, name) => {
  return await instance.post('/admin/update-role', {
    id,
    name,
  });
}

const addUserToRole = async (id, name) => {
  return await instance.post('/admin/add-user-to-role', {
    id,
    name,
  });
}

const addClaimToRole = async (id, name) => {
  return await instance.post('/admin/add-claim-to-role', {
    id,
    name,
  });
}

const removeClaimFromRole = async (id, name) => {
  return await instance.post('/admin/remove-claim-from-role', {
    id,
    name,
  });
}

const removeUserFromRole = async (roleId, userId) => {
  return await instance.post('/admin/remove-user-from-role', {
    roleId,
    userId,
  });
}

const deleteUser = async (id) => {
  return await instance.post('/admin/delete-user', {
    id,
  });
}

export default {
  register,
  login,
  logout,
  changePassword,
  getTfaCode,
  toggleTfa,
  getSessions,
  endSession,
  getUsers,
  createUser,
  getRoles,
  createRole,
  getUser,
  updateUser,
  updateRole,
  getRole,
  deleteUser,
  addUserToRole,
  removeUserFromRole,
  addClaimToRole,
  removeClaimFromRole
}