"use client"

import Link from "next/link"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Nền tảng học tập trực tuyến</h1>
        <p className="text-xl mb-8">
          Học tập hiệu quả với các bài giảng và bài tập tương tác
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/classes">Xem lớp học</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/lessons">Xem khóa học</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/management">Quản lý</Link>
          </Button>
        </div>
      </div>
    </Layout>
  )
}
