"use client";

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { Layout } from "@/components/layout"
import { ArrowLeft } from "lucide-react"
import { lessonLearnService } from "@/services/lesson_learn_service"
import { LessonModel } from "@/models/lesson_model"

export default function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [lesson, setLesson] = useState<LessonModel | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = use(params);

  useEffect(() => {
    async function fetchData() {
      try {
        const lesson = await lessonLearnService.getLesson(id);
        setLesson(lesson)
      } catch (error) {
        // console.error("Error fetching lesson data:", error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchData()
  }, [id])

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          {lesson && (
            <Link
              href={`/chapters/${lesson.chapterId}`}
              className="flex items-center text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Quay lại danh sách bài học</span>
            </Link>
          )}
        </div>
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
        ) : lesson ? (
          <>
            <div className="mb-6">
              <h1 className="text-3xl font-bold">{lesson.title}</h1>
              <p className="text-muted-foreground mt-2">{lesson.description}</p>
            </div>
            <div className="mt-8">
              {lesson.learningType === "question" ? (
                <>
                  {lesson.listLearning?.map((q, idx) => (
                    <div key={q.id || idx} className="mb-4 border p-2 rounded">
                      <div className="font-semibold">Câu hỏi {idx + 1}</div>
                      <div>{q.question}</div>
                      <div className="text-sm text-muted-foreground">Đáp án: {q.answer}</div>
                    </div>
                  ))}
                </>
              ) : lesson.learningType === "flashcard" ? (
                <>
                  {lesson.listLearning?.map((f, idx) => (
                    <div key={f.id || idx} className="mb-4 border p-2 rounded">
                      <div className="font-semibold">Flashcard {idx + 1}</div>
                      <div>Mặt trước: {f.frontContent}</div>
                      <div>Mặt sau: {f.backContent}</div>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-muted-foreground">
              Không tìm thấy thông tin bài học.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
