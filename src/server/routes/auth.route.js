import { Router } from 'express';
import { UserModel } from '../models';
import { verify } from '../../utils/jwt';

const router = Router();

const { login, getUsers, addUser } = UserModel;

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const user = await addUser({ name, email, password });

  // const user = await instance.save();

  res.json(user);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const result = await login({ email, password });

  if (result.data && result.data.token) {
    req.session = { token: result.data.token };
  }

  console.log(req.universalCookies);

  res.json(result);
});

router.all('/logout', (req, res) => {
  req.session = null;

  res.json({ ...global.result })
})

router.all('/users', async (req, res) => {
  console.log('SESSION:', req.session);

  const users = await getUsers();

  res.json(users);
});

export default router;