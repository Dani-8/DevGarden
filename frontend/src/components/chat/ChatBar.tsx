import EmoteWheel from '../social/EmoteWheel'

interface ChatBarProps {
  socket: any;
  isChatOpen: boolean;
  hasUnreadChat: boolean;
  setIsChatOpen: (open: boolean) => void;
  setHasUnreadChat: (unread: boolean) => void;
}

export default function ChatBar({
  socket,
  isChatOpen,
  hasUnreadChat,
  setIsChatOpen,
  setHasUnreadChat,
}: ChatBarProps) {
  return (
    <>
      {/* 1. COLLAPSED TRIGGER BUTTON: Fixed completely at bottom-center, compact ↑ icon, expands label on hover */}
      <div
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-300 ease-out transform ${
          !isChatOpen
            ? 'translate-y-0 opacity-100'
            : 'translate-y-6 opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={() => {
            setIsChatOpen(true);
            setHasUnreadChat(false);
          }}
          className="group pointer-events-auto relative flex items-center justify-center gap-2 bg-[#faf6eb] hover:bg-[#ffae34] border-2 border-b-0 border-[#3a2f28] text-[#3a2f28] font-serif font-bold text-xs px-3 py-1.5 rounded-t-xl shadow-[0_-3px_10px_rgba(0,0,0,0.2)] cursor-pointer select-none transition-all duration-200 hover:px-4 active:scale-95"
          title="Open Chat & Emotes"
        >
          {hasUnreadChat && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500 border border-white"></span>
            </span>
          )}

          {/* Smoothly expanding label on hover */}
          <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[140px] group-hover:opacity-100 transition-all duration-300 ease-out whitespace-nowrap text-xs font-serif font-bold tracking-tight">
            Chat & Emotes
          </span>

          {/* Compact Up Arrow icon */}
          <span className="text-[11px] font-mono leading-none bg-[#3a2f28]/10 group-hover:bg-[#3a2f28]/20 px-1.5 py-0.5 rounded transition-transform group-hover:-translate-y-0.5">
            ▲
          </span>
        </button>
      </div>

      {/* 2. EXPANDED CHAT PANEL: Preserved exactly in original position, size, layout, and functionality */}
      <div
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] max-w-[600px] md:max-w-[650px] pointer-events-none flex flex-col items-center transition-all duration-300 ease-out transform ${
          isChatOpen
            ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
            : 'translate-y-8 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="w-full flex items-center gap-2">
          <div className="flex-1">
            <EmoteWheel socket={socket} />
          </div>
          <button
            onClick={() => setIsChatOpen(false)}
            className="p-2.5 bg-[#faf6eb] hover:bg-rose-100 border-2 border-[#3a2f28] text-[#3a2f28] rounded-2xl shadow-[3px_3px_0px_#3a2f28] flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 shrink-0"
            title="Close Chat"
          >
            <span className="text-xs font-bold font-mono">▼</span>
          </button>
        </div>
      </div>
    </>
  );
}
