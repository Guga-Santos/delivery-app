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

export default api;
