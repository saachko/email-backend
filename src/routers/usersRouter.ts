import express from 'express';

import { logIn } from '../controllers/usersController';

const usersRouter = express.Router();
usersRouter.get('/');
usersRouter.post('/login', logIn);
usersRouter.get('/:id');

export default usersRouter;
