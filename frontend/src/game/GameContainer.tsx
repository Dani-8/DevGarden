import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import GardenScene from './scenes/GardenScene.js';
import { PlayerState } from '../types/index.js';
import DecorHotbar from '../components/decor/DecorHotbar.js';

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

    const initialWidth = containerRef.current.clientWidth || window.innerWidth;
    const initialHeight = containerRef.current.clientHeight || window.innerHeight;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: initialWidth,
      height: initialHeight,
      parent: containerRef.current,
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
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

    // Set up a robust ResizeObserver to capture container resizing
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      if (gameRef.current && gameRef.current.scale) {
        gameRef.current.scale.resize(width, height);
      }
    });
    resizeObserver.observe(containerRef.current);

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
      resizeObserver.disconnect();
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
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-900">
      <div 
        ref={containerRef} 
        id="phaser-game-stage" 
        tabIndex={0}
        onClick={handleCanvasClick}
        className="w-full h-full outline-none focus:ring-0 focus:border-0 transition-all cursor-pointer"
      />
      
      {/* Ambient Top HUD */}
      <div className="absolute top-4 left-6 right-6 flex items-center justify-between pointer-events-none select-none z-10">
        {/* Lawn Server Online box removed as requested */}
        <div />

        {/* Commented out the hitbox debug button in the UI so it can be enabled later if needed */}
        {/* 
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setDebugMode(!debugMode)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase border transition-all cursor-pointer shadow-md select-none flex items-center gap-1.5 ${
              debugMode 
                ? 'bg-amber-500/90 hover:bg-amber-500 border-amber-400 text-slate-950 animate-pulse' 
                : 'bg-slate-950/85 hover:bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🛠️</span>
            <span>{debugMode ? 'Hide Hitboxes' : 'Show Hitboxes'}</span>
          </button>
        </div>
        */}
      </div>
      
      {/* Decor hotbar */}
      <DecorHotbar />
      
      {/* Control overlay label */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center select-none pointer-events-none z-10 bg-slate-950/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-800/80">
        <p className="text-[10px] font-mono text-slate-400">
          🎮 <span className="text-slate-200 font-semibold">Arrow Keys / WASD</span> to walk • Click developers to inspect contributions • Press <span className="text-amber-400 font-bold">[K]</span> to open/close the Cozy Garden Kit ✨
        </p>
      </div>
    </div>
  );
}
