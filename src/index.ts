import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';

import corsResolver from './corsResolver';
import messagesRouter from './routers/messagesRouter';
import usersRouter from './routers/usersRouter';

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(corsResolver);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data);
  });
});

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://naztya12323:268bsn@cluster0.heqc0oe.mongodb.net/email-backend?retryWrites=true&w=majority'
    );
    server.listen(PORT, () => console.log('server started'));
  } catch (error) {
    throw new Error(`${error}`);
  }
};

start();
