import { useState, useEffect } from 'react';

export interface HotbarItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

const DECOR_ITEMS: HotbarItem[] = [
  { id: 'campfire', name: 'Cozy Campfire', emoji: '🔥', description: 'A warm, crackling campfire that glows.' },
  { id: 'lantern', name: 'Iron Lantern', emoji: '🏮', description: 'A charming iron lantern that lights up the dark.' },
  { id: 'picnic', name: 'Picnic Table', emoji: '🧺', description: 'A rustic wooden table with juice and snacks.' },
  { id: 'bench', name: 'Garden Bench', emoji: '🪑', description: 'A comfortable bench to sit and relax on.' },
  { id: 'sunflower', name: 'Sunflower Pot', emoji: '🌻', description: 'A beautiful bright potted sunflower.' },
  { id: 'mushroom', name: 'Forest Mushroom', emoji: '🍄', description: 'A magical giant glowing forest mushroom.' },
  { id: 'duckpool', name: 'Duck Pool', emoji: '🦆', description: 'A cute splashy inflatable yellow duck pool.' },
  { id: 'hammer', name: 'Demolish Hammer', emoji: '🔨', description: 'Click any of your placed items to reclaim them.' },
];

export default function DecorHotbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<HotbarItem | null>(null);

  useEffect(() => {
    const event = new CustomEvent('garden-kit-state-changed', {
      detail: { isOpen }
    });
    window.dispatchEvent(event);
  }, [isOpen]);

  useEffect(() => {
    const event = new CustomEvent('select-decor-tool', {
      detail: { toolId: selectedId }
    });
    window.dispatchEvent(event);
  }, [selectedId]);

  useEffect(() => {
    const handleToggle = () => {
      setIsOpen(prev => {
        const nextState = !prev;
        if (!nextState) {
          setSelectedId(null);
          setShowInfo(false);
        }
        return nextState;
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || (activeEl as HTMLElement).isContentEditable)) {
        return;
      }

      if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        handleToggle();
        return;
      }

      if (!isOpen) return;

      const keyNum = parseInt(e.key);
      if (keyNum >= 1 && keyNum <= 8) {
        e.preventDefault();
        const item = DECOR_ITEMS[keyNum - 1];
        if (item) {
          setSelectedId(prev => prev === item.id ? null : item.id);
        }
      } else if (e.key === 'Escape') {
        setSelectedId(null);
      }
    };

    window.addEventListener('toggle-garden-kit', handleToggle);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('toggle-garden-kit', handleToggle);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleCancel = () => {
      setSelectedId(null);
    };
    window.addEventListener('cancel-decor-tool', handleCancel);
    return () => window.removeEventListener('cancel-decor-tool', handleCancel);
  }, []);

  const handleSelect = (item: HotbarItem) => {
    setSelectedId(prev => prev === item.id ? null : item.id);
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none pointer-events-auto z-20 w-[90%] max-w-lg">
      {isOpen && showInfo && (
        <div className="bg-[#faf6eb] border-4 border-[#3a2f28] p-3.5 rounded-xl shadow-[6px_6px_0px_0px_rgba(58,47,40,0.15)] max-w-md text-left relative animate-fade-in mb-1">
          <button
            onClick={() => setShowInfo(false)}
            className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#3a2f28]/10 hover:bg-[#3a2f28]/20 rounded-full text-[10px] text-[#3a2f28] flex items-center justify-center cursor-pointer font-bold border-0"
          >
            ✕
          </button>

          <h4 className="text-[#3a2f28] font-press text-[10px] uppercase mb-1.5 flex items-center gap-1.5">
            <span>✨ Garden Kit Guide</span>
          </h4>
          <ul className="text-[#514339] text-xs font-pixel space-y-1.5 leading-relaxed list-disc list-inside">
            <li>Press keys <span className="font-bold font-mono text-[#3a2f28] bg-amber-200/50 px-1 rounded">1-8</span> or click items on the hotbar to select.</li>
            <li>Click anywhere on the grassy ground in the garden to place your item.</li>
            <li>Use the <span className="font-bold">🔨 Demolish Hammer</span> (Slot 8) to click and remove any items you have placed.</li>
            <li>Any structures you build are saved to the database for all players to see!</li>
          </ul>
        </div>
      )}

      {isOpen && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-in relative">
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border-2 border-slate-700/60 shadow-2xl backdrop-blur-md relative">
            {hoveredItem && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-950/95 border border-slate-800 text-slate-100 rounded-lg px-3 py-1.5 shadow-xl w-64 text-center backdrop-blur-md pointer-events-none z-30 animate-fade-in">
                <p className="text-xs font-bold text-amber-400">{hoveredItem.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{hoveredItem.description}</p>
              </div>
            )}

            {DECOR_ITEMS.map((item, index) => {
              const isSelected = selectedId === item.id;
              const isHammer = item.id === 'hammer';

              return (
                <button
                  id={`hotbar-slot-${item.id}`}
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`relative w-11 h-11 rounded-lg flex items-center justify-center text-xl transition-all duration-150 cursor-pointer border ${isSelected
                      ? 'bg-amber-500/30 border-amber-400 shadow-inner scale-105 ring-2 ring-amber-400/50'
                      : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 hover:scale-105'
                    }`}
                >
                  <span className="absolute top-0.5 left-1 text-[8px] font-mono text-slate-500 font-bold">
                    {index + 1}
                  </span>

                  <span className={`select-none filter drop-shadow ${isSelected ? 'animate-pulse' : ''}`}>
                    {item.emoji}
                  </span>

                  {isSelected && !isHammer && (
                    <span className="absolute inset-0 border border-amber-400 rounded-lg animate-ping opacity-30 pointer-events-none" />
                  )}
                </button>
              );
            })}

            <button
              onClick={() => setShowInfo(prev => !prev)}
              className={`w-11 h-11 rounded-lg flex items-center justify-center text-lg transition-all duration-150 cursor-pointer border ${showInfo
                  ? 'bg-amber-500/30 border-amber-400 ring-2 ring-amber-400/50 scale-105'
                  : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 hover:scale-105'
                }`}
              title="How to Use"
            >
              ❓
            </button>
          </div>
        </div>
      )}

      {isOpen && selectedId && (
        <div className="bg-amber-500/15 border border-amber-500/25 px-3 py-1 rounded-full backdrop-blur-md animate-pulse">
          <p className="text-[10px] font-mono text-amber-400 font-semibold">
            {selectedId === 'hammer'
              ? '🔨 Click any item you placed in the garden to remove it!'
              : `✨ Click on the grass to place your ${DECOR_ITEMS.find(d => d.id === selectedId)?.name}! [ESC] to cancel`
            }
          </p>
        </div>
      )}
    </div>
  );
}
