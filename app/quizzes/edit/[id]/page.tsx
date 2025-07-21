"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { QuizSet, QuizQuestion } from "@/types/data"
import { ThemeToggle } from "@/components/theme-toggle"

interface QuestionForm {
  type: "multiple-choice" | "true-false" | "short-text"
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

export default function EditQuizPage() {
  const params = useParams()
  const router = useRouter()
  const [quizSets, setQuizSets] = useLocalStorage<QuizSet[]>("quiz-sets", [])

  const quizId = params.id as string
  const existingQuiz = quizSets.find((quiz) => quiz.id === quizId)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [questions, setQuestions] = useState<QuestionForm[]>([])

  useEffect(() => {
    if (existingQuiz) {
      setTitle(existingQuiz.title)
      setDescription(existingQuiz.description || "")
      setQuestions(
        existingQuiz.questions.map((q) => ({
          type: q.type,
          question: q.question,
          options: q.type === "multiple-choice" ? q.options || ["", "", "", ""] : ["", "", "", ""],
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || "",
        })),
      )
    }
  }, [existingQuiz])

  if (!existingQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
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

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: "multiple-choice",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        explanation: "",
      },
    ])
  }

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index))
    }
  }

  const updateQuestionType = (index: number, type: "multiple-choice" | "true-false" | "short-text") => {
    const newQuestions = [...questions]
    newQuestions[index] = {
      ...newQuestions[index],
      type,
      options: type === "multiple-choice" ? ["", "", "", ""] : [],
      correctAnswer: "",
    }
    setQuestions(newQuestions)
  }

  const updateQuestionText = (index: number, question: string) => {
    const newQuestions = [...questions]
    newQuestions[index] = { ...newQuestions[index], question }
    setQuestions(newQuestions)
  }

  const updateCorrectAnswer = (index: number, correctAnswer: string) => {
    const newQuestions = [...questions]
    newQuestions[index] = { ...newQuestions[index], correctAnswer }
    setQuestions(newQuestions)
  }

  const updateExplanation = (index: number, explanation: string) => {
    const newQuestions = [...questions]
    newQuestions[index] = { ...newQuestions[index], explanation }
    setQuestions(newQuestions)
  }

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions]
    const newOptions = [...newQuestions[questionIndex].options]
    newOptions[optionIndex] = value
    newQuestions[questionIndex] = { ...newQuestions[questionIndex], options: newOptions }
    setQuestions(newQuestions)
  }

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a title for your quiz")
      return
    }

    const validQuestions: QuizQuestion[] = []

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i]

      if (!q.question.trim()) {
        alert(`Question ${i + 1}: Please enter a question`)
        return
      }

      if (!q.correctAnswer.trim()) {
        alert(`Question ${i + 1}: Please enter a correct answer`)
        return
      }

      if (q.type === "multiple-choice") {
        const filledOptions = q.options.filter((opt) => opt.trim())
        if (filledOptions.length < 2) {
          alert(`Question ${i + 1}: Please provide at least 2 answer options`)
          return
        }
        if (!filledOptions.includes(q.correctAnswer.trim())) {
          alert(`Question ${i + 1}: The correct answer must be one of the provided options`)
          return
        }
      }

      const validQuestion: QuizQuestion = {
        id: existingQuiz.questions[i]?.id || `q_${Date.now()}_${i}`,
        type: q.type,
        question: q.question.trim(),
        correctAnswer: q.correctAnswer.trim(),
        explanation: q.explanation.trim() || undefined,
      }

      if (q.type === "multiple-choice") {
        validQuestion.options = q.options.filter((opt) => opt.trim())
      }

      validQuestions.push(validQuestion)
    }

    if (validQuestions.length === 0) {
      alert("Please add at least one valid question")
      return
    }

    const updatedQuiz: QuizSet = {
      ...existingQuiz,
      title: title.trim(),
      description: description.trim() || undefined,
      questions: validQuestions,
      updatedAt: new Date().toISOString(),
    }

    setQuizSets((quizzes) => quizzes.map((quiz) => (quiz.id === quizId ? updatedQuiz : quiz)))
    router.push(`/quizzes/${quizId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Quiz</h1>
              <p className="text-gray-600 dark:text-gray-300">Update your quiz questions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Quiz Details */}
          <Card>
            <CardHeader>
              <CardTitle>Quiz Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter quiz title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this quiz covers..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Questions ({questions.length})</CardTitle>
                <Button onClick={addQuestion} size="sm" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Question
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {questions.map((question, index) => (
                <div key={index} className="border rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Question {index + 1}</h4>
                    <div className="flex items-center gap-2">
                      <Select
                        value={question.type}
                        onValueChange={(value: "multiple-choice" | "true-false" | "short-text") =>
                          updateQuestionType(index, value)
                        }
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                          <SelectItem value="true-false">True/False</SelectItem>
                          <SelectItem value="short-text">Short Text</SelectItem>
                        </SelectContent>
                      </Select>
                      {questions.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(index)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`question-${index}`}>Question *</Label>
                    <Textarea
                      id={`question-${index}`}
                      placeholder="Enter your question..."
                      value={question.question}
                      onChange={(e) => updateQuestionText(index, e.target.value)}
                      rows={2}
                    />
                  </div>

                  {/* Multiple Choice Options */}
                  {question.type === "multiple-choice" && (
                    <div className="space-y-3">
                      <Label>Answer Options *</Label>
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-3">
                          <span className="text-sm font-medium w-8">{String.fromCharCode(65 + optionIndex)}.</span>
                          <Input
                            placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                            value={option}
                            onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Correct Answer */}
                  <div>
                    <Label htmlFor={`answer-${index}`}>Correct Answer *</Label>
                    {question.type === "multiple-choice" ? (
                      <Select
                        value={question.correctAnswer}
                        onValueChange={(value) => updateCorrectAnswer(index, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select correct answer" />
                        </SelectTrigger>
                        <SelectContent>
                          {question.options
                            .filter((opt) => opt.trim()) // ⬅️ Only non-empty options
                            .map((option, optionIndex) => (
                              <SelectItem key={optionIndex} value={option}>
                                {String.fromCharCode(65 + optionIndex)}. {option}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    ) : question.type === "true-false" ? (
                      <Select
                        value={question.correctAnswer}
                        onValueChange={(value) => updateCorrectAnswer(index, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select correct answer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="True">True</SelectItem>
                          <SelectItem value="False">False</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={`answer-${index}`}
                        placeholder="Enter the correct answer..."
                        value={question.correctAnswer}
                        onChange={(e) => updateCorrectAnswer(index, e.target.value)}
                      />
                    )}
                  </div>

                  {/* Explanation */}
                  <div>
                    <Label htmlFor={`explanation-${index}`}>Explanation (optional)</Label>
                    <Textarea
                      id={`explanation-${index}`}
                      placeholder="Explain why this is the correct answer..."
                      value={question.explanation}
                      onChange={(e) => updateExplanation(index, e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
