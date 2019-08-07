import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8888/'
});

export default client;

export const getUsers = async () => {
  const { data } = await client.get('/auth/users');

  return data;
}