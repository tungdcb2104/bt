import Link from "next/link"
import { Calculator, ChevronRight, Clock, Filter, Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Dữ liệu mẫu cho các chủ đề theo lớp
const topicData = {
  "so-tu-nhien": {
    title: "Số tự nhiên",
    description: "Học về số tự nhiên, ước số, bội số, số nguyên tố và các phép tính.",
    lessons: [
      {
        id: "uoc-so-boi-so",
        title: "Ước số và bội số",
        description: "Tìm hiểu về ước số, bội số và ứng dụng trong các bài toán.",
        duration: "35 phút",
      },
      {
        id: "so-nguyen-to",
        title: "Số nguyên tố",
        description: "Khái niệm số nguyên tố, cách nhận biết và tìm số nguyên tố.",
        duration: "40 phút",
      },
      {
        id: "phan-tich-thua-so",
        title: "Phân tích thừa số nguyên tố",
        description: "Học cách phân tích một số thành tích các thừa số nguyên tố.",
        duration: "45 phút",
      },
    ],
  },
  "phan-so": {
    title: "Phân số",
    description: "Tìm hiểu về phân số, các phép tính với phân số và ứng dụng.",
    lessons: [
      {
        id: "phan-so-co-ban",
        title: "Khái niệm phân số",
        description: "Tìm hiểu về phân số, các loại phân số và cách biểu diễn.",
        duration: "30 phút",
      },
      {
        id: "so-sanh-phan-so",
        title: "So sánh phân số",
        description: "Học cách so sánh các phân số và sắp xếp theo thứ tự.",
        duration: "35 phút",
      },
      {
        id: "phep-tinh-phan-so",
        title: "Các phép tính với phân số",
        description: "Thực hiện các phép tính cộng, trừ, nhân, chia với phân số.",
        duration: "50 phút",
      },
    ],
  },
  "hinh-hoc": {
    title: "Hình học",
    description: "Học về các khái niệm cơ bản trong hình học: điểm, đường thẳng, góc, tam giác.",
    lessons: [
      {
        id: "goc",
        title: "Góc - Đo góc",
        description: "Tìm hiểu về khái niệm góc, cách đo góc và các loại góc.",
        duration: "35 phút",
      },
      {
        id: "tam-giac",
        title: "Tam giác",
        description: "Học về tam giác, các yếu tố của tam giác và các loại tam giác.",
        duration: "45 phút",
      },
      {
        id: "hinh-binh-hanh",
        title: "Hình bình hành",
        description: "Tìm hiểu về hình bình hành, tính chất và cách tính diện tích.",
        duration: "40 phút",
      },
    ],
  },
}

export default function TopicPage({ params }: { params: { topic: string } }) {
  const topic = params.topic
  const data = topicData[topic as keyof typeof topicData]

  if (!data) {
    return <div>Không tìm thấy nội dung cho chủ đề này</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Calculator className="h-6 w-6" />
            <span>Toán Cấp 2</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Trang chủ
            </Link>
            <Link
              href="/lessons"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Bài học
            </Link>
            <Link
              href="/exercises"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Bài tập
            </Link>
            <Link
              href="/flashcards"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Thẻ ghi nhớ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Đăng nhập
            </Button>
            <Button size="sm">Đăng ký</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col gap-6">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/lessons" className="hover:text-foreground">
                Bài học
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/lessons/grade-6" className="hover:text-foreground">
                Lớp 6
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{data.title}</span>
            </nav>

            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{data.title}</h1>
              <p className="text-muted-foreground">{data.description}</p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Tìm kiếm bài học..." className="w-full rounded-md pl-8" />
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Lọc
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  title={lesson.title}
                  description={lesson.description}
                  grade="Lớp 6"
                  duration={lesson.duration}
                  href={`/lessons/grade-6/${topic}/${lesson.id}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 Toán Cấp 2. Mọi quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              Điều khoản
            </Link>
            <Link href="#" className="hover:underline">
              Chính sách
            </Link>
            <Link href="#" className="hover:underline">
              Liên hệ
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function LessonCard({
  title,
  description,
  grade,
  duration,
  href,
}: {
  title: string
  description: string
  grade: string
  duration: string
  href: string
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline">Toán học</Badge>
          <Badge variant="secondary">{grade}</Badge>
        </div>
        <CardTitle className="text-xl mt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-4 w-4" />
          {duration}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={href}>
            Xem bài học
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
