export interface FlashcardItem {
  type: "flashcard"
  id?: number | null
  frontContent: string
  backContent: string
  frontImage?: string | null
  backImage?: string | null
}

export interface QuestionChoice {
  [key: string]: boolean | string
}

export interface BaseQuestion {
  id?: number | null
  type: "fill_question" | "single_choice_question" | "multi_choice_question"
  question: string
  description?: string | null
  questionType: "fill" | "single_choice" | "multi_choice"
}

export interface FillQuestion extends BaseQuestion {
  type: "fill_question"
  questionType: "fill"
  answer: string
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: "single_choice_question"
  questionType: "single_choice"
  choices: string[]
  correctChoice: number
}

export interface MultiChoiceQuestion extends BaseQuestion {
  type: "multi_choice_question"
  questionType: "multi_choice"
  choices: { [key: string]: boolean }
}

export type Question = FillQuestion | SingleChoiceQuestion | MultiChoiceQuestion

export interface Lesson {
  id: number
  title: string
  chapterId: number
  description: string
  learningType: "flashcard" | "question" | string
  listLearning: (FlashcardItem | Question)[]
}
