"use client";

import { useCallback, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { LessonModel } from "@/models/lesson_model";
import { Question } from "@/types/lesson";
import React from "react";

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

export default function LessonQuestionPage({lesson}: {lesson: LessonModel | null}) {
  // State cho câu hỏi
  const nav = useQuizNavigation(lesson.listLearning.length);
  const currentQuestionIndex = nav.current;
  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: string | string[] | number;
  }>({});
  const [showResult, setShowResult] = useState(false);

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
    nav.setCurrent(0);
  }, [nav]);

  // Render câu hỏi
  if (!lesson?.listLearning || lesson.listLearning.length === 0) {
    return <div className="text-center py-12">Không có câu hỏi nào.</div>;
  }

  const question = lesson.listLearning[currentQuestionIndex] as Question;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Navigation grid */}
      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        {lesson.listLearning.map((q, idx) => {
          const isCurrent = idx === currentQuestionIndex;
          const isAnswered = userAnswers[q.id] !== undefined;
          return (
            <button
              key={q.id || idx}
              onClick={() => nav.goTo(idx)}
              className={[
                "w-9 h-9 rounded-full border flex items-center justify-center font-semibold transition-colors",
                isCurrent
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                  : isAnswered
                  ? "bg-green-100 text-green-700 border-green-400 hover:bg-green-200"
                  : "bg-gray-100 text-gray-500 border-gray-300 hover:bg-gray-200",
                "focus:outline-none focus:ring-2 focus:ring-blue-400"
              ].join(" ")}
              aria-label={`Câu ${idx + 1}`}
              type="button"
            >
              {idx + 1}
            </button>
          );
        })}
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
          onClick={nav.prev}
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
          <Button variant="outline" onClick={nav.next}>
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
