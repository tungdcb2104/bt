import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
// Giả sử đã có component QuestionLesson, FlashcardLesson, InteractiveQuiz
// import { QuestionLesson } from '@/components/question-lesson';
// import { FlashcardLesson } from '@/components/flashcard-lesson';
// import { InteractiveQuiz } from '@/components/interactive-quiz';

export default function StudyLessonPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // TODO: Gọi API nộp kết quả bài học
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({ title: 'Nộp bài thành công!' });
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Học bài</h1>
      {/* TODO: Hiển thị quiz/flashcard/question tương ứng */}
      {/* <QuestionLesson ... /> */}
      {/* <FlashcardLesson ... /> */}
      {/* <InteractiveQuiz ... /> */}
      <Button onClick={handleSubmit} disabled={loading || submitted} className="mt-6">
        {loading ? 'Đang nộp bài...' : submitted ? 'Đã nộp bài' : 'Nộp bài'}
      </Button>
    </div>
  );
} 