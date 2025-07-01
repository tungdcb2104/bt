import { LessonModel } from "@/models/lesson_model";
import { LessonRequestModel } from "@/models/lesson_request_model";
import { lessonRepository, LessonRepository } from "@/repositories/lesson_repository";

class EditLessonService {
    private lessonRepository: LessonRepository;

    constructor(lessonRepository: LessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    async getLesson(id: string): Promise<LessonModel> {
        try {
            return await this.lessonRepository.getLessonById(id);
        } catch (error) {
            // console.error(`Failed to fetch lesson with id ${id}:`, error);
            throw error;
        }
    }

    async updateLesson(
        id: string,
        lessonData: LessonRequestModel
      ): Promise<LessonModel> {
        try {
          const updatedLesson = await this.lessonRepository.updateLesson(
            id,
            lessonData
          );
          return updatedLesson;
        } catch (error) {
          throw error;
        }
    }
}

export const editLessonService: EditLessonService = new EditLessonService(lessonRepository);