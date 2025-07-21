"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface FlashcardProps {
  front: string
  back: string
  className?: string
}

export function Flashcard({ front, back, className = "" }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className={`relative w-full h-64 ${className}`}>
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front - Blue */}
        <Card className="absolute inset-0 backface-hidden shadow-lg hover:shadow-xl transition-shadow bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="flex items-center justify-center h-full p-6">
            <div className="text-center">
              <p className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-4">{front}</p>
              <p className="text-sm text-blue-600 dark:text-blue-300">Click to reveal answer</p>
            </div>
          </CardContent>
        </Card>

        {/* Back - Red */}
        <Card className="absolute inset-0 backface-hidden rotate-y-180 shadow-lg hover:shadow-xl transition-shadow bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
          <CardContent className="flex items-center justify-center h-full p-6">
            <div className="text-center">
              <p className="text-lg font-medium text-red-900 dark:text-red-100 mb-4">{back}</p>
              <p className="text-sm text-red-600 dark:text-red-300">Click to flip back</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reset button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 z-10 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
        onClick={(e) => {
          e.stopPropagation()
          setIsFlipped(false)
        }}
      >
        <RotateCcw className="w-4 h-4" />
      </Button>
    </div>
  )
}
