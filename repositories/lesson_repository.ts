import { userService } from "@/services/user_service";
import { LearningRepository } from "./learning_repository";
import { LessonModel } from "@/models/lesson_model";

export abstract class LessonRepository extends LearningRepository {
    public abstract getLessonById(id: string): Promise<LessonModel>;
    public abstract createLesson(data: any): Promise<any>;
    public abstract updateLesson(id: string, data: any): Promise<any>;
    public abstract deleteLesson(id: string): Promise<any>;
}

class LessonRepositoryImpl extends LessonRepository {
    public async getLessonById(id: string): Promise<LessonModel> {
        return this.instance.get(`/lesson/${id}`).then(res => res.data);
    }

    public async createLesson(data: any): Promise<any> {
        return this.instance.post('/lesson', data);
    }

    public async updateLesson(id: string, data: any): Promise<any> {
        return this.instance.put(`/lesson/${id}`, data);
    }

    public async deleteLesson(id: string): Promise<any> {
        return this.instance.delete(`/lesson/${id}`);
    }
}

export const lessonRepository: LessonRepository = new LessonRepositoryImpl();