import React, { useState } from 'react';

export interface Challenge {
    question: string;
    codeTemplate: string | null;
    type: 'code' | 'qa';
}

export function useChallengeState(onSuccess: () => void, onClose: () => void) {
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

    return {
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
    };
}
