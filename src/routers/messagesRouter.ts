import express from 'express';
import {
  sendMessage,
  receiveMessages,
  getSentMessages,
} from '../controllers/messagesController';

const messagesRouter = express.Router();
messagesRouter.post('/send', sendMessage);
messagesRouter.get('/send/:id', getSentMessages);
messagesRouter.get('/receive/:id', receiveMessages);

export default messagesRouter;
