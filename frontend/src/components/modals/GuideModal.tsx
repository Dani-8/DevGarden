import { BookOpen, X, Sparkles, Move, Armchair, Droplets, Hammer, Trophy, MessageSquare, Star } from 'lucide-react';

interface GuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function GuideModal({ isOpen, onClose }: GuideModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="relative w-full max-w-lg bg-[#faf6eb] border-4 border-[#3a2f28] rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.5)] overflow-hidden text-[#3a2f28] flex flex-col max-h-[85vh]">

                {/* Header */}
                <div className="px-5 py-4 bg-[#e3d8c1]/60 border-b-2 border-[#3a2f28]/15 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-[#ffae34] border-2 border-[#3a2f28] rounded-xl shadow-sm text-[#3a2f28]">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-base font-extrabold font-serif text-[#3a2f28]">
                                DevGarden Visitor Guide 🌿
                            </h2>
                            <p className="text-[11px] text-[#514339]/80 font-sans">
                                Master the controls & features of your cozy multiplayer garden!
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg bg-[#3a2f28]/10 hover:bg-[#3a2f28]/20 text-[#3a2f28] transition-colors cursor-pointer"
                        title="Close Guide"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Scrollable Content Body */}
                <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-3.5 font-sans text-xs">

                    {/* Item 1: Movement */}
                    <div className="p-3 bg-white/70 border-2 border-[#3a2f28]/15 rounded-xl flex items-start gap-3 shadow-sm">
                        <div className="p-2 bg-amber-100 border border-amber-900/20 rounded-lg text-amber-900 flex-shrink-0 mt-0.5">
                            <Move className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="font-bold font-serif text-sm text-[#3a2f28] flex items-center gap-1.5">
                                <span>Movement Controls</span>
                            </div>
                            <p className="text-[11px] text-[#514339] leading-relaxed mt-0.5">
                                Use <span className="font-mono bg-[#3a2f28]/10 px-1.5 py-0.5 rounded font-bold">WASD</span> or <span className="font-mono bg-[#3a2f28]/10 px-1.5 py-0.5 rounded font-bold">Arrow Keys</span> to walk around the map, explore the rivers, and visit the Zen Sanctuary!
                            </p>
                        </div>
                    </div>

                    {/* Item 2: Sitting */}
                    <div className="p-3 bg-white/70 border-2 border-[#3a2f28]/15 rounded-xl flex items-start gap-3 shadow-sm">
                        <div className="p-2 bg-emerald-100 border border-emerald-900/20 rounded-lg text-emerald-900 flex-shrink-0 mt-0.5">
                            <Armchair className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="font-bold font-serif text-sm text-[#3a2f28]">
                                Bench Relaxation 🧘
                            </div>
                            <p className="text-[11px] text-[#514339] leading-relaxed mt-0.5">
                                Walk up to any wooden bench and press <span className="font-mono bg-[#3a2f28]/10 px-1.5 py-0.5 rounded font-bold">E</span> to sit down. Press <span className="font-mono bg-[#3a2f28]/10 px-1.5 py-0.5 rounded font-bold">E</span> again to stand back up. You can turn your head while relaxing!
                            </p>
                        </div>
                    </div>

                    {/* Item 3: Co-op Sprout Tree */}
                    <div className="p-3 bg-white/70 border-2 border-[#3a2f28]/15 rounded-xl flex items-start gap-3 shadow-sm">
                        <div className="p-2 bg-blue-100 border border-blue-900/20 rounded-lg text-blue-900 flex-shrink-0 mt-0.5">
                            <Droplets className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="font-bold font-serif text-sm text-[#3a2f28]">
                                Co-op Sprout Tree 💦
                            </div>
                            <p className="text-[11px] text-[#514339] leading-relaxed mt-0.5">
                                Stand close to the central Sprout Tree and press <span className="font-mono bg-[#3a2f28]/10 px-1.5 py-0.5 rounded font-bold">SPACE</span> or click to water it together with online developers to unlock higher evolution levels!
                            </p>
                        </div>
                    </div>

                    {/* Item 4: Garden Kit */}
                    <div className="p-3 bg-white/70 border-2 border-[#3a2f28]/15 rounded-xl flex items-start gap-3 shadow-sm">
                        <div className="p-2 bg-orange-100 border border-orange-900/20 rounded-lg text-orange-900 flex-shrink-0 mt-0.5">
                            <Hammer className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="font-bold font-serif text-sm text-[#3a2f28]">
                                Garden Kit & Decorating 🪵
                            </div>
                            <p className="text-[11px] text-[#514339] leading-relaxed mt-0.5">
                                Click <span className="font-bold text-amber-900">Garden Kit</span> <span className="font-mono bg-[#3a2f28]/10 px-1 py-0.5 rounded text-[10px] font-bold">[K]</span> in the sidebar to place cozy campfires, street lanterns, benches, and flowers. Choose the hammer tool to tidy up your placed items.
                            </p>
                        </div>
                    </div>

                    {/* Item 5: Scoreboard */}
                    <div className="p-3 bg-white/70 border-2 border-[#3a2f28]/15 rounded-xl flex items-start gap-3 shadow-sm">
                        <div className="p-2 bg-yellow-100 border border-yellow-900/20 rounded-lg text-yellow-900 flex-shrink-0 mt-0.5">
                            <Trophy className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="font-bold font-serif text-sm text-[#3a2f28]">
                                Leaderboard & Golden Oak 🏆
                            </div>
                            <p className="text-[11px] text-[#514339] leading-relaxed mt-0.5">
                                Walk near the Golden Oak tree in the Zen Sanctuary or open <span className="font-bold text-amber-900">Scoreboard</span> from the sidebar to inspect top contributors, GitHub commits, and stars.
                            </p>
                        </div>
                    </div>

                    {/* Item 6: Live Chat & Emotes */}
                    <div className="p-3 bg-white/70 border-2 border-[#3a2f28]/15 rounded-xl flex items-start gap-3 shadow-sm">
                        <div className="p-2 bg-purple-100 border border-purple-900/20 rounded-lg text-purple-900 flex-shrink-0 mt-0.5">
                            <MessageSquare className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="font-bold font-serif text-sm text-[#3a2f28]">
                                Live Chat & Emotes 💬
                            </div>
                            <p className="text-[11px] text-[#514339] leading-relaxed mt-0.5">
                                Send real-time chat messages or trigger animated pixel emotes using the toolbar centered at the bottom of your screen to socialize with fellow online developers.
                            </p>
                        </div>
                    </div>

                    {/* Item 7: Golden Water */}
                    <div className="p-3 bg-gradient-to-br from-amber-500/10 to-yellow-600/5 border-2 border-amber-500/40 rounded-xl flex items-start gap-3 shadow-sm">
                        <div className="p-2 bg-amber-400 border border-amber-900/30 rounded-lg text-slate-950 flex-shrink-0 mt-0.5">
                            <Star className="w-4 h-4 fill-current" />
                        </div>
                        <div>
                            <div className="font-bold font-serif text-sm text-amber-950 flex items-center gap-1.5">
                                <span>Golden Water Boost ✨</span>
                            </div>
                            <p className="text-[11px] text-[#514339] leading-relaxed mt-0.5">
                                Take the quick AI challenge in the sidebar to unlock <span className="font-bold text-amber-900">10x Watering Power</span> for the Sprout Tree and a shimmering golden water trail!
                            </p>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-4 bg-[#e3d8c1]/40 border-t-2 border-[#3a2f28]/15 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#514339]/80">
                        <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                        <span>Have fun exploring!</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="py-2 px-5 bg-[#3a2f28] hover:bg-[#514339] text-white font-bold font-serif text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                        Okay, let's explore! 🌿
                    </button>
                </div>

            </div>
        </div>
    );
}
