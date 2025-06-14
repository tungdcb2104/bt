"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Layers } from "lucide-react"
import { chapterViewService } from "@/services/chapter_view_service"
import { ChapterModel } from "@/models/chapter_model"
import { LessonModel } from "@/models/lesson_model"

export default function ChapterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [chapter, setChapter] = useState<ChapterModel | null>(null)
  const [lessons, setLessons] = useState<LessonModel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUsingMockData, setIsUsingMockData] = useState(false)
  const { id } = use(params)

  useEffect(() => {
    async function fetchData() {
      try {
        const chapter = await chapterViewService.getChapter(id)
        setChapter(chapter)
        setLessons(chapter.listLesson || [])
      } catch (error: Error | any) {
        setError(error.message || "Đã xảy ra lỗi khi tải dữ liệu chương học.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 text-red-800 p-4 rounded-md">
            <h2 className="text-lg font-semibold">Lỗi</h2>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          {chapter && (
            <Link href={chapter.clazzId ? `/classes/${chapter.clazzId}` : document.referrer} className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Quay lại danh sách chương</span>
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
        ) : chapter ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold">{chapter.title}</h1>
                <p className="text-muted-foreground mt-2">{chapter.description}</p>
              </div>
              {isUsingMockData && (
                <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-md text-sm">
                  Đang sử dụng dữ liệu mẫu (không thể kết nối tới API)
                </div>
              )}
            </div>

            <h2 className="text-2xl font-bold mb-4">Danh sách bài học</h2>
            
            {lessons.length === 0 ? (
              <div className="text-center py-12 bg-muted rounded-lg">
                <p className="text-muted-foreground">Không có bài học nào cho chương này.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map((lesson) => (
                  <Card key={lesson.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {lesson.description}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          {lesson.learningType === "flashcard" ? (
                            <>
                              <Layers className="h-4 w-4 mr-1" />
                              <span>Thẻ ghi nhớ</span>
                            </>
                          ) : (
                            <>
                              <FileText className="h-4 w-4 mr-1" />
                              <span>Bài tập</span>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/lessons/${lesson.id}`}>Học ngay</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-muted-foreground">Không tìm thấy thông tin chương học.</p>
          </div>
        )}
      </div>
    </Layout>
  )
} 