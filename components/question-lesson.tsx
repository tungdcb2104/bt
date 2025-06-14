"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { QuestionItem } from "@/types/lesson"

interface QuestionLessonProps {
  title: string
  description: string
  questions: QuestionItem[]
}

export function QuestionLesson({ title, description, questions }: QuestionLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowExplanation(false)
    } else {
      setCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowExplanation(false)
    }
  }

  const handleCheckAnswer = () => {
    const answer = answers[currentIndex]
    if (!answer) return

    let isCorrect = false

    if (currentQuestion.type === "fill_question") {
      isCorrect = answer.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase()
    } else if (currentQuestion.type === "single_choice_question") {
      isCorrect = Number.parseInt(answer) === currentQuestion.correctChoice
    } else if (currentQuestion.type === "multi_choice_question") {
      const correctChoices = Object.entries(currentQuestion.choices)
        .filter(([_, isCorrect]) => isCorrect)
        .map(([choice]) => choice)

      isCorrect =
        answer.length === correctChoices.length && answer.every((choice: string) => correctChoices.includes(choice))
    }

    if (isCorrect) {
      setScore(score + 1)
    }

    setShowExplanation(true)
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setAnswers({})
    setShowExplanation(false)
    setScore(0)
    setCompleted(false)
  }

  const handleAnswerChange = (value: any) => {
    setAnswers({ ...answers, [currentIndex]: value })
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground mb-6">{description}</p>
        <div className="p-8 border rounded-lg">
          <p>Không có câu hỏi nào trong bài học này.</p>
        </div>
      </div>
    )
  }

  const renderQuestion = () => {
    const question = currentQuestion

    if (question.type === "fill_question") {
      return (
        <div className="space-y-4">
          <p className="text-lg">{question.question}</p>
          {question.description && <p className="text-muted-foreground">{question.description}</p>}
          <div>
            <Input
              type="text"
              placeholder="Nhập câu trả lời của bạn"
              value={answers[currentIndex] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              disabled={showExplanation}
            />
          </div>
          {showExplanation && (
            <div className="mt-4 p-3 rounded-md bg-muted">
              <div className="flex items-start gap-2">
                <div
                  className={
                    answers[currentIndex]?.trim().toLowerCase() === question.answer.trim().toLowerCase()
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {answers[currentIndex]?.trim().toLowerCase() === question.answer.trim().toLowerCase() ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <X className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium">Đáp án đúng: {question.answer}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }

    if (question.type === "single_choice_question") {
      return (
        <div className="space-y-4">
          <p className="text-lg">{question.question}</p>
          {question.description && <p className="text-muted-foreground">{question.description}</p>}
          <RadioGroup
            value={answers[currentIndex]?.toString() || ""}
            onValueChange={(value) => handleAnswerChange(value)}
            disabled={showExplanation}
          >
            {question.choices.map((choice, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center space-x-2 rounded-md border p-3",
                  showExplanation && index === question.correctChoice && "border-green-500 bg-green-50",
                  showExplanation &&
                    answers[currentIndex] === index.toString() &&
                    index !== question.correctChoice &&
                    "border-red-500 bg-red-50",
                )}
              >
                <RadioGroupItem value={index.toString()} id={`choice-${index}`} />
                <Label htmlFor={`choice-${index}`} className="flex-grow">
                  {choice}
                </Label>
                {showExplanation && index === question.correctChoice && <Check className="h-5 w-5 text-green-500" />}
                {showExplanation && answers[currentIndex] === index.toString() && index !== question.correctChoice && (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            ))}
          </RadioGroup>
        </div>
      )
    }

    if (question.type === "multi_choice_question") {
      const choices = Object.keys(question.choices)
      return (
        <div className="space-y-4">
          <p className="text-lg">{question.question}</p>
          {question.description && <p className="text-muted-foreground">{question.description}</p>}
          <div className="space-y-2">
            {choices.map((choice, index) => {
              const isCorrect = question.choices[choice]
              const isSelected = answers[currentIndex]?.includes(choice)

              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-center space-x-2 rounded-md border p-3",
                    showExplanation && isCorrect && "border-green-500 bg-green-50",
                    showExplanation && isSelected && !isCorrect && "border-red-500 bg-red-50",
                  )}
                >
                  <Checkbox
                    id={`choice-${index}`}
                    checked={answers[currentIndex]?.includes(choice) || false}
                    onCheckedChange={(checked) => {
                      const currentAnswers = answers[currentIndex] || []
                      const newAnswers = checked
                        ? [...currentAnswers, choice]
                        : currentAnswers.filter((c: string) => c !== choice)
                      handleAnswerChange(newAnswers)
                    }}
                    disabled={showExplanation}
                  />
                  <Label htmlFor={`choice-${index}`} className="flex-grow">
                    {choice}
                  </Label>
                  {showExplanation && isCorrect && <Check className="h-5 w-5 text-green-500" />}
                  {showExplanation && isSelected && !isCorrect && <X className="h-5 w-5 text-red-500" />}
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    return null
  }

  if (completed) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        <Card className="w-full">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Kết quả</h3>
                <p className="text-muted-foreground">Bạn đã hoàn thành tất cả các câu hỏi.</p>
              </div>

              <div className="text-center">
                <div className="text-5xl font-bold mb-2">
                  {score}/{questions.length}
                </div>
                <div className="text-muted-foreground">
                  {score === questions.length
                    ? "Tuyệt vời! Bạn đã trả lời đúng tất cả các câu hỏi."
                    : score > questions.length / 2
                      ? "Tốt lắm! Bạn đã nắm được phần lớn kiến thức."
                      : "Hãy tiếp tục cố gắng! Bạn có thể làm tốt hơn."}
                </div>
              </div>

              <Button onClick={handleRestart} className="mt-4">
                Làm lại bài
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-6">{description}</p>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Câu hỏi {currentIndex + 1}/{questions.length}
          </span>
          <div className="text-sm text-muted-foreground">
            Điểm: {score}/{currentIndex + (showExplanation ? 1 : 0)}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="w-full mb-4">
        <CardHeader>
          <CardTitle>Câu hỏi {currentIndex + 1}</CardTitle>
        </CardHeader>
        <CardContent>{renderQuestion()}</CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Trước
          </Button>

          {!showExplanation ? (
            <Button onClick={handleCheckAnswer} disabled={!answers[currentIndex]}>
              Kiểm tra
            </Button>
          ) : (
            <Button onClick={handleNext}>
              {currentIndex < questions.length - 1 ? (
                <>
                  Tiếp
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                "Hoàn thành"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
