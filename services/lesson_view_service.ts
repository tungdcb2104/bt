import { LessonModel } from "@/models/lesson_model";
import { lessonRepository, LessonRepository } from "@/repositories/lesson_repository";

class LessonViewService {
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


    async rateLesson(lessonId: string, rating: number) {
        try {
            return await this.lessonRepository.voteLesson({lessonId: Number.parseInt(lessonId), rate: rating})
        } catch (error) {
            throw error;
        }
    }
}

export const lessonViewService: LessonViewService = new LessonViewService(lessonRepository);