"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {  ChevronLeft, ChevronRight } from "lucide-react";
import type { FlashcardItem } from "@/types/lesson";
import { LessonModel } from "@/models/lesson_model";

export default function LessonFlashcardPage({
  lesson,
}: {
  lesson: LessonModel | null;
}) {
  // State cho flashcard
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Xử lý chuyển flashcard
  const handleNextFlashcard = useCallback(() => {
    if (
      lesson?.listLearning &&
      currentFlashcardIndex < lesson.listLearning.length - 1
    ) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
      setIsFlipped(false);
    }
  }, [lesson, currentFlashcardIndex]);

  const handlePrevFlashcard = useCallback(() => {
    if (currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex(currentFlashcardIndex - 1);
      setIsFlipped(false);
    }
  }, [currentFlashcardIndex]);

  // Render flashcard

  if (!lesson?.listLearning || lesson.listLearning.length === 0) {
    return <div className="text-center py-12">Không có thẻ ghi nhớ nào.</div>;
  }

  const flashcard = lesson.listLearning[currentFlashcardIndex] as FlashcardItem;
  console.log('Flashcard data:', flashcard);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-muted-foreground">
          Thẻ {currentFlashcardIndex + 1}/{lesson.listLearning.length}
        </span>
      </div>

      <div
        className="relative w-full h-80 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: '1000px' }}
      >
        <div className="absolute w-full h-full transition-transform duration-500 transform-style-3d" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'none', willChange: 'transform' }}>
          {/* Front */}
          <div
            className="absolute inset-0 flex items-center justify-center text-xl font-medium bg-white p-6 backface-hidden z-10"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {flashcard.frontContent}
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 flex items-center justify-center text-xl font-medium bg-gray-50 p-6 backface-hidden z-0"
            style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
          >
            {flashcard.backContent || (flashcard as any).back || (flashcard as any).answer || "Không có nội dung mặt sau"}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevFlashcard}
          disabled={currentFlashcardIndex === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Trước
        </Button>

        <Button
          variant="outline"
          onClick={handleNextFlashcard}
          disabled={currentFlashcardIndex === lesson.listLearning.length - 1}
        >
          Tiếp
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
