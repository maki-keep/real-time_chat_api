import { WebSocketServer } from 'ws';
import type { WebSocket } from 'ws';
import type { IncomingMessage } from 'http';
import type { Stream } from 'stream';
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

const upgrade = (request: IncomingMessage, socket: Stream.Duplex, head: Buffer<ArrayBuffer>, user: JwtPayload) => {
  webSocketServer.handleUpgrade(request, socket, head, ws => {
    ws.on('error', () => {
      ws.close(1011, 'Internal server error');
    });

    ws.on('close', code => {
      console.log(`WS closed with code ${code}`);
    });

    webSocketServer.emit('connection', ws, request, user);
  });
}

export { upgrade };
