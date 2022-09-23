import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const loginRequest = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const usersRequest = async (endpoint) => {
  const data = await api.get(endpoint);
  return data;
};

export const createUserRequest = async (body, token) => {
  const adminApi = axios.create({
    baseURL: 'http://localhost:3001',
    headers: { authorization: token },
  });
  const { data } = await adminApi.post('/users/admin/create', body);
  return data;
};

export default api;
