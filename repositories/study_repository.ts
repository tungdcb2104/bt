import { LessonResultModel } from "@/models/lesson_result_model";
import { LearningRepository } from "./learning_repository";

export abstract class StudyRepository extends LearningRepository {
  public abstract study(lessonId: number, strategyId: number): Promise<any>;
  public abstract evaluate(data: LessonResultModel): Promise<any>;
}

class StudyRepositoryImpl extends StudyRepository {
  public study(lessonId: number, strategyId: number): Promise<any> {
    return this.instance.get(`/v1/study`, {
      params: { lid: lessonId, sid: strategyId },
    }).then((res) => res.data);
  }

  public evaluate(data: LessonResultModel): Promise<any> {
    return this.instance.post(`/v1/study`, data).then((res) => res.data);
  }
}

export const studyRepository: StudyRepository = new StudyRepositoryImpl();
