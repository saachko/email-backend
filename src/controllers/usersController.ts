import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import { ObjectId } from 'mongodb';

import User from '../models/user';

const logIn = async (request: Request, response: Response) => {
  try {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      response.status(400).json({ message: 'Registration error', validationErrors });
    }
    const { username } = request.body;
    const user = await User.findOne({ username });
    if (!user) {
      const newUser = new User({
        username,
      });
      await newUser.save();
      return response.json({ user: newUser, message: 'New user is created' });
    }
    return response.json({ user, message: 'You logged in' });
  } catch (error) {
    response.status(400).json({ message: "Unexpected error! You can't log in" });
    throw new Error(`${error}`);
  }
};

const getUsers = async (request: Request, response: Response) => {
  try {
    const users = await User.find();
    response.json(users);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getUserById = async (request: Request, response: Response) => {
  try {
    const userId = new ObjectId(request.params.id);
    const user = await User.findById(userId);
    response.json(user);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export { logIn, getUsers, getUserById };
