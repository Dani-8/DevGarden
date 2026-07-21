import { useEffect, useState } from 'react';

interface Cloud {
  id: number;
  y: number; // percentage from top
  scale: number; // scale multiplier
  duration: number; // animation duration in seconds
  delay: number; // animation delay in seconds
  opacity: number;
}

interface Star {
  id: number;
  x: number; // percentage from left
  y: number; // percentage from top
  size: number; // in pixels
  duration: number; // twinkle speed in seconds
  delay: number;
}

type TimeTheme = 'morning' | 'day' | 'sunset' | 'night';

export default function PixelBackdrop() {
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const [theme, setTheme] = useState<TimeTheme>('day');

  useEffect(() => {
    // 1. Determine local time theme
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

    // 2. Generate cozy drifting clouds
    const generatedClouds: Cloud[] = [
      { id: 1, y: 15, scale: 3.2, duration: 85, delay: 0, opacity: 0.35 },
      { id: 2, y: 35, scale: 0.8, duration: 45, delay: -15, opacity: 0.5 },
      { id: 3, y: 52, scale: 2.0, duration: 65, delay: -30, opacity: 0.4 },
      { id: 4, y: 68, scale: 0.6, duration: 38, delay: -10, opacity: 0.55 },
      { id: 5, y: 80, scale: 2.6, duration: 110, delay: -45, opacity: 0.3 },
      { id: 6, y: 22, scale: 1.2, duration: 50, delay: -25, opacity: 0.45 },
    ];
    setClouds(generatedClouds);

    // 3. Generate twinkling stars for night mode
    const generatedStars: Star[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 95 + 2.5,
      y: Math.random() * 75 + 2.5,
      size: Math.random() > 0.6 ? 3 : 2,
      duration: 1.5 + Math.random() * 2,
      delay: Math.random() * -3,
    }));
    setStars(generatedStars);
  }, []);

  // Theme-specific CSS styling configurations
  const themeStyles = {
    morning: {
      gradient: 'bg-gradient-to-b from-[#ffede4] via-[#fef6ef] to-[#fcfaf5]',
      gridColor: 'rgba(219, 139, 114, 0.08)',
      cloudsColor: 'text-[#fcded2]/30',
      groundOverlay: 'from-[var(--color-natural-grass)]/10 to-transparent',
      emojis: ['🌸', '💧', '🌱', '☘️', '🌸'],
    },
    day: {
      gradient: 'bg-gradient-to-b from-[#f1fcf0] via-[#fdfbf7] to-[#fcfaf5]',
      gridColor: 'rgba(138, 138, 107, 0.04)',
      cloudsColor: 'text-[var(--color-natural-border)]/20',
      groundOverlay: 'from-[var(--color-natural-grass)]/5 to-transparent',
      emojis: ['🌱', '☘️', '🌱', '☘️', '🌱'],
    },
    sunset: {
      gradient: 'bg-gradient-to-b from-[#ffdcd0] via-[#ffe3cc] to-[#faf3e3]',
      gridColor: 'rgba(224, 117, 85, 0.08)',
      cloudsColor: 'text-[#fcd7c5]/35',
      groundOverlay: 'from-amber-600/8 to-transparent',
      emojis: ['🌾', '🍂', '🌾', '🍄', '🌱'],
    },
    night: {
      gradient: 'bg-gradient-to-b from-[#070914] via-[#101222] to-[#15162d]',
      gridColor: 'rgba(99, 102, 241, 0.04)',
      cloudsColor: 'text-[#1c1d3a]/40',
      groundOverlay: 'from-indigo-950/30 to-transparent',
      emojis: ['🌌', '💤', '🍄', '🦉', '💤'],
    },
  }[theme];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic Keyframes injected safely */}
      <style>{`
        @keyframes drift {
          0% {
            transform: translateX(-150px);
          }
          100% {
            transform: translateX(calc(100vw + 150px));
          }
        }
        @keyframes scrollGrid {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 40px;
          }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .pixel-grid-scrolling {
          background-size: 20px 20px;
          background-image: 
            linear-gradient(to right, ${themeStyles.gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${themeStyles.gridColor} 1px, transparent 1px);
          animation: scrollGrid 8s linear infinite;
        }
      `}</style>

      {/* 1. Cozy background gradient */}
      <div className={`absolute inset-0 transition-colors duration-[2000ms] ${themeStyles.gradient}`} />

      {/* 2. Scrolling retro pixel grid */}
      <div className="absolute inset-0 pixel-grid-scrolling" />

      {/* 3. Twinkling Retro Pixel Stars (Night Mode exclusive) */}
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
                boxShadow: '0 0 2px rgba(254, 243, 199, 0.5)',
              }}
            />
          ))}
        </div>
      )}

      {/* 4. Floating Retro-style SVG Clouds */}
      <div className="absolute inset-0">
        {clouds.map((cloud) => (
          <div
            key={cloud.id}
            className="absolute left-0"
            style={{
              top: `${cloud.y}%`,
              opacity: cloud.opacity,
              animation: `drift ${cloud.duration}s linear infinite`,
              animationDelay: `${cloud.delay}s`,
              transform: `scale(${cloud.scale})`,
            }}
          >
            {/* 8-bit / pixelated cloud vector */}
            <svg
              width="90"
              height="40"
              viewBox="0 0 90 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-sm"
            >
              {/* Cloud Block Outline & Fill */}
              <path
                d="M30 10H50V20H30V10ZM20 20H70V30H20V20ZM10 30H80V40H10V30ZM40 0H60V10H40V0Z"
                fill="currentColor"
                className={themeStyles.cloudsColor}
              />
              <path
                d="M30 12H50V20H30V12ZM20 20H70V28H20V20ZM10 28H80V36H10V28ZM40 4H60V12H40V4Z"
                fill={theme === 'night' ? '#181934' : 'white'}
                className="transition-colors duration-[2000ms]"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* 5. Natural ground decor detail (stylized soft grass elements) */}
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
