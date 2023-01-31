# Email-backend

**Email-backend** is a server for sending and receiving emails in life-time.

- node.js
- express
- mongoose
- mongoDB
- socket.io

> **Attention!** The backend is deployed on a free service render.com, so when you run the application for the first time, you need to wait a little bit. Thank you 🙏

[Link to the server deploy](https://email-backend-hut3.onrender.com/)

[Link to the app deploy](https://email-app-socket.netlify.app/)

## Endpoints:

`Users` (`users/` route)

- `POST /login` - new user registration via username
- `GET /` - get all users
- `GET /:userId` - get user by id

`Messages` (`messages/` route)

- `POST /send` - send a message
- `GET /` - get all messages
- `GET /send/userId` - get all messages sent by user
- `GET /receive/:id` - get all messages received by user

_Developed by [Anastasiya Sachko](https://github.com/saachko)_
