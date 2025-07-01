export interface LearningResultModel {
  id?: number;
  type: string;
}

export interface QuestionResultModel extends LearningResultModel {
  correct: boolean;
}

export interface FlashcardResultModel extends LearningResultModel {
  memorized: boolean;
}

export interface FlashcardProgressResultModel extends LearningResultModel {
  progress: number;
}

export interface LessonResultModel {
  lessonId: number;
  strategyId: number;
  learningResults: (QuestionResultModel | FlashcardResultModel | FlashcardProgressResultModel)[];
}
