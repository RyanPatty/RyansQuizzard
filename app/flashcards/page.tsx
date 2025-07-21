"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, Search, Trash2, Edit } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { FlashcardSet } from "@/types/data"
import { ThemeToggle } from "@/components/theme-toggle"

export default function FlashcardsPage() {
  const [flashcardSets, setFlashcardSets] = useLocalStorage<FlashcardSet[]>("flashcard-sets", [])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSets = flashcardSets.filter(
    (set) =>
      set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      set.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteSet = (id: string) => {
    if (confirm("Are you sure you want to delete this flashcard set?")) {
      setFlashcardSets((sets) => sets.filter((set) => set.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Flashcard Sets</h1>
              <p className="text-gray-600 dark:text-gray-300">Manage and study your flashcard collections</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/flashcards/create">
              <Button className="flex items-center gap-2  dark:text-white" >
                <Plus className="w-4 h-4" />
                Create Set
              </Button>
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search flashcard sets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>



        {/* Sets Grid */}
        {filteredSets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSets.map((set) => (
              <Card key={set.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{set.title}</CardTitle>
                      {set.description && <CardDescription className="mt-1">{set.description}</CardDescription>}
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Link href={`/flashcards/edit/${set.id}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSet(set.id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">{set.cards.length} cards</Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(set.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Link href={`/flashcards/${set.id}`}>
                    <Button className="w-full">Study Set</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchTerm ? "No matching sets found" : "No flashcard sets yet"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {searchTerm ? "Try adjusting your search terms" : "Create your first flashcard set to get started"}
            </p>
            {!searchTerm && (
              <Link href="/flashcards/create">
                <Button className="dark:text-white">Create Your First Set</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
