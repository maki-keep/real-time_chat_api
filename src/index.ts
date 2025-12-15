import http from 'http';
import { IncomingMessage } from 'http';
import url from 'url';

import app from './app.ts';
import config from './config.ts';
import { verifyToken } from './middleware/auth.ts';
import webSocketServer from './wss.ts';

const { BASE_URL, PORT } = config;

const server = http.createServer(app);

server.on('upgrade', (request: IncomingMessage, socket, head) => {
  const { pathname } = url.parse(request.url || '', true);
  if (pathname !== '/realtime/connect') {
    socket.destroy();
    return;
  }

  try {
    // save the decoded JWT payload into the request object
    const user = verifyToken(request as any);

    webSocketServer.handleUpgrade(request, socket, head, ws => {
      webSocketServer.emit('connection', ws, request, user);
    });
  } catch (err) {
    try {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    } finally {
      socket.destroy();
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on ${BASE_URL}:${PORT}`);
});
