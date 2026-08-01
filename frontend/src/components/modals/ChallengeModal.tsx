import ChallengeHeader from './challenge/ChallengeHeader.js';
import ChallengeSelectStep from './challenge/ChallengeSelectStep.js';
import ChallengeAnswerStep from './challenge/ChallengeAnswerStep.js';
import { useChallengeState } from './challenge/useChallengeState.js';

interface ChallengeModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

export default function ChallengeModal({ onClose, onSuccess }: ChallengeModalProps) {
    const {
        selectedField,
        setSelectedField,
        customField,
        setCustomField,
        challenge,
        loading,
        userAnswer,
        setUserAnswer,
        submitting,
        feedback,
        suggestions,
        fetchChallenge,
        handleSubmitAnswer,
    } = useChallengeState(onSuccess, onClose);

    return (
        <div id="challenge-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div id="challenge-modal-card" className="w-full max-w-lg bg-[var(--color-natural-bg)] border-4 border-[var(--color-natural-ink)] rounded-2xl overflow-hidden shadow-[8px_8px_0px_#000000] text-[var(--color-natural-ink)] animate-fade-in relative">
                <ChallengeHeader onClose={onClose} />

                {!selectedField && (
                    <ChallengeSelectStep
                        suggestions={suggestions}
                        customField={customField}
                        setCustomField={setCustomField}
                        loading={loading}
                        onFetchChallenge={fetchChallenge}
                    />
                )}

                {selectedField && challenge && (
                    <ChallengeAnswerStep
                        selectedField={selectedField}
                        challenge={challenge}
                        userAnswer={userAnswer}
                        setUserAnswer={setUserAnswer}
                        submitting={submitting}
                        feedback={feedback}
                        onSwitchCategory={() => setSelectedField(null)}
                        onFetchNewQuestion={() => fetchChallenge(selectedField)}
                        onSubmitAnswer={handleSubmitAnswer}
                    />
                )}
            </div>
        </div>
    );
}
