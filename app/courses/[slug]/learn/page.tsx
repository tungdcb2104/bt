"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  PlayCircle,
  FileText,
  Settings,
  Download,
  CheckCircle,
  BarChart,
  Search,
  PenTool,
  Send,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CourseLearnPage({ params }: { params: { slug: string } }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Dữ liệu mẫu cho khóa học
  const course = {
    title: "Toán học cơ bản cho học sinh lớp 6",
    slug: "toan-lop-6-co-ban",
    progress: 35,
    currentLesson: {
      title: "Ước và bội của một số tự nhiên",
      section: "Ước số và bội số",
      duration: "18:45",
      video: "/placeholder.svg?height=400&width=700",
      description:
        "Trong bài học này, chúng ta sẽ tìm hiểu về khái niệm ước số và bội số của một số tự nhiên. Bạn sẽ học cách xác định tất cả các ước của một số và tìm bội của một số.",
      resources: [
        { title: "Tài liệu bài giảng", type: "pdf", size: "2.4 MB" },
        { title: "Bài tập thực hành", type: "pdf", size: "1.8 MB" },
        { title: "Bảng công thức", type: "pdf", size: "0.5 MB" },
      ],
    },
    curriculum: [
      {
        title: "Giới thiệu",
        lessons: [
          { title: "Giới thiệu khóa học", duration: "5:20", completed: true, type: "video" },
          { title: "Cách học hiệu quả", duration: "10:15", completed: true, type: "video" },
          { title: "Tài liệu khóa học", duration: "3:45", completed: true, type: "document" },
        ],
      },
      {
        title: "Số tự nhiên",
        lessons: [
          { title: "Số tự nhiên và cách biểu diễn", duration: "15:30", completed: true, type: "video" },
          { title: "Phép cộng và phép trừ số tự nhiên", duration: "20:45", completed: true, type: "video" },
          { title: "Phép nhân số tự nhiên", duration: "18:20", completed: true, type: "video" },
          { title: "Phép chia số tự nhiên", duration: "22:10", completed: true, type: "video" },
          { title: "Lũy thừa với số tự nhiên", duration: "15:40", completed: false, type: "video" },
          { title: "Bài tập số tự nhiên", duration: "25:15", completed: false, type: "exercise" },
          { title: "Kiểm tra chương 1", duration: "30:00", completed: false, type: "quiz" },
        ],
      },
      {
        title: "Ước số và bội số",
        lessons: [
          {
            title: "Ước và bội của một số tự nhiên",
            duration: "18:45",
            completed: false,
            type: "video",
            current: true,
          },
          { title: "Số nguyên tố và hợp số", duration: "20:30", completed: false, type: "video" },
          { title: "Phân tích một số ra thừa số nguyên tố", duration: "22:15", completed: false, type: "video" },
          { title: "Ước chung và bội chung", duration: "25:40", completed: false, type: "video" },
          { title: "Tìm ƯCLN và BCNN", duration: "28:15", completed: false, type: "video" },
          { title: "Bài tập ước số và bội số", duration: "30:20", completed: false, type: "exercise" },
          { title: "Kiểm tra chương 2", duration: "30:00", completed: false, type: "quiz" },
        ],
      },
      {
        title: "Phân số",
        lessons: [
          { title: "Khái niệm phân số", duration: "15:30", completed: false, type: "video" },
          { title: "Phân số bằng nhau", duration: "18:45", completed: false, type: "video" },
          { title: "Rút gọn phân số", duration: "16:20", completed: false, type: "video" },
          { title: "So sánh phân số", duration: "20:15", completed: false, type: "video" },
          { title: "Phép cộng và phép trừ phân số", duration: "25:30", completed: false, type: "video" },
          { title: "Phép nhân phân số", duration: "18:45", completed: false, type: "video" },
          { title: "Phép chia phân số", duration: "20:10", completed: false, type: "video" },
          { title: "Bài tập phân số", duration: "35:20", completed: false, type: "exercise" },
          { title: "Kiểm tra chương 3", duration: "30:00", completed: false, type: "quiz" },
        ],
      },
    ],
    notes: [
      {
        id: 1,
        time: "2:15",
        content: "Ước của một số tự nhiên a là số tự nhiên mà a chia hết cho số đó.",
        createdAt: "10 phút trước",
      },
      {
        id: 2,
        time: "5:30",
        content: "Bội của một số tự nhiên a là số tự nhiên chia hết cho a.",
        createdAt: "15 phút trước",
      },
      {
        id: 3,
        time: "10:45",
        content: "Cần nhớ công thức tìm BCNN: BCNN(a, b) = (a × b) ÷ ƯCLN(a, b)",
        createdAt: "20 phút trước",
      },
    ],
    questions: [
      {
        id: 1,
        user: {
          name: "Nguyễn Minh",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        time: "2 giờ trước",
        content:
          "Thầy ơi, em chưa hiểu rõ cách tìm ƯCLN bằng phương pháp Euclid. Thầy có thể giải thích lại được không ạ?",
        replies: [
          {
            id: 101,
            user: {
              name: "Nguyễn Văn A",
              avatar: "/placeholder.svg?height=50&width=50",
              isInstructor: true,
            },
            time: "1 giờ trước",
            content:
              "Phương pháp Euclid để tìm ƯCLN(a, b) như sau: Nếu b = 0 thì ƯCLN(a, b) = a. Nếu không, ƯCLN(a, b) = ƯCLN(b, a mod b). Chúng ta lặp lại quá trình này cho đến khi số thứ hai bằng 0.",
          },
        ],
      },
      {
        id: 2,
        user: {
          name: "Trần Hương",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        time: "1 ngày trước",
        content: "Làm thế nào để phân biệt số nguyên tố và hợp số một cách nhanh chóng?",
        replies: [
          {
            id: 201,
            user: {
              name: "Nguyễn Văn A",
              avatar: "/placeholder.svg?height=50&width=50",
              isInstructor: true,
            },
            time: "1 ngày trước",
            content:
              "Để phân biệt nhanh, bạn có thể kiểm tra xem số đó có chia hết cho 2, 3, 5, 7 không. Nếu không chia hết cho các số này và số đó lớn hơn 1, có khả năng cao là số nguyên tố. Để chắc chắn, bạn cần kiểm tra thêm các ước khác.",
          },
          {
            id: 202,
            user: {
              name: "Lê Thành",
              avatar: "/placeholder.svg?height=50&width=50",
            },
            time: "1 ngày trước",
            content: "Mình thấy cách nhanh nhất là dùng sàng Eratosthenes nếu cần tìm nhiều số nguyên tố cùng lúc.",
          },
        ],
      },
    ],
  }

  // Tính tổng số bài học
  const totalLessons = course.curriculum.reduce((acc, section) => acc + section.lessons.length, 0)

  // Tính số bài học đã hoàn thành
  const completedLessons = course.curriculum.reduce(
    (acc, section) => acc + section.lessons.filter((lesson) => lesson.completed).length,
    0,
  )

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation */}
      <header className="border-b bg-background z-50">
        <div className="flex h-14 items-center px-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/courses/${course.slug}`}>
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold truncate max-w-[300px]">{course.title}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Tiến độ khóa học:</span>
                <div className="flex items-center gap-2">
                  <Progress value={course.progress} className="w-40 h-2" />
                  <span className="text-sm font-medium">{course.progress}%</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Settings className="h-4 w-4 mr-2" />
                Cài đặt
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`w-80 border-r bg-background flex-shrink-0 overflow-y-auto ${
            sidebarOpen ? "fixed inset-y-0 left-0 z-50 block" : "hidden md:block"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-semibold">Nội dung khóa học</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-xs">
                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                {completedLessons}/{totalLessons}
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Tìm kiếm bài học..."
                className="w-full rounded-md border border-input pl-8 pr-3 py-2 text-sm"
              />
            </div>
          </div>

          <Accordion type="multiple" defaultValue={["item-2"]}>
            {course.curriculum.map((section, sectionIndex) => (
              <AccordionItem key={sectionIndex} value={`item-${sectionIndex}`}>
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex justify-between items-center w-full text-left">
                    <span className="font-medium">{section.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {section.lessons.filter((lesson) => lesson.completed).length}/{section.lessons.length}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-0 pt-0 pb-0">
                  <div className="divide-y">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className={`flex items-center px-4 py-3 hover:bg-muted/50 ${lesson.current ? "bg-muted" : ""}`}
                      >
                        <div className="mr-3 flex-shrink-0">
                          {lesson.completed ? (
                            <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                              <CheckCircle className="h-3.5 w-3.5 text-white" />
                            </div>
                          ) : lesson.current ? (
                            <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                              <PlayCircle className="h-3.5 w-3.5 text-white" />
                            </div>
                          ) : (
                            <div className="h-5 w-5 rounded-full border border-muted-foreground flex items-center justify-center">
                              {lesson.type === "video" ? (
                                <PlayCircle className="h-3.5 w-3.5 text-muted-foreground" />
                              ) : lesson.type === "document" ? (
                                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                              ) : lesson.type === "exercise" ? (
                                <PenTool className="h-3.5 w-3.5 text-muted-foreground" />
                              ) : (
                                <BarChart className="h-3.5 w-3.5 text-muted-foreground" />
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <span
                              className={`truncate ${lesson.current ? "font-medium" : ""} ${
                                lesson.completed ? "text-muted-foreground" : ""
                              }`}
                            >
                              {lesson.title}
                            </span>
                            <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{lesson.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-muted/20">
          <div className="p-4 md:p-6 max-w-5xl mx-auto">
            <div className="space-y-6">
              {/* Video Player */}
              <div className="bg-black rounded-lg overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src={course.currentLesson.video || "/placeholder.svg"}
                    alt={course.currentLesson.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" variant="outline" className="text-white border-white hover:text-white">
                      <PlayCircle className="mr-2 h-6 w-6" />
                      Phát video
                    </Button>
                  </div>
                </div>
              </div>

              {/* Lesson Navigation */}
              <div className="flex items-center justify-between">
                <Button variant="outline">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Bài trước
                </Button>
                <div className="text-center">
                  <h2 className="font-semibold">{course.currentLesson.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {course.currentLesson.section} • {course.currentLesson.duration}
                  </p>
                </div>
                <Button>
                  Bài tiếp theo
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                  <TabsTrigger value="notes">Ghi chú</TabsTrigger>
                  <TabsTrigger value="questions">Hỏi đáp</TabsTrigger>
                  <TabsTrigger value="resources">Tài liệu</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Giới thiệu bài học</h3>
                    <p>{course.currentLesson.description}</p>

                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h4 className="font-semibold mb-4">Kiến thức chính</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Ước của một số tự nhiên a là số tự nhiên mà a chia hết cho số đó.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Bội của một số tự nhiên a là số tự nhiên chia hết cho a.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Mọi số tự nhiên đều có vô số bội.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Số 0 là bội của mọi số tự nhiên khác 0.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h4 className="font-semibold mb-4">Ví dụ minh họa</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium">Ví dụ 1: Tìm tất cả các ước của số 24</p>
                          <p className="mt-2">
                            Các ước của 24 là các số mà 24 chia hết cho số đó.
                            <br />
                            24 ÷ 1 = 24 → 1 là ước của 24
                            <br />
                            24 ÷ 2 = 12 → 2 là ước của 24
                            <br />
                            24 ÷ 3 = 8 → 3 là ước của 24
                            <br />
                            24 ÷ 4 = 6 → 4 là ước của 24
                            <br />
                            24 ÷ 6 = 4 → 6 là ước của 24
                            <br />
                            24 ÷ 8 = 3 → 8 là ước của 24
                            <br />
                            24 ÷ 12 = 2 → 12 là ước của 24
                            <br />
                            24 ÷ 24 = 1 → 24 là ước của 24
                            <br />
                            Vậy các ước của 24 là: 1, 2, 3, 4, 6, 8, 12, 24
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Ví dụ 2: Tìm 5 bội đầu tiên của số 7</p>
                          <p className="mt-2">
                            Các bội của 7 là các số chia hết cho 7.
                            <br />7 × 1 = 7
                            <br />7 × 2 = 14
                            <br />7 × 3 = 21
                            <br />7 × 4 = 28
                            <br />7 × 5 = 35
                            <br />
                            Vậy 5 bội đầu tiên của 7 là: 7, 14, 21, 28, 35
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Đánh dấu đã hoàn thành
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Ghi chú của tôi</h3>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Tải xuống
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <Textarea placeholder="Thêm ghi chú mới..." className="min-h-[100px]" />
                      <div className="flex justify-end mt-2">
                        <Button>Lưu ghi chú</Button>
                      </div>
                    </div>

                    {course.notes.map((note) => (
                      <div key={note.id} className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{note.time}</Badge>
                            <span className="text-sm text-muted-foreground">{note.createdAt}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <PlayCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <PenTool className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p>{note.content}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="questions" className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Hỏi đáp</h3>
                    <Button>Đặt câu hỏi</Button>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <Textarea placeholder="Đặt câu hỏi của bạn..." className="min-h-[100px]" />
                    <div className="flex justify-end mt-2">
                      <Button>Gửi câu hỏi</Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {course.questions.map((question) => (
                      <div key={question.id} className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={question.user.avatar || "/placeholder.svg"} alt={question.user.name} />
                            <AvatarFallback>{question.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{question.user.name}</h4>
                                <p className="text-sm text-muted-foreground">{question.time}</p>
                              </div>
                            </div>
                            <p className="mt-2">{question.content}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <Button variant="ghost" size="sm">
                                Hữu ích
                              </Button>
                              <Button variant="ghost" size="sm">
                                Trả lời
                              </Button>
                            </div>

                            {/* Replies */}
                            {question.replies.length > 0 && (
                              <div className="mt-4 space-y-4 pl-6 border-l">
                                {question.replies.map((reply) => (
                                  <div key={reply.id} className="flex gap-4">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage
                                        src={reply.user.avatar || "/placeholder.svg"}
                                        alt={reply.user.name}
                                      />
                                      <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <h5 className="font-medium">{reply.user.name}</h5>
                                        {reply.user.isInstructor && (
                                          <Badge variant="outline" className="text-xs">
                                            Giảng viên
                                          </Badge>
                                        )}
                                        <span className="text-sm text-muted-foreground">{reply.time}</span>
                                      </div>
                                      <p className="mt-1">{reply.content}</p>
                                      <div className="flex items-center gap-4 mt-2">
                                        <Button variant="ghost" size="sm">
                                          Hữu ích
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Reply form */}
                            <div className="mt-4 pl-6 flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=50&width=50" alt="Your Avatar" />
                                <AvatarFallback>Y</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 relative">
                                <input
                                  type="text"
                                  placeholder="Viết câu trả lời..."
                                  className="w-full rounded-full border border-input px-4 py-2 text-sm pr-10"
                                />
                                <Button variant="ghost" size="icon" className="absolute right-1 top-1 h-6 w-6">
                                  <Send className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="resources" className="space-y-4 pt-4">
                  <h3 className="text-xl font-semibold">Tài liệu bài học</h3>
                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="divide-y">
                      {course.currentLesson.resources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{resource.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {resource.type.toUpperCase()} • {resource.size}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Tải xuống
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-6">Tài liệu bổ sung</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Bảng công thức toán học</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Tổng hợp các công thức toán học quan trọng cho học sinh lớp 6.
                        </p>
                        <Button variant="outline" size="sm" className="mt-4">
                          <Download className="mr-2 h-4 w-4" />
                          Tải xuống PDF
                        </Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Bộ đề thi thử</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          10 đề thi thử môn Toán lớp 6 có đáp án và hướng dẫn giải chi tiết.
                        </p>
                        <Button variant="outline" size="sm" className="mt-4">
                          <Download className="mr-2 h-4 w-4" />
                          Tải xuống PDF
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
