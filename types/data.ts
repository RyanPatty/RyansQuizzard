export interface Flashcard {
  id: string
  front: string
  back: string
}

export interface FlashcardSet {
  id: string
  title: string
  description?: string
  cards: Flashcard[]
  createdAt: string
  updatedAt: string
}

export interface QuizQuestion {
  id: string
  type: "multiple-choice" | "true-false" | "short-text"
  question: string
  options?: string[] // For multiple choice
  correctAnswer: string
  explanation?: string
}

export interface QuizSet {
  id: string
  title: string
  description?: string
  questions: QuizQuestion[]
  createdAt: string
  updatedAt: string
}

export interface QuizResult {
  questionId: string
  userAnswer: string
  isCorrect: boolean
  timeSpent: number
}

export interface QuizSession {
  quizId: string
  results: QuizResult[]
  score: number
  totalQuestions: number
  completedAt: string
}
