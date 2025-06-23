"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { lessonRepository } from "@/repositories/lesson_repository"
import CreateItemForm from "@/components/CreateItemForm"

export default function NewLessonPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await lessonRepository.createLesson({ name, description })
      router.push("/lessons")
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi tạo bài học.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/lessons" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Quay lại danh sách bài học</span>
            </Link>
          </Button>
        </div>

        <Card className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Tạo bài học mới</CardTitle>
              <CardDescription>Điền thông tin chi tiết cho bài học mới của bạn.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên bài học</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Giới thiệu về Đại số"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả ngắn gọn về nội dung bài học."
                  required
                />
              </div>
              {error && (
                <div className="bg-red-100 text-red-800 p-3 rounded-md">
                  <p>{error}</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang tạo..." : "Tạo bài học"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-4">Tạo nội dung cho bài học</h2>
      <CreateItemForm />
    </div>
  )
} 