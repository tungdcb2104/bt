"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react"
import type { FlashcardItem } from "@/types/lesson"

interface FlashcardLessonProps {
  title: string
  description: string
  flashcards: FlashcardItem[]
}

export function FlashcardLesson({ title, description, flashcards }: FlashcardLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [knownCards, setKnownCards] = useState<Set<string | number>>(new Set())

  const currentCard = flashcards[currentIndex]
  const totalCards = flashcards.length
  const cardsRemaining = totalCards - knownCards.size

  // Xử lý lật thẻ
  const handleFlip = () => {
    setFlipped(!flipped)
  }

  // Xử lý chuyển đến thẻ tiếp theo
  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(currentIndex + 1)
      setFlipped(false)
    }
  }

  // Xử lý quay lại thẻ trước
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setFlipped(false)
    }
  }

  // Xử lý đánh dấu thẻ đã biết
  const handleMarkAsKnown = () => {
    const newKnownCards = new Set(knownCards)
    newKnownCards.add(currentCard.id || currentIndex)
    setKnownCards(newKnownCards)

    // Tự động chuyển đến thẻ tiếp theo
    if (currentIndex < totalCards - 1) {
      handleNext()
    }
  }

  // Xử lý reset tất cả thẻ
  const handleReset = () => {
    setCurrentIndex(0)
    setFlipped(false)
    setKnownCards(new Set())
  }

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground mb-6">{description}</p>
        <Card>
          <CardContent className="p-6">
            <p>Không có thẻ ghi nhớ nào trong bài học này.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-6">{description}</p>

      {/* Hiển thị tiến độ */}
      <div className="flex justify-between items-center mb-4">
        <div>
          Thẻ {currentIndex + 1} / {totalCards}
        </div>
        <div>Còn lại: {cardsRemaining} thẻ</div>
      </div>

      {/* Thẻ ghi nhớ */}
      <div className={`flashcard-container ${flipped ? "flashcard-flipped" : ""}`} onClick={handleFlip}>
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">{currentCard.frontContent}</h3>
              {currentCard.frontImage && (
                <img
                  src={currentCard.frontImage || "/placeholder.svg"}
                  alt="Front content"
                  className="mx-auto max-h-40 mb-4"
                />
              )}
              <p className="text-sm text-muted-foreground">Nhấp để lật thẻ</p>
            </div>
          </div>
          <div className="flashcard-back">
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">{currentCard.backContent}</h3>
              {currentCard.backImage && (
                <img
                  src={currentCard.backImage || "/placeholder.svg"}
                  alt="Back content"
                  className="mx-auto max-h-40 mb-4"
                />
              )}
              <p className="text-sm text-muted-foreground">Nhấp để lật lại</p>
            </div>
          </div>
        </div>
      </div>

      {/* Các nút điều khiển */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Trước
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCw className="mr-2 h-4 w-4" /> Làm lại
          </Button>

          <Button
            variant="default"
            onClick={handleMarkAsKnown}
            disabled={knownCards.has(currentCard.id || currentIndex)}
          >
            Đã biết
          </Button>
        </div>

        <Button variant="outline" onClick={handleNext} disabled={currentIndex === totalCards - 1}>
          Tiếp <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default FlashcardLesson
