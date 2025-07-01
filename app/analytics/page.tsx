import Link from "next/link"
import { Calculator, ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LearningAnalytics } from "@/components/learning-analytics"
import { LearningPath } from "@/components/learning-path"

// Dữ liệu mẫu cho phân tích học tập
const analyticsData = {
  completedLessons: 24,
  totalLessons: 40,
  completedExercises: 75,
  totalExercises: 120,
  averageScore: 7.8,
  studyTime: 12,
  strengths: ["Phương trình bậc nhất", "Ước số và bội số", "Tam giác đồng dạng", "Phân tích thừa số nguyên tố"],
  weaknesses: ["Phương trình bậc hai", "Hình học không gian", "Hàm số bậc hai"],
  recentActivity: [
    {
      date: "Hôm nay",
      activity: "Hoàn thành bài học: Phương trình bậc nhất một ẩn",
      duration: 25,
      score: 9,
    },
    {
      date: "Hôm qua",
      activity: "Làm bài tập: Ước số và bội số",
      duration: 15,
      score: 8,
    },
    {
      date: "3 ngày trước",
      activity: "Hoàn thành đề thi: Giữa kỳ lớp 7",
      duration: 45,
      score: 7.5,
    },
    {
      date: "5 ngày trước",
      activity: "Học thẻ ghi nhớ: Số tự nhiên",
      duration: 10,
    },
    {
      date: "1 tuần trước",
      activity: "Hoàn thành bài học: Tam giác đồng dạng",
      duration: 30,
      score: 8.5,
    },
  ],
  achievements: [
    {
      title: "Học viên chăm chỉ",
      description: "Hoàn thành 5 bài học liên tiếp",
      date: "3 ngày trước",
      icon: "award",
    },
    {
      title: "Thành tích xuất sắc",
      description: "Đạt điểm 9+ trong 3 bài kiểm tra liên tiếp",
      date: "1 tuần trước",
      icon: "trophy",
    },
    {
      title: "Nhà toán học tương lai",
      description: "Hoàn thành 20 bài học",
      date: "2 tuần trước",
      icon: "star",
    },
  ],
}

// Dữ liệu mẫu cho lộ trình học tập
const learningModules = [
  {
    id: "so-tu-nhien",
    title: "Số tự nhiên",
    description: "Ước số, bội số, số nguyên tố và phân tích thừa số nguyên tố",
    duration: "2 tuần",
    lessonsCount: 10,
    completedLessons: 10,
    isLocked: false,
    href: "/lessons/grade-6/so-tu-nhien",
    badge: {
      text: "Hoàn thành",
      variant: "default",
    },
  },
  {
    id: "phan-so",
    title: "Phân số",
    description: "Khái niệm phân số, các phép tính với phân số và ứng dụng",
    duration: "2 tuần",
    lessonsCount: 8,
    completedLessons: 6,
    isLocked: false,
    href: "/lessons/grade-6/phan-so",
    requiredModules: ["Số tự nhiên"],
  },
  {
    id: "so-huu-ti",
    title: "Số hữu tỉ",
    description: "Khái niệm số hữu tỉ, các phép tính với số hữu tỉ và ứng dụng",
    duration: "2 tuần",
    lessonsCount: 8,
    completedLessons: 4,
    isLocked: false,
    href: "/lessons/grade-7/so-huu-ti",
    requiredModules: ["Phân số"],
  },
  {
    id: "phuong-trinh-bac-nhat",
    title: "Phương trình bậc nhất",
    description: "Phương trình bậc nhất một ẩn và ứng dụng",
    duration: "3 tuần",
    lessonsCount: 12,
    completedLessons: 4,
    isLocked: false,
    href: "/lessons/grade-7/dai-so/phuong-trinh-bac-nhat",
    requiredModules: ["Số hữu tỉ"],
  },
  {
    id: "tam-giac-dong-dang",
    title: "Tam giác đồng dạng",
    description: "Các điều kiện để hai tam giác đồng dạng và ứng dụng",
    duration: "2 tuần",
    lessonsCount: 8,
    completedLessons: 0,
    isLocked: true,
    href: "/lessons/grade-8/hinh-hoc/tam-giac-dong-dang",
    requiredModules: ["Phương trình bậc nhất"],
  },
]

export default function AnalyticsPage() {
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
            <Link href="/analytics" className="text-sm font-medium transition-colors text-foreground">
              Phân tích
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
          <div className="flex flex-col gap-8">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Phân tích học tập</span>
            </nav>

            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Phân tích học tập</h1>
              <p className="text-muted-foreground">
                Theo dõi tiến độ học tập và hiệu suất của bạn để cải thiện kết quả học tập
              </p>
            </div>

            <LearningAnalytics data={analyticsData} />

            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Lộ trình học tập</h2>
              <p className="text-muted-foreground">
                Lộ trình học tập được cá nhân hóa dựa trên tiến độ và hiệu suất của bạn
              </p>
            </div>

            <LearningPath
              modules={learningModules}
              title="Lộ trình học Toán THCS"
              description="Lộ trình học tập toán học từ lớp 6 đến lớp 9"
            />
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
