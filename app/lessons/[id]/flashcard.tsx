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

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-muted-foreground">
          Thẻ {currentFlashcardIndex + 1}/{lesson.listLearning.length}
        </span>
      </div>

      <div
        className="relative bg-white border rounded-lg min-h-[300px] flex items-center justify-center text-center cursor-pointer shadow-md transition-transform duration-500"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: '1000px' }}
      >
        <div
          className={
            `absolute w-full h-full transition-transform duration-500` +
            (isFlipped ? ' rotate-y-180' : '')
          }
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div
            className="absolute w-full h-full flex items-center justify-center text-xl font-medium backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {flashcard.frontContent}
          </div>
          {/* Back */}
          <div
            className="absolute w-full h-full flex items-center justify-center text-xl font-medium backface-hidden bg-gray-50"
            style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
          >
            {flashcard.backContent}
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
