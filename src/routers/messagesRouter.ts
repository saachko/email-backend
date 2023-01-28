import express from 'express';
import { sendMessage, receiveMessages } from '../controllers/messagesController';

const messagesRouter = express.Router();
messagesRouter.post('/send', sendMessage);
messagesRouter.get('/receive', receiveMessages);

export default messagesRouter;
