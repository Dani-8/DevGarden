import { useState, FormEvent } from 'react';
import { Smile, MessageSquare } from 'lucide-react';

interface EmoteWheelProps {
  socket: any;
}

export default function EmoteWheel({ socket }: EmoteWheelProps) {
  const [inputText, setInputText] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const emotes = [
    { key: 'wave', label: '👋', name: 'Wave' },
    { key: 'clap', label: '👏', name: 'Clap' },
    { key: 'smile', label: '😊', name: 'Smile' },
    { key: 'love', label: '❤️', name: 'Love' },
    { key: 'code', label: '💻', name: 'Dev' },
    { key: 'mindblown', label: '🤯', name: 'Boom' },
  ];

  const triggerEmote = (emoteKey: string) => {
    socket.emit('player_chat', { text: emoteKey, isEmote: true });
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = inputText.trim();
    if (!cleaned) return;

    if (cleaned.length > 80) {
      setStatusMessage('Message too long (80 chars max)');
      setTimeout(() => setStatusMessage(null), 2000);
      return;
    }

    // Emit standard chat bubble text
    socket.emit('player_chat', { text: cleaned, isEmote: false });
    setInputText('');
  };

  return (
    <div className="w-full max-w-[620px] mt-2 flex flex-col sm:flex-row items-center gap-3 bg-white border-3 border-[var(--color-natural-border)] p-2.5 rounded-xl shadow-md text-[var(--color-natural-ink)] font-sans">
      
      {/* 1. EMOTE SELECTORS SECTION */}
      <div className="flex items-center gap-2 border-b sm:border-b-0 sm:border-r border-[var(--color-natural-border)]/50 pb-2 sm:pb-0 sm:pr-3 flex-wrap justify-center">
        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1">
          <Smile className="w-3 h-3 text-[var(--color-natural-foliage)]" /> Emotes:
        </span>
        <div className="flex items-center gap-1">
          {emotes.map(em => (
            <button
              key={em.key}
              onClick={() => triggerEmote(em.key)}
              className="w-8 h-8 flex items-center justify-center bg-[var(--color-natural-bg)] border-2 border-[var(--color-natural-border)]/60 hover:border-[var(--color-natural-ink)] hover:bg-[var(--color-natural-accent)]/25 active:scale-90 transition-all text-base rounded-lg cursor-pointer"
              title={`Emote: ${em.name}`}
            >
              {em.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. CHAT BUBBLE INPUT FIELD */}
      <form onSubmit={handleSendMessage} className="flex-1 w-full flex items-center gap-1.5">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            maxLength={80}
            placeholder="Type a bubble message (Enter to send...)"
            className="w-full bg-[var(--color-natural-bg)] border-2 border-[var(--color-natural-border)]/60 rounded-lg px-2.5 py-1.5 text-xs text-[var(--color-natural-ink)] placeholder-slate-450 focus:outline-none focus:border-[var(--color-natural-foliage)] font-mono"
          />
          {statusMessage && (
            <span className="absolute -top-6 left-0 text-[9px] text-red-700 font-mono">
              {statusMessage}
            </span>
          )}
        </div>
        
        <button
          type="submit"
          className="py-1.5 px-3 bg-[var(--color-natural-accent)] hover:bg-[var(--color-natural-accent)]/85 text-[var(--color-natural-ink)] border-2 border-[var(--color-natural-ink)] font-bold text-xs rounded-lg flex items-center gap-1 cursor-pointer font-mono active:scale-[0.98] transition-all natural-shadow-sm"
        >
          <MessageSquare className="w-3 h-3 text-[var(--color-natural-foliage)]" />
          Send
        </button>
      </form>
    </div>
  );
}
