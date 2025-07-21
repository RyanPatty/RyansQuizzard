"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, ImagePlusIcon as PrevIcon, Shuffle, RotateCcw } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { FlashcardSet } from "@/types/data"
import { Flashcard } from "@/components/flashcard"

export default function StudyFlashcardSetPage() {
  const params = useParams()
  const router = useRouter()
  const [flashcardSets] = useLocalStorage<FlashcardSet[]>("flashcard-sets", [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [shuffledCards, setShuffledCards] = useState<any[]>([])
  const [isShuffled, setIsShuffled] = useState(false)

  const setId = params.id as string
  const flashcardSet = flashcardSets.find((set) => set.id === setId)

  useEffect(() => {
    if (flashcardSet) {
      setShuffledCards([...flashcardSet.cards])
    }
  }, [flashcardSet])

  if (!flashcardSet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <h2 className="text-xl font-semibold mb-4">Flashcard set not found</h2>
            <Link href="/flashcards">
              <Button>Back to Flashcards</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentCard = shuffledCards[currentIndex]
  const progress = ((currentIndex + 1) / shuffledCards.length) * 100

  const handleNext = () => {
    if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleShuffle = () => {
    const shuffled = [...shuffledCards].sort(() => Math.random() - 0.5)
    setShuffledCards(shuffled)
    setCurrentIndex(0)
    setIsShuffled(true)
  }

  const handleReset = () => {
    setShuffledCards([...flashcardSet.cards])
    setCurrentIndex(0)
    setIsShuffled(false)
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/flashcards">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{flashcardSet.title}</h1>
              {flashcardSet.description && <p className="text-gray-600">{flashcardSet.description}</p>}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleShuffle} size="sm">
              <Shuffle className="w-4 h-4 mr-2" />
              Shuffle
            </Button>
            {isShuffled && (
              <Button variant="outline" onClick={handleReset} size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Card {currentIndex + 1} of {shuffledCards.length}
            </span>
            <Badge variant={isShuffled ? "secondary" : "outline"}>{isShuffled ? "Shuffled" : "Original Order"}</Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Flashcard */}
        <div className="max-w-2xl mx-auto mb-8">
          {currentCard && <Flashcard front={currentCard.front} back={currentCard.back} className="mx-auto" />}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 bg-transparent"
          >
            <PrevIcon className="w-4 h-4" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentIndex === shuffledCards.length - 1}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Completion Message */}
        {currentIndex === shuffledCards.length - 1 && (
          <Card className="max-w-md mx-auto mt-8">
            <CardHeader>
              <CardTitle className="text-center">🎉 Great job!</CardTitle>
              <CardDescription className="text-center">You've completed this flashcard set</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex justify-center gap-2">
                <Button variant="outline" onClick={handleReset}>
                  Study Again
                </Button>
                <Button variant="outline" onClick={handleShuffle}>
                  Shuffle & Restart
                </Button>
              </div>
              <Link href="/flashcards">
                <Button variant="ghost" className="w-full">
                  Back to All Sets
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
