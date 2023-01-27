import express from 'express';

const messagesRouter = express.Router();
messagesRouter.post('/send');
messagesRouter.get('/receive');

export default messagesRouter;
