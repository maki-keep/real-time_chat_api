const WebSocket = require('ws');

const webSocketServer = new WebSocket.Server({ noServer: true });

webSocketServer.on('connection', (ws, request, user) => {
  ws.user = user;
  ws.on('message', message => {
    // Echo with user info for demo purposes
    const payload = { from: user || null, message: message.toString() };
    ws.send(JSON.stringify(payload));
  });
  ws.send(JSON.stringify({ type: 'welcome', user: user }));
});

module.exports = webSocketServer;
