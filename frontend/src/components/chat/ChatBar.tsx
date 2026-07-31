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
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] max-w-[600px] md:max-w-[650px] pointer-events-none flex flex-col items-center">
            {/* Trigger Button when collapsed */}
            <div
                className={`transition-all duration-300 ease-out transform ${!isChatOpen
                    ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
                    : 'translate-y-6 opacity-0 scale-90 pointer-events-none'
                    }`}
            >
                <button
                    onClick={() => {
                        setIsChatOpen(true);
                        setHasUnreadChat(false);
                    }}
                    className="relative px-5 py-2 bg-[#faf6eb] hover:bg-[#ffae34] border-3 border-[#3a2f28] text-[#3a2f28] font-serif font-bold text-xs rounded-2xl shadow-[4px_4px_0px_#3a2f28] flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95 select-none"
                    title="Open Chat & Emotes"
                >
                    {hasUnreadChat && (
                        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500 border border-white"></span>
                        </span>
                    )}
                    <span>Chat & Emotes</span>
                    <span className="text-[10px] bg-[#3a2f28]/10 px-1.5 py-0.5 rounded font-mono">▲</span>
                </button>
            </div>

            {/* Expanded Chat Box */}
            <div
                className={`w-full transition-all duration-300 ease-out transform origin-bottom ${isChatOpen
                    ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
                    : 'translate-y-10 opacity-0 scale-95 pointer-events-none absolute bottom-0'
                    } flex items-center gap-2`}
            >
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
    );
}
