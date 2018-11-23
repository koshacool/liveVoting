import ioClient from 'socket.io-client';

const url =
  process.env.NODE_ENV === 'production'
    ? `${window.location.hostname}:${window.location.port}`
    : `${window.location.hostname}:3001`;

const io = ioClient(url);
export { io };
