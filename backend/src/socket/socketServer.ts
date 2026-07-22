import { Server as HttpServer } from 'http';
import { registerPlayerHandlers } from './playerHandler.js';
import { registerChatHandlers } from './chatHandler.js';
import { registerDecorHandlers } from './decorHandler.js';

let ioInstance: any = null;

export function initSocketServer(server: HttpServer): any {
  // If socket.io is attached dynamically
  return ioInstance;
}

export function registerSocketEvents(io: any) {
  ioInstance = io;
  io.on('connection', (socket: any) => {
    registerPlayerHandlers(io, socket);
    registerChatHandlers(io, socket);
    registerDecorHandlers(io, socket);

    socket.on('disconnect', () => {
      io.emit('player_left', { id: socket.id });
    });
  });
}

export function getIO(): any {
  return ioInstance;
}
