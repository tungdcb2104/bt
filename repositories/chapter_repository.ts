import { use } from "react";
import { LearningRepository } from "./learning_repository";
import { userService } from "@/services/user_service";
import { ChapterModel } from "@/models/chapter_model";

export abstract class ChapterRepository extends LearningRepository {
    public abstract getChapterById(id: string): Promise<ChapterModel>;
    public abstract createChapter(data: any): Promise<any>;
    public abstract updateChapter(id: string, data: any): Promise<any>;
    public abstract deleteChapter(id: string): Promise<any>;
}

class ChapterRepositoryImpl extends ChapterRepository {
    public async getChapterById(id: string): Promise<ChapterModel> {
        return this.instance.get(`/chapter/${id}`).then(res => res.data);
    }

    public async createChapter(data: any): Promise<any> {
        return this.instance.post('/chapter', data);
    }

    public async updateChapter(id: string, data: any): Promise<any> {
        return this.instance.put(`/chapter/${id}`, data);
    }

    public async deleteChapter(id: string): Promise<any> {
        return this.instance.delete(`/chapter/${id}`);
    }
}

export const chapterRepository: ChapterRepository = new ChapterRepositoryImpl();