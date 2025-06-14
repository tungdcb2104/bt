"use client"

import { useState } from "react"
import { Clock, FileText, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export interface ExamQuestion {
  id: number
  question: string
  options: string[]
  answer: string
  explanation?: string
  points?: number
}

export interface ExamData {
  id: string
  title: string
  description: string
  duration: number // in minutes
  totalPoints: number
  passingScore: number
  questions: ExamQuestion[]
}

interface ExamPreviewProps {
  exam: ExamData
  onStartExam?: () => void
}

export function ExamPreview({ exam, onStartExam }: ExamPreviewProps) {
  const [showSample, setShowSample] = useState(false)

  const handleStartExam = () => {
    if (onStartExam) {
      onStartExam()
    }
  }

  // Lấy 3 câu hỏi mẫu
  const sampleQuestions = exam.questions.slice(0, 3)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{exam.title}</CardTitle>
            <CardDescription>{exam.description}</CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {exam.duration} phút
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-950 rounded-md">
            <FileText className="h-6 w-6 text-blue-500 mb-2" />
            <span className="text-2xl font-bold">{exam.questions.length}</span>
            <span className="text-sm text-muted-foreground">Câu hỏi</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-950 rounded-md">
            <CheckCircle className="h-6 w-6 text-blue-500 mb-2" />
            <span className="text-2xl font-bold">{exam.totalPoints}</span>
            <span className="text-sm text-muted-foreground">Điểm tối đa</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-950 rounded-md">
            <AlertCircle className="h-6 w-6 text-blue-500 mb-2" />
            <span className="text-2xl font-bold">{exam.passingScore}</span>
            <span className="text-sm text-muted-foreground">Điểm đạt</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Điểm đạt</span>
            <span>
              {exam.passingScore}/{exam.totalPoints}
            </span>
          </div>
          <Progress value={(exam.passingScore / exam.totalPoints) * 100} className="h-2" />
        </div>

        <div className="space-y-2">
          <Button variant="outline" onClick={() => setShowSample(!showSample)} className="w-full">
            {showSample ? "Ẩn câu hỏi mẫu" : "Xem câu hỏi mẫu"}
          </Button>

          {showSample && (
            <div className="mt-4 space-y-4">
              {sampleQuestions.map((question, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Câu hỏi {index + 1}</span>
                    {question.points && <span className="text-sm">{question.points} điểm</span>}
                  </div>
                  <p className="mb-3">{question.question}</p>
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={cn(
                          "p-2 border rounded-md",
                          option === question.answer ? "border-green-500 bg-green-50 dark:bg-green-950" : "",
                        )}
                      >
                        {option}
                        {option === question.answer && (
                          <span className="ml-2 text-green-600 text-sm">(Đáp án đúng)</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="text-center text-sm text-muted-foreground">
                Đây chỉ là {sampleQuestions.length} câu hỏi mẫu trong tổng số {exam.questions.length} câu hỏi.
              </div>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="font-medium">Lưu ý:</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Bạn có {exam.duration} phút để hoàn thành bài thi.</li>
            <li>
              • Điểm đạt tối thiểu là {exam.passingScore}/{exam.totalPoints}.
            </li>
            <li>• Bạn có thể xem lại các câu hỏi trong thời gian làm bài.</li>
            <li>• Kết quả sẽ được hiển thị ngay sau khi nộp bài.</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleStartExam} className="w-full">
          Bắt đầu làm bài
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
