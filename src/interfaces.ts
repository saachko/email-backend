interface ServerToClientEvents {
  receive_message: (d: SocketData) => void;
}

interface ClientToServerEvents {
  send_message: (d: SocketData) => void;
}

interface InterServerEvents {}

interface SocketData {
  subject: string;
  body: string;
  sender: string;
  senderName: string;
  receiver: string;
  receiverName: string;
}

export { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData };
