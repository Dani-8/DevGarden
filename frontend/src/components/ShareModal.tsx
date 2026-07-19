import React, { useState, useEffect } from 'react';
import { Share2, Twitter, Linkedin, Check, Gift, Sparkles, X, Trash2, Copy } from 'lucide-react';
import { UserProfile } from '../types.js';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUnlock: (cosmetics: string[]) => void;
}

export default function ShareModal({ isOpen, onClose, user, onUnlock }: ShareModalProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [equipped, setEquipped] = useState(true);
  const [hasShared, setHasShared] = useState(false);
  const [activeTab, setActiveTab] = useState<'linkedin' | 'x'>('linkedin');
  const [copied, setCopied] = useState(false);

  // Load initial state
  useEffect(() => {
    try {
      const stored = localStorage.getItem('devgarden_unlocked_cosmetics');
      if (stored) {
        const list = JSON.parse(stored);
        if (list.includes('gardener_hat')) {
          setUnlocked(true);
        }
      }
    } catch (e) {
      console.error('Error loading unlocked cosmetics:', e);
    }
  }, []);

  if (!isOpen) return null;

  const repoUrl = "https://github.com/Dani-8/DevGarden";
  const liveUrl = "https://dev-garden-35o4.vercel.app/";

  const linkedinText = `I just stumbled upon DevGarden through a developer's GitHub profile and oh my god, this is easily the coolest interactive multiplayer greenhouse for coders! 🌿💻

It's a cozy developer workspace built by @Dani-8 (https://github.com/Dani-8). You walk around as your actual GitHub avatar, chat in real-time, and work together to water & grow a community Sprout Tree!

Play the live game here: ${liveUrl}
And help us nurture the Sprout Tree by starring the repo: ${repoUrl} ⭐

Let's cultivate something amazing together!

#webdev #gamedev #indiegamedev #phaserjs #reactjs #github #programming #ai #coding #opensource #gamification`;

  const xText = `I just found DevGarden by @Dani-8—an interactive multiplayer greenhouse for coders! 🌿 Walk around as your GitHub avatar, chat real-time, and nurture the Sprout Tree! 💦

Play here: ${liveUrl}
Repo: ${repoUrl} ⭐
#gamedev #reactjs #github #coding`;

  const handleShareX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(xText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setHasShared(true);
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(repoUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setHasShared(true);
  };

  const handleCopy = () => {
    const textToCopy = activeTab === 'linkedin' ? linkedinText : xText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClaimReward = () => {
    try {
      const gear = ['gardener_hat', 'watering_can'];
      localStorage.setItem('devgarden_unlocked_cosmetics', JSON.stringify(gear));
      onUnlock(gear);
      setUnlocked(true);
      setEquipped(true);
    } catch (e) {
      console.error('Failed to save rewards:', e);
    }
  };

  const handleToggleEquip = () => {
    if (equipped) {
      // Unequip
      onUnlock([]);
      setEquipped(false);
    } else {
      // Equip
      onUnlock(['gardener_hat', 'watering_can']);
      setEquipped(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      {/* Modal Card container */}
      <div 
        id="share-modal-content"
        className="relative w-full max-w-md bg-white border-4 border-[var(--color-natural-border)] rounded-2xl p-6 text-[var(--color-natural-ink)] natural-shadow-lg flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header section */}
        <div className="flex items-center justify-between border-b-2 border-[var(--color-natural-border)]/20 pb-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[var(--color-natural-foliage)]" />
            <h2 className="text-md font-bold font-serif tracking-wide text-slate-900">
              Spread the Seeds
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700 cursor-pointer"
            title="Close panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Informative text */}
        <div className="text-xs text-slate-600 leading-relaxed font-sans">
          Nurture the garden and help our repository grow! Share your progress with your community and instantly unlock **exclusive developer cosmetics** for your character!
        </div>

        {/* 1. GARDENER PROFILE CARD SNAPSHOT */}
        <div className="border-3 border-dashed border-[var(--color-natural-foliage)]/60 bg-[var(--color-natural-bg)] p-4 rounded-xl flex items-center gap-4 relative overflow-hidden select-none">
          <div className="absolute top-0 right-0 bg-[var(--color-natural-foliage)] text-white text-[7px] font-bold font-mono uppercase px-2 py-0.5 rounded-bl-lg shadow-sm">
            Gardener Snapshot
          </div>

          <img 
            src={user.avatar_url} 
            alt={user.username} 
            className="w-14 h-14 rounded-full border-3 border-white object-cover shadow-sm flex-shrink-0"
            referrerPolicy="no-referrer"
          />

          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-slate-800 truncate">
                {user.username}
              </span>
              <span className="text-[9px] font-bold text-[var(--color-natural-foliage)] font-mono">
                Lvl {user.level}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 italic leading-none capitalize mt-0.5 font-serif">
              {user.title || 'Gardener'}
            </span>

            {/* Profile stat line */}
            <div className="flex items-center gap-3 mt-2 text-[9px] font-mono text-slate-600 border-t border-slate-200/50 pt-1.5">
              <div>
                <span className="font-bold text-slate-800">{user.commits}</span> Commits
              </div>
              <div className="w-1 h-1 bg-slate-300 rounded-full" />
              <div>
                <span className="font-bold text-slate-800">{user.stars}</span> Stars
              </div>
            </div>
          </div>

          {/* Micro preview of unlocked cosmetics sitting on snapshot! */}
          {unlocked && equipped && (
            <div className="absolute bottom-2 right-2 flex gap-1 animate-bounce">
              <span className="text-sm" title="Gardener Hat">👒</span>
              <span className="text-sm" title="Watering Can">🚰</span>
            </div>
          )}
        </div>

        {/* 2. DRAFT CAPTION PREVIEW */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wide">
              Draft Caption Preview
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setActiveTab('linkedin')}
                className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'linkedin'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                    : 'bg-slate-50 text-slate-500 border border-transparent hover:bg-slate-100'
                }`}
              >
                LinkedIn (Long)
              </button>
              <button
                onClick={() => setActiveTab('x')}
                className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'x'
                    ? 'bg-slate-900 text-white border border-slate-950 shadow-sm'
                    : 'bg-slate-50 text-slate-500 border border-transparent hover:bg-slate-100'
                }`}
              >
                X / Twitter (Short)
              </button>
            </div>
          </div>
          <div className="relative bg-slate-50 border-2 border-slate-200 p-2.5 rounded-lg text-[10px] font-mono text-slate-600 leading-normal break-words select-all max-h-[140px] overflow-y-auto">
            {activeTab === 'linkedin' ? linkedinText : xText}
            
            <button
              onClick={handleCopy}
              className="absolute right-2 top-2 bg-white/95 border border-slate-200 hover:border-slate-300 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold text-slate-600 shadow-sm transition-all cursor-pointer flex items-center gap-1 hover:text-slate-800"
              title="Copy caption"
            >
              {copied ? (
                <>
                  <Check className="w-2.5 h-2.5 text-emerald-600 animate-scaleIn" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-2.5 h-2.5 text-slate-400" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3. SHARE CHANNELS */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleShareX}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-black hover:bg-black/90 text-white font-bold text-[11px] rounded-lg cursor-pointer transition-all active:scale-95 border-2 border-transparent hover:border-black/30"
          >
            <Twitter className="w-3.5 h-3.5 fill-current" />
            Post on X
          </button>
          <button
            onClick={handleShareLinkedIn}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#0a66c2] hover:bg-[#0a66c2]/90 text-white font-bold text-[11px] rounded-lg cursor-pointer transition-all active:scale-95 border-2 border-transparent hover:border-white/20"
          >
            <Linkedin className="w-3.5 h-3.5 fill-current" />
            Share on LinkedIn
          </button>
        </div>

        {/* 4. REWARD SECTION & CLAIM BUTTON */}
        <div className="border-t-2 border-[var(--color-natural-border)]/10 pt-3 flex flex-col gap-2">
          {!unlocked ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-amber-700 font-serif font-bold text-xs justify-center">
                <Gift className="w-4 h-4 text-amber-600 animate-pulse" />
                Reward: 👒 Gardener Hat & 🚰 Watering Can!
              </div>
              <button
                onClick={handleClaimReward}
                disabled={!hasShared}
                className={`w-full py-2.5 rounded-xl font-bold font-serif text-xs transition-all flex items-center justify-center gap-2 border-2 ${
                  hasShared
                    ? 'bg-[var(--color-natural-accent)] border-[var(--color-natural-ink)] text-[var(--color-natural-ink)] natural-shadow-sm active:scale-98 cursor-pointer hover:brightness-105'
                    : 'bg-slate-100 border-slate-300 text-slate-400 cursor-not-allowed opacity-75'
                }`}
              >
                <Sparkles className="w-4 h-4 animate-spin text-amber-600" />
                Claim Rare Gear
              </button>
              {!hasShared && (
                <span className="text-[9px] text-slate-400 text-center font-mono italic">
                  *Click "Post on X" or "Share on LinkedIn" above to activate reward claim!
                </span>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
              <div className="flex items-center gap-2 justify-center text-emerald-800 font-serif font-bold text-xs">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Exclusive Cosmetics Unlocked!
              </div>
              <p className="text-[9px] text-emerald-700 text-center leading-normal font-sans">
                You have unlocked the **Gardener Hat** 👒 (rests on your head) and **Watering Can** 🚰 (floats next to your shoulder)!
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleToggleEquip}
                  className="flex-1 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-[10px] font-mono text-slate-700 font-bold rounded-lg cursor-pointer transition-colors"
                >
                  {equipped ? 'Unequip Cosmetics' : 'Equip Cosmetics 👒🚰'}
                </button>
                <button
                  onClick={onClose}
                  className="py-1.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-mono font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
