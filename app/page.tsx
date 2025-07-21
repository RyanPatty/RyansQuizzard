"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Brain, Download, Upload, Plus, Sparkles, ChevronDown, Trash2, Edit, GraduationCap, Users, Award, Zap, Heart } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { FlashcardSet, QuizSet } from "@/types/data"
import Link from "next/link"
import { generateSampleData } from "@/lib/sample-data"
import { ThemeToggle } from "@/components/theme-toggle"



export default function HomePage() {
  const [flashcardSets, setFlashcardSets] = useLocalStorage<FlashcardSet[]>("flashcard-sets", [])
  const [quizSets, setQuizSets] = useLocalStorage<QuizSet[]>("quiz-sets", [])
  const [isClient, setIsClient] = useState(false)
  const [showDataFormat, setShowDataFormat] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])



  const handleExportAll = () => {
    const data = {
      flashcardSets,
      quizSets,
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ryans-quiz-maker-all-data-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleExportFlashcards = () => {
    if (flashcardSets.length === 0) {
      alert("No flashcard sets to export!")
      return
    }

    const data = {
      flashcardSets,
      exportDate: new Date().toISOString(),
      type: "flashcards",
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ryans-quiz-maker-flashcards-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleExportQuizzes = () => {
    if (quizSets.length === 0) {
      alert("No quizzes to export!")
      return
    }

    const data = {
      quizSets,
      exportDate: new Date().toISOString(),
      type: "quizzes",
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ryans-quiz-maker-quizzes-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)

        if (data.flashcardSets && Array.isArray(data.flashcardSets)) {
          setFlashcardSets(data.flashcardSets)
        }
        if (data.quizSets && Array.isArray(data.quizSets)) {
          setQuizSets(data.quizSets)
        }

        alert("Data imported successfully!")
      } catch (error) {
        alert("Invalid file format. Please upload a valid JSON file.")
      }
    }
    reader.readAsText(file)
    event.target.value = ""
  }

  const handleImportFlashcards = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)

        if (data.flashcardSets && Array.isArray(data.flashcardSets)) {
          // Ask user if they want to replace or merge
          const shouldReplace = confirm(
            `Found ${data.flashcardSets.length} flashcard sets in the file.\n\nClick OK to REPLACE your current flashcards, or Cancel to MERGE with existing ones.`,
          )

          if (shouldReplace) {
            setFlashcardSets(data.flashcardSets)
          } else {
            setFlashcardSets((prev) => [...prev, ...data.flashcardSets])
          }

          alert(`Flashcards imported successfully! (${shouldReplace ? "Replaced" : "Merged"})`)
        } else {
          alert("No valid flashcard data found in the file.")
        }
      } catch (error) {
        alert("Invalid file format. Please upload a valid JSON file.")
      }
    }
    reader.readAsText(file)
    event.target.value = ""
  }

  const handleImportQuizzes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)

        if (data.quizSets && Array.isArray(data.quizSets)) {
          // Ask user if they want to replace or merge
          const shouldReplace = confirm(
            `Found ${data.quizSets.length} quizzes in the file.\n\nClick OK to REPLACE your current quizzes, or Cancel to MERGE with existing ones.`,
          )

          if (shouldReplace) {
            setQuizSets(data.quizSets)
          } else {
            setQuizSets((prev) => [...prev, ...data.quizSets])
          }

          alert(`Quizzes imported successfully! (${shouldReplace ? "Replaced" : "Merged"})`)
        } else {
          alert("No valid quiz data found in the file.")
        }
      } catch (error) {
        alert("Invalid file format. Please upload a valid JSON file.")
      }
    }
    reader.readAsText(file)
    event.target.value = ""
  }

  const handleGenerateSampleData = () => {
    const { sampleFlashcards, sampleQuizzes } = generateSampleData()
    setFlashcardSets((prev) => [...prev, ...sampleFlashcards])
    setQuizSets((prev) => [...prev, ...sampleQuizzes])
    alert(`Added ${sampleFlashcards.length} flashcard sets and ${sampleQuizzes.length} quizzes!`)
  }

  const handleDeleteFlashcardSet = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setFlashcardSets((prev) => prev.filter((set) => set.id !== id))
    }
  }

  const handleDeleteQuiz = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setQuizSets((prev) => prev.filter((quiz) => quiz.id !== id))
    }
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading RyansQuizzard...</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Your offline-first learning companion</p>
        </div>
      </div>
    )
  }

  const hasNoData = flashcardSets.length === 0 && quizSets.length === 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="relative mb-12">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl"></div>
          
          {/* Header Content */}
          <div className="relative p-8">
            {/* Top Bar */}
            <div className="flex justify-end items-center mb-6">
              <ThemeToggle />
            </div>

            {/* Main Title Section */}
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight flex items-center justify-center gap-4">
                <img src="/greenLogo.svg" alt="Dark Oxygen Software" className="w-12 h-12 drop-shadow-lg" />
                RyansQuizzard
                <img src="/greenLogo.svg" alt="Dark Oxygen Software" className="w-12 h-12 drop-shadow-lg" />
              </h1>
              
              <p className="text-xl text-slate-700 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                "Master your craft with custom quizzes and flashcards"
                <span className="block mt-2 text-lg text-slate-600 dark:text-slate-400">
                  All data is stored locally in the browser, if you clear the cache your data will be deleted. You can export your quiz and flashcard data to JSON and upload it later.
                </span>
              </p>

              {/* Sample Data Button */}
              {hasNoData && (
                <div className="flex justify-center">
                  <Button
                    onClick={handleGenerateSampleData}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
                    size="lg"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Try Sample Data
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>



        {/* Quick Start */}
        {hasNoData && (
          <Card className="max-w-lg mx-auto mb-8 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-200">🚀 Get Started</CardTitle>
              <CardDescription className="text-green-700 dark:text-green-300">
                Create your first content or try sample data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Link href="/flashcards/create" className="flex-1">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-500 text-white" size="sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Flashcards
                  </Button>
                </Link>
                <Link href="/quizzes/create" className="flex-1">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-500 text-white" size="sm">
                    <Brain className="w-4 h-4 mr-2" />
                    Quiz
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid md:grid-cols-2 gap-6">
          {/* Flashcards */}
          <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Flashcards
                  </CardTitle>
                  <CardDescription>Study with interactive cards</CardDescription>
                </div>
                <Link href="/flashcards/create">
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-500 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="mb-4">
                {flashcardSets.length} sets
              </Badge>

              {flashcardSets.length > 0 ? (
                <div className="space-y-2 mb-4">
                  {flashcardSets.slice(0, 3).map((set) => (
                    <div
                      key={set.id}
                      className="p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <Link href={`/flashcards/${set.id}`} className="flex-1">
                          <div className="cursor-pointer">
                            <h4 className="font-medium">{set.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{set.cards.length} cards</p>
                          </div>
                        </Link>
                        <div className="flex gap-1 ml-2">
                          <Link href={`/flashcards/edit/${set.id}`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteFlashcardSet(set.id, set.title)}
                            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {flashcardSets.length > 3 && (
                    <Link href="/flashcards">
                      <Button variant="ghost" size="sm" className="w-full mb-4">
                        View all {flashcardSets.length} sets
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400 mb-4">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No flashcard sets yet</p>
                </div>
              )}

              {/* Flashcard Export/Import */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex gap-2">
                  <Button
                    onClick={handleExportFlashcards}
                    variant="outline"
                    size="sm"
                    disabled={flashcardSets.length === 0}
                    className="flex-1 text-blue-600 border-blue-300 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-600 dark:hover:bg-blue-950 bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <div className="relative flex-1">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportFlashcards}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-blue-600 border-blue-300 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-600 dark:hover:bg-blue-950 bg-transparent"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Import
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quizzes */}
          <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    Quizzes
                  </CardTitle>
                  <CardDescription>Test your knowledge</CardDescription>
                </div>
                <Link href="/quizzes/create">
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-500 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="mb-4">
                {quizSets.length} quizzes
              </Badge>

              {quizSets.length > 0 ? (
                <div className="space-y-2 mb-4">
                  {quizSets.slice(0, 3).map((quiz) => (
                    <div
                      key={quiz.id}
                      className="p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <Link href={`/quizzes/${quiz.id}`} className="flex-1">
                          <div className="cursor-pointer">
                            <h4 className="font-medium">{quiz.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {quiz.questions.length} questions
                            </p>
                          </div>
                        </Link>
                        <div className="flex gap-1 ml-2">
                          <Link href={`/quizzes/edit/${quiz.id}`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteQuiz(quiz.id, quiz.title)}
                            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {quizSets.length > 3 && (
                    <Link href="/quizzes">
                      <Button variant="ghost" size="sm" className="w-full mb-4">
                        View all {quizSets.length} quizzes
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400 mb-4">
                  <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No quizzes yet</p>
                </div>
              )}

              {/* Quiz Export/Import */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex gap-2">
                  <Button
                    onClick={handleExportQuizzes}
                    variant="outline"
                    size="sm"
                    disabled={quizSets.length === 0}
                    className="flex-1 text-purple-600 border-purple-300 hover:bg-purple-50 dark:text-purple-400 dark:border-purple-600 dark:hover:bg-purple-950 bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <div className="relative flex-1">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportQuizzes}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-purple-600 border-purple-300 hover:bg-purple-50 dark:text-purple-400 dark:border-purple-600 dark:hover:bg-purple-950 bg-transparent"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Import
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>

      
        {/* Global Export/Import */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="text-center">📦 Backup & Restore</CardTitle>
            <CardDescription className="text-center">Export or import all your data at once</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-4">
              <Button onClick={handleExportAll} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export All Data
              </Button>
              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportAll}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Import All Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>



        {/* Data Format Help */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader
            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => setShowDataFormat(!showDataFormat)}
          >
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">📋 Import/Export Data Formats</CardTitle>
                <CardDescription>JSON formats for importing and exporting your data</CardDescription>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${showDataFormat ? "rotate-180" : ""}`} />
            </div>
          </CardHeader>

          {showDataFormat && (
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2 text-blue-600 dark:text-blue-400">📚 Flashcards Only:</h4>
                <pre className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-xs overflow-x-auto">
                  {`{
  "flashcardSets": [{
    "id": "set-1",
    "title": "Spanish Basics",
    "description": "Essential vocabulary",
    "cards": [{
      "id": "card-1",
      "front": "Hello",
      "back": "Hola"
    }],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }],
  "exportDate": "2024-01-01T00:00:00.000Z",
  "type": "flashcards"
}`}
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-purple-600 dark:text-purple-400">🧠 Quizzes Only:</h4>
                <pre className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-xs overflow-x-auto">
                  {`{
  "quizSets": [{
    "id": "quiz-1",
    "title": "Math Quiz",
    "questions": [{
      "id": "q1",
      "type": "multiple-choice",
      "question": "What is 2 + 2?",
      "options": ["3", "4", "5"],
      "correctAnswer": "4",
      "explanation": "Basic addition"
    }],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }],
  "exportDate": "2024-01-01T00:00:00.000Z",
  "type": "quizzes"
}`}
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-gray-600 dark:text-gray-400">📦 Combined (All Data):</h4>
                <pre className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-xs overflow-x-auto">
                  {`{
  "flashcardSets": [/* flashcard sets */],
  "quizSets": [/* quiz sets */],
  "exportDate": "2024-01-01T00:00:00.000Z"
}`}
                </pre>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded text-sm space-y-2">
                <div>
                  <strong>📤 Export Options:</strong>
                </div>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>
                    <strong>Individual Export:</strong> Use buttons in each section for specific data
                  </li>
                  <li>
                    <strong>Export All Data:</strong> Downloads both flashcards and quizzes in one file
                  </li>
                </ul>

                <div className="mt-3">
                  <strong>📥 Import Options:</strong>
                </div>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>
                    <strong>Individual Import:</strong> Use buttons in each section for specific data
                  </li>
                  <li>
                    <strong>Import All Data:</strong> Accepts any format (combined or separate)
                  </li>
                  <li>
                    <strong>Replace vs Merge:</strong> Individual imports let you choose
                  </li>
                </ul>

                <div className="mt-3">
                  <strong>💡 Tips:</strong> Question types: "multiple-choice", "true-false", "short-text". For
                  true/false, use "True" or "False" as correctAnswer.
                </div>
              </div>
            </CardContent>
          )}
        </Card>





        {/* Footer */}
        <footer className="max-w-4xl mx-auto text-center py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Terms of Service
            </Link>
            <a href="mailto:info@darkoxygensoftware.com" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Contact Us
            </a>
          </div>
          <div className="border-t mt-6 sm:mt-8 pt-4 sm:pt-6">
            <div className="flex flex-col justify-center items-center gap-2 text-center">
              <div className="flex flex-wrap justify-center items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                <span>© 2025 Dark Oxygen Software.</span>
                <span>Made with</span>
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                <span>love by Ryan O&apos;Connor</span>
                <span>for people who love productivity simplified.</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}