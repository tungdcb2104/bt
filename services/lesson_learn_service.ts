import { LearningResultDTO } from "@/models/learning_result";
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

    async submitLesson(id: number, results: LearningResultDTO[]) {
        try {
            await this.lessonRepository.submitLesson(id.toString(), {
                lessonId: id,
                learningResults: results
            })
        } catch (error) {
            throw error;
        }
    }
}

export const lessonLearnService: LessonLearnService = new LessonLearnService(lessonRepository);