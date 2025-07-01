"use client"

import { useLayoutEffect, useState } from "react"
import Link from "next/link"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, PlusCircle } from "lucide-react"
import { lessonLearnService } from "@/services/lesson_learn_service"
import { LessonModel } from "@/models/lesson_model"

export default function LessonsPage() {
  const [lessons, setLessons] = useState<LessonModel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useLayoutEffect(() => {
    async function fetchLessons() {
      try {
        const lessons = await lessonLearnService.getAllLessons()
        setLessons(lessons)
      } catch (error: Error | any) {
        setError(error.message || "Đã xảy ra lỗi khi tải dữ liệu bài học.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchLessons()
  }, [])

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Bài học</h1>
          <Button asChild>
            <Link href="/lessons/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Thêm bài học mới
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-8 bg-gray-200 rounded w-2/3"></div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </CardContent>
                <CardFooter>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lessons.map((lesson) => (
              <Card key={lesson.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{lesson.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {lesson.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/lessons/${lesson.id}`}>Xem chi tiết</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
