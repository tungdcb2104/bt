"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Layout } from "@/components/layout";
import { ArrowLeft } from "lucide-react";
import { lessonLearnService } from "@/services/lesson_learn_service";
import { LessonModel } from "@/models/lesson_model";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Question = {
  id: number | string;
  question: string;
  answer: string;
};

function QuestionEditor({
  questions,
  setQuestions,
}: {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}) {
  // Drag & drop logic
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over != null && active.id !== over.id) {
      const oldIndex = questions.findIndex((q) => q.id === active.id);
      const newIndex = questions.findIndex((q) => q.id === over.id);
      setQuestions(arrayMove(questions, oldIndex, newIndex));
    }
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={questions.map((q) => q.id)}
        strategy={verticalListSortingStrategy}
      >
        {questions.map((q, idx) => (
          <SortableQuestionItem
            key={q.id}
            id={q.id}
            idx={idx}
            q={q}
            setQuestions={setQuestions}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}

function SortableQuestionItem({
  id,
  idx,
  q,
  setQuestions,
}: {
  id: number | string;
  idx: number;
  q: Question;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: 12,
  };

  const handleChange = (field: string, value: string) => {
    setQuestions((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  };

  const handleDelete = () => {
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="border rounded p-3 bg-white flex flex-col gap-2"
    >
      <div {...listeners} className="cursor-move text-xs text-gray-400">
        Kéo để đổi vị trí
      </div>
      <Input
        value={q.question}
        onChange={(e) => handleChange("question", e.target.value)}
        placeholder="Nội dung câu hỏi"
      />
      <Input
        value={q.answer}
        onChange={(e) => handleChange("answer", e.target.value)}
        placeholder="Đáp án"
      />
      <Button variant="destructive" size="sm" onClick={handleDelete}>
        Xóa
      </Button>
    </div>
  );
}

type Flashcard = {
  id: number | string;
  frontContent: string;
  backContent: string;
};

function FlashcardEditor({
  flashcards,
  setFlashcards,
}: {
  flashcards: Flashcard[];
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
}) {
  // Drag & drop logic tương tự QuestionEditor
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = flashcards.findIndex((f) => f.id === active.id);
      const newIndex = flashcards.findIndex((f) => f.id === over.id);
      setFlashcards(arrayMove(flashcards, oldIndex, newIndex));
    }
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={flashcards.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        {flashcards.map((f, idx) => (
          <SortableFlashcardItem
            key={f.id}
            id={f.id}
            idx={idx}
            f={f}
            setFlashcards={setFlashcards}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}

function SortableFlashcardItem({
  id,
  idx,
  f,
  setFlashcards,
}: {
  id: number | string;
  idx: number;
  f: Flashcard;
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: 12,
  };
  const handleChange = (field: string, value: string) => {
    setFlashcards((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  };
  const handleDelete = () => {
    setFlashcards((prev) => prev.filter((_, i) => i !== idx));
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="border rounded p-3 bg-white flex flex-col gap-2"
    >
      <div {...listeners} className="cursor-move text-xs text-gray-400">
        Kéo để đổi vị trí
      </div>
      <Input
        value={f.frontContent}
        onChange={(e) => handleChange("frontContent", e.target.value)}
        placeholder="Mặt trước"
      />
      <Input
        value={f.backContent}
        onChange={(e) => handleChange("backContent", e.target.value)}
        placeholder="Mặt sau"
      />
      <Button variant="destructive" size="sm" onClick={handleDelete}>
        Xóa
      </Button>
    </div>
  );
}

export default function LessonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [lesson, setLesson] = useState<LessonModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editQuestions, setEditQuestions] = useState<any[]>([]);
  const [editFlashcards, setEditFlashcards] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = use(params);

  useEffect(() => {
    async function fetchData() {
      try {
        const lesson = await lessonLearnService.getLesson(id);
        setLesson(lesson);
        if (lesson.learningType === "question")
          setEditQuestions(
            lesson.listLearning?.map((q: any, idx: number) => ({
              ...q,
              id: q.id ?? idx + 1,
            })) || []
          );
        if (lesson.learningType === "flashcard")
          setEditFlashcards(
            lesson.listLearning?.map((f: { id: any; }, idx: number) => ({
              ...f,
              id: f.id ?? idx + 1,
            })) || []
          );
      } catch (error) {
        // console.error("Error fetching lesson data:", error)
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleSave = () => {
    // TODO: Gọi API lưu lesson mới hoặc cập nhật lesson
    setIsEditing(false);
    if (lesson) {
      if (lesson.learningType === "question")
        setLesson({ ...lesson, listLearning: editQuestions });
      if (lesson.learningType === "flashcard")
        setLesson({ ...lesson, listLearning: editFlashcards });
    }
  };
  const handleCancel = () => {
    setIsEditing(false);
    if (lesson) {
      if (lesson.learningType === "question")
        setEditQuestions(
          lesson.listLearning?.map((q: { id: any; }, idx: number) => ({
            ...q,
            id: q.id ?? idx + 1,
          })) || []
        );
      if (lesson.learningType === "flashcard")
        setEditFlashcards(
          lesson.listLearning?.map((f: { id: any; }, idx: number) => ({
            ...f,
            id: f.id ?? idx + 1,
          })) || []
        );
    }
  };
  const handleAddQuestion = () =>
    setEditQuestions((prev) => [
      ...prev,
      { id: Date.now(), question: "", answer: "" },
    ]);
  const handleAddFlashcard = () =>
    setEditFlashcards((prev) => [
      ...prev,
      { id: Date.now(), frontContent: "", backContent: "" },
    ]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          {lesson && (
            <Link
              href={`/chapters/${lesson.chapterId}`}
              className="flex items-center text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Quay lại danh sách bài học</span>
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
        ) : lesson ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold">{lesson.title}</h1>
                <p className="text-muted-foreground mt-2">
                  {lesson.description}
                </p>
              </div>
              <div>
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)}>
                    Chỉnh sửa nội dung
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-8">
              {lesson.learningType === "question" ? (
                isEditing ? (
                  <>
                    <QuestionEditor
                      questions={editQuestions}
                      setQuestions={setEditQuestions}
                    />
                    <Button onClick={handleAddQuestion} className="mt-2">
                      Thêm câu hỏi
                    </Button>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={handleSave}>Save</Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {editQuestions.map((q, idx) => (
                      <div key={q.id} className="mb-4 border p-2 rounded">
                        <div className="font-semibold">Câu hỏi {idx + 1}</div>
                        <div>{q.question}</div>
                        <div className="text-sm text-muted-foreground">
                          Đáp án: {q.answer}
                        </div>
                      </div>
                    ))}
                  </>
                )
              ) : lesson.learningType === "flashcard" ? (
                isEditing ? (
                  <>
                    <FlashcardEditor
                      flashcards={editFlashcards}
                      setFlashcards={setEditFlashcards}
                    />
                    <Button onClick={handleAddFlashcard} className="mt-2">
                      Thêm flashcard
                    </Button>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={handleSave}>Save</Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {editFlashcards.map((f, idx) => (
                      <div key={f.id} className="mb-4 border p-2 rounded">
                        <div className="font-semibold">Flashcard {idx + 1}</div>
                        <div>Mặt trước: {f.frontContent}</div>
                        <div>Mặt sau: {f.backContent}</div>
                      </div>
                    ))}
                  </>
                )
              ) : null}
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-muted-foreground">
              Không tìm thấy thông tin bài học.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
