import Link from "next/link"
import Image from "next/image"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Clock,
  BookOpen,
  Globe,
  FileText,
  PlayCircle,
  CheckCircle,
  Share2,
  Heart,
  ShoppingCart,
  AlertCircle,
  BarChart,
  Users,
  Calendar,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  // Dữ liệu mẫu cho khóa học
  const course = {
    title: "Toán học cơ bản cho học sinh lớp 6",
    slug: "toan-lop-6-co-ban",
    description:
      "Khóa học cung cấp kiến thức nền tảng về số tự nhiên, phân số và hình học cơ bản cho học sinh lớp 6 theo chương trình chuẩn của Bộ Giáo dục và Đào tạo.",
    longDescription:
      "Khóa học Toán học cơ bản cho học sinh lớp 6 được thiết kế đặc biệt để giúp học sinh xây dựng nền tảng vững chắc về môn Toán khi bước vào cấp 2. Với phương pháp giảng dạy trực quan, dễ hiểu và nhiều bài tập thực hành, khóa học sẽ giúp học sinh nắm vững kiến thức cơ bản và phát triển tư duy logic, kỹ năng giải quyết vấn đề.\n\nKhóa học bao gồm các chủ đề quan trọng như số tự nhiên, ước số và bội số, phân số, số thập phân, hình học cơ bản và thống kê đơn giản. Mỗi bài học đều có video giảng dạy chi tiết, tài liệu hỗ trợ và bài tập tương tác giúp học sinh củng cố kiến thức hiệu quả.",
    instructor: "Nguyễn Văn A",
    instructorTitle: "Giáo viên Toán học với 15 năm kinh nghiệm",
    instructorBio:
      "Thầy Nguyễn Văn A là giáo viên Toán với hơn 15 năm kinh nghiệm giảng dạy tại các trường THCS hàng đầu. Thầy đã hướng dẫn nhiều học sinh đạt giải cao trong các kỳ thi học sinh giỏi cấp thành phố và quốc gia.",
    instructorAvatar: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    reviews: 1234,
    students: 12345,
    lastUpdated: "Tháng 3/2024",
    language: "Tiếng Việt",
    price: "599.000₫",
    originalPrice: "1.299.000₫",
    discount: 54,
    image: "/placeholder.svg?height=400&width=700",
    bestseller: true,
    duration: "40 giờ",
    lessons: 120,
    level: "Cơ bản",
    features: [
      "Truy cập trọn đời",
      "120 bài học",
      "40 giờ video",
      "300 bài tập tương tác",
      "15 bài kiểm tra",
      "Chứng chỉ hoàn thành",
      "Hỗ trợ qua diễn đàn",
      "Tài liệu PDF đầy đủ",
    ],
    curriculum: [
      {
        title: "Giới thiệu",
        lessons: [
          { title: "Giới thiệu khóa học", duration: "5:20", preview: true },
          { title: "Cách học hiệu quả", duration: "10:15", preview: true },
          { title: "Tài liệu khóa học", duration: "3:45", type: "tài liệu" },
        ],
      },
      {
        title: "Số tự nhiên",
        lessons: [
          { title: "Số tự nhiên và cách biểu diễn", duration: "15:30" },
          { title: "Phép cộng và phép trừ số tự nhiên", duration: "20:45" },
          { title: "Phép nhân số tự nhiên", duration: "18:20" },
          { title: "Phép chia số tự nhiên", duration: "22:10" },
          { title: "Lũy thừa với số tự nhiên", duration: "15:40" },
          { title: "Bài tập số tự nhiên", duration: "25:15", type: "bài tập" },
          { title: "Kiểm tra chương 1", duration: "30:00", type: "kiểm tra" },
        ],
      },
      {
        title: "Ước số và bội số",
        lessons: [
          { title: "Ước và bội của một số tự nhiên", duration: "18:45" },
          { title: "Số nguyên tố và hợp số", duration: "20:30" },
          { title: "Phân tích một số ra thừa số nguyên tố", duration: "22:15" },
          { title: "Ước chung và bội chung", duration: "25:40" },
          { title: "Tìm ƯCLN và BCNN", duration: "28:15" },
          { title: "Bài tập ước số và bội số", duration: "30:20", type: "bài tập" },
          { title: "Kiểm tra chương 2", duration: "30:00", type: "kiểm tra" },
        ],
      },
      {
        title: "Phân số",
        lessons: [
          { title: "Khái niệm phân số", duration: "15:30" },
          { title: "Phân số bằng nhau", duration: "18:45" },
          { title: "Rút gọn phân số", duration: "16:20" },
          { title: "So sánh phân số", duration: "20:15" },
          { title: "Phép cộng và phép trừ phân số", duration: "25:30" },
          { title: "Phép nhân phân số", duration: "18:45" },
          { title: "Phép chia phân số", duration: "20:10" },
          { title: "Bài tập phân số", duration: "35:20", type: "bài tập" },
          { title: "Kiểm tra chương 3", duration: "30:00", type: "kiểm tra" },
        ],
      },
    ],
    requirements: [
      "Kiến thức Toán học cơ bản của bậc Tiểu học",
      "Máy tính hoặc thiết bị di động có kết nối internet",
      "Sổ và bút để ghi chép",
      "Tinh thần học tập chăm chỉ",
    ],
    targetAudience: [
      "Học sinh lớp 6 muốn củng cố kiến thức nền tảng",
      "Học sinh lớp 5 chuẩn bị lên lớp 6",
      "Phụ huynh muốn hỗ trợ con em học tập tại nhà",
      "Giáo viên tìm kiếm tài liệu tham khảo",
    ],
    whatYouWillLearn: [
      "Nắm vững kiến thức cơ bản về số tự nhiên, phân số và hình học",
      "Phát triển kỹ năng tính toán nhanh và chính xác",
      "Rèn luyện tư duy logic và khả năng giải quyết vấn đề",
      "Áp dụng kiến thức Toán học vào các tình huống thực tế",
      "Chuẩn bị nền tảng vững chắc cho chương trình Toán lớp 7",
      "Tự tin hơn trong học tập và làm bài kiểm tra",
    ],
    reviews: [
      {
        name: "Trần Minh",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 5,
        date: "15/03/2024",
        comment:
          "Khóa học rất hay và dễ hiểu. Giáo viên giảng bài rõ ràng, có nhiều ví dụ minh họa và bài tập đa dạng. Con tôi đã cải thiện điểm số rõ rệt sau khi học khóa này.",
      },
      {
        name: "Nguyễn Hương",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 4,
        date: "10/03/2024",
        comment:
          "Nội dung khóa học phong phú, bám sát chương trình. Tuy nhiên, một số bài tập hơi khó đối với học sinh mới bắt đầu. Nhìn chung là rất tốt.",
      },
      {
        name: "Lê Thành",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 5,
        date: "05/03/2024",
        comment:
          "Tôi là giáo viên Toán và đã giới thiệu khóa học này cho học sinh của mình. Cách trình bày rõ ràng, logic và có nhiều phương pháp giải hay.",
      },
    ],
  }

  return (
    <Layout>
      {/* Course Header */}
      <section className="bg-slate-900 text-white py-8">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <nav className="flex text-sm text-slate-300 mb-2">
                <Link href="/courses" className="hover:text-white">
                  Khóa học
                </Link>
                <span className="mx-2">&gt;</span>
                <Link href="/courses?grade=6" className="hover:text-white">
                  Lớp 6
                </Link>
                <span className="mx-2">&gt;</span>
                <span>Toán học cơ bản</span>
              </nav>

              <h1 className="text-3xl font-bold">{course.title}</h1>

              <p className="text-xl">{course.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                {course.bestseller && (
                  <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">Bán chạy nhất</Badge>
                )}
                <div className="flex items-center">
                  <span className="font-bold mr-1">{course.rating}</span>
                  <div className="flex mr-1">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(course.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}
                        />
                      ))}
                  </div>
                  <Link href="#reviews" className="hover:underline">
                    ({course.reviews} đánh giá)
                  </Link>
                </div>
                <div>{course.students} học viên</div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span>Tạo bởi</span>
                <Link href="#instructor" className="font-medium hover:underline">
                  {course.instructor}
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Cập nhật {course.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span>{course.language}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="overflow-hidden sticky top-24">
                <div className="aspect-video relative">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Button variant="outline" className="text-white border-white hover:text-white">
                      <PlayCircle className="mr-2 h-5 w-5" />
                      Xem giới thiệu
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold">{course.price}</span>
                      <span className="text-lg text-muted-foreground line-through">{course.originalPrice}</span>
                      <Badge className="ml-auto">Giảm {course.discount}%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      <AlertCircle className="inline h-4 w-4 mr-1" />
                      Ưu đãi kết thúc sau 2 ngày
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full text-base font-semibold h-12">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Thêm vào giỏ hàng
                    </Button>
                    <Button variant="outline" className="w-full text-base font-semibold h-12">
                      Mua ngay
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">Đảm bảo hoàn tiền trong 30 ngày</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold">Khóa học này bao gồm:</h3>
                    <ul className="space-y-2">
                      {course.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button variant="ghost" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Chia sẻ
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Heart className="mr-2 h-4 w-4" />
                      Yêu thích
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* What You'll Learn */}
              <div className="border rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Bạn sẽ học được gì</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Nội dung khóa học</h2>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{course.curriculum.length} chương</span>
                        <span className="mx-2">•</span>
                        <span>{course.lessons} bài học</span>
                        <span className="mx-2">•</span>
                        <span>Thời lượng {course.duration}</span>
                      </div>
                      <Button variant="link">Mở rộng tất cả</Button>
                    </div>
                  </div>

                  <Accordion type="multiple" defaultValue={["item-0"]}>
                    {course.curriculum.map((section, sectionIndex) => (
                      <AccordionItem key={sectionIndex} value={`item-${sectionIndex}`}>
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <div className="flex justify-between items-center w-full text-left">
                            <span className="font-medium">{section.title}</span>
                            <span className="text-sm text-muted-foreground">{section.lessons.length} bài học</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-0 pt-0 pb-0">
                          <div className="divide-y">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className="flex items-center justify-between px-4 py-3 hover:bg-muted/50"
                              >
                                <div className="flex items-center gap-2">
                                  {lesson.preview ? (
                                    <PlayCircle className="h-5 w-5 text-blue-500" />
                                  ) : lesson.type === "bài tập" ? (
                                    <FileText className="h-5 w-5 text-orange-500" />
                                  ) : lesson.type === "kiểm tra" ? (
                                    <BarChart className="h-5 w-5 text-red-500" />
                                  ) : lesson.type === "tài liệu" ? (
                                    <FileText className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <PlayCircle className="h-5 w-5" />
                                  )}
                                  <span className={lesson.preview ? "text-blue-500 font-medium" : ""}>
                                    {lesson.title}
                                    {lesson.preview && " (Xem trước)"}
                                  </span>
                                </div>
                                <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Yêu cầu</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {course.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Mô tả</h2>
                <div className="space-y-4">
                  {course.longDescription.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Target Audience */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Đối tượng mục tiêu</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {course.targetAudience.map((audience, index) => (
                    <li key={index}>{audience}</li>
                  ))}
                </ul>
              </div>

              {/* Instructor */}
              <div id="instructor">
                <h2 className="text-2xl font-bold mb-4">Giảng viên</h2>
                <div className="border rounded-lg p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-full overflow-hidden relative">
                        <Image
                          src={course.instructorAvatar || "/placeholder.svg"}
                          alt={course.instructor}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold">{course.instructor}</h3>
                      <p className="text-muted-foreground">{course.instructorTitle}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating} Đánh giá</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course.students} Học viên</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>10 Khóa học</span>
                        </div>
                      </div>
                      <p>{course.instructorBio}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div id="reviews">
                <h2 className="text-2xl font-bold mb-4">Đánh giá từ học viên</h2>
                <div className="border rounded-lg p-6">
                  <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2">{course.rating}</div>
                      <div className="flex justify-center mb-2">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < Math.floor(course.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                            />
                          ))}
                      </div>
                      <div className="text-sm text-muted-foreground">Đánh giá khóa học</div>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const percent = star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : star === 2 ? 1 : 1
                        return (
                          <div key={star} className="flex items-center gap-2">
                            <div className="flex items-center w-20">
                              <span className="text-sm">{star}</span>
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                            </div>
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400"
                                style={{ width: `${percent}%` }}
                                aria-label={`${percent}%`}
                              ></div>
                            </div>
                            <div className="w-12 text-right text-sm">{percent}%</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {course.reviews.map((review, index) => (
                      <div key={index} className="border-t pt-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full overflow-hidden relative">
                              <Image
                                src={review.avatar || "/placeholder.svg"}
                                alt={review.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold">{review.name}</h4>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {Array(5)
                                  .fill(null)
                                  .map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                                    />
                                  ))}
                              </div>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <p>{review.comment}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <Button variant="ghost" size="sm">
                                Hữu ích
                              </Button>
                              <Button variant="ghost" size="sm">
                                Báo cáo
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <Button>Xem tất cả đánh giá</Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              {/* Placeholder for the sticky card that's already shown on mobile */}
            </div>
          </div>
        </div>
      </section>

      {/* More Courses */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Khóa học liên quan</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array(4)
              .fill(null)
              .map((_, i) => {
                const index = i % 4
                const courses = [
                  {
                    title: "Toán học cơ bản cho học sinh lớp 6",
                    instructor: "Nguyễn Văn A",
                    rating: 4.8,
                    students: 1234,
                    price: "599.000₫",
                    originalPrice: "1.299.000₫",
                    image: "/placeholder.svg?height=200&width=300",
                    href: "/courses/toan-lop-6-co-ban",
                    bestseller: true,
                  },
                  {
                    title: "Luyện đề thi học kỳ Toán lớp 7",
                    instructor: "Trần Thị B",
                    rating: 4.7,
                    students: 987,
                    price: "499.000₫",
                    originalPrice: "999.000₫",
                    image: "/placeholder.svg?height=200&width=300",
                    href: "/courses/luyen-de-thi-toan-7",
                  },
                  {
                    title: "Ôn tập chuyên đề hình học lớp 8",
                    instructor: "Lê Văn C",
                    rating: 4.9,
                    students: 1567,
                    price: "649.000₫",
                    originalPrice: "1.399.000₫",
                    image: "/placeholder.svg?height=200&width=300",
                    href: "/courses/hinh-hoc-lop-8",
                    bestseller: true,
                  },
                  {
                    title: "Luyện thi vào lớp 10 môn Toán",
                    instructor: "Phạm Thị D",
                    rating: 4.9,
                    students: 2345,
                    price: "799.000₫",
                    originalPrice: "1.599.000₫",
                    image: "/placeholder.svg?height=200&width=300",
                    href: "/courses/luyen-thi-lop-10-toan",
                  },
                ]
                const course = courses[index]

                return (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      {course.bestseller && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-xs font-bold py-1 px-2 text-white">
                          Bán chạy nhất
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold line-clamp-2 mb-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{course.instructor}</p>
                      <div className="flex items-center gap-1 mb-1">
                        <span className="font-medium">{course.rating}</span>
                        <div className="flex">
                          {Array(5)
                            .fill(null)
                            .map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <span className="text-xs text-muted-foreground">({course.students})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{course.price}</span>
                        <span className="text-sm text-muted-foreground line-through">{course.originalPrice}</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </div>
      </section>
    </Layout>
  )
}
