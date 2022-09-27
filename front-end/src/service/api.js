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

export const getAllSales = async () => {
  const { data } = await api.get('/sales');

  return data;
};

export const getSalesById = async (id) => {
  const { data } = await api.get(`/sales/${id}`);

  return data;
};

export const getSalesBySellerId = async (id) => {
  const { data } = await api.get(`/seller/${id}`);

  return data;
};

export const createSale = async (sale, token) => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await api.post('/sales', sale, config);

  return data;
};

export const createSaleProducts = async (body, token) => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await api.post('/salesProducts', body, config);

  return data;
};

export const getOrdersByUserId = async (userId) => {
  const { data } = await api.get(`/sales/userId/${userId}`);
  return data;
};

export default api;
