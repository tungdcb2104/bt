import { LessonModel } from "@/models/lesson_model";
import { lessonRepository, LessonRepository } from "@/repositories/lesson_repository";

class LessonLearnService {
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
}

export const lessonLearnService: LessonLearnService = new LessonLearnService(lessonRepository);