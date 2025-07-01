"use client"

import { useState } from "react"
import { BarChart, PieChart, Calendar, Award, TrendingUp, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AnalyticsData {
  completedLessons: number
  totalLessons: number
  completedExercises: number
  totalExercises: number
  averageScore: number
  studyTime: number // in hours
  strengths: string[]
  weaknesses: string[]
  recentActivity: {
    date: string
    activity: string
    duration: number // in minutes
    score?: number
  }[]
  achievements: {
    title: string
    description: string
    date: string
    icon: string
  }[]
}

interface LearningAnalyticsProps {
  data: AnalyticsData
}

export function LearningAnalytics({ data }: LearningAnalyticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "all">("week")

  const lessonCompletionRate = Math.round((data.completedLessons / data.totalLessons) * 100)
  const exerciseCompletionRate = Math.round((data.completedExercises / data.totalExercises) * 100)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Phân tích quá trình học tập
        </CardTitle>
        <CardDescription>Theo dõi tiến độ và hiệu suất học tập của bạn</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
              <div className="text-2xl font-bold">{lessonCompletionRate}%</div>
              <div className="text-sm text-muted-foreground text-center">Hoàn thành bài học</div>
              <Progress value={lessonCompletionRate} className="h-1 mt-2" />
              <div className="text-xs text-muted-foreground mt-1">
                {data.completedLessons}/{data.totalLessons} bài học
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <PieChart className="h-8 w-8 text-green-500 mb-2" />
              <div className="text-2xl font-bold">{exerciseCompletionRate}%</div>
              <div className="text-sm text-muted-foreground text-center">Hoàn thành bài tập</div>
              <Progress value={exerciseCompletionRate} className="h-1 mt-2" />
              <div className="text-xs text-muted-foreground mt-1">
                {data.completedExercises}/{data.totalExercises} bài tập
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <Award className="h-8 w-8 text-amber-500 mb-2" />
              <div className="text-2xl font-bold">{data.averageScore}/10</div>
              <div className="text-sm text-muted-foreground text-center">Điểm trung bình</div>
              <Progress
                value={(data.averageScore / 10) * 100}
                className={`h-1 mt-2 ${data.averageScore >= 8 ? "bg-green-500" : data.averageScore >= 6.5 ? "bg-amber-500" : "bg-red-500"}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <Calendar className="h-8 w-8 text-purple-500 mb-2" />
              <div className="text-2xl font-bold">{data.studyTime}h</div>
              <div className="text-sm text-muted-foreground text-center">Thời gian học tập</div>
              <div className="text-xs text-muted-foreground mt-3">Tuần này</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="progress">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="progress">Tiến độ</TabsTrigger>
            <TabsTrigger value="strengths">Điểm mạnh/yếu</TabsTrigger>
            <TabsTrigger value="achievements">Thành tích</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Hoạt động gần đây</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant={selectedPeriod === "week" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod("week")}
                >
                  Tuần
                </Button>
                <Button
                  variant={selectedPeriod === "month" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod("month")}
                >
                  Tháng
                </Button>
                <Button
                  variant={selectedPeriod === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod("all")}
                >
                  Tất cả
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {data.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">{activity.activity}</div>
                    <div className="text-sm text-muted-foreground">{activity.date}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-muted-foreground">{activity.duration} phút</div>
                    {activity.score !== undefined && (
                      <Badge
                        variant="outline"
                        className={
                          activity.score >= 8
                            ? "bg-green-50 text-green-700 border-green-200"
                            : activity.score >= 6.5
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {activity.score}/10
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="h-64 bg-muted rounded-md flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>Biểu đồ tiến độ học tập sẽ hiển thị ở đây</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="strengths" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Điểm mạnh</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {data.strengths.map((strength, index) => (
                      <li key={index} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Điểm yếu</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {data.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Đề xuất cải thiện</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {data.weaknesses.map((weakness, index) => (
                    <li key={index} className="p-3 bg-blue-50 dark:bg-blue-950 rounded-md">
                      <div className="font-medium mb-1">Cải thiện: {weakness}</div>
                      <div className="text-sm text-muted-foreground">
                        Hãy dành thêm thời gian ôn tập và làm bài tập về chủ đề này.
                      </div>
                      <Button variant="link" className="px-0 py-1 h-auto">
                        Xem bài học liên quan
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.achievements.map((achievement, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mb-3">
                      <Award className="h-8 w-8 text-amber-500" />
                    </div>
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <div className="text-xs text-muted-foreground mt-2">{achievement.date}</div>
                  </CardContent>
                </Card>
              ))}

              <Card className="border-dashed">
                <CardContent className="p-4 flex flex-col items-center text-center h-full justify-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                    <Award className="h-8 w-8 text-muted-foreground opacity-50" />
                  </div>
                  <h3 className="font-medium text-muted-foreground">Thành tích tiếp theo</h3>
                  <p className="text-sm text-muted-foreground">Hoàn thành 10 bài học liên tiếp</p>
                  <Progress value={70} className="h-1 mt-3 w-full max-w-[150px]" />
                  <div className="text-xs text-muted-foreground mt-2">7/10 hoàn thành</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
