import Link from "next/link"
import Image from "next/image"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Filter } from "lucide-react"

export default function CoursesPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-12">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">Khóa học Toán THCS</h1>
            <p className="text-xl text-slate-300">
              Khám phá các khóa học Toán chất lượng cao dành cho học sinh THCS. Từ nền tảng cơ bản đến luyện thi chuyên
              sâu.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Bộ lọc</h3>
              <div className="flex lg:hidden mb-4">
                <Button variant="outline" className="w-full justify-start">
                  <Filter className="mr-2 h-4 w-4" />
                  Hiển thị bộ lọc
                </Button>
              </div>
              <div className="hidden lg:block space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Lớp</h4>
                  <div className="space-y-2">
                    {["Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9"].map((grade) => (
                      <div key={grade} className="flex items-center space-x-2">
                        <Checkbox id={`grade-${grade}`} />
                        <label htmlFor={`grade-${grade}`} className="text-sm cursor-pointer">
                          {grade}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Chủ đề</h4>
                  <div className="space-y-2">
                    {["Số học", "Đại số", "Hình học", "Thống kê", "Luyện đề", "Ôn thi", "Nâng cao", "Học yếu"].map(
                      (topic) => (
                        <div key={topic} className="flex items-center space-x-2">
                          <Checkbox id={`topic-${topic}`} />
                          <label htmlFor={`topic-${topic}`} className="text-sm cursor-pointer">
                            {topic}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Đánh giá</h4>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center">
                          <div className="flex mr-1">
                            {Array(5)
                              .fill(null)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                                />
                              ))}
                          </div>
                          {rating} trở lên
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Thời lượng</h4>
                  <div className="space-y-2">
                    {["0-2 giờ", "3-6 giờ", "7-12 giờ", "13+ giờ"].map((duration) => (
                      <div key={duration} className="flex items-center space-x-2">
                        <Checkbox id={`duration-${duration}`} />
                        <label htmlFor={`duration-${duration}`} className="text-sm cursor-pointer">
                          {duration}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Giá</h4>
                  <div className="px-2">
                    <Slider defaultValue={[0, 2000000]} min={0} max={2000000} step={100000} />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>0₫</span>
                      <span>2.000.000₫</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Courses List */}
          <div className="lg:col-span-3">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Tất cả khóa học</h2>
                  <p className="text-muted-foreground">Hiển thị 1-16 trong số 48 khóa học</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Sắp xếp theo:</span>
                  <select className="border rounded-md px-2 py-1 text-sm">
                    <option>Phổ biến nhất</option>
                    <option>Đánh giá cao nhất</option>
                    <option>Mới nhất</option>
                    <option>Giá: Thấp đến cao</option>
                    <option>Giá: Cao đến thấp</option>
                  </select>
                </div>
              </div>

              <Tabs defaultValue="grid" className="w-full">
                <div className="flex justify-end mb-4">
                  <TabsList>
                    <TabsTrigger value="grid" className="px-3">
                      <div className="grid grid-cols-3 gap-0.5 w-5 h-5">
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="list" className="px-3">
                      <div className="flex flex-col gap-0.5 w-5 h-5 justify-center">
                        <div className="h-0.5 bg-current rounded-sm"></div>
                        <div className="h-0.5 bg-current rounded-sm"></div>
                        <div className="h-0.5 bg-current rounded-sm"></div>
                        <div className="h-0.5 bg-current rounded-sm"></div>
                      </div>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="grid" className="mt-0">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array(12)
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
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base line-clamp-2">{course.title}</CardTitle>
                              <p className="text-sm text-muted-foreground">{course.instructor}</p>
                            </CardHeader>
                            <CardContent className="pb-2">
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
                                <span className="text-sm text-muted-foreground line-through">
                                  {course.originalPrice}
                                </span>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button asChild className="w-full">
                                <Link href={course.href}>Xem khóa học</Link>
                              </Button>
                            </CardFooter>
                          </Card>
                        )
                      })}
                  </div>
                </TabsContent>

                <TabsContent value="list" className="mt-0">
                  <div className="space-y-4">
                    {Array(8)
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
                            description:
                              "Khóa học cung cấp kiến thức nền tảng về số tự nhiên, phân số và hình học cơ bản cho học sinh lớp 6.",
                            features: ["40 giờ học", "120 bài học", "Bài tập tương tác", "Chứng chỉ hoàn thành"],
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
                            description:
                              "Khóa học tập trung vào luyện đề thi học kỳ môn Toán lớp 7 với nhiều dạng bài tập và đề thi mẫu.",
                            features: ["30 giờ học", "20 đề thi mẫu", "Giải đề chi tiết", "Kỹ thuật làm bài"],
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
                            description:
                              "Khóa học chuyên sâu về hình học lớp 8 với các chủ đề: tam giác đồng dạng, tứ giác và đường tròn.",
                            features: ["35 giờ học", "100 bài học", "Mô hình 3D", "Bài tập nâng cao"],
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
                            description:
                              "Khóa học luyện thi chuyên sâu giúp học sinh ôn tập toàn diện và chuẩn bị tốt nhất cho kỳ thi vào lớp 10.",
                            features: ["50 giờ học", "30 đề thi mẫu", "Ôn tập toàn diện", "Kỹ thuật làm bài thi"],
                          },
                        ]
                        const course = courses[index]

                        return (
                          <Card key={i} className="overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/4 relative">
                                <div className="aspect-video md:h-full relative">
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
                              </div>
                              <div className="md:w-3/4 p-4">
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                  <div className="space-y-2">
                                    <h3 className="font-bold text-lg">{course.title}</h3>
                                    <p className="text-sm text-muted-foreground">{course.description}</p>
                                    <p className="text-sm">{course.instructor}</p>
                                    <div className="flex items-center gap-1">
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
                                    <div className="flex flex-wrap gap-2">
                                      {course.features.map((feature, i) => (
                                        <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                                          {feature}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                    <div className="text-right">
                                      <div className="font-bold text-lg">{course.price}</div>
                                      <div className="text-sm text-muted-foreground line-through">
                                        {course.originalPrice}
                                      </div>
                                    </div>
                                    <Button asChild className="w-full md:w-auto">
                                      <Link href={course.href}>Xem khóa học</Link>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        )
                      })}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" disabled>
                    &lt;
                  </Button>
                  <Button variant="outline" size="icon" className="bg-primary text-primary-foreground">
                    1
                  </Button>
                  <Button variant="outline" size="icon">
                    2
                  </Button>
                  <Button variant="outline" size="icon">
                    3
                  </Button>
                  <Button variant="outline" size="icon">
                    4
                  </Button>
                  <Button variant="outline" size="icon">
                    &gt;
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
