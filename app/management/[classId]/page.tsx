"use client";

import { useState, useEffect, useRef, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { chapterManagementService } from "@/services/chapter_management_service";
import { ChapterModel } from "@/models/chapter_model";
import { ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import { ClassModel } from "@/models/class_model";

export default function ManageChaptersPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const [chapters, setChapters] = useState<ChapterModel[]>([]);
  const [classInfo, setClassInfo] = useState<ClassModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState<ChapterModel | null>(
    null
  );
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [newChapterName, setNewChapterName] = useState("");
  const [newChapterDescription, setNewChapterDescription] = useState("");
  const [newChapterClazzId, setNewChapterClazzId] = useState("");
  const [newChapterImage, setNewChapterImage] = useState<File | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [allClasses, setAllClasses] = useState<{ id: number; title: string }[]>(
    []
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { classId } = use(params);

  useEffect(() => {
    async function fetchData() {
      try {
        const classInfo = await chapterManagementService.getClassData(classId);
        setClassInfo(classInfo);
        setChapters(classInfo.listChapter || []);

        const classes = await chapterManagementService.getAllClassIdAndName();
        setAllClasses(classes);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [classId]);

  const handleCreate = async () => {
    try {
      const newChapter = await chapterManagementService.createChapter({
        title: newChapterName,
        description: newChapterDescription,
        clazzId: parseInt(newChapterClazzId, 10),
        image: newChapterImage,
      });
      setChapters([...chapters, newChapter]);
      resetForm();
    } catch (error) {
      console.error("Failed to create chapter:", error);
    }
  };

  const handleEdit = async () => {
    if (!selectedChapter) return;
    try {
      const updatedChapter = await chapterManagementService.updateChapter(
        selectedChapter.id.toString(),
        {
          title: newChapterName,
          description: newChapterDescription,
          clazzId: parseInt(newChapterClazzId, 10),
          image: newChapterImage,
        }
      );
      setChapters(
        chapters.map((chapter) =>
          chapter.id === selectedChapter.id ? updatedChapter : chapter
        )
      );
      resetForm();
      setEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update chapter:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this chapter?")) {
      try {
        await chapterManagementService.deleteChapter(id.toString());
        setChapters(chapters.filter((c) => c.id !== id));
      } catch (error) {
        console.error("Failed to delete chapter:", error);
      }
    }
  };

  const openEditModal = (chapter: ChapterModel) => {
    setSelectedChapter(chapter);
    setNewChapterName(chapter.title);
    setNewChapterDescription(chapter.description);
    setNewChapterClazzId(chapter.clazzId?.toString() ?? "");
    setNewChapterImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setEditModalOpen(true);
  };

  const resetForm = () => {
    setNewChapterName("");
    setNewChapterDescription("");
    setNewChapterClazzId("");
    setNewChapterImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setCreateModalOpen(false);
    setSelectedChapter(null);
  };

  const renderChapterForm = (onSubmit: () => void, modalTitle: string) => (
    <>
      <DialogHeader>
        <DialogTitle>{modalTitle}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={newChapterName}
            onChange={(e) => setNewChapterName(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input
            id="description"
            value={newChapterDescription}
            onChange={(e) => setNewChapterDescription(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="clazzId" className="text-right">
            Class
          </Label>
          <select
            id="clazzId"
            value={newChapterClazzId}
            onChange={(e) => setNewChapterClazzId(e.target.value)}
            className="col-span-3 border rounded px-3 py-2"
          >
            <option value="">-- Select Class --</option>
            {allClasses.map((clazz) => (
              <option key={clazz.id} value={clazz.id}>
                {clazz.title}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="image" className="text-right mt-2">
            Image (optional)
          </Label>
          <div className="col-span-3 flex items-center gap-2">
            <Input
              id="image"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setNewChapterImage(e.target.files[0]);
                }
              }}
              className="flex-1"
            />
            {newChapterImage && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => {
                  setNewChapterImage(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="shrink-0"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          {newChapterImage && (
            <>
              <div />
              <img
                src={URL.createObjectURL(newChapterImage)}
                alt="Preview"
                className="col-span-3 rounded border border-muted mt-1 max-h-64 object-contain"
              />
            </>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={onSubmit}>
          Save
        </Button>
      </DialogFooter>
    </>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4 gap-2">
        <Link href="/management">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-bold">Manage Chapters</h1>
      </div>
      <p className="text-lg mb-4">
        Class: <span className="font-semibold">{classInfo?.title}</span>
      </p>
      <p className="text-sm text-gray-500 mb-4">{classInfo?.description}</p>

      <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogTrigger asChild>
          <Button>Create New Chapter</Button>
        </DialogTrigger>
        <DialogContent>
          {renderChapterForm(handleCreate, "Create New Chapter")}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          {renderChapterForm(handleEdit, "Edit Chapter")}
        </DialogContent>
      </Dialog>

      <div className="mt-4">
        {chapters
          .sort((a, b) => a.id - b.id)
          .map((chapter) => (
            <div key={chapter.id}>
              <div
                key={chapter.id}
                className="flex items-center justify-between p-2 border-b hover:bg-gray-50 focus-within:bg-gray-100"
              >
                <div className="w-16 h-16 mr-4 flex items-center justify-center">
                  {chapter.image instanceof File ? (
                    <img
                      src={URL.createObjectURL(chapter.image as File)}
                      alt={chapter.title}
                      className="object-cover rounded w-full h-full object-contain"
                    />
                  ) : (
                    <div className="bg-gray-200 rounded w-full h-full flex items-center justify-center">
                      <span className="text-gray-500 text-xs text-center">
                        No Image
                      </span>
                    </div>
                  )}
                </div>
                <Link
                  href={`/management/${classId}/${chapter.id}`}
                  className="flex-1"
                >
                  <h2 className="font-semibold hover:underline">
                    {chapter.title}
                  </h2>
                  <p className="text-sm text-gray-500">{chapter.description}</p>
                  <p className="text-xs text-gray-400">
                    Class ID: {chapter.clazzId}
                  </p>
                </Link>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(chapter)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(chapter.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
