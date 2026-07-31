import { useState } from 'react'
import { PlayerState } from './types/index'

import { useAuth } from './hooks/useAuth'
import { useGameSocket } from './hooks/useGameSocket'

import LoadingScreen from './components/ui/LoadingScreen'
import LoginView from './components/auth/LoginView'
import Sidebar from './components/layout/Sidebar'
import GameContainer from './game/GameContainer'
import ChatBar from './components/chat/ChatBar'
import ConnectionErrorModal from './components/ui/ConnectionErrorModal'
import Leaderboard from './components/leaderboard/Leaderboard'
import ProfileCard from './components/profile/ProfileCard'

export default function App() {
  const { session, checkAuth, logout, bypassLogin } = useAuth();
  const {
    socket,
    selfPlayer,
    playersList,
    npcsList,
    serverStatusMessage,
    setServerStatusMessage,
    welcomeToast,
    hasUnreadChat,
    setHasUnreadChat,
    unlockCosmetics,
    clearSocketState,
  } = useGameSocket(session);

  // UI States
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerState | null>(null);
  const [isNearLeaderboard, setIsNearLeaderboard] = useState(false);
  const [showLeaderboardPanel, setShowLeaderboardPanel] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleLogout = () => {
    logout(() => {
      clearSocketState();
      setSelectedPlayer(null);
    });
  };

  if (!session) {
    return <LoadingScreen />;
  }

  if (!session.loggedIn) {
    return <LoginView onSuccess={checkAuth} onBypass={bypassLogin} />;
  }

  return (
    <div className="fixed inset-0 w-screen h-screen bg-slate-950 text-white flex overflow-hidden antialiased font-sans">
      {/* COLLAPSIBLE SIDEBAR */}
      {session.user && (
        <Sidebar
          user={session.user}
          showLeaderboardPanel={showLeaderboardPanel}
          setShowLeaderboardPanel={setShowLeaderboardPanel}
          isNearLeaderboard={isNearLeaderboard}
          onLogout={handleLogout}
          onUnlockCosmetics={unlockCosmetics}
        />
      )}

      {/* FULL VIEWPORT MAIN PORTAL */}
      <main className="relative flex-1 h-full overflow-hidden">
        {serverStatusMessage ? (
          <ConnectionErrorModal
            message={serverStatusMessage}
            onRetry={() => {
              setServerStatusMessage(null);
              checkAuth();
            }}
          />
        ) : socket && selfPlayer ? (
          <>
            {/* Phaser Game Container */}
            <GameContainer
              socket={socket}
              selfPlayer={selfPlayer}
              initialPlayers={playersList}
              initialNPCs={npcsList}
              onSelectPlayer={setSelectedPlayer}
              onNearLeaderboard={setIsNearLeaderboard}
            />

            {/* WELCOME TOAST NOTIFICATION */}
            {welcomeToast && (
              <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#faf6eb] border-3 border-[#3a2f28] text-[#3a2f28] font-serif font-bold text-xs px-5 py-2.5 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.35)] flex items-center gap-2 animate-fadeIn pointer-events-none select-none">
                <span>{welcomeToast}</span>
              </div>
            )}

            {/* FLOATING CHAT & EMOTE BAR */}
            <ChatBar
              socket={socket}
              isChatOpen={isChatOpen}
              hasUnreadChat={hasUnreadChat}
              setIsChatOpen={setIsChatOpen}
              setHasUnreadChat={setHasUnreadChat}
            />

            {/* LEADERBOARD TREE INTERACTION NOTIFICATION */}
            {isNearLeaderboard && !showLeaderboardPanel && (
              <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-20 bg-[var(--color-natural-accent)] border-2 border-[var(--color-natural-ink)] text-[var(--color-natural-ink)] font-sans font-semibold text-[11px] px-3.5 py-2 rounded-xl shadow-xl animate-bounce backdrop-blur-md flex items-center gap-2">
                <span>🌳</span>
                <span>Stand close to the Leaderboard Tree or click Scoreboard to view!</span>
              </div>
            )}

            {/* OVERLAYS: Scoreboard / Leaderboard Tree Details */}
            {(showLeaderboardPanel || isNearLeaderboard) && (
              <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <Leaderboard onClose={() => setShowLeaderboardPanel(false)} />
              </div>
            )}

            {/* OVERLAYS: Selected Player Profile Panel */}
            {selectedPlayer && (
              <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                <ProfileCard player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
              </div>
            )}
          </>
        ) : (
          <LoadingScreen withSpinner />
        )}
      </main>
    </div>
  );
}
