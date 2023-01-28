import { Response, Request } from 'express';

import Message from '../models/message';

const sendMessage = async (request: Request, response: Response) => {
  try {
    const { subject, body, sender, receiver } = request.body;
    const newMessage = new Message({
      subject,
      body,
      sender,
      receiver,
    });
    await newMessage.save();
    return response.json({ newMessage, message: 'Your message have been sent' });
  } catch (error) {
    response.status(400).json({ message: "Message can't be sent" });
    throw new Error(`${error}`);
  }
};

const receiveMessages = async (request: Request, response: Response) => {
  try {
    const { receiver } = request.body;
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

export { sendMessage, receiveMessages };
