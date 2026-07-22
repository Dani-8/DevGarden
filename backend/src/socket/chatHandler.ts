export function registerChatHandlers(io: any, socket: any) {
  socket.on('send_chat', (data: { text: string; isEmote?: boolean }) => {
    io.emit('player_chatted', {
      id: socket.id,
      text: data.text,
      isEmote: !!data.isEmote
    });
  });
}
