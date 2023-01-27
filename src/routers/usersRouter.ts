import express from 'express';
import { check } from 'express-validator';

import { logIn } from '../controllers/usersController';

const usersRouter = express.Router();
usersRouter.post(
  '/login',
  [check('username', "Username can't be empty").notEmpty()],
  logIn
);
usersRouter.get('/');
usersRouter.get('/:id');

export default usersRouter;
