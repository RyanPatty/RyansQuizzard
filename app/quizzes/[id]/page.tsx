"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Clock } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { QuizSet, QuizResult, QuizSession } from "@/types/data"

export default function TakeQuizPage() {
  const params = useParams()
  const router = useRouter()
  const [quizSets] = useLocalStorage<QuizSet[]>("quiz-sets", [])
  const [quizSessions, setQuizSessions] = useLocalStorage<QuizSession[]>("quiz-sessions", [])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [startTime] = useState<number>(Date.now())

  const quizId = params.id as string
  const quiz = quizSets.find((q) => q.id === quizId)

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <h2 className="text-xl font-semibold mb-4">Quiz not found</h2>
            <Link href="/quizzes">
              <Button>Back to Quizzes</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      finishQuiz()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const finishQuiz = () => {
    const results: QuizResult[] = quiz.questions.map((question) => {
      const userAnswer = userAnswers[question.id] || ""
      const isCorrect = userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()

      return {
        questionId: question.id,
        userAnswer,
        isCorrect,
        timeSpent: 1000, // Simplified timing
      }
    })

    const score = results.filter((r) => r.isCorrect).length
    const session: QuizSession = {
      quizId: quiz.id,
      results,
      score,
      totalQuestions: quiz.questions.length,
      completedAt: new Date().toISOString(),
    }

    setQuizSessions((prev) => [...prev, session])
    setShowResults(true)
  }

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  if (showResults) {
    const score = quiz.questions.filter(
      (question) => userAnswers[question.id]?.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim(),
    ).length

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Results Header */}
            <Card className="mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">Quiz Complete! 🎉</CardTitle>
                <CardDescription>{quiz.title}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className={`text-4xl font-bold mb-4 ${getScoreColor(score, quiz.questions.length)}`}>
                  {score}/{quiz.questions.length}
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  {Math.round((score / quiz.questions.length) * 100)}% Correct
                </div>
                <div className="flex justify-center gap-4">
                  <Button onClick={() => window.location.reload()}>Retake Quiz</Button>
                  <Link href="/quizzes">
                    <Button variant="outline">Back to Quizzes</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Results */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Review Your Answers</h2>
              {quiz.questions.map((question, index) => {
                const userAnswer = userAnswers[question.id] || ""
                const isCorrect = userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()

                return (
                  <Card
                    key={question.id}
                    className={`border-l-4 ${isCorrect ? "border-l-green-500" : "border-l-red-500"}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                        {isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{question.question}</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="font-medium">Your answer: </span>
                        <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                          {userAnswer || "(No answer)"}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div>
                          <span className="font-medium">Correct answer: </span>
                          <span className="text-green-600">{question.correctAnswer}</span>
                        </div>
                      )}
                      {question.explanation && (
                        <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                          <span className="font-medium">Explanation: </span>
                          <span className="text-gray-700 dark:text-gray-300">{question.explanation}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/quizzes">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{quiz.title}</h1>
              {quiz.description && <p className="text-gray-600 dark:text-gray-300">{quiz.description}</p>}
            </div>
          </div>
          <Badge variant="outline" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </Badge>
        </div>

        {/* Progress */}
        <div className="max-w-4xl mx-auto mb-8">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <div className="max-w-2xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentQuestion.type === "multiple-choice" && (
                <RadioGroup
                  value={userAnswers[currentQuestion.id] || ""}
                  onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                >
                  {currentQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {String.fromCharCode(65 + index)}. {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestion.type === "true-false" && (
                <RadioGroup
                  value={userAnswers[currentQuestion.id] || ""}
                  onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="True" id="true" />
                    <Label htmlFor="true" className="cursor-pointer">
                      True
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="False" id="false" />
                    <Label htmlFor="false" className="cursor-pointer">
                      False
                    </Label>
                  </div>
                </RadioGroup>
              )}

              {currentQuestion.type === "short-text" && (
                <Input
                  placeholder="Enter your answer..."
                  value={userAnswers[currentQuestion.id] || ""}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                />
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!userAnswers[currentQuestion.id]}
              className="flex items-center gap-2"
            >
              {currentQuestionIndex === quiz.questions.length - 1 ? "Finish Quiz" : "Next"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
