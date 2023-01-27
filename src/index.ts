import express from 'express';
import mongoose from 'mongoose';

import corsResolver from './corsResolver';
import usersRouter from './routers/usersRouter';

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(corsResolver);
app.use('/users', usersRouter);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://naztya12323:268bsn@cluster0.heqc0oe.mongodb.net/email-backend?retryWrites=true&w=majority'
    );
    app.listen(PORT, () => console.log('server started'));
  } catch (error) {
    throw new Error(`${error}`);
  }
};

start();
