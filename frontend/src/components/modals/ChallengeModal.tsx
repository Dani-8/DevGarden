import React, { useState } from 'react';
import { X, Sparkles, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ChallengeModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

interface Challenge {
    question: string;
    codeTemplate: string | null;
    type: 'code' | 'qa';
}

export default function ChallengeModal({ onClose, onSuccess }: ChallengeModalProps) {
    const [selectedField, setSelectedField] = useState<string | null>(null);
    const [customField, setCustomField] = useState('');
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [loading, setLoading] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null);

    const suggestions = [
        'TypeScript', 'React', 'Python', 'SQL', 'Go', 'Docker', 'CSS', 'Algorithms', 'Cybersecurity'
    ];

    const fetchChallenge = async (field: string) => {
        if (!field.trim()) return;
        setLoading(true);
        setFeedback(null);
        setUserAnswer('');
        try {
            const apiBase = import.meta.env.VITE_API_URL || '';
            const res = await fetch(`${apiBase}/api/challenge/generate?field=${encodeURIComponent(field.trim())}`);
            if (!res.ok) throw new Error('Could not contact challenge server.');
            const data = (await res.json()) as Challenge;
            setChallenge(data);
            setSelectedField(field.trim());
        } catch (err) {
            console.error(err);
            alert('Error fetching challenge. Please try again!');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitAnswer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userAnswer.trim() || !selectedField || !challenge) return;

        setSubmitting(true);
        setFeedback(null);

        try {
            const apiBase = import.meta.env.VITE_API_URL || '';
            const res = await fetch(`${apiBase}/api/challenge/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    field: selectedField,
                    question: challenge.question,
                    answer: userAnswer,
                }),
            });

            if (!res.ok) throw new Error('Verification failed');
            const data = (await res.json()) as { correct: boolean; feedback: string };

            setFeedback({
                correct: data.correct,
                text: data.feedback,
            });

            if (data.correct) {
                setTimeout(() => {
                    onSuccess();
                    onClose();
                }, 3000);
            }
        } catch (err) {
            console.error(err);
            setFeedback({
                correct: false,
                text: 'Connection failed. Please retry your submission!',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div id="challenge-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div id="challenge-modal-card" className="w-full max-w-lg bg-[var(--color-natural-bg)] border-4 border-[var(--color-natural-ink)] rounded-2xl overflow-hidden shadow-[8px_8px_0px_#000000] text-[var(--color-natural-ink)] animate-fade-in relative">
                <header className="bg-[var(--color-natural-foliage)] text-white p-4 flex items-center justify-between border-b-4 border-[var(--color-natural-ink)]">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse" />
                        <h2 className="text-base font-bold font-serif uppercase tracking-wide">
                            Golden Sprout Challenge
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        id="close-challenge-btn"
                        className="p-1 text-white/80 hover:text-white hover:scale-115 transition-all cursor-pointer bg-black/20 rounded-md"
                        title="Close"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </header>

                {!selectedField && (
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
                                        fetchChallenge(s);
                                    }}
                                    disabled={loading}
                                    className="px-2.5 py-1 text-[10px] bg-white hover:bg-[var(--color-natural-accent)]/20 text-slate-700 border-2 border-[var(--color-natural-ink)] rounded-full font-mono cursor-pointer transition-all active:scale-95 disabled:opacity-50"
                                >
                                    #{s}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); fetchChallenge(customField); }} className="space-y-4">
                            <div>
                                <label htmlFor="custom-specialty-input" className="block text-[10px] font-mono font-bold text-slate-600 mb-1.5 uppercase">
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
                )}

                {selectedField && challenge && (
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] bg-[var(--color-natural-foliage)] text-white px-2 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider">
                                {selectedField.replace('_', ' ')} • {challenge.type}
                            </span>
                            <button
                                onClick={() => setSelectedField(null)}
                                className="text-[10px] text-slate-500 hover:text-[var(--color-natural-foliage)] font-mono font-bold transition-colors cursor-pointer"
                            >
                                ← Switch Category
                            </button>
                        </div>

                        <div className="bg-white border-2 border-[var(--color-natural-ink)] rounded-xl p-4 mb-4 shadow-sm">
                            <p className="text-xs font-bold leading-relaxed text-slate-800 font-serif whitespace-pre-wrap">
                                {challenge.question}
                            </p>

                            {challenge.codeTemplate && (
                                <div className="mt-3 p-3 rounded-lg bg-slate-950 border-2 border-[var(--color-natural-ink)] font-mono text-[11px] text-emerald-400 select-all overflow-x-auto whitespace-pre">
                                    <code>{challenge.codeTemplate}</code>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSubmitAnswer} className="space-y-4">
                            <div>
                                <label htmlFor="user-answer-input" className="block text-[10px] font-mono font-bold text-slate-600 mb-1 uppercase">
                                    YOUR SOLUTION OR ANSWER:
                                </label>
                                {challenge.type === 'code' ? (
                                    <textarea
                                        id="user-answer-input"
                                        rows={3}
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        disabled={submitting || (feedback?.correct ?? false)}
                                        placeholder="Type or complete the code snippet here..."
                                        className="w-full p-3 bg-white border-2 border-[var(--color-natural-ink)] rounded-xl font-mono text-xs text-slate-800 focus:ring-2 focus:ring-[var(--color-natural-foliage)] focus:outline-none placeholder-slate-400"
                                        required
                                    />
                                ) : (
                                    <input
                                        id="user-answer-input"
                                        type="text"
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        disabled={submitting || (feedback?.correct ?? false)}
                                        placeholder="Type your brief answer here..."
                                        className="w-full p-3 bg-white border-2 border-[var(--color-natural-ink)] rounded-xl font-sans text-xs text-slate-800 focus:ring-2 focus:ring-[var(--color-natural-foliage)] focus:outline-none placeholder-slate-400"
                                        required
                                        autoComplete="off"
                                    />
                                )}
                            </div>

                            {feedback && (
                                <div
                                    id="evaluation-feedback-panel"
                                    className={`flex items-start gap-2.5 p-3.5 border-2 rounded-xl animate-fade-in ${feedback.correct
                                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                                            : 'bg-red-50 border-red-500 text-red-800'
                                        }`}
                                >
                                    {feedback.correct ? (
                                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600 mt-0.5" />
                                    ) : (
                                        <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600 mt-0.5" />
                                    )}
                                    <div>
                                        <h4 className="text-xs font-bold font-serif leading-tight">
                                            {feedback.correct ? '🎉 Challenge Passed!' : '😢 Check Your Answer'}
                                        </h4>
                                        <p className="text-[11px] leading-relaxed mt-0.5 font-sans opacity-90">
                                            {feedback.text}
                                        </p>
                                        {feedback.correct && (
                                            <p className="text-[10px] mt-1 font-mono font-bold text-emerald-600 animate-pulse">
                                                Unlocking Golden Water... Preparing garden...
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-2.5 justify-end pt-2">
                                {!feedback?.correct && (
                                    <button
                                        type="button"
                                        onClick={() => fetchChallenge(selectedField)}
                                        disabled={submitting}
                                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border-2 border-slate-300 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                                    >
                                        New Question
                                    </button>
                                )}

                                <button
                                    type="submit"
                                    id="submit-challenge-answer"
                                    disabled={submitting || !userAnswer.trim() || (feedback?.correct ?? false)}
                                    className="px-5 py-2 bg-[var(--color-natural-foliage)] text-white hover:bg-[var(--color-natural-foliage)]/90 text-xs font-bold border-2 border-[var(--color-natural-ink)] rounded-xl hover:shadow-[2px_2px_0px_#000000] active:scale-98 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 select-none"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            Evaluating...
                                        </>
                                    ) : (
                                        'Verify Solution'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
