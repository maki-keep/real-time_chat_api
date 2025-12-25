import http from 'http';

import app from './app.js';
import config from './config.js';
import { verifyToken } from './middleware/auth.js';
import destroySocket from './utils/destroySocket.js';
import { upgrade } from './wss.js';

const { BASE_URL, PORT, SERVER_UPGRADE_PATH } = config;

const server = http.createServer(app);

server.on('upgrade', (request, socket, head) => {
  // only accept websocket upgrades
  if (request.headers.upgrade?.toLowerCase() !== 'websocket') {
    destroySocket(socket, '400 Bad Request');
    return;
  }

  let url: URL;

  try {
    // build url with root path if no request url is provided
    url = new URL(request.url ?? '/', `${BASE_URL}:${PORT}`);
  } catch {
    destroySocket(socket, '400 Bad Request');
    return;
  }

  // enforce upgrade path
  if (url.pathname !== SERVER_UPGRADE_PATH) {
    destroySocket(socket, '404 Not Found');
    return;
  }

  try {
    // authenticate before upgrade
    const user = verifyToken(request as any);

    // normalize url for ws
    request.url = url.pathname;

    // upgrade to websocket
    upgrade(request, socket, head, user);
  } catch {
    // policy violation
    destroySocket(socket, '401 Unauthorized');
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on ${BASE_URL}:${PORT}`);
});
