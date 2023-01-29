import express from 'express';
import mongoose from 'mongoose';
import https from 'https';
import * as fs from 'fs';
import { Server, Socket } from 'socket.io';

import corsResolver from './corsResolver';
import messagesRouter from './routers/messagesRouter';
import usersRouter from './routers/usersRouter';
import {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from './interfaces';

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(corsResolver);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

const server = https.createServer(
  {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  },
  app
);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: 'https://saachko.github.io/email-app',
    credentials: true,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: Socket) => {
  socket.on('send_message', (data: SocketData) => {
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
