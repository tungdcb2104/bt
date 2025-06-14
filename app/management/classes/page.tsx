'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Clazz } from '@/types/clazz';
import {
  getAllClazzes,
  createClazz,
  updateClazz,
  deleteClazz,
} from '@/services/api';

export default function ManageClassesPage() {
  const [classes, setClasses] = useState<Clazz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<Clazz | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassDescription, setNewClassDescription] = useState('');

  useEffect(() => {
    async function fetchClasses() {
      try {
        const { clazzes } = await getAllClazzes();
        setClasses(clazzes);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchClasses();
  }, []);

  const handleCreate = async () => {
    try {
      const newClass = await createClazz({ name: newClassName, description: newClassDescription });
      setClasses([...classes, newClass]);
      setNewClassName('');
      setNewClassDescription('');
      setCreateModalOpen(false);
    } catch (error) {
      console.error('Failed to create class:', error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedClass) return;
    try {
      const updatedClass = await updateClazz(selectedClass.id, {
        name: newClassName,
        description: newClassDescription,
      });
      setClasses(
        classes.map((c) => (c.id === selectedClass.id ? updatedClass : c))
      );
      setEditModalOpen(false);
      setSelectedClass(null);
    } catch (error) {
      console.error('Failed to update class:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await deleteClazz(id);
        setClasses(classes.filter((c) => c.id !== id));
      } catch (error) {
        console.error('Failed to delete class:', error);
      }
    }
  };
  
  const openEditModal = (clazz: Clazz) => {
    setSelectedClass(clazz);
    setNewClassName(clazz.name);
    setNewClassDescription(clazz.description);
    setEditModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Classes</h1>
      <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogTrigger asChild>
          <Button>Create New Class</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Class</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={newClassName} onChange={(e) => setNewClassName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Input id="description" value={newClassDescription} onChange={(e) => setNewClassDescription(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleCreate}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="mt-4">
        {classes.map((clazz) => (
          <div key={clazz.id} className="flex items-center justify-between p-2 border-b">
            <div>
              <h2 className="font-semibold">{clazz.name}</h2>
              <p className="text-sm text-gray-500">{clazz.description}</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEditModal(clazz)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(clazz.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>

       <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name-edit" className="text-right">Name</Label>
              <Input id="name-edit" value={newClassName} onChange={(e) => setNewClassName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description-edit" className="text-right">Description</Label>
              <Input id="description-edit" value={newClassDescription} onChange={(e) => setNewClassDescription(e.target.value)} className="col-span-3" />
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