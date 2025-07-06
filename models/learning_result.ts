// Models
interface _LearningResultDTO {
  id: number;
  type: string;
}

export interface FlashcardProgressResultDTO extends _LearningResultDTO {
  progress: number;
}

export interface FlashcardResultDTO extends _LearningResultDTO {
  memorized: boolean;
}

export interface QuestionResultDTO extends _LearningResultDTO {
  correct: boolean;
}

export type LearningResultDTO = FlashcardProgressResultDTO | FlashcardResultDTO | QuestionResultDTO