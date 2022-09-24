import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const loginRequest = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const registerRequest = async (endpoint, body) => {
  await api.post(endpoint, body);
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
  const { data } = await adminApi.post('/admin/register', body);
  return data;
};

export const getAllProducts = async () => {
  const { data } = await api.get('/products');

  return data;
};

export default api;
