'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Lesson, LearningType } from '@/types/lesson';
import {
  getAllLessons, 
  createLesson,
  updateLesson,
  deleteLesson,
} from '@/services/api';
import { Thumbtack } from "lucide-react";
import CreateQuestionForm from "@/components/CreateQuestionForm";
import CreateFlashcardForm from "@/components/CreateFlashcardForm";
import CreateQuizVideoForm from "@/components/CreateQuizVideoForm";
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, KeyboardSensor, sortableKeyboardCoordinates } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function ManageLessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isContentModalOpen, setContentModalOpen] = useState(false);
  const [contentType, setContentType] = useState("question");
  const [contentLesson, setContentLesson] = useState<Lesson | null>(null);
  const [pinnedLessons, setPinnedLessons] = useState<number[]>([]);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [chapterId, setChapterId] = useState('');
  const [learningType, setLearningType] = useState<LearningType>('question');

  // Thêm state cho edit content
  const [isEditContentModalOpen, setEditContentModalOpen] = useState(false);
  const [editContentLesson, setEditContentLesson] = useState<Lesson | null>(null);
  const [editQuestions, setEditQuestions] = useState<any[]>([]);
  const [editFlashcards, setEditFlashcards] = useState<any[]>([]);
  const [isEditingContent, setIsEditingContent] = useState(false);

  useEffect(() => {
    async function fetchLessons() {
      try {
        const { lessons } = await getAllLessons();
        setLessons(lessons);
      } catch (error) {
        console.error('Failed to fetch lessons:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLessons();
  }, []);

  const handleCreate = async () => {
    try {
      const newLesson = await createLesson({ 
        title, 
        description,
        chapterId: parseInt(chapterId, 10),
        learningType,
        listLearning: [], // Keeping it simple for now
      });
      setLessons([...lessons, newLesson]);
      setCreateModalOpen(false);
    } catch (error) {
      console.error('Failed to create lesson:', error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedLesson) return;
    try {
      const updatedLesson = await updateLesson(selectedLesson.id, {
        title, 
        description,
        chapterId: parseInt(chapterId, 10),
        learningType,
      });
      setLessons(
        lessons.map((l) => (l.id === selectedLesson.id ? updatedLesson : l))
      );
      setEditModalOpen(false);
      setSelectedLesson(null);
    } catch (error) {
      console.error('Failed to update lesson:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      try {
        await deleteLesson(id);
        setLessons(lessons.filter((l) => l.id !== id));
      } catch (error) {
        console.error('Failed to delete lesson:', error);
      }
    }
  };
  
  const openEditModal = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setTitle(lesson.title);
    setDescription(lesson.description);
    setChapterId(String(lesson.chapterId));
    setLearningType(lesson.learningType);
    setEditModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedLesson(null);
    setTitle('');
    setDescription('');
    setChapterId('');
    setLearningType('question');
    setCreateModalOpen(true);
  }

  // Pin/unpin logic
  const handleTogglePin = (id: number) => {
    setPinnedLessons((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // Open content modal
  const openContentModal = (lesson: Lesson) => {
    setContentLesson(lesson);
    setContentType("question");
    setContentModalOpen(true);
  };

  // Sắp xếp bài học: bài học pin lên đầu
  const sortedLessons = [
    ...lessons.filter((l) => pinnedLessons.includes(l.id)),
    ...lessons.filter((l) => !pinnedLessons.includes(l.id)),
  ];

  const openEditContentModal = (lesson: Lesson) => {
    setEditContentLesson(lesson);
    setIsEditingContent(false);
    if (lesson.learningType === "question") setEditQuestions(lesson.listLearning?.map((q, idx) => ({ ...q, id: q.id ?? idx+1 })) || []);
    if (lesson.learningType === "flashcard") setEditFlashcards(lesson.listLearning?.map((f, idx) => ({ ...f, id: f.id ?? idx+1 })) || []);
    setEditContentModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Lessons</h1>
      <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogTrigger asChild>
          <Button onClick={openCreateModal}>Create New Lesson</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Lesson</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="chapterId" className="text-right">Chapter ID</Label>
              <Input id="chapterId" value={chapterId} onChange={(e) => setChapterId(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="learningType" className="text-right">Learning Type</Label>
              <select id="learningType" value={learningType} onChange={(e) => setLearningType(e.target.value as LearningType)} className="col-span-3">
                  <option value="question">Question</option>
                  <option value="flashcard">Flashcard</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleCreate}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="mt-4">
        {sortedLessons.map((lesson) => (
          <div key={lesson.id} className="flex items-center justify-between p-2 border-b">
            <div>
              <h2 className="font-semibold flex items-center gap-2">
                {lesson.title}
                <button
                  className={`p-1 rounded-full transition-colors ${pinnedLessons.includes(lesson.id) ? 'bg-yellow-200 text-yellow-600' : 'bg-gray-100 text-gray-400 hover:bg-yellow-100 hover:text-yellow-600'}`}
                  title={pinnedLessons.includes(lesson.id) ? 'Bỏ ghim' : 'Ghim bài học'}
                  onClick={() => handleTogglePin(lesson.id)}
                >
                  <Thumbtack size={16} fill={pinnedLessons.includes(lesson.id) ? '#facc15' : 'none'} />
                </button>
              </h2>
              <p className="text-sm text-gray-500">{lesson.description}</p>
              <p className="text-xs text-gray-400">Chapter ID: {lesson.chapterId} | Type: {lesson.learningType}</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEditModal(lesson)}>Edit</Button>
                <Button variant="secondary" size="sm" onClick={() => openContentModal(lesson)}>Thêm nội dung</Button>
                <Button variant="outline" size="sm" onClick={() => openEditContentModal(lesson)}>Edit Content</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(lesson.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lesson</DialogTitle>
          </DialogHeader>
           <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title-edit" className="text-right">Title</Label>
              <Input id="title-edit" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description-edit" className="text-right">Description</Label>
              <Input id="description-edit" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="chapterId-edit" className="text-right">Chapter ID</Label>
              <Input id="chapterId-edit" value={chapterId} onChange={(e) => setChapterId(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="learningType-edit" className="text-right">Learning Type</Label>
              <select id="learningType-edit" value={learningType} onChange={(e) => setLearningType(e.target.value as LearningType)} className="col-span-3">
                  <option value="question">Question</option>
                  <option value="flashcard">Flashcard</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isContentModalOpen} onOpenChange={setContentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm nội dung cho bài học: {contentLesson?.title}</DialogTitle>
          </DialogHeader>
          <div className="mb-4">
            <select
              className="mb-2 border p-2"
              value={contentType}
              onChange={e => setContentType(e.target.value)}
            >
              <option value="question">Câu hỏi</option>
              <option value="flashcard">Flashcard</option>
              <option value="quiz_video">Quiz Video</option>
            </select>
            {contentType === "question" && contentLesson && <CreateQuestionForm lessonId={contentLesson.id} />}
            {contentType === "flashcard" && contentLesson && <CreateFlashcardForm lessonId={contentLesson.id} />}
            {contentType === "quiz_video" && contentLesson && <CreateQuizVideoForm lessonId={contentLesson.id} />}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditContentModalOpen} onOpenChange={setEditContentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa nội dung bài học: {editContentLesson?.title}</DialogTitle>
          </DialogHeader>
          {editContentLesson && (
            <div className="mt-4">
              {editContentLesson.learningType === "question" ? (
                <>
                  {/* QuestionEditor giống như ở file lesson detail */}
                  {/* ... QuestionEditor code ... */}
                </>
              ) : editContentLesson.learningType === "flashcard" ? (
                <>
                  {/* FlashcardEditor giống như ở file lesson detail */}
                  {/* ... FlashcardEditor code ... */}
                </>
              ) : null}
              <div className="flex gap-2 mt-4">
                <Button onClick={/* handleSaveContent */}>Save</Button>
                <Button variant="outline" onClick={() => setEditContentModalOpen(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 