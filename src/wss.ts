import { WebSocketServer } from 'ws';
import type { WebSocket } from 'ws';
import type { IncomingMessage } from 'http';
import type { JwtPayload } from 'jsonwebtoken';

const webSocketServer = new WebSocketServer({ noServer: true });

webSocketServer.on('connection', (ws: WebSocket, request: IncomingMessage, user: JwtPayload) => {
  ws.user = user;
  ws.on('message', message => {
    // Echo with user info for demo purposes
    const payload = { from: user || null, message: message.toString() };
    ws.send(JSON.stringify(payload));
  });
  ws.send(JSON.stringify({ type: 'welcome', user: user }));
});

export default webSocketServer;
