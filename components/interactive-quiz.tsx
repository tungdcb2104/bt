"use client"

import React, { useState } from "react"
import { Check, X, HelpCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  answer: string
  explanation: string
}

interface InteractiveQuizProps {
  questions: QuizQuestion[]
  onComplete?: (score: number, total: number) => void
}

// Custom hook cho navigation quiz/question
function useQuizNavigation(total: number) {
  const [current, setCurrent] = useState(0);
  const goTo = (idx: number) => {
    if (idx >= 0 && idx < total) setCurrent(idx);
  };
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);
  return { current, goTo, next, prev, setCurrent };
}

export function InteractiveQuiz({ questions, onComplete }: InteractiveQuizProps) {
  // Thay thế currentQuestion bằng hook navigation
  const nav = useQuizNavigation(questions.length);
  const currentQuestion = nav.current;
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const handleOptionSelect = (option: string) => {
    if (showExplanation) return
    setSelectedOption(option)
  }

  const handleCheckAnswer = () => {
    if (!selectedOption) return

    setAnswers({ ...answers, [currentQuestion]: selectedOption })

    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1)
    }

    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    setSelectedOption(null)
    setShowExplanation(false)

    if (currentQuestion < questions.length - 1) {
      nav.next()
    } else {
      setCompleted(true)
      if (onComplete) {
        onComplete(score + (selectedOption === questions[currentQuestion].answer ? 1 : 0), questions.length)
      }
    }
  }

  const handleRestart = () => {
    nav.setCurrent(0)
    setSelectedOption(null)
    setShowExplanation(false)
    setScore(0)
    setCompleted(false)
    setAnswers({})
  }

  if (completed) {
    const finalScore = score + (answers[questions.length - 1] === questions[questions.length - 1].answer ? 1 : 0)
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Kết quả bài kiểm tra</CardTitle>
          <CardDescription>Bạn đã hoàn thành bài kiểm tra!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                {finalScore}/{questions.length}
              </div>
              <div className="text-muted-foreground">
                {finalScore === questions.length
                  ? "Tuyệt vời! Bạn đã trả lời đúng tất cả các câu hỏi."
                  : finalScore > questions.length / 2
                    ? "Tốt lắm! Bạn đã nắm được phần lớn kiến thức."
                    : "Hãy tiếp tục cố gắng! Bạn có thể làm tốt hơn."}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRestart} className="w-full">
            Làm lại bài kiểm tra
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const question = questions[currentQuestion]

  return (
    <Card className="w-full">
      <CardHeader>
        {/* Navigation grid */}
        <div className="mb-4 flex flex-wrap gap-2 justify-center">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentQuestion;
            const isAnswered = answers[idx] !== undefined;
            return (
              <button
                key={q.id}
                onClick={() => nav.goTo(idx)}
                className={cn(
                  "w-9 h-9 rounded-full border flex items-center justify-center font-semibold transition-colors",
                  isCurrent
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                    : isAnswered
                      ? "bg-green-100 text-green-700 border-green-400 hover:bg-green-200"
                      : "bg-gray-100 text-gray-500 border-gray-300 hover:bg-gray-200",
                  "focus:outline-none focus:ring-2 focus:ring-blue-400"
                )}
                aria-label={`Câu ${idx + 1}`}
                type="button"
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between items-center">
          <CardTitle>
            Câu hỏi {currentQuestion + 1}/{questions.length}
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Điểm: {score}/{currentQuestion + (showExplanation ? 1 : 0)}
          </div>
        </div>
        <CardDescription>{question.question}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedOption || ""} className="space-y-3">
          {question.options.map((option, index) => {
            const isCorrect = option === question.answer
            const isSelected = option === selectedOption

            return (
              <div
                key={index}
                className={cn(
                  "flex items-center space-x-2 rounded-md border p-3 cursor-pointer",
                  showExplanation && isCorrect && "border-green-500 bg-green-50 dark:bg-green-950",
                  showExplanation && isSelected && !isCorrect && "border-red-500 bg-red-50 dark:bg-red-950",
                  !showExplanation && "hover:border-blue-200 dark:hover:border-blue-800",
                )}
                onClick={() => handleOptionSelect(option)}
              >
                <RadioGroupItem value={option} id={`option-${index}`} disabled={showExplanation} />
                <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                  {option}
                </Label>
                {showExplanation && isCorrect && <Check className="h-5 w-5 text-green-500" />}
                {showExplanation && isSelected && !isCorrect && <X className="h-5 w-5 text-red-500" />}
              </div>
            )
          })}
        </RadioGroup>

        {showExplanation && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-md">
            <div className="flex items-start gap-2">
              <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Giải thích:</h4>
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!showExplanation ? (
          <Button onClick={handleCheckAnswer} disabled={!selectedOption} className="w-full">
            Kiểm tra đáp án
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} className="w-full">
            {currentQuestion < questions.length - 1 ? (
              <>
                Câu hỏi tiếp theo
                <ChevronRight className="ml-1 h-4 w-4" />
              </>
            ) : (
              "Xem kết quả"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
