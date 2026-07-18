import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import GardenScene from './scenes/GardenScene.js';
import { PlayerState } from '../../types.js';

interface GameContainerProps {
  socket: any;
  selfPlayer: PlayerState;
  initialPlayers: PlayerState[];
  initialNPCs: PlayerState[];
  onSelectPlayer: (player: PlayerState) => void;
  onNearLeaderboard: (isNear: boolean) => void;
}

export default function GameContainer({
  socket,
  selfPlayer,
  initialPlayers,
  initialNPCs,
  onSelectPlayer,
  onNearLeaderboard,
}: GameContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if game is already initialized
    if (gameRef.current) {
      gameRef.current.destroy(true);
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: containerRef.current,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: debugMode,
        },
      },
      pixelArt: true, // Enables crisp, pixelated rendering for pixel-art
      scene: [GardenScene],
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    // Start scene with synchronized initial state
    game.scene.start('GardenScene', {
      socket,
      self: selfPlayer,
      players: initialPlayers,
      sleepingNPCs: initialNPCs,
      onSelectPlayer,
      onNearLeaderboard,
    });

    // Prevent key capture during text typing in any INPUT or TEXTAREA
    const handleInputFocus = () => {
      if (gameRef.current && gameRef.current.input && gameRef.current.input.keyboard) {
        gameRef.current.input.keyboard.enabled = false;
      }
    };

    const handleInputBlur = () => {
      if (gameRef.current && gameRef.current.input && gameRef.current.input.keyboard) {
        gameRef.current.input.keyboard.enabled = true;
        // Clear any stuck key states from when focus was lost
        if (typeof (gameRef.current.input.keyboard as any).resetKeys === 'function') {
          (gameRef.current.input.keyboard as any).resetKeys();
        }
      }
    };

    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        handleInputFocus();
      }
    };

    const onFocusOut = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        handleInputBlur();
      }
    };

    const handleKeyboardCapture = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        e.stopPropagation();
      }
    };

    window.addEventListener('focusin', onFocusIn);
    window.addEventListener('focusout', onFocusOut);
    window.addEventListener('keydown', handleKeyboardCapture, true);
    window.addEventListener('keyup', handleKeyboardCapture, true);
    window.addEventListener('keypress', handleKeyboardCapture, true);

    // Initial focus on mount to allow immediate movement
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.focus();
      }
    }, 100);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('focusin', onFocusIn);
      window.removeEventListener('focusout', onFocusOut);
      window.removeEventListener('keydown', handleKeyboardCapture, true);
      window.removeEventListener('keyup', handleKeyboardCapture, true);
      window.removeEventListener('keypress', handleKeyboardCapture, true);
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [socket, selfPlayer, debugMode]); // Re-initialize only if connection or debug mode changes

  const handleCanvasClick = () => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-[816px] mx-auto">
      {/* Golden display frame */}
      <div className="w-full bg-slate-950 border-4 border-slate-800 rounded-xl overflow-hidden shadow-2xl p-1 relative">
        <div 
          ref={containerRef} 
          id="phaser-game-stage" 
          tabIndex={0}
          onClick={handleCanvasClick}
          className="w-[800px] h-[600px] mx-auto bg-slate-900 rounded-md outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all cursor-pointer"
        />
        
        {/* Ambient Top HUD */}
        <div className="absolute top-4 left-6 right-6 flex items-center justify-between pointer-events-none select-none">
          <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800/80 px-3 py-1.5 rounded-lg flex items-center gap-2 pointer-events-auto">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Lawn Server Online</span>
          </div>

          <button
            onClick={() => setDebugMode(!debugMode)}
            className={`pointer-events-auto px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase border transition-all cursor-pointer shadow-md select-none flex items-center gap-1.5 ${
              debugMode 
                ? 'bg-amber-500/90 hover:bg-amber-500 border-amber-400 text-slate-950 animate-pulse' 
                : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🛠️</span>
            <span>{debugMode ? 'Hide Hitboxes' : 'Show Hitboxes'}</span>
          </button>
        </div>
      </div>
      
      {/* Control overlay label */}
      <div className="mt-2 text-center select-none pointer-events-none">
        <p className="text-[11px] font-mono text-slate-500">
          🎮 <span className="text-slate-400 font-semibold">Arrow Keys / WASD</span> to walk • Click developers to inspect contributions • Get close to the <span className="text-amber-500">Leaderboard Tree</span> 🌳
        </p>
      </div>
    </div>
  );
}
