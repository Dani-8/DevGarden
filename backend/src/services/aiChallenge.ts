import { GoogleGenAI, Type } from "@google/genai";
import { config } from '../config/env.js';

const FALLBACK_CHALLENGES: Record<string, Array<{ question: string; codeTemplate: string | null; type: 'code' | 'qa'; fallbackAnswerPattern: RegExp }>> = {
  react: [
    {
      question: "Which React hook is used to perform side effects in functional components?",
      codeTemplate: null,
      type: "qa",
      fallbackAnswerPattern: /useEffect/i
    },
    {
      question: "Complete this code line to declare a state variable 'count' initialized to 0 in React:",
      codeTemplate: "const [count, setCount] = useState(___)",
      type: "code",
      fallbackAnswerPattern: /0/
    }
  ],
  sql: [
    {
      question: "Which SQL clause is used to filter records in a SELECT query?",
      codeTemplate: "SELECT * FROM users _____ age > 18;",
      type: "code",
      fallbackAnswerPattern: /WHERE/i
    },
    {
      question: "What SQL statement is used to remove all records from a table without logging individual row deletions?",
      codeTemplate: null,
      type: "qa",
      fallbackAnswerPattern: /TRUNCATE/i
    }
  ],
  python: [
    {
      question: "How do you append the value 5 to a list named 'nums' in Python?",
      codeTemplate: "nums._____(5)",
      type: "code",
      fallbackAnswerPattern: /append/i
    }
  ],
  dsa: [
    {
      question: "What is the average time complexity of searching in a Hash Map?",
      codeTemplate: null,
      type: "qa",
      fallbackAnswerPattern: /O\(1\)|constant/i
    }
  ],
  data_analyst: [
    {
      question: "In Pandas, which function is used to read a CSV file into a DataFrame?",
      codeTemplate: "df = pd.________('data.csv')",
      type: "code",
      fallbackAnswerPattern: /read_csv/i
    }
  ],
  general: [
    {
      question: "What does HTML stand for?",
      codeTemplate: null,
      type: "qa",
      fallbackAnswerPattern: /HyperText Markup Language/i
    },
    {
      question: "What protocol is primarily used to secure communication over a computer network (the 'S' in HTTPS)?",
      codeTemplate: null,
      type: "qa",
      fallbackAnswerPattern: /SSL|TLS|HTTPS/i
    }
  ]
};

function getGeminiClient() {
  const apiKey = config.geminiApiKey;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

export async function generateChallenge(field: string) {
  const ai = getGeminiClient();
  
  if (!ai) {
    const list = FALLBACK_CHALLENGES[field] || FALLBACK_CHALLENGES.general;
    const randomIdx = Math.floor(Math.random() * list.length);
    const selected = list[randomIdx];
    return {
      question: selected.question,
      codeTemplate: selected.codeTemplate,
      type: selected.type
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate a super short, simple, engaging coding challenge or Q&A question for the technical field: "${field}".
Keep it friendly and quick to solve (within 5-15 seconds). It can be a simple single-line code completion, a code debugging challenge, or a quick conceptual question.
Your response MUST be in JSON matching this schema:
{
  "question": "The question or short description of the task",
  "codeTemplate": "An optional single line or very short snippet of code for them to fill in or debug, or null",
  "type": "code" or "qa"
}
Keep the question highly clear, specific, and brief. Avoid complex code blocks or long descriptions.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            codeTemplate: { type: Type.STRING, nullable: true },
            type: { type: Type.STRING, enum: ["code", "qa"] }
          },
          required: ["question", "type"]
        }
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating challenge with Gemini:", error);
    const list = FALLBACK_CHALLENGES[field] || FALLBACK_CHALLENGES.general;
    const randomIdx = Math.floor(Math.random() * list.length);
    const selected = list[randomIdx];
    return {
      question: selected.question,
      codeTemplate: selected.codeTemplate,
      type: selected.type
    };
  }
}

export async function verifyChallenge(field: string, question: string, answer: string) {
  const ai = getGeminiClient();

  if (!ai) {
    const category = FALLBACK_CHALLENGES[field] || FALLBACK_CHALLENGES.general;
    const matched = category.find(c => 
      c.question.toLowerCase() === question.toLowerCase() || 
      question.toLowerCase().includes(c.question.toLowerCase().slice(0, 20))
    );
    
    if (matched) {
      const isCorrect = matched.fallbackAnswerPattern.test(answer);
      return {
        correct: isCorrect,
        feedback: isCorrect 
          ? "Spot on! That is correct." 
          : "That wasn't quite right. Hint: double check your spelling or try another field."
      };
    }
    
    const isSuccess = answer.trim().length > 0;
    return {
      correct: isSuccess,
      feedback: isSuccess ? "Passed offline verification! Sweet." : "Answer cannot be blank."
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `You are an automated grading assistant for DevGarden's fast-paced coding challenge mini-game.
Field: ${field}
Question: "${question}"
User Answer: "${answer}"

Determine if the user's answer is correct or sufficiently close and correct for the question.
Your response MUST be in JSON matching this schema:
{
  "correct": true or false,
  "feedback": "A super short 1-sentence response explaining if it is correct or incorrect. Keep it friendly and concise!"
}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            correct: { type: Type.BOOLEAN },
            feedback: { type: Type.STRING }
          },
          required: ["correct", "feedback"]
        }
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    console.error("Error verifying challenge with Gemini:", error);
    const isSuccess = answer.trim().length > 0;
    return {
      correct: isSuccess,
      feedback: isSuccess 
        ? "Unlocked! You got it." 
        : "Answer cannot be blank."
    };
  }
}
