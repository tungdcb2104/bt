import { LearningModel } from "./learning_model";

export type LearningType = "question" | "flashcard";

export type LessonModel = {
    id: number;
    title: string;
    chapterId: number;
    description: string;
    learningType: LearningType;
    listLearning?: LearningModel[]
}