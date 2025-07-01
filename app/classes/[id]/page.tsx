"use client"

import { use, useLayoutEffect, useState } from "react"
import Link from "next/link"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowLeft } from "lucide-react"
import { classViewService } from "@/services/class_view_service"
import { ClassModel } from "@/models/class_model"
import { ChapterModel } from "@/models/chapter_model"

export default function ClassDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [clazz, setClazz] = useState<ClassModel | null>(null)
  const [chapters, setChapters] = useState<ChapterModel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUsingMockData, setIsUsingMockData] = useState(false)
  const { id } = use(params)

  useLayoutEffect(() => {
    // async function fetchData() {
    //   try {
    //     // Lấy thông tin lớp học
    //     const { clazz, isUsingMockData: isUsingMockClazz } = await getClazz(params.id)
    //     setClazz(clazz)
        
    //     // Lấy danh sách chương của lớp học
    //     const { chapters, isUsingMockData: isUsingMockChapters } = await getChaptersByClazz(params.id)
    //     setChapters(chapters)
        
    //     // Nếu một trong hai API sử dụng mock data, hiển thị thông báo
    //     setIsUsingMockData(isUsingMockClazz || isUsingMockChapters)
    //   } catch (error) {
    //     console.error("Error fetching class data:", error)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }

    async function fetchData() {
      try {
        const classData = await classViewService.getClassDetails(id)
        setClazz(classData)
        setChapters(classData.listChapter || [])
      } catch (error: Error | any) {
        // console.error("Error fetching class data:", error)
        setError(error.message || "Đã xảy ra lỗi khi tải dữ liệu lớp học.")
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
          <Link href="/classes" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Quay lại danh sách lớp</span>
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
        ) : clazz ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold">{clazz.title}</h1>
                <p className="text-muted-foreground mt-2">{clazz.description}</p>
              </div>
              {isUsingMockData && (
                <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-md text-sm">
                  Đang sử dụng dữ liệu mẫu (không thể kết nối tới API)
                </div>
              )}
            </div>

            <h2 className="text-2xl font-bold mb-4">Danh sách chương</h2>
            
            {chapters.length === 0 ? (
              <div className="text-center py-12 bg-muted rounded-lg">
                <p className="text-muted-foreground">Không có chương nào cho lớp học này.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chapters.map((chapter) => (
                  <Card key={chapter.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{chapter.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {chapter.description}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <BookOpen className="h-4 w-4 mr-1" />
                          <span>Chương {chapter.id}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/chapters/${chapter.id}`}>Xem bài học</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-muted-foreground">Không tìm thấy thông tin lớp học.</p>
          </div>
        )}
      </div>
    </Layout>
  )
} 