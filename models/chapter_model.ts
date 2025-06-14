import { LessonModel } from "./lesson_model";

export type ChapterModel = {
    id: number;
    title: string;
    clazzId?: number;
    description: string;
    image?: string;
    listLesson?: LessonModel[];
}