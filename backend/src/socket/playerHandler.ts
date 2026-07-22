export function registerPlayerHandlers(io: any, socket: any) {
  socket.on('player_move', (data: { x: number; y: number; anim?: string }) => {
    socket.broadcast.emit('player_moved', {
      id: socket.id,
      x: data.x,
      y: data.y,
      anim: data.anim || 'idle'
    });
  });
}
