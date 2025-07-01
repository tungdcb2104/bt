import { ChapterModel } from "./chapter_model";

export type ClassModel = {
    id: number;
    title: string;
    description: string;
    image?: string;
    categories?: string[];
    listChapter?: ChapterModel[];
}