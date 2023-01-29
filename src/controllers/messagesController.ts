import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';
import events from 'events';

import Message from '../models/message';

const emitter = new events.EventEmitter();

const sendMessage = async (request: Request, response: Response) => {
  try {
    const { subject, body, sender, senderName, receiver, receiverName } = request.body;
    const newMessage = new Message({
      subject,
      body,
      sender,
      senderName,
      receiver,
      receiverName,
    });
    emitter.emit('newMessage', newMessage);
    await newMessage.save();
    return response.json({ newMessage, message: 'Your message has been sent' });
  } catch (error) {
    response.status(400).json({ message: "Message can't be sent" });
    throw new Error(`${error}`);
  }
};

const getLatestMessage = async (request: Request, response: Response) => {
  emitter.once('newMessage', (message) => {
    response.json(message);
  });
};

const receiveMessages = async (request: Request, response: Response) => {
  try {
    const receiver = new ObjectId(request.params.id);
    const messages = await Message.find({
      receiver: {
        $all: receiver,
      },
    }).sort({ updatedAt: 1 });
    return response.json(messages);
  } catch (error) {
    response.status(400).json({ message: "Messages can't be received" });
    throw new Error(`${error}`);
  }
};

const getSentMessages = async (request: Request, response: Response) => {
  try {
    const sender = new ObjectId(request.params.id);
    const messages = await Message.find({
      sender: {
        $all: sender,
      },
    }).sort({ updatedAt: 1 });
    return response.json(messages);
  } catch (error) {
    response.status(400).json({ message: "Can't receive messages you've sent" });
    throw new Error(`${error}`);
  }
};

export { sendMessage, getLatestMessage, receiveMessages, getSentMessages };
