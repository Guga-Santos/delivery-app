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

export const createUserRequest = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export default api;
