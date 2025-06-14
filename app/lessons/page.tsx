"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Award, ArrowLeft } from "lucide-react"

export default function LessonsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Quay lại trang chủ</span>
          </Link>
          </div>

        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Danh sách bài học</h1>
          <p className="text-xl mb-6">Các bài học sẽ được hiển thị ở đây</p>
          <Button asChild>
            <Link href="/classes">Xem danh sách lớp học</Link>
                      </Button>
        </div>
      </div>
    </Layout>
  )
}
