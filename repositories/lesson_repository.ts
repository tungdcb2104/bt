import { LessonModel } from "@/models/lesson_model"
import { LearningRepository } from "./learning_repository";

export abstract class LessonRepository extends LearningRepository {
  public abstract getLessonById(id: string): Promise<LessonModel>;
  public abstract createLesson(data: LessonModel): Promise<LessonModel>;
  public abstract updateLesson(id: string, data: LessonModel): Promise<LessonModel>;
  public abstract deleteLesson(id: string): Promise<string>;
  public abstract voteLesson(data: { lessonId: number; rate: number }): Promise<any>;
}

class LessonRepositoryImpl extends LessonRepository {
  public async getLessonById(id: string): Promise<LessonModel> {
    return this.instance.get(`/lesson/${id}`).then((res) => res.data);
  }

  public async createLesson(data: LessonModel): Promise<LessonModel> {
    return this.instance.post(`/lesson`, data).then((res) => res.data);
  }

  public async updateLesson(id: string, data: LessonModel): Promise<LessonModel> {
    return this.instance.put(`/lesson/${id}`, data).then((res) => res.data);
  }

  public async deleteLesson(id: string): Promise<string> {
    return this.instance.delete(`/lesson/${id}`).then((res) => res.data);
  }

  public async voteLesson(data: { lessonId: number; rate: number }): Promise<any> {
    return this.instance.post(`/lesson/vote`, data).then((res) => res.data);
  }
}

export const lessonRepository: LessonRepository = new LessonRepositoryImpl();