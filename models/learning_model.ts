// models/learning_model.ts

export type LearningType =
  | "flashcard"
  | "fill_question"
  | "single_choice_question"
  | "multi_choice_question";

export interface LearningModel {
  type: LearningType;
}

// ========================
// 🎴 FlashCardModel
// ========================
export interface FlashCardModel extends LearningModel {
  frontContent: string;
  backContent: string;
  frontImage?: string;
  backImage?: string;
  isLearned?: boolean;
}

// ========================
// ✍️ FillQuestionModel
// ========================
export interface FillQuestionModel extends LearningModel {
  readonly type: "fill_question";
  question: string;
  description?: string;
  readonly questionType: "fill";
  answer: string;
}

// ========================
// ✅ SingleChoiceQuestionModel
// ========================
export interface SingleChoiceQuestionModel extends LearningModel {
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
export interface MultiChoiceQuestionModel extends LearningModel {
  readonly type: "multi_choice_question";
  question: string;
  description?: string;
  readonly questionType: "multi_choice";
  choices: { [label: string]: boolean }; // ví dụ: { "A": true, "B": false }
}
