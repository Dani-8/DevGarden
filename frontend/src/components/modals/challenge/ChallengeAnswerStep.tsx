import React from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Challenge } from './useChallengeState.js';

interface ChallengeAnswerStepProps {
    selectedField: string;
    challenge: Challenge;
    userAnswer: string;
    setUserAnswer: (val: string) => void;
    submitting: boolean;
    feedback: { correct: boolean; text: string } | null;
    onSwitchCategory: () => void;
    onFetchNewQuestion: () => void;
    onSubmitAnswer: (e: React.FormEvent) => void;
}

export default function ChallengeAnswerStep({
    selectedField,
    challenge,
    userAnswer,
    setUserAnswer,
    submitting,
    feedback,
    onSwitchCategory,
    onFetchNewQuestion,
    onSubmitAnswer,
}: ChallengeAnswerStepProps) {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] bg-[var(--color-natural-foliage)] text-white px-2 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider">
                    {selectedField.replace('_', ' ')} • {challenge.type}
                </span>
                <button
                    onClick={onSwitchCategory}
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

            <form onSubmit={onSubmitAnswer} className="space-y-4">
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
                            onClick={onFetchNewQuestion}
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
    );
}
