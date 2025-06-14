import Link from "next/link"
import { Calculator, ChevronRight, Filter, Search, BookOpen, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dữ liệu mẫu cho các bộ thẻ ghi nhớ
const flashcardSets = [
  {
    id: "grade-6-so-tu-nhien",
    title: "Số tự nhiên - Lớp 6",
    description: "Thẻ ghi nhớ về ước số, bội số, số nguyên tố và phân tích thừa số nguyên tố",
    count: 15,
    grade: "Lớp 6",
    category: "Số học",
    cards: [
      {
        id: "uoc-so",
        front: "Ước của một số tự nhiên a là gì?",
        back: "Ước của một số tự nhiên a là số tự nhiên mà a chia hết cho số đó.",
        category: "Định nghĩa",
      },
      {
        id: "boi-so",
        front: "Bội của một số tự nhiên a là gì?",
        back: "Bội của một số tự nhiên a là số tự nhiên chia hết cho a.",
        category: "Định nghĩa",
      },
      {
        id: "uoc-chung",
        front: "Ước chung của hai hay nhiều số tự nhiên là gì?",
        back: "Ước chung của hai hay nhiều số tự nhiên là số tự nhiên vừa là ước của số này vừa là ước của số kia.",
        category: "Định nghĩa",
      },
      {
        id: "boi-chung",
        front: "Bội chung của hai hay nhiều số tự nhiên là gì?",
        back: "Bội chung của hai hay nhiều số tự nhiên là số tự nhiên vừa là bội của số này vừa là bội của số kia.",
        category: "Định nghĩa",
      },
      {
        id: "ucln",
        front: "Ước chung lớn nhất (ƯCLN) của hai hay nhiều số tự nhiên là gì?",
        back: "Ước chung lớn nhất của hai hay nhiều số tự nhiên là ước chung lớn nhất trong tất cả các ước chung của chúng.",
        category: "Định nghĩa",
      },
      {
        id: "bcnn",
        front: "Bội chung nhỏ nhất (BCNN) của hai hay nhiều số tự nhiên là gì?",
        back: "Bội chung nhỏ nhất của hai hay nhiều số tự nhiên là bội chung nhỏ nhất trong tất cả các bội chung khác 0 của chúng.",
        category: "Định nghĩa",
      },
      {
        id: "cong-thuc-bcnn",
        front: "Công thức tính BCNN của hai số a và b?",
        back: "BCNN(a, b) = (a × b) ÷ ƯCLN(a, b)",
        category: "Công thức",
      },
      {
        id: "so-nguyen-to",
        front: "Số nguyên tố là gì?",
        back: "Số nguyên tố là số tự nhiên lớn hơn 1 và chỉ có đúng hai ước số là 1 và chính nó.",
        category: "Định nghĩa",
      },
      {
        id: "so-nguyen-to-dau-tien",
        front: "Liệt kê 5 số nguyên tố đầu tiên",
        back: "2, 3, 5, 7, 11",
        category: "Ví dụ",
      },
      {
        id: "phan-tich-thua-so",
        front: "Phân tích thừa số nguyên tố là gì?",
        back: "Phân tích thừa số nguyên tố là biểu diễn một số tự nhiên dưới dạng tích của các số nguyên tố.",
        category: "Định nghĩa",
      },
    ],
  },
  {
    id: "grade-7-phuong-trinh",
    title: "Phương trình bậc nhất - Lớp 7",
    description: "Thẻ ghi nhớ về phương trình bậc nhất một ẩn và ứng dụng",
    count: 12,
    grade: "Lớp 7",
    category: "Đại số",
    cards: [
      {
        id: "pt-bac-nhat",
        front: "Phương trình bậc nhất một ẩn có dạng tổng quát là gì?",
        back: "ax + b = 0, trong đó a và b là các số đã biết, a ≠ 0, x là ẩn số cần tìm.",
        category: "Định nghĩa",
      },
      {
        id: "nghiem-pt",
        front: "Nghiệm của phương trình bậc nhất ax + b = 0 là gì?",
        back: "x = -b/a",
        category: "Công thức",
      },
      {
        id: "pt-tuong-duong",
        front: "Hai phương trình được gọi là tương đương khi nào?",
        back: "Hai phương trình được gọi là tương đương khi chúng có cùng tập nghiệm.",
        category: "Định nghĩa",
      },
      {
        id: "quy-tac-chuyen-ve",
        front: "Nêu quy tắc chuyển vế của phương trình",
        back: "Có thể chuyển một số hạng từ vế này sang vế kia của phương trình với điều kiện đổi dấu của số hạng đó.",
        category: "Quy tắc",
      },
      {
        id: "quy-tac-nhan-chia",
        front: "Nêu quy tắc nhân hoặc chia hai vế của phương trình",
        back: "Có thể nhân hoặc chia hai vế của phương trình với một số khác 0 và được phương trình tương đương.",
        category: "Quy tắc",
      },
    ],
  },
  {
    id: "grade-8-hinh-hoc",
    title: "Tam giác đồng dạng - Lớp 8",
    description: "Thẻ ghi nhớ về tam giác đồng dạng và các điều kiện đồng dạng",
    count: 10,
    grade: "Lớp 8",
    category: "Hình học",
    cards: [
      {
        id: "tam-giac-dong-dang",
        front: "Hai tam giác được gọi là đồng dạng khi nào?",
        back: "Hai tam giác được gọi là đồng dạng nếu các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ với nhau.",
        category: "Định nghĩa",
      },
      {
        id: "truong-hop-ggg",
        front: "Trường hợp đồng dạng g.g.g là gì?",
        back: "Hai tam giác có ba góc tương ứng bằng nhau thì đồng dạng.",
        category: "Điều kiện",
      },
      {
        id: "truong-hop-cgc",
        front: "Trường hợp đồng dạng c.g.c là gì?",
        back: "Hai tam giác có hai cạnh tương ứng tỉ lệ và góc kẹp giữa chúng bằng nhau thì đồng dạng.",
        category: "Điều kiện",
      },
      {
        id: "truong-hop-ccc",
        front: "Trường hợp đồng dạng c.c.c là gì?",
        back: "Hai tam giác có ba cạnh tương ứng tỉ lệ thì đồng dạng.",
        category: "Điều kiện",
      },
      {
        id: "ti-so-dong-dang",
        front: "Tỉ số đồng dạng của hai tam giác là gì?",
        back: "Tỉ số đồng dạng của hai tam giác là tỉ số giữa các cạnh tương ứng của chúng.",
        category: "Định nghĩa",
      },
    ],
  },
  {
    id: "grade-9-phuong-trinh-bac-hai",
    title: "Phương trình bậc hai - Lớp 9",
    description: "Thẻ ghi nhớ về phương trình bậc hai một ẩn và công thức nghiệm",
    count: 14,
    grade: "Lớp 9",
    category: "Đại số",
    cards: [
      {
        id: "pt-bac-hai",
        front: "Phương trình bậc hai một ẩn có dạng tổng quát là gì?",
        back: "ax² + bx + c = 0, trong đó a, b, c là các số thực và a ≠ 0.",
        category: "Định nghĩa",
      },
      {
        id: "delta",
        front: "Định thức (delta) của phương trình bậc hai ax² + bx + c = 0 là gì?",
        back: "Δ = b² - 4ac",
        category: "Công thức",
      },
      {
        id: "cong-thuc-nghiem",
        front: "Công thức nghiệm của phương trình bậc hai ax² + bx + c = 0 là gì?",
        back: "x = (-b ± √Δ) / 2a, trong đó Δ = b² - 4ac",
        category: "Công thức",
      },
      {
        id: "phan-loai-nghiem",
        front: "Phân loại nghiệm của phương trình bậc hai theo Δ",
        back: "Nếu Δ > 0: Phương trình có hai nghiệm phân biệt\nNếu Δ = 0: Phương trình có nghiệm kép\nNếu Δ < 0: Phương trình vô nghiệm trong tập số thực",
        category: "Phân loại",
      },
      {
        id: "viet",
        front: "Hệ thức Vi-ét cho phương trình ax² + bx + c = 0 là gì?",
        back: "x₁ + x₂ = -b/a và x₁ × x₂ = c/a",
        category: "Công thức",
      },
    ],
  },
]

export default function FlashcardsPage() {
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
            <Link href="/flashcards" className="text-sm font-medium transition-colors text-foreground">
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
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Thẻ ghi nhớ</h1>
              <p className="text-muted-foreground">
                Sử dụng thẻ ghi nhớ để ôn tập và củng cố kiến thức một cách hiệu quả
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Tìm kiếm bộ thẻ ghi nhớ..." className="w-full rounded-md pl-8" />
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
                <div className="grid gap-6">
                  {flashcardSets.map((set) => (
                    <FlashcardSetCard
                      key={set.id}
                      id={set.id}
                      title={set.title}
                      description={set.description}
                      count={set.count}
                      grade={set.grade}
                      category={set.category}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="grade6" className="mt-0">
                <div className="grid gap-6">
                  {flashcardSets
                    .filter((set) => set.grade === "Lớp 6")
                    .map((set) => (
                      <FlashcardSetCard
                        key={set.id}
                        id={set.id}
                        title={set.title}
                        description={set.description}
                        count={set.count}
                        grade={set.grade}
                        category={set.category}
                      />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="grade7" className="mt-0">
                <div className="grid gap-6">
                  {flashcardSets
                    .filter((set) => set.grade === "Lớp 7")
                    .map((set) => (
                      <FlashcardSetCard
                        key={set.id}
                        id={set.id}
                        title={set.title}
                        description={set.description}
                        count={set.count}
                        grade={set.grade}
                        category={set.category}
                      />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="grade8" className="mt-0">
                <div className="grid gap-6">
                  {flashcardSets
                    .filter((set) => set.grade === "Lớp 8")
                    .map((set) => (
                      <FlashcardSetCard
                        key={set.id}
                        id={set.id}
                        title={set.title}
                        description={set.description}
                        count={set.count}
                        grade={set.grade}
                        category={set.category}
                      />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="grade9" className="mt-0">
                <div className="grid gap-6">
                  {flashcardSets
                    .filter((set) => set.grade === "Lớp 9")
                    .map((set) => (
                      <FlashcardSetCard
                        key={set.id}
                        id={set.id}
                        title={set.title}
                        description={set.description}
                        count={set.count}
                        grade={set.grade}
                        category={set.category}
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

function FlashcardSetCard({
  id,
  title,
  description,
  count,
  grade,
  category,
}: {
  id: string
  title: string
  description: string
  count: number
  grade: string
  category: string
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">{count} thẻ</div>
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-sm text-muted-foreground">{grade}</span>
          </div>
          <div className="text-sm text-muted-foreground">•</div>
          <div className="flex items-center">
            <Brain className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-sm text-muted-foreground">{category}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/flashcards/${id}`}>
            Xem bộ thẻ
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
