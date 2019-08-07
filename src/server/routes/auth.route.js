import { Router } from 'express';
import { UserModel } from '../models'

const router = Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const user = await UserModel.addUser({ name, email, password });

  // const user = await instance.save();

  res.json(user);
});

router.get('/users', async (req, res) => {
  const users = await UserModel.getUsers();

  res.json(users);
})

export default router;