import type { Stream } from 'stream';

const destroySocket = (socket: Stream.Duplex, message: string) => {
  socket.write(`HTTP/1.1 ${message}\r\n\r\n`);
  socket.destroy();
};

export default destroySocket;
