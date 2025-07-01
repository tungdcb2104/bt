import { ChapterModel } from "@/models/chapter_model";
import { chapterRepository, ChapterRepository } from "@/repositories/chapter_repository";

class ChapterViewService {
    private chaptersRepository: ChapterRepository;

    constructor(chaptersRepository: ChapterRepository) {
        this.chaptersRepository = chaptersRepository;
    }

    async getChapter(id: string): Promise<ChapterModel> {
        try {
            return await this.chaptersRepository.getChapterById(id);
        } catch (error) {
            // console.error(`Failed to fetch chapter with id ${id}:`, error);
            throw error;
        }
    }
}

export const chapterViewService: ChapterViewService = new ChapterViewService(chapterRepository);