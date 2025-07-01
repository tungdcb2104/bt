"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Layout } from "@/components/layout";
import { ArrowLeft, Star } from "lucide-react";
import { lessonLearnService } from "@/services/lesson_learn_service";
import { LessonModel } from "@/models/lesson_model";
import { Button } from "@/components/ui/button";

export default function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [lesson, setLesson] = useState<LessonModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState<number>(0);
  const { id } = use(params);

  useEffect(() => {
    async function fetchData() {
      try {
        const lesson = await lessonLearnService.getLesson(id);
        setLesson(lesson);
      } catch (error) {
        // console.error("Error fetching lesson data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <Layout>
      <div className="container mx-auto px-4 pb-8">
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
        ) : lesson ? (
          <>
            <div className="sticky top-0 bg-background z-10 py-4 flex items-end justify-between border-b mb-6">
              <div>
                <div className="flex gap-2 items-center">
                  <Link href={`/chapters/${lesson?.chapterId || ""}`}>
                    <ArrowLeft className="h-4 w-4 mr-1" />
                  </Link>
                  <h1 className="text-3xl font-bold">{lesson.title}</h1>
                </div>
                <p className="text-muted-foreground mt-2">
                  {lesson.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/lessons/${id}/edit`}>
                  <Button variant="outline">Chỉnh sửa</Button>
                </Link>
                <Link href={`/lessons/${id}/study`}>
                  <Button>Học bài</Button>
                </Link>
              </div>
            </div>

            <div className="mt-8">
              {lesson.learningType === "question" ? (
                <>
                  {lesson.listLearning?.map((q: any, idx: number) => (
                    <div key={q.id || idx} className="mb-4 border p-2 rounded">
                      <div className="font-semibold">Câu hỏi {idx + 1}</div>
                      <div>{q.question}</div>
                    </div>
                  ))}
                </>
              ) : lesson.learningType === "flashcard" ? (
                <>
                  {lesson.listLearning?.map((f : any, idx: number) => (
                    <div key={f.id || idx} className="mb-4 border p-2 rounded">
                      <div className="font-semibold">Flashcard {idx + 1}</div>
                      <div>{f.frontContent}</div>
                    </div>
                  ))}
                </>
              ) : null}
            </div>

            <div className="mt-12 border-t pt-6">
              <h2 className="text-xl font-semibold mb-2">Đánh giá bài học</h2>
              <div className="flex items-center gap-3">
                <div className="flex gap-1 border rounded px-2 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 cursor-pointer transition-colors ${star <= rating ? "text-yellow-500" : "text-muted"}`}
                      onClick={() => setRating(star)}
                      fill={star <= rating ? "currentColor" : "none"}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{rating}/5</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-muted-foreground">Không tìm thấy thông tin bài học.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
