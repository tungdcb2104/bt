import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { FlashcardSet } from "@/components/flashcard-set"
import { Layout } from "@/components/layout"

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
]

export default function FlashcardSetPage({ params }: { params: { id: string } }) {
  const setId = params.id
  const flashcardSet = flashcardSets.find((set) => set.id === setId)

  if (!flashcardSet) {
    return <div>Không tìm thấy bộ thẻ ghi nhớ này</div>
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/flashcards" className="hover:text-foreground">
              Thẻ ghi nhớ
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{flashcardSet.title}</span>
          </nav>

          <div className="flex items-center gap-2">
            <Badge variant="outline">{flashcardSet.grade}</Badge>
            <Badge variant="outline">{flashcardSet.category}</Badge>
          </div>

          <FlashcardSet
            title={flashcardSet.title}
            description={flashcardSet.description}
            categories={Array.from(
              new Set(flashcardSet.cards.map((card) => card.category).filter(Boolean) as string[]),
            )}
            cards={flashcardSet.cards}
          />
        </div>
      </div>
    </Layout>
  )
}
