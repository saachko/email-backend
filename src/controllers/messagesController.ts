import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';

import Message from '../models/message';

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
    await newMessage.save();
    return response.json({ newMessage, message: 'Your message have been sent' });
  } catch (error) {
    response.status(400).json({ message: "Message can't be sent" });
    throw new Error(`${error}`);
  }
};

const getAllMessages = async (request: Request, response: Response) => {
  try {
    const messages = await Message.find().sort({ updatedAt: 1 });
    return response.json(messages);
  } catch (error) {
    response.status(400).json({ message: "Messages can't be received" });
    throw new Error(`${error}`);
  }
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

export { sendMessage, getAllMessages, receiveMessages, getSentMessages };
