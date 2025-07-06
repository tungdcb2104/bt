import { LearningResultDTO } from "./learning_result";

export interface LessonResultDTO {
  lessonId: number;
  learningResults: LearningResultDTO[];
}