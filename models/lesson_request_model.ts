import { LearningType } from "./lesson_model";

export type LessonRequestModel = {
    title: string,
    description: string,
    chapterId: number,
    learningType: LearningType;
    listLearning?: any[];
}