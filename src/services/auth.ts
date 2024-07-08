import api from './api';

export const signUp = async (email: string, password: string, username: string) => {
  const response = await api.post('/signup', { email, password, username });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};
