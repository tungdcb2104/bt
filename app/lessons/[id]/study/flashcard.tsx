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
  const [angle, setAngle] = useState(0);

  // Xử lý chuyển flashcard
  const handleNextFlashcard = useCallback(() => {
    if (
      lesson?.listLearning &&
      currentFlashcardIndex < lesson.listLearning.length - 1
    ) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
      setAngle(0);
    }
  }, [lesson, currentFlashcardIndex]);

  const handlePrevFlashcard = useCallback(() => {
    if (currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex(currentFlashcardIndex - 1);
      setAngle(0);
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
        className="flashcard cursor-pointer"
        onClick={() => setAngle((angle) => angle + 180)}
      >
        <div className="flashcard-inner" data-flipped={angle} style={{
          transform: `rotateY(${angle}deg)`
        }}>
          <div className="flashcard-front">
            {flashcard.frontContent}
          </div>
          <div className="flashcard-back">
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
