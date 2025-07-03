"use client";

import React, { useLayoutEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import CreateQuestionForm from "@/components/CreateQuestionForm";
import CreateFlashcardForm from "@/components/CreateFlashcardForm";
import CreateFillQuestionForm from "@/components/CreateFillQuestionForm";
import CreateSingleChoiceForm from "@/components/CreateSingleChoiceForm";
import CreateMultiChoiceForm from "@/components/CreateMultiChoiceForm";
import { editLessonService } from "@/services/edit_lesson_service";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { LessonModel } from "@/models/lesson_model";
import { Layout } from "@/components/layout";
import { GripVertical } from "lucide-react";
import { LearningModel, LearningType } from "@/models/learning_model";

function SortableItem({
  id,
  children,
}: {
  id: number;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      className="border rounded p-2 bg-white flex items-start gap-2"
    >
      <div {...attributes} {...listeners} className="cursor-grab pt-1">
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex-1">{children}</div>
    </li>
  );
}

export default function EditLessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params?.id as string;

  const [lesson, setLesson] = useState<LessonModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState<LearningType | null>(null);
  const [contents, setContents] = useState<any[]>([]);

  const sensors = useSensors(useSensor(PointerSensor));

  useLayoutEffect(() => {
    async function fetchLesson() {
      if (!lessonId) return;
      try {
        const lesson = await editLessonService.getLesson(lessonId);
        setLesson(lesson);
        setContents(lesson.listLearning || []);
      } catch (err) {
        toast({ title: "Không thể tải bài học", variant: "destructive" });
      }
    }
    fetchLesson();
  }, [lessonId]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (lesson === null) throw Error();
      await editLessonService.updateLesson(lessonId, {
        title: lesson.title,
        description: lesson.description,
        chapterId: lesson.chapterId,
        learningType: lesson.learningType,
        listLearning: contents,
      });
      toast({ title: "Cập nhật bài học thành công!" });
    } catch (err) {
      toast({ title: "Lỗi khi lưu bài học", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAndBack = async () => {
    await handleSubmit();
    router.push(`/lessons/${lessonId}`);
  };

  const handleAddContent = (content: LearningModel) => {
    setContents((prev) => [...prev, content ]);
    toast({ title: "Thêm nội dung thành công!" });
  };

  const removeContent = (idx: number) => {
    setContents((prev) => prev.filter((_, i) => i !== idx));
    toast({ title: "Đã xoá nội dung." });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = active.id;
    const newIndex = over.id;
    setContents((prev) => arrayMove(prev, oldIndex, newIndex));
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Chỉnh sửa bài học</h1>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 mb-8">
          <div>
            <Label htmlFor="title">Tiêu đề bài học</Label>
            <Input
              id="title"
              value={lesson?.title ?? ""}
              onChange={(e) =>
                setLesson((lesson) =>
                  lesson ? { ...lesson, title: e.target.value } : lesson
                )
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="desc">Mô tả</Label>
            <Input
              id="desc"
              value={lesson?.description ?? ""}
              onChange={(e) =>
                setLesson((lesson) =>
                  lesson ? { ...lesson, description: e.target.value } : lesson
                )
              }
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
            <Button
              variant="outline"
              onClick={handleSubmitAndBack}
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu & Trở về"}
            </Button>
            <Button
              variant="destructive"
              onClick={() => router.back()}
              disabled={loading}
            >
              Huỷ
            </Button>
          </div>
        </form>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            Thêm nội dung mới vào bài học
          </h2>
          <div className="flex gap-2 mb-4 flex-wrap">
            {lesson?.learningType == "question" ? (
              <>
                <Button
                  variant={contentType === "fill_question" ? "default" : "outline"}
                  onClick={() => setContentType("fill_question")}
                >
                  Điền từ
                </Button>
                <Button
                  variant={
                    contentType === "single_choice_question" ? "default" : "outline"
                  }
                  onClick={() => setContentType("single_choice_question")}
                >
                  Trắc nghiệm 1 đáp án
                </Button>
                <Button
                  variant={
                    contentType === "multi_choice_question" ? "default" : "outline"
                  }
                  onClick={() => setContentType("multi_choice_question")}
                >
                  Trắc nghiệm nhiều đáp án
                </Button>
              </>
            ) : (
              <Button
                variant={contentType === "flashcard" ? "default" : "outline"}
                onClick={() => setContentType("flashcard")}
              >
                Flashcard
              </Button>
            )}
          </div>
          {contentType === "fill_question" && (
            <CreateFillQuestionForm onCreated={handleAddContent} />
          )}
          {contentType === "single_choice_question" && (
            <CreateSingleChoiceForm onCreated={handleAddContent} />
          )}
          {contentType === "multi_choice_question" && (
            <CreateMultiChoiceForm onCreated={handleAddContent} />
          )}
          {contentType === "flashcard" && (
            <CreateFlashcardForm onFlashcardCreated={handleAddContent} />
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Danh sách nội dung đã thêm
          </h2>
          {contents.length === 0 ? (
            <p className="text-muted-foreground">Chưa có nội dung nào.</p>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={contents.map((_, i) => i)}
                strategy={verticalListSortingStrategy}
              >
                <ul className="space-y-2">
                  {contents.map((c, idx) => (
                    <SortableItem key={idx} id={idx}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1 space-y-1">
                          <p className="text-sm text-muted-foreground">
                            #{idx + 1} • {c.type}
                          </p>

                          {c.type === "fill_question" && (
                            <div>
                              <b>Điền vào chỗ trống:</b> {c.question}
                              <br />
                              <i>Đáp án:</i> {c.answer}
                            </div>
                          )}

                          {c.type === "single_choice_question" && (
                            <div>
                              <b>Trắc nghiệm đơn:</b> {c.question}
                              <br />
                              <ul className="ml-4 list-disc">
                                {c.choices?.map((choice: string, i: number) => (
                                  <li
                                    key={i}
                                    className={
                                      i === c.correctChoice
                                        ? "font-semibold text-green-700"
                                        : ""
                                    }
                                  >
                                    {choice}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {c.type === "multi_choice_question" && (
                            <div>
                              <b>Trắc nghiệm nhiều đáp án:</b> {c.question}
                              <br />
                              <ul className="ml-4 list-disc">
                                {Object.entries(c.choices || {}).map(
                                  ([label, correct], i) => (
                                    <li
                                      key={i}
                                      className={
                                        correct
                                          ? "font-semibold text-green-700"
                                          : ""
                                      }
                                    >
                                      {label}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                          {c.type === "flashcard" && (
                            <div>
                              <b>Flashcard:</b> {c.frontContent} →{" "}
                              {c.backContent}
                              {c.frontImage && (
                                <img
                                  src={c.frontImage}
                                  alt="Front"
                                  className="h-12 mt-1"
                                />
                              )}
                              {c.backImage && (
                                <img
                                  src={c.backImage}
                                  alt="Back"
                                  className="h-12 mt-1"
                                />
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => removeContent(idx)}
                          >
                            X
                          </Button>
                        </div>
                      </div>
                    </SortableItem>
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </Layout>
  );
}
