import React, { useState } from 'react';
import { X, Check, Copy, Sparkles, Twitter, Linkedin, MessageCircle, ExternalLink } from 'lucide-react';
import { UserProfile } from '../../types/index.js';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserProfile;
    onUnlock?: (cosmetics: string[]) => void;
}

export default function ShareModal({ isOpen, onClose, user, onUnlock }: ShareModalProps) {
    const [copied, setCopied] = useState(false);
    const [claiming, setClaiming] = useState(false);
    const [claimedSuccess, setClaimedSuccess] = useState(false);

    if (!isOpen) return null;

    const appUrl = window.location.origin;
    const shareText = `🌱 I'm growing my GitHub garden on DevGarden! Lvl ${user.level} Gardener with ${user.commits} commits. Join me in the pixel greenhouse! 🚀`;

    const handleCopy = () => {
        navigator.clipboard.writeText(`${shareText}\n${appUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const handleClaimReward = async () => {
        setClaiming(true);
        setTimeout(() => {
            setClaiming(false);
            setClaimedSuccess(true);

            const unlockedCosmetics = ['golden_watering_can', 'pixel_sprout_hat', 'rainbow_aura'];
            const existing = JSON.parse(localStorage.getItem('devgarden_cosmetics') || '[]');
            const combined = Array.from(new Set([...existing, ...unlockedCosmetics]));
            localStorage.setItem('devgarden_cosmetics', JSON.stringify(combined));

            if (onUnlock) {
                onUnlock(combined);
            }
        }, 1200);
    };

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(appUrl)}`;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(appUrl)}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md bg-[#faf6eb] border-4 border-[#3a2f28] rounded-2xl p-6 shadow-[8px_8px_0px_#3a2f28] relative text-[#3a2f28] select-none">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-[#3a2f28]/10 text-[#3a2f28] transition-colors cursor-pointer border border-[#3a2f28]/20"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-xl bg-[#ffae34] border-2 border-[#3a2f28] shadow-[2px_2px_0px_#3a2f28]">
                        <Sparkles className="w-5 h-5 text-[#3a2f28] fill-[#3a2f28]" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold font-serif text-[#3a2f28]">Spread the Seeds! 📢</h2>
                        <p className="text-[10px] text-[#514339] font-sans">Share your garden to unlock Rare Pixel Cosmetics</p>
                    </div>
                </div>

                <div className="my-4 p-3.5 bg-white border-2 border-[#3a2f28]/20 rounded-xl font-mono text-xs text-[#3a2f28] leading-relaxed shadow-inner">
                    "{shareText}"
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                    <a
                        href={twitterUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3 bg-[#1da1f2] hover:bg-[#1a91da] text-white font-bold text-xs rounded-xl border-2 border-[#3a2f28] flex items-center justify-center gap-2 shadow-[2px_2px_0px_#3a2f28] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                        <Twitter className="w-4 h-4 fill-current" />
                        <span>Share on X</span>
                    </a>

                    <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3 bg-[#0a66c2] hover:bg-[#0855a2] text-white font-bold text-xs rounded-xl border-2 border-[#3a2f28] flex items-center justify-center gap-2 shadow-[2px_2px_0px_#3a2f28] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                        <Linkedin className="w-4 h-4 fill-current" />
                        <span>Share LinkedIn</span>
                    </a>
                </div>

                <div className="flex gap-2 mb-5">
                    <input
                        type="text"
                        readOnly
                        value={`${appUrl}`}
                        className="flex-1 p-2.5 bg-white border-2 border-[#3a2f28]/20 rounded-xl text-xs font-mono text-[#3a2f28] focus:outline-none"
                    />
                    <button
                        onClick={handleCopy}
                        className="py-2.5 px-4 bg-[#e3d8c1] hover:bg-[#d8caa8] text-[#3a2f28] font-bold text-xs rounded-xl border-2 border-[#3a2f28] flex items-center gap-1.5 shadow-[2px_2px_0px_#3a2f28] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                        {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                </div>

                <div className="pt-4 border-t-2 border-[#3a2f28]/15 text-center">
                    {claimedSuccess ? (
                        <div className="p-3 bg-emerald-100 border-2 border-emerald-700 rounded-xl text-emerald-950 text-xs font-bold font-serif flex items-center justify-center gap-2 animate-bounce">
                            <span>✨ Rare Cosmetics Claimed & Equipped! 🎩💧🌈</span>
                        </div>
                    ) : (
                        <button
                            onClick={handleClaimReward}
                            disabled={claiming}
                            className="w-full py-3 bg-[#ffae34] hover:bg-[#ffb94f] active:bg-[#e29624] text-[#3a2f28] font-bold text-xs font-serif uppercase tracking-wider rounded-xl border-2 border-[#3a2f28] shadow-[3px_3px_0px_#3a2f28] hover:shadow-[4px_4px_0px_#3a2f28] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer disabled:opacity-50"
                        >
                            {claiming ? 'Verifying Seed Spread...' : '🎁 Claim Seed Spreader Cosmetics Package'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
