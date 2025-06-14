"use client";

import { useCallback, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { LessonModel } from "@/models/lesson_model";
import { Question } from "@/types/lesson";

export default function LessonQuestionPage({lesson}: {lesson: LessonModel | null}) {
  // State cho câu hỏi
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: string | string[] | number;
  }>({});
  const [showResult, setShowResult] = useState(false);

  // Xử lý chuyển câu hỏi
  const handleNextQuestion = useCallback(() => {
    if (
      lesson?.listLearning &&
      currentQuestionIndex < lesson.listLearning.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }, [lesson, currentQuestionIndex]);

  const handlePrevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }, [currentQuestionIndex]);

  // Xử lý trả lời câu hỏi
  const handleAnswer = useCallback(
    (questionId: number, answer: string | string[] | number) => {
      setUserAnswers({
        ...userAnswers,
        [questionId]: answer,
      });
    },
    [userAnswers]
  );

  // Kiểm tra câu trả lời đúng/sai
  const checkAnswer = (
    question: Question,
    userAnswer: string | string[] | number
  ) => {
    console.log(question, userAnswer);
    if (question.questionType === "fill") {
      return question.answer === userAnswer;
    } else if (question.questionType === "single_choice") {
      return question.correctChoice === userAnswer;
    } else if (question.questionType === "multi_choice" && question.choices) {
      const correctAnswers = Object.entries(question.choices)
        .filter(([_, isCorrect]) => isCorrect === true)
        .map(([key]) => key);

      const userAnswerArray = Array.isArray(userAnswer)
        ? userAnswer
        : [userAnswer];
      return (
        JSON.stringify(correctAnswers.sort()) ===
        JSON.stringify(userAnswerArray.sort())
      );
    }
    return false;
  };

  // Tính điểm
  const calculateScore = () => {
    if (!lesson?.listLearning) return 0;

    let correctCount = 0;
    lesson.listLearning.forEach((item : Question) => {
      const question = item
      if (question.id && userAnswers[question.id] && checkAnswer(question, userAnswers[question.id])) {
        correctCount++
      }
    })

    return Math.round((correctCount / lesson.listLearning.length) * 100);
  };

  const handleSubmit = useCallback(() => {
    setShowResult(true);
  }, []);

  const handleRetry = useCallback(() => {
    setUserAnswers({});
    setShowResult(false);
    setCurrentQuestionIndex(0);
  }, []);

  // Render câu hỏi
  if (!lesson?.listLearning || lesson.listLearning.length === 0) {
    return <div className="text-center py-12">Không có câu hỏi nào.</div>;
  }

  const question = lesson.listLearning[currentQuestionIndex] as Question;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-muted-foreground">
          Câu hỏi {currentQuestionIndex + 1}/{lesson.listLearning.length}
        </span>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{question.question}</CardTitle>
          {question.description && (
            <p className="text-muted-foreground">{question.description}</p>
          )}
        </CardHeader>
        <CardContent>
          {question.questionType === "fill" && (
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Nhập câu trả lời..."
                value={(userAnswers[question.id as number] as string) || ""}
                onChange={(e) =>
                  handleAnswer(question.id as number, e.target.value)
                }
                disabled={showResult}
              />

              {showResult && (
                <div
                  className={`p-3 rounded ${
                    checkAnswer(
                      question,
                      userAnswers[question.id as number] || ""
                    )
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  <div className="flex items-center">
                    {checkAnswer(
                      question,
                      userAnswers[question.id as number] || ""
                    ) ? (
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                    ) : (
                      <X className="h-5 w-5 text-red-600 mr-2" />
                    )}
                    <span>
                      {checkAnswer(
                        question,
                        userAnswers[question.id as number] || ""
                      )
                        ? "Đúng!"
                        : `Sai. Đáp án đúng: ${question.answer}`}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {question.questionType === "single_choice" &&
            question.choices &&
            Array.isArray(question.choices) && (
              <div className="space-y-2">
                {question.choices.map((choice, idx) => (
                  <div key={idx} className="flex items-center">
                    <input
                      type="radio"
                      id={`choice-${idx}`}
                      name={`question-${question.id}`}
                      checked={userAnswers[question.id as number] === idx}
                      onChange={() => handleAnswer(question.id as number, idx)}
                      disabled={showResult}
                      className="mr-2"
                    />
                    <label htmlFor={`choice-${idx}`}>{choice}</label>

                    {showResult && userAnswers[question.id as number] === idx && (
                      <span className="ml-2">
                        {idx === question.correctChoice ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <X className="h-5 w-5 text-red-600" />
                        )}
                      </span>
                    )}

                    {showResult &&
                      idx === question.correctChoice &&
                      userAnswers[question.id as number] !== idx && (
                        <span className="ml-2 text-green-600">
                          {" "}
                          (Đáp án đúng)
                        </span>
                      )}
                  </div>
                ))}
              </div>
            )}

          {question.questionType === "multi_choice" &&
            question.choices &&
            typeof question.choices === "object" &&
            !Array.isArray(question.choices) && (
              <div className="space-y-2">
                {Object.entries(question.choices).map(([choice, _], idx) => (
                  <div key={idx} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`choice-${idx}`}
                      checked={
                        Array.isArray(userAnswers[question.id as number]) &&
                        (
                          userAnswers[question.id as number] as string[]
                        ).includes(choice)
                      }
                      onChange={(e) => {
                        const currentAnswers = Array.isArray(
                          userAnswers[question.id as number]
                        )
                          ? [
                              ...(userAnswers[
                                question.id as number
                              ] as string[]),
                            ]
                          : [];

                        if (e.target.checked) {
                          handleAnswer(question.id as number, [
                            ...currentAnswers,
                            choice,
                          ]);
                        } else {
                          handleAnswer(
                            question.id as number,
                            currentAnswers.filter((a) => a !== choice)
                          );
                        }
                      }}
                      disabled={showResult}
                      className="mr-2"
                    />
                    <label htmlFor={`choice-${idx}`}>{choice}</label>

                    {showResult && (
                      <span className="ml-2">
                        {question.choices[choice] === true ? (
                          <span className="text-green-600"> (Đáp án đúng)</span>
                        ) : null}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Câu trước
        </Button>

        {currentQuestionIndex === lesson.listLearning.length - 1 ? (
          <Button onClick={showResult ? handleRetry : handleSubmit}>
            {showResult ? "Làm lại" : "Nộp bài"}
          </Button>
        ) : (
          <Button variant="outline" onClick={handleNextQuestion}>
            Câu tiếp
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {showResult && (
        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h3 className="text-xl font-bold mb-2">Kết quả</h3>
          <p className="text-lg">
            Điểm số: <span className="font-bold">{calculateScore()}/100</span>
          </p>
        </div>
      )}
    </div>
  );
}
