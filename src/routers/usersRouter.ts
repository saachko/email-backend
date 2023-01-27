import express from 'express';

const usersRouter = express.Router();
usersRouter.get('/users');
usersRouter.post('/users');
usersRouter.get('/:id');

export default usersRouter;
