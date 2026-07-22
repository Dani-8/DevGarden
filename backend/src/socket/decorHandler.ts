import { DecorationRow } from '../db/decorations.js';

export function registerDecorHandlers(io: any, socket: any) {
  socket.on('place_decor', (decor: DecorationRow) => {
    socket.broadcast.emit('decor_placed', decor);
  });

  socket.on('remove_decor', (data: { id: string }) => {
    socket.broadcast.emit('decor_removed', data);
  });
}
