import Link from "next/link"
import { Calculator, ChevronRight, Clock, Filter, Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Dữ liệu mẫu cho các chủ đề theo lớp
const topicData = {
  "dai-so": {
    title: "Đại số",
    description: "Học về phương trình bậc hai một ẩn, hệ thức Vi-ét và bất phương trình bậc hai.",
    lessons: [
      {
        id: "phuong-trinh-bac-hai",
        title: "Phương trình bậc hai một ẩn",
        description: "Tìm hiểu về phương trình bậc hai một ẩn, công thức nghiệm và ứng dụng.",
        duration: "55 phút",
      },
      {
        id: "he-thuc-viet",
        title: "Hệ thức Vi-ét",
        description: "Học về hệ thức Vi-ét và ứng dụng trong giải phương trình bậc hai.",
        duration: "45 phút",
      },
      {
        id: "bat-phuong-trinh-bac-hai",
        title: "Bất phương trình bậc hai một ẩn",
        description: "Tìm hiểu về bất phương trình bậc hai một ẩn và cách giải.",
        duration: "50 phút",
      },
    ],
  },
  "ham-so": {
    title: "Hàm số",
    description: "Tìm hiểu về hàm số bậc hai, hàm số thực và đồ thị hàm số.",
    lessons: [
      {
        id: "ham-so-bac-hai",
        title: "Hàm số bậc hai",
        description: "Học về hàm số bậc hai, đồ thị và các tính chất.",
        duration: "55 phút",
      },
      {
        id: "ham-so-thuc",
        title: "Hàm số thực",
        description: "Tìm hiểu về hàm số thực, tính đơn điệu và cực trị.",
        duration: "50 phút",
      },
      {
        id: "do-thi-ham-so",
        title: "Đồ thị hàm số",
        description: "Học cách vẽ và phân tích đồ thị của các hàm số.",
        duration: "45 phút",
      },
    ],
  },
  "hinh-hoc-khong-gian": {
    title: "Hình học không gian",
    description: "Học về các khối đa diện, khối tròn xoay và cách tính thể tích.",
    lessons: [
      {
        id: "khoi-da-dien",
        title: "Khối đa diện",
        description: "Tìm hiểu về các khối đa diện: hình lập phương, hình hộp chữ nhật, hình chóp.",
        duration: "50 phút",
      },
      {
        id: "khoi-tron-xoay",
        title: "Khối tròn xoay",
        description: "Học về các khối tròn xoay: hình trụ, hình nón, hình cầu.",
        duration: "45 phút",
      },
      {
        id: "the-tich-khoi-da-dien",
        title: "Thể tích khối đa diện",
        description: "Học cách tính thể tích của các khối đa diện.",
        duration: "55 phút",
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
              <Link href="/lessons/grade-9" className="hover:text-foreground">
                Lớp 9
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
                  grade="Lớp 9"
                  duration={lesson.duration}
                  href={`/lessons/grade-9/${topic}/${lesson.id}`}
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
