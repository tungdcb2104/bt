// models/learning_model.ts

export type LearningType =
  | "flashcard"
  | "fill_question"
  | "single_choice_question"
  | "multi_choice_question";

interface _LearningModel {
  id?: number;
  type: LearningType;
}

// ========================
// 🎴 FlashCardModel
// ========================
export interface FlashCardModel extends _LearningModel {
  frontContent: string;
  backContent: string;
  frontImage?: string;
  backImage?: string;
  isLearned?: boolean;
}

// ========================
// ✍️ FillQuestionModel
// ========================
export interface FillQuestionModel extends _LearningModel {
  readonly type: "fill_question";
  question: string;
  description?: string;
  readonly questionType: "fill";
  answer: string;
}

// ========================
// ✅ SingleChoiceQuestionModel
// ========================
export interface SingleChoiceQuestionModel extends _LearningModel {
  readonly type: "single_choice_question";
  question: string;
  description?: string;
  readonly questionType: "single_choice";
  choices: string[];
  correctChoice: number;
}

// ========================
// ☑️ MultiChoiceQuestionModel
// ========================
export interface MultiChoiceQuestionModel extends _LearningModel {
  readonly type: "multi_choice_question";
  question: string;
  description?: string;
  readonly questionType: "multi_choice";
  choices: { [label: string]: boolean }; // ví dụ: { "A": true, "B": false }
}

export type LearningModel = FillQuestionModel | SingleChoiceQuestionModel | MultiChoiceQuestionModel | FlashCardModel