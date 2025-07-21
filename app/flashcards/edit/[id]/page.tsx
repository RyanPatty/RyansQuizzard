"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { FlashcardSet, Flashcard } from "@/types/data"
import { ThemeToggle } from "@/components/theme-toggle"

export default function EditFlashcardSetPage() {
  const params = useParams()
  const router = useRouter()
  const [flashcardSets, setFlashcardSets] = useLocalStorage<FlashcardSet[]>("flashcard-sets", [])

  const setId = params.id as string
  const existingSet = flashcardSets.find((set) => set.id === setId)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [cards, setCards] = useState<Omit<Flashcard, "id">[]>([])

  useEffect(() => {
    if (existingSet) {
      setTitle(existingSet.title)
      setDescription(existingSet.description || "")
      setCards(existingSet.cards.map(({ id, ...card }) => card))
    }
  }, [existingSet])

  if (!existingSet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
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

  const addCard = () => {
    setCards([...cards, { front: "", back: "" }])
  }

  const removeCard = (index: number) => {
    if (cards.length > 1) {
      setCards(cards.filter((_, i) => i !== index))
    }
  }

  const updateCard = (index: number, field: "front" | "back", value: string) => {
    const updatedCards = [...cards]
    updatedCards[index][field] = value
    setCards(updatedCards)
  }

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a title for your flashcard set")
      return
    }

    const validCards = cards.filter((card) => card.front.trim() && card.back.trim())
    if (validCards.length === 0) {
      alert("Please add at least one complete flashcard")
      return
    }

    const updatedSet: FlashcardSet = {
      ...existingSet,
      title: title.trim(),
      description: description.trim() || undefined,
      cards: validCards.map((card, index) => ({
        id: existingSet.cards[index]?.id || `${Date.now()}-${index}`,
        front: card.front.trim(),
        back: card.back.trim(),
      })),
      updatedAt: new Date().toISOString(),
    }

    setFlashcardSets((sets) => sets.map((set) => (set.id === setId ? updatedSet : set)))
    router.push(`/flashcards/${setId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Flashcard Set</h1>
              <p className="text-gray-600 dark:text-gray-300">Update your study materials</p>
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
          {/* Set Details */}
          <Card>
            <CardHeader>
              <CardTitle>Set Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter flashcard set title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this set covers..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Cards */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Flashcards ({cards.length})</CardTitle>
                <Button onClick={addCard} size="sm" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Card
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {cards.map((card, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Card {index + 1}</h4>
                    {cards.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCard(index)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`front-${index}`}>Front (Question/Term)</Label>
                      <Textarea
                        id={`front-${index}`}
                        placeholder="Enter the question or term..."
                        value={card.front}
                        onChange={(e) => updateCard(index, "front", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`back-${index}`}>Back (Answer/Definition)</Label>
                      <Textarea
                        id={`back-${index}`}
                        placeholder="Enter the answer or definition..."
                        value={card.back}
                        onChange={(e) => updateCard(index, "back", e.target.value)}
                        rows={3}
                      />
                    </div>
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
