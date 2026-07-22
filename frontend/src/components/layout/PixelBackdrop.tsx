import React, { useEffect, useState } from 'react';

interface Cloud {
    id: number;
    x: number;
    y: number;
    scale: number;
    duration: number;
    delay: number;
    opacity: number;
}

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

type TimeTheme = 'morning' | 'day' | 'sunset' | 'night';

export default function PixelBackdrop() {
    const [clouds, setClouds] = useState<Cloud[]>([]);
    const [stars, setStars] = useState<Star[]>([]);
    const [theme, setTheme] = useState<TimeTheme>('day');

    const [plantState, setPlantState] = useState<'sprout' | 'growing' | 'bloom'>('sprout');
    const [watering, setWatering] = useState(false);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 9) {
            setTheme('morning');
        } else if (hour >= 9 && hour < 17) {
            setTheme('day');
        } else if (hour >= 17 && hour < 20) {
            setTheme('sunset');
        } else {
            setTheme('night');
        }

        const generatedClouds: Cloud[] = [
            { id: 1, x: -8, y: 8, scale: 3.4, duration: 95, delay: 0, opacity: 0.38 },
            { id: 2, x: 12, y: 22, scale: 0.9, duration: 48, delay: -12, opacity: 0.55 },
            { id: 3, x: 34, y: 36, scale: 2.2, duration: 74, delay: -24, opacity: 0.42 },
            { id: 4, x: 50, y: 50, scale: 0.6, duration: 42, delay: -8, opacity: 0.65 },
            { id: 5, x: 62, y: 64, scale: 3.0, duration: 112, delay: -36, opacity: 0.35 },
            { id: 6, x: 76, y: 16, scale: 1.3, duration: 60, delay: -20, opacity: 0.48 },
            { id: 7, x: 86, y: 78, scale: 0.75, duration: 44, delay: -14, opacity: 0.55 },
            { id: 8, x: 94, y: 28, scale: 1.5, duration: 118, delay: -46, opacity: 0.36 },
        ];
        setClouds(generatedClouds);

        const generatedStars: Star[] = Array.from({ length: 18 }, (_, i) => ({
            id: i,
            x: Math.random() * 95 + 2.5,
            y: Math.random() * 70 + 2.5,
            size: Math.random() > 0.6 ? 3 : 2,
            duration: 1.2 + Math.random() * 1.8,
            delay: Math.random() * -3,
        }));
        setStars(generatedStars);
    }, []);

    useEffect(() => {
        if (theme !== 'day') return;
        const interval = setInterval(() => {
            setWatering(true);

            setTimeout(() => {
                setPlantState('growing');
            }, 1500);

            setTimeout(() => {
                setPlantState('bloom');
            }, 3000);

            setTimeout(() => {
                setWatering(false);
            }, 4500);

            setTimeout(() => {
                setPlantState('sprout');
            }, 7000);

        }, 8500);

        return () => clearInterval(interval);
    }, [theme]);

    const themeStyles = {
        morning: {
            gradient: 'bg-gradient-to-b from-[#ffedd8] via-[#fdf3e7] to-[#faf6ef]',
            gridColor: 'rgba(219, 139, 114, 0.09)',
            cloudsColor: 'text-[#fcd6c4]/35',
            groundOverlay: 'from-[var(--color-natural-grass)]/12 to-transparent',
            emojis: ['🌸', '💧', '🌱', '☘️', '🌸'],
        },
        day: {
            gradient: 'bg-gradient-to-b from-[#ebfce9] via-[#fdfbf6] to-[#faf7ef]',
            gridColor: 'rgba(138, 138, 107, 0.05)',
            cloudsColor: 'text-[var(--color-natural-border)]/25',
            groundOverlay: 'from-[var(--color-natural-grass)]/8 to-transparent',
            emojis: ['🌱', '☘️', '🌱', '☘️', '🌱'],
        },
        sunset: {
            gradient: 'bg-gradient-to-b from-[#ffd2be] via-[#ffe0c4] to-[#f7efe0]',
            gridColor: 'rgba(224, 117, 85, 0.1)',
            cloudsColor: 'text-[#fbc8b1]/40',
            groundOverlay: 'from-amber-600/10 to-transparent',
            emojis: ['🌾', '🍂', '🌾', '🍄', '🌱'],
        },
        night: {
            gradient: 'bg-gradient-to-b from-[#050711] via-[#0d0f1e] to-[#111226]',
            gridColor: 'rgba(99, 102, 241, 0.05)',
            cloudsColor: 'text-[#181934]/50',
            groundOverlay: 'from-indigo-950/40 to-transparent',
            emojis: ['🌌', '💤', '🍄', '🦉', '💤'],
        },
    }[theme];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
            <style>{`
        @keyframes drift {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }
        @keyframes scrollGrid {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes pixelBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes pixelWalk {
          0%, 100% { transform: translateX(0px) scaleX(1); }
          48% { transform: translateX(110px) scaleX(1); }
          50% { transform: translateX(110px) scaleX(-1); }
          98% { transform: translateX(0px) scaleX(-1); }
        }
        @keyframes steamRise {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          40% { opacity: 0.8; }
          100% { transform: translateY(-14px) scale(1.1); opacity: 0; }
        }
        @keyframes floatZzz {
          0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
          30% { opacity: 0.7; }
          100% { transform: translate(5px, -18px) scale(1.1); opacity: 0; }
        }
        @keyframes campfirePulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(249,115,22,0.5)); }
          50% { transform: scale(1.15); filter: drop-shadow(0 0 10px rgba(249,115,22,0.85)); }
        }
        @keyframes windBlowLeaf {
          0% { transform: translate(110vw, -10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translate(-10vw, 85vh) rotate(360deg); opacity: 0; }
        }
        .pixel-grid-scrolling {
          background-size: 20px 20px;
          background-image: 
            linear-gradient(to right, ${themeStyles.gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${themeStyles.gridColor} 1px, transparent 1px);
          animation: scrollGrid 8s linear infinite;
        }
      `}</style>

            <div className={`absolute inset-0 transition-colors duration-[2000ms] ${themeStyles.gradient}`} />
            <div className="absolute inset-0 pixel-grid-scrolling" />

            {theme === 'night' && (
                <div className="absolute inset-0">
                    {stars.map((star) => (
                        <div
                            key={star.id}
                            className="absolute bg-amber-100 rounded-sm"
                            style={{
                                left: `${star.x}%`,
                                top: `${star.y}%`,
                                width: `${star.size}px`,
                                height: `${star.size}px`,
                                animation: `twinkle ${star.duration}s ease-in-out infinite`,
                                animationDelay: `${star.delay}s`,
                                boxShadow: '0 0 3px rgba(254, 243, 199, 0.4)',
                            }}
                        />
                    ))}
                </div>
            )}

            {theme === 'sunset' && (
                <div className="absolute inset-0">
                    {[
                        { id: 1, delay: 0, scale: 0.9, char: '🍂' },
                        { id: 2, delay: 2.5, scale: 1.1, char: '🍁' },
                        { id: 3, delay: 5.0, scale: 0.8, char: '🍂' },
                        { id: 4, delay: 7.5, scale: 1.0, char: '🍁' },
                    ].map((leaf) => (
                        <div
                            key={leaf.id}
                            className="absolute text-sm select-none"
                            style={{
                                top: 0,
                                left: 0,
                                transform: `scale(${leaf.scale})`,
                                animation: `windBlowLeaf 11s linear infinite`,
                                animationDelay: `${leaf.delay}s`,
                            }}
                        >
                            {leaf.char}
                        </div>
                    ))}
                </div>
            )}

            <div className="absolute inset-0">
                {clouds.map((cloud) => (
                    <div
                        key={cloud.id}
                        className="absolute"
                        style={{
                            left: `${cloud.x}%`,
                            top: `${cloud.y}%`,
                            opacity: cloud.opacity,
                            animation: `drift ${cloud.duration}s linear infinite`,
                            animationDelay: `${cloud.delay}s`,
                        }}
                    >
                        <div
                            style={{
                                transform: `scale(${cloud.scale})`,
                                transformOrigin: 'top left',
                            }}
                        >
                            <svg
                                width="90"
                                height="40"
                                viewBox="0 0 90 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="drop-shadow-sm"
                            >
                                <path
                                    d="M30 10H50V20H30V10ZM20 20H70V30H20V20ZM10 30H80V40H10V30ZM40 0H60V10H40V0Z"
                                    fill="currentColor"
                                    className={themeStyles.cloudsColor}
                                />
                                <path
                                    d="M30 12H50V20H30V12ZM20 20H70V28H20V20ZM10 28H80V36H10V28ZM40 4H60V12H40V4Z"
                                    fill={theme === 'night' ? '#14152b' : 'white'}
                                    className="transition-colors duration-[2000ms]"
                                />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-10 left-0 right-0 h-16 flex justify-between items-end px-8 z-10">
                {theme === 'morning' && (
                    <>
                        <div className="flex items-end gap-3 translate-y-2">
                            <div className="flex flex-col items-center">
                                <div className="relative mb-0.5 w-6 h-6 flex items-center justify-center">
                                    <span className="absolute text-xs opacity-0" style={{ animation: 'steamRise 2s infinite', top: '-12px' }}>💨</span>
                                    <span className="text-sm filter drop-shadow-sm">☕</span>
                                </div>
                                <div className="w-8 h-2.5 bg-amber-800/40 border border-amber-900/30 rounded-sm" />
                            </div>
                            <div className="flex flex-col items-center" style={{ animation: 'pixelBob 2.2s ease-in-out infinite' }}>
                                <span className="text-xl filter drop-shadow-sm">🐰</span>
                                <span className="text-[9px] font-pixel px-1.5 py-0.5 bg-rose-100 text-rose-800 border border-rose-300 rounded shadow-sm scale-75 origin-bottom">mornin'...</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center mr-8 translate-y-2" style={{ animation: 'pixelBob 1.8s ease-in-out infinite', animationDelay: '-0.5s' }}>
                            <span className="text-xl filter drop-shadow-sm">🐶</span>
                            <div className="w-6 h-1 bg-slate-900/10 rounded-full" />
                        </div>
                    </>
                )}

                {theme === 'day' && (
                    <>
                        <div className="flex items-end gap-3 ml-2 translate-y-2">
                            <div className="flex flex-col items-center" style={{ animation: 'pixelBob 2s ease-in-out infinite' }}>
                                <span className="text-xl filter drop-shadow-sm">🧑‍🌾</span>
                                {watering && <span className="text-[10px] absolute -right-2 top-2 animate-pulse text-blue-400">💧</span>}
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="h-6 flex items-end justify-center" style={{ animation: 'pixelBob 3s ease-in-out infinite' }}>
                                    {plantState === 'sprout' && <span className="text-sm transition-all duration-300 transform scale-75 origin-bottom">🌱</span>}
                                    {plantState === 'growing' && <span className="text-sm transition-all duration-300 transform scale-110 origin-bottom">🌿</span>}
                                    {plantState === 'bloom' && <span className="text-base transition-all duration-300 transform scale-125 origin-bottom animate-bounce">🌸</span>}
                                </div>
                                <div className="w-5 h-2.5 bg-amber-600 border border-amber-800 rounded-sm" />
                            </div>
                        </div>

                        <div className="absolute left-1/4 bottom-0 mr-12 h-12 flex items-end translate-y-2" style={{ animation: 'pixelWalk 14s linear infinite' }}>
                            <div className="flex flex-col items-center">
                                <span className="text-xl filter drop-shadow-sm">🧙‍♂️</span>
                                <span className="text-[8px] font-pixel bg-indigo-50 border border-indigo-200 text-indigo-700 px-1 rounded transform scale-75 origin-bottom -translate-y-1">studying...</span>
                            </div>
                        </div>
                    </>
                )}

                {theme === 'sunset' && (
                    <>
                        <div className="flex items-end gap-2 ml-4 translate-y-2">
                            <div className="flex flex-col items-center relative">
                                <div className="absolute -top-10 left-3 w-4 h-4 bg-amber-300/40 rounded-full blur-sm animate-pulse" />
                                <span className="absolute -top-8 left-3.5 text-xs">💡</span>
                                <span className="text-base filter drop-shadow-sm z-10" style={{ animation: 'pixelBob 2.5s ease-in-out infinite' }}>📖</span>
                                <div className="w-10 h-3 bg-amber-800/40 border border-amber-900/30 rounded-sm" />
                            </div>
                            <div className="flex flex-col items-center" style={{ animation: 'pixelBob 2.5s ease-in-out infinite', animationDelay: '-0.3s' }}>
                                <span className="text-xl filter drop-shadow-sm">🦊</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center mr-10 translate-y-2" style={{ animation: 'pixelBob 1.6s ease-in-out infinite' }}>
                            <span className="text-lg filter drop-shadow-sm">🐿️</span>
                            <span className="text-[9px] font-pixel text-amber-800/60 font-bold scale-75">🍂</span>
                        </div>
                    </>
                )}

                {theme === 'night' && (
                    <>
                        <div className="flex items-end gap-3 ml-4 translate-y-2">
                            <div className="flex flex-col items-center" style={{ animation: 'pixelBob 2.2s ease-in-out infinite' }}>
                                <span className="text-xl filter drop-shadow-sm">🐻</span>
                            </div>

                            <div className="flex flex-col items-center relative">
                                <div className="absolute -top-6 w-12 h-12 bg-amber-500/20 rounded-full blur-md animate-pulse" />
                                <span className="text-xl z-10" style={{ animation: 'campfirePulse 1s ease-in-out infinite' }}>🔥</span>
                                <div className="w-8 h-2 bg-slate-800 border border-slate-900 rounded-full" />
                            </div>
                        </div>

                        <div className="flex items-end gap-2 mr-6 translate-y-2">
                            <div className="flex flex-col items-center relative">
                                <span className="absolute text-[8px] font-pixel text-indigo-300 font-bold" style={{ animation: 'floatZzz 3s linear infinite', top: '-14px', left: '6px' }}>Z</span>
                                <span className="absolute text-[10px] font-pixel text-indigo-400 font-bold" style={{ animation: 'floatZzz 3s linear infinite', top: '-14px', left: '16px', animationDelay: '1.2s' }}>Z</span>

                                <span className="text-2xl filter drop-shadow-sm z-10">⛺</span>
                                <div className="w-12 h-1.5 bg-slate-900/30 rounded-full" />
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className={`absolute bottom-0 left-0 right-0 h-4 mb-4 bg-gradient-to-t ${themeStyles.groundOverlay} flex justify-around items-end px-12 opacity-60 transition-colors duration-[2000ms]`}>
                {themeStyles.emojis.map((emoji, idx) => (
                    <span key={idx} className={idx % 2 === 1 ? "text-xs opacity-50" : "text-sm"}>
                        {emoji}
                    </span>
                ))}
            </div>
        </div>
    );
}
