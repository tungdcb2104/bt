"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, RotateCcw, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface FlashcardItem {
  id: string
  front: string
  back: string
  category?: string
}

interface FlashcardProps {
  cards: FlashcardItem[]
  onComplete?: (results: { correct: number; incorrect: number; total: number }) => void
}

export function Flashcard({ cards, onComplete }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownCards, setKnownCards] = useState<string[]>([])
  const [unknownCards, setUnknownCards] = useState<string[]>([])
  const [completed, setCompleted] = useState(false)

  const currentCard = cards[currentIndex]

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    } else {
      setCompleted(true)
      if (onComplete) {
        onComplete({
          correct: knownCards.length,
          incorrect: unknownCards.length,
          total: cards.length,
        })
      }
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const handleKnown = () => {
    if (!knownCards.includes(currentCard.id)) {
      setKnownCards([...knownCards, currentCard.id])
      // Nếu trước đó đã đánh dấu là không biết, thì xóa khỏi danh sách không biết
      if (unknownCards.includes(currentCard.id)) {
        setUnknownCards(unknownCards.filter((id) => id !== currentCard.id))
      }
    }
    handleNext()
  }

  const handleUnknown = () => {
    if (!unknownCards.includes(currentCard.id)) {
      setUnknownCards([...unknownCards, currentCard.id])
      // Nếu trước đó đã đánh dấu là biết, thì xóa khỏi danh sách biết
      if (knownCards.includes(currentCard.id)) {
        setKnownCards(knownCards.filter((id) => id !== currentCard.id))
      }
    }
    handleNext()
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setKnownCards([])
    setUnknownCards([])
    setCompleted(false)
  }

  if (completed) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Hoàn thành!</h3>
              <p className="text-muted-foreground">Bạn đã hoàn thành tất cả các thẻ ghi nhớ.</p>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full max-w-md">
              <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-950 rounded-md">
                <span className="text-2xl font-bold text-green-600">{knownCards.length}</span>
                <span className="text-sm text-muted-foreground">Đã biết</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-red-50 dark:bg-red-950 rounded-md">
                <span className="text-2xl font-bold text-red-600">{unknownCards.length}</span>
                <span className="text-sm text-muted-foreground">Chưa biết</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-950 rounded-md">
                <span className="text-2xl font-bold text-blue-600">{cards.length}</span>
                <span className="text-sm text-muted-foreground">Tổng số</span>
              </div>
            </div>

            <Button onClick={handleRestart} className="mt-4">
              <RotateCcw className="mr-2 h-4 w-4" />
              Học lại
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Thẻ {currentIndex + 1}/{cards.length}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-green-600 flex items-center">
            <Check className="h-4 w-4 mr-1" />
            {knownCards.length}
          </div>
          <div className="text-sm text-red-600 flex items-center">
            <X className="h-4 w-4 mr-1" />
            {unknownCards.length}
          </div>
        </div>
      </div>

      <Card
        className={cn(
          "w-full h-64 cursor-pointer perspective-1000",
          isFlipped ? "rotate-y-180" : "",
          knownCards.includes(currentCard.id) ? "border-green-500" : "",
          unknownCards.includes(currentCard.id) ? "border-red-500" : "",
        )}
        onClick={handleFlip}
      >
        <div className="relative w-full h-full transform-style-3d transition-transform duration-500">
          <CardContent
            className={cn(
              "absolute w-full h-full backface-hidden p-6 flex flex-col items-center justify-center text-center",
              !isFlipped ? "visible" : "invisible rotate-y-180",
            )}
          >
            <div className="text-sm text-muted-foreground mb-2">
              {currentCard.category && <span className="px-2 py-1 bg-muted rounded-md">{currentCard.category}</span>}
            </div>
            <div className="text-xl font-medium">{currentCard.front}</div>
            <div className="mt-4 text-sm text-muted-foreground">Nhấp để lật thẻ</div>
          </CardContent>

          <CardContent
            className={cn(
              "absolute w-full h-full backface-hidden p-6 flex flex-col items-center justify-center text-center bg-muted",
              isFlipped ? "visible rotate-y-180" : "invisible",
            )}
          >
            <div className="text-xl">{currentCard.back}</div>
            <div className="mt-4 text-sm text-muted-foreground">Nhấp để lật lại</div>
          </CardContent>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Trước
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-red-200 hover:bg-red-50" onClick={handleUnknown}>
            <X className="h-4 w-4 mr-2 text-red-500" />
            Chưa biết
          </Button>
          <Button variant="outline" className="border-green-200 hover:bg-green-50" onClick={handleKnown}>
            <Check className="h-4 w-4 mr-2 text-green-500" />
            Đã biết
          </Button>
        </div>

        <Button variant="outline" onClick={handleNext}>
          {currentIndex < cards.length - 1 ? (
            <>
              Tiếp
              <ChevronRight className="h-4 w-4 ml-2" />
            </>
          ) : (
            "Hoàn thành"
          )}
        </Button>
      </div>
    </div>
  )
}
