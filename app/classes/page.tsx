"use client"

import { useLayoutEffect, useState } from "react"
import Link from "next/link"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import { classViewService } from "@/services/class_view_service"
import { ClassModel } from "@/models/class_model"
import { toast } from '@/components/ui/use-toast'

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassModel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUsingMockData, setIsUsingMockData] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useLayoutEffect(() => {
    // async function fetchClasses() {
    //   try {
    //     const { clazzes, isUsingMockData } = await getAllClazzes()
    //     setClasses(clazzes)
    //     setIsUsingMockData(isUsingMockData)
    //   } catch (error) {
    //     console.error("Error fetching classes:", error)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }

    // fetchClasses()
    async function fetchClasses() {
      try {
        const classes = await classViewService.getAllClasses()
        setClasses(classes)
      } catch (error: Error | any) {
        // console.error("Error fetching classes:", error)
        setError(error.message || "Đã xảy ra lỗi khi tải dữ liệu lớp học.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchClasses()
  }, [])

  const handlePin = (id: number) => {
    setClasses(prev => prev.map(c => c.id === id ? { ...c, pinned: true } : c))
    toast({ title: 'Đã ghim lớp học!' })
    // TODO: Gọi API pin lớp học
  }

  const handleUnpin = (id: number) => {
    setClasses(prev => prev.map(c => c.id === id ? { ...c, pinned: false } : c))
    toast({ title: 'Đã bỏ ghim lớp học!' })
    // TODO: Gọi API bỏ pin lớp học
  }

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
          <h1 className="text-3xl font-bold">Lớp học</h1>
          {isUsingMockData && (
            <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-md text-sm">
              Đang sử dụng dữ liệu mẫu (không thể kết nối tới API)
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
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
            {classes.map((clazz) => (
              <Card key={clazz.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{clazz.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {clazz.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>Chương trình học toán {clazz.title}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/classes/${clazz.id}`}>Xem chi tiết</Link>
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