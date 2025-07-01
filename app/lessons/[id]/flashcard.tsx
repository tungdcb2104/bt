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
        className="bg-white border rounded-lg p-8 min-h-[300px] flex items-center justify-center text-center cursor-pointer shadow-md transition-transform duration-500"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)" }}
      >
        {!isFlipped ? (
          <div className="text-xl font-medium">{flashcard.frontContent}</div>
        ) : (
          <div className="text-xl transform rotate-180">
            {flashcard.backContent}
          </div>
        )}
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
