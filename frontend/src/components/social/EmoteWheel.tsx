import React, { useState, useRef, useEffect } from 'react';

interface EmoteWheelProps {
  socket?: any;
  onSelectEmote?: (emoteKey: string) => void;
  onSendChatText?: (text: string) => void;
  onClose?: () => void;
}

export default function EmoteWheel({ socket, onSelectEmote, onSendChatText, onClose }: EmoteWheelProps) {
  const [chatInput, setChatInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const emotes = [
    { key: 'wave', label: 'Wave 👋', icon: '👋' },
    { key: 'clap', label: 'Clap 👏', icon: '👏' },
    { key: 'smile', label: 'Smile 😊', icon: '😊' },
    { key: 'love', label: 'Heart ❤️', icon: '❤️' },
    { key: 'code', label: 'Code 💻', icon: '💻' },
    { key: 'mindblown', label: 'Mindblown 🤯', icon: '🤯' },
  ];

  useEffect(() => {
    // Focus the input when opened
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleEmoteClick = (key: string) => {
    if (onSelectEmote) {
      onSelectEmote(key);
    }
    if (socket) {
      socket.emit('player_chat', { text: key, isEmote: true });
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    if (onSendChatText) {
      onSendChatText(chatInput.trim());
    }
    if (socket) {
      socket.emit('player_chat', { text: chatInput.trim(), isEmote: false });
    }
    setChatInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      inputRef.current?.blur();
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <div className="flex items-center gap-2 bg-[#faf6eb]/95 border-2 border-[#3a2f28] p-1.5 rounded-2xl shadow-[4px_4px_0px_#3a2f28] backdrop-blur-md pointer-events-auto">
      <div className="flex items-center gap-1">
        {emotes.map((e) => (
          <button
            key={e.key}
            type="button"
            onClick={() => handleEmoteClick(e.key)}
            title={e.label}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white hover:bg-[#ffae34]/30 border border-[#3a2f28]/20 hover:border-[#3a2f28] text-base hover:scale-110 active:scale-95 transition-all cursor-pointer select-none"
          >
            {e.icon}
          </button>
        ))}
      </div>

      {/* Vertical divider line */}
      <div className="w-[2px] h-6 bg-[#3a2f28]/25 rounded-full mx-1 shrink-0" />

      <form onSubmit={handleSendChat} className="flex-1 flex items-center gap-1 min-w-[120px]">
        <input
          ref={inputRef}
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Say something... (Press Esc to close)"
          maxLength={80}
          className="w-full px-2.5 py-1 text-xs bg-white border border-[#3a2f28]/30 rounded-xl focus:outline-none focus:border-[#3a2f28] font-sans text-[#3a2f28]"
        />
        <button
          type="submit"
          className="px-2.5 py-1 bg-[#ffae34] hover:bg-[#ffb94f] text-[#3a2f28] border border-[#3a2f28] rounded-xl text-xs font-bold font-serif cursor-pointer shrink-0 active:scale-95 transition-transform"
        >
          Send
        </button>
      </form>
    </div>
  );
}
