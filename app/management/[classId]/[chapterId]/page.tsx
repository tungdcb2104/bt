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

export default function ManageLessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [chapterId, setChapterId] = useState('');
  const [learningType, setLearningType] = useState<LearningType>('question');


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
        {lessons.map((lesson) => (
          <div key={lesson.id} className="flex items-center justify-between p-2 border-b">
            <div>
              <h2 className="font-semibold">{lesson.title}</h2>
              <p className="text-sm text-gray-500">{lesson.description}</p>
              <p className="text-xs text-gray-400">Chapter ID: {lesson.chapterId} | Type: {lesson.learningType}</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEditModal(lesson)}>Edit</Button>
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
    </div>
  );
} 