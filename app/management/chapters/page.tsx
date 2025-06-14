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
import { Chapter } from '@/types/chapter';
import {
  getAllChapters,
  createChapter,
  updateChapter,
  deleteChapter,
} from '@/services/api';

export default function ManageChaptersPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [newChapterName, setNewChapterName] = useState('');
  const [newChapterDescription, setNewChapterDescription] = useState('');
  const [newChapterClazzId, setNewChapterClazzId] = useState('');


  useEffect(() => {
    async function fetchChapters() {
      try {
        const { chapters } = await getAllChapters();
        setChapters(chapters);
      } catch (error) {
        console.error('Failed to fetch chapters:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchChapters();
  }, []);

  const handleCreate = async () => {
    try {
      const newChapter = await createChapter({ 
        name: newChapterName, 
        description: newChapterDescription,
        clazzId: parseInt(newChapterClazzId, 10),
      });
      setChapters([...chapters, newChapter]);
      setNewChapterName('');
      setNewChapterDescription('');
      setNewChapterClazzId('');
      setCreateModalOpen(false);
    } catch (error) {
      console.error('Failed to create chapter:', error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedChapter) return;
    try {
      const updatedChapter = await updateChapter(selectedChapter.id, {
        name: newChapterName,
        description: newChapterDescription,
        clazzId: parseInt(newChapterClazzId, 10),
      });
      setChapters(
        chapters.map((c) => (c.id === selectedChapter.id ? updatedChapter : c))
      );
      setEditModalOpen(false);
      setSelectedChapter(null);
    } catch (error) {
      console.error('Failed to update chapter:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this chapter?')) {
      try {
        await deleteChapter(id);
        setChapters(chapters.filter((c) => c.id !== id));
      } catch (error) {
        console.error('Failed to delete chapter:', error);
      }
    }
  };
  
  const openEditModal = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setNewChapterName(chapter.name);
    setNewChapterDescription(chapter.description);
    setNewChapterClazzId(String(chapter.clazzId));
    setEditModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Chapters</h1>
      <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogTrigger asChild>
          <Button>Create New Chapter</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Chapter</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={newChapterName} onChange={(e) => setNewChapterName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Input id="description" value={newChapterDescription} onChange={(e) => setNewChapterDescription(e.target.value)} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clazzId" className="text-right">Class ID</Label>
              <Input id="clazzId" value={newChapterClazzId} onChange={(e) => setNewChapterClazzId(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleCreate}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-4">
            Note: Fetching all chapters is not implemented in the API. 
            This page currently only supports creating, updating, and deleting chapters.
            You will need to know the Chapter ID to edit/delete, which is not ideal.
            This is a placeholder UI to demonstrate the functionality.
        </p>
        {chapters.map((chapter) => (
          <div key={chapter.id} className="flex items-center justify-between p-2 border-b">
            <div>
              <h2 className="font-semibold">{chapter.name}</h2>
              <p className="text-sm text-gray-500">{chapter.description}</p>
              <p className="text-xs text-gray-400">Class ID: {chapter.clazzId}</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEditModal(chapter)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(chapter.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>

       <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Chapter</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name-edit" className="text-right">Name</Label>
              <Input id="name-edit" value={newChapterName} onChange={(e) => setNewChapterName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description-edit" className="text-right">Description</Label>
              <Input id="description-edit" value={newChapterDescription} onChange={(e) => setNewChapterDescription(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clazzId-edit" className="text-right">Class ID</Label>
              <Input id="clazzId-edit" value={newChapterClazzId} onChange={(e) => setNewChapterClazzId(e.target.value)} className="col-span-3" />
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