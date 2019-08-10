import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8888/'
});

export default client;

const paths = {
  LOGIN: '/auth/login'
}

export const getUsers = async () => {
  const { data } = await client.get('/auth/users');

  return data;
}

export const postLogin = async ({ email, password }) => {
  const { data } = await client.post(paths.LOGIN, {email, password });

  return data;
}