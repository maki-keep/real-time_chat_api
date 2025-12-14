const http = require('http');
const url = require('url');

const app = require('./app');
const { BASE_URL, PORT } = require('./config');
const { verifyToken } = require('./middleware/auth');
const webSocketServer = require('./wss');

const server = http.createServer(app);

server.on('upgrade', (request, socket, head) => {
  const { pathname } = url.parse(request.url, true);
  if (pathname !== '/realtime/connect') {
    socket.destroy();
    return;
  }

  try {
    // save the decoded JWT payload into the request object
    const user = verifyToken(request);

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
