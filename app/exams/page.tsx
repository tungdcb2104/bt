import Link from "next/link"
import { Calculator, ChevronRight, Filter, Search, FileText, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Dữ liệu mẫu cho các đề thi
const exams = [
  {
    id: "grade-6-mid-term",
    title: "Đề thi giữa kỳ - Lớp 6",
    description: "Đề thi giữa kỳ 1 môn Toán lớp 6 theo chương trình chuẩn",
    duration: 45,
    questionsCount: 20,
    difficulty: "Trung bình",
    grade: "Lớp 6",
    type: "Giữa kỳ",
  },
  {
    id: "grade-6-final",
    title: "Đề thi cuối kỳ - Lớp 6",
    description: "Đề thi cuối kỳ 1 môn Toán lớp 6 theo chương trình chuẩn",
    duration: 60,
    questionsCount: 25,
    difficulty: "Khó",
    grade: "Lớp 6",
    type: "Cuối kỳ",
  },
  {
    id: "grade-7-mid-term",
    title: "Đề thi giữa kỳ - Lớp 7",
    description: "Đề thi giữa kỳ 1 môn Toán lớp 7 theo chương trình chuẩn",
    duration: 45,
    questionsCount: 20,
    difficulty: "Trung bình",
    grade: "Lớp 7",
    type: "Giữa kỳ",
  },
  {
    id: "grade-7-final",
    title: "Đề thi cuối kỳ - Lớp 7",
    description: "Đề thi cuối kỳ 1 môn Toán lớp 7 theo chương trình chuẩn",
    duration: 60,
    questionsCount: 25,
    difficulty: "Khó",
    grade: "Lớp 7",
    type: "Cuối kỳ",
  },
  {
    id: "grade-8-mid-term",
    title: "Đề thi giữa kỳ - Lớp 8",
    description: "Đề thi giữa kỳ 1 môn Toán lớp 8 theo chương trình chuẩn",
    duration: 45,
    questionsCount: 20,
    difficulty: "Trung bình",
    grade: "Lớp 8",
    type: "Giữa kỳ",
  },
  {
    id: "grade-8-final",
    title: "Đề thi cuối kỳ - Lớp 8",
    description: "Đề thi cuối kỳ 1 môn Toán lớp 8 theo chương trình chuẩn",
    duration: 60,
    questionsCount: 25,
    difficulty: "Khó",
    grade: "Lớp 8",
    type: "Cuối kỳ",
  },
  {
    id: "grade-9-mid-term",
    title: "Đề thi giữa kỳ - Lớp 9",
    description: "Đề thi giữa kỳ 1 môn Toán lớp 9 theo chương trình chuẩn",
    duration: 45,
    questionsCount: 20,
    difficulty: "Trung bình",
    grade: "Lớp 9",
    type: "Giữa kỳ",
  },
  {
    id: "grade-9-final",
    title: "Đề thi cuối kỳ - Lớp 9",
    description: "Đề thi cuối kỳ 1 môn Toán lớp 9 theo chương trình chuẩn",
    duration: 60,
    questionsCount: 25,
    difficulty: "Khó",
    grade: "Lớp 9",
    type: "Cuối kỳ",
  },
]

export default function ExamsPage() {
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
            <Link href="/exams" className="text-sm font-medium transition-colors text-foreground">
              Đề thi
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
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Đề thi</h1>
              <p className="text-muted-foreground">
                Luyện tập với các đề thi mẫu để chuẩn bị tốt nhất cho kỳ thi của bạn
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Tìm kiếm đề thi..." className="w-full rounded-md pl-8" />
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Lọc
              </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="grade6">Lớp 6</TabsTrigger>
                <TabsTrigger value="grade7">Lớp 7</TabsTrigger>
                <TabsTrigger value="grade8">Lớp 8</TabsTrigger>
                <TabsTrigger value="grade9">Lớp 9</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {exams.map((exam) => (
                    <ExamCard
                      key={exam.id}
                      id={exam.id}
                      title={exam.title}
                      description={exam.description}
                      duration={exam.duration}
                      questionsCount={exam.questionsCount}
                      difficulty={exam.difficulty}
                      grade={exam.grade}
                      type={exam.type}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="grade6" className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {exams
                    .filter((exam) => exam.grade === "Lớp 6")
                    .map((exam) => (
                      <ExamCard
                        key={exam.id}
                        id={exam.id}
                        title={exam.title}
                        description={exam.description}
                        duration={exam.duration}
                        questionsCount={exam.questionsCount}
                        difficulty={exam.difficulty}
                        grade={exam.grade}
                        type={exam.type}
                      />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="grade7" className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {exams
                    .filter((exam) => exam.grade === "Lớp 7")
                    .map((exam) => (
                      <ExamCard
                        key={exam.id}
                        id={exam.id}
                        title={exam.title}
                        description={exam.description}
                        duration={exam.duration}
                        questionsCount={exam.questionsCount}
                        difficulty={exam.difficulty}
                        grade={exam.grade}
                        type={exam.type}
                      />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="grade8" className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {exams
                    .filter((exam) => exam.grade === "Lớp 8")
                    .map((exam) => (
                      <ExamCard
                        key={exam.id}
                        id={exam.id}
                        title={exam.title}
                        description={exam.description}
                        duration={exam.duration}
                        questionsCount={exam.questionsCount}
                        difficulty={exam.difficulty}
                        grade={exam.grade}
                        type={exam.type}
                      />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="grade9" className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {exams
                    .filter((exam) => exam.grade === "Lớp 9")
                    .map((exam) => (
                      <ExamCard
                        key={exam.id}
                        id={exam.id}
                        title={exam.title}
                        description={exam.description}
                        duration={exam.duration}
                        questionsCount={exam.questionsCount}
                        difficulty={exam.difficulty}
                        grade={exam.grade}
                        type={exam.type}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
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

function ExamCard({
  id,
  title,
  description,
  duration,
  questionsCount,
  difficulty,
  grade,
  type,
}: {
  id: string
  title: string
  description: string
  duration: number
  questionsCount: number
  difficulty: string
  grade: string
  type: string
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge
            variant={
              difficulty === "Dễ"
                ? "outline"
                : difficulty === "Trung bình"
                  ? "secondary"
                  : difficulty === "Khó"
                    ? "destructive"
                    : "outline"
            }
          >
            {difficulty}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-sm text-muted-foreground">{duration} phút</span>
          </div>
          <div className="flex items-center">
            <FileText className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-sm text-muted-foreground">{questionsCount} câu hỏi</span>
          </div>
          <Badge variant="outline">{grade}</Badge>
          <Badge variant="outline">{type}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/exams/${id}`}>
            Xem đề thi
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
