export interface ChallengeQuestion {
  field: string;
  question: string;
  options: string[];
}

export interface VerificationResult {
  correct: boolean;
  explanation: string;
}
