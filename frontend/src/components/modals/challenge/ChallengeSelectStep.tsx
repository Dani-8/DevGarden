import React from 'react';
import { Loader2 } from 'lucide-react';

interface ChallengeSelectStepProps {
  suggestions: string[];
  customField: string;
  setCustomField: (val: string) => void;
  loading: boolean;
  onFetchChallenge: (field: string) => void;
}

export default function ChallengeSelectStep({
  suggestions,
  customField,
  setCustomField,
  loading,
  onFetchChallenge,
}: ChallengeSelectStepProps) {
  return (
    <div className="p-6">
      <p className="text-xs text-slate-600 mb-4 leading-relaxed font-serif">
        Unleash the full potential of your garden! Tell the AI your coding specialty to generate a custom technical challenge. Solve it to unlock **10x Golden Water** and activate dynamic golden trails!
      </p>

      <p className="text-[10px] font-bold text-slate-500 mb-2 font-mono uppercase tracking-wider">
        QUICK SELECT A SPECIALTY:
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setCustomField(s);
              onFetchChallenge(s);
            }}
            disabled={loading}
            className="px-2.5 py-1 text-[10px] bg-white hover:bg-[var(--color-natural-accent)]/20 text-slate-700 border-2 border-[var(--color-natural-ink)] rounded-full font-mono cursor-pointer transition-all active:scale-95 disabled:opacity-50"
          >
            #{s}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onFetchChallenge(customField);
        }}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="custom-specialty-input"
            className="block text-[10px] font-mono font-bold text-slate-600 mb-1.5 uppercase"
          >
            OR TYPE YOUR CUSTOM SPECIALTY:
          </label>
          <input
            id="custom-specialty-input"
            type="text"
            maxLength={40}
            value={customField}
            onChange={(e) => setCustomField(e.target.value)}
            disabled={loading}
            placeholder="e.g. Svelte, Rust, Tailwind, Flutter, GCP..."
            className="w-full p-3 bg-white border-2 border-[var(--color-natural-ink)] rounded-xl font-sans text-xs text-slate-800 focus:ring-2 focus:ring-[var(--color-natural-foliage)] focus:outline-none placeholder-slate-400"
            required
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !customField.trim()}
          className="w-full py-2.5 bg-[var(--color-natural-foliage)] text-white text-xs font-bold font-serif uppercase tracking-wider border-2 border-[var(--color-natural-ink)] rounded-xl hover:shadow-[3px_3px_0px_#000000] active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 select-none"
        >
          Generate AI Challenge ⚡
        </button>
      </form>

      {loading && (
        <div className="absolute inset-0 bg-[var(--color-natural-bg)]/85 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          <Loader2 className="w-8 h-8 text-[var(--color-natural-foliage)] animate-spin" />
          <span className="text-xs font-mono font-bold mt-2 text-[var(--color-natural-ink)] animate-pulse">
            AI is crafting your custom challenge...
          </span>
        </div>
      )}
    </div>
  );
}
