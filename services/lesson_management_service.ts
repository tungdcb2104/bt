import { ChapterModel } from "@/models/chapter_model";
import { ChapterRequestModel } from "@/models/chapter_request_model";
import { ClassModel } from "@/models/class_model";
import { LessonModel } from "@/models/lesson_model";
import { LessonRequestModel } from "@/models/lesson_request_model";
import {
  ChapterRepository,
  chapterRepository,
} from "@/repositories/chapter_repository";
import {
  classRepository,
  ClassRepository,
} from "@/repositories/class_repository";
import { lessonRepository, LessonRepository } from "@/repositories/lesson_repository";
import {
  uploadRepository,
  UploadRepository,
} from "@/repositories/upload_repository";

class LessonManagementService {
  private classRepository: ClassRepository;
  private chapterRepository: ChapterRepository;
  private lessonRepository: LessonRepository;
  private uploadRepository: UploadRepository;

  constructor(
    classRepository: ClassRepository,
    chapterRepository: ChapterRepository,
    lessonRepository: LessonRepository,
    uploadRepository: UploadRepository
  ) {
    this.classRepository = classRepository;
    this.chapterRepository = chapterRepository;
    this.lessonRepository = lessonRepository;
    this.uploadRepository = uploadRepository;
  }

  async createLesson(lessonData: LessonRequestModel): Promise<LessonModel> {
    try {
      if (lessonData.image instanceof File) {
        const uploadResult = await this.uploadRepository.uploadImage(
          lessonData.image
        );
        lessonData.image = uploadResult;
      }
      const newLesson = await this.lessonRepository.createLesson(
        lessonData
      );
      if (newLesson.image && typeof newLesson.image === "string") {
        newLesson.image = await this.uploadRepository.getImage(
          newLesson.image
        );
      }
      return newLesson;
    } catch (error) {
      // console.error("Failed to create lesson:", error);
      throw error;
    }
  }

  async getChapterData(chapterId: string): Promise<ChapterModel> {
    try {
      const chapterData = await this.chapterRepository.getChapterById(chapterId);
      if (chapterData.image && typeof chapterData.image === "string") {
        chapterData.image = await this.uploadRepository.getImage(chapterData.image);
        console.log(typeof chapterData.image);
      }
      return chapterData;
    } catch (error) {
      // console.error("Failed to fetch chapter:", error);
      throw error;
    }
  }

  async getAllChapterMetadata(classId: string): Promise<Array<{ id: number; title: string }>> {
    try {
      const chapters = await this.classRepository.getClassById(classId).then((classData) => classData.listChapter || []);
      return chapters.map((chapter) => ({ id: chapter.id, title: chapter.title }));
    } catch (error) {
      throw error;
    }
  }

  async updateLesson(
    id: string,
    lessonData: LessonRequestModel
  ): Promise<LessonModel> {
    try {
      if (lessonData.image instanceof File) {
        const uploadResult = await this.uploadRepository.uploadImage(
          lessonData.image
        );
        lessonData.image = uploadResult;
      }
      const updatedLesson = await this.lessonRepository.updateLesson(
        id,
        lessonData
      );
      if (updatedLesson.image && typeof updatedLesson.image === "string") {
        updatedLesson.image = await this.uploadRepository.getImage(
          updatedLesson.image
        );
      }
      return updatedLesson;
    } catch (error) {
      // console.error(`Failed to update lesson with id ${id}:`, error);
      throw error;
    }
  }

  async deleteLesson(id: string): Promise<void> {
    try {
      await this.lessonRepository.deleteLesson(id);
    } catch (error) {
      // console.error(`Failed to delete lesson with id ${id}:`, error);
      throw error;
    }
  }
}

export const lessonManagementService: LessonManagementService =
  new LessonManagementService(
    classRepository,
    chapterRepository,
    lessonRepository,
    uploadRepository
  );
