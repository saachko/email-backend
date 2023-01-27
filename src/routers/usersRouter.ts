import express from 'express';
import { check } from 'express-validator';

import { getUserById, getUsers, logIn } from '../controllers/usersController';

const usersRouter = express.Router();
usersRouter.post(
  '/login',
  [check('username', "Username can't be empty").notEmpty()],
  logIn
);
usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);

export default usersRouter;
