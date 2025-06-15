import { ChapterModel } from "@/models/chapter_model";
import { ChapterRequestModel } from "@/models/chapter_request_model";
import { ClassModel } from "@/models/class_model";
import { ChapterRepository, chapterRepository } from "@/repositories/chapter_repository";
import { classRepository, ClassRepository } from "@/repositories/class_repository";
import { uploadRepository, UploadRepository } from "@/repositories/upload_repository";

class ChapterManagementService {
    private classRepository: ClassRepository;
    private chapterRepository: ChapterRepository;
    private uploadRepository: UploadRepository;

    constructor(classRepository: ClassRepository, chapterRepository: ChapterRepository, uploadRepository: UploadRepository) {
        this.classRepository = classRepository;
        this.chapterRepository = chapterRepository;
        this.uploadRepository = uploadRepository;
    }

    async createChapter(chapterData: ChapterRequestModel): Promise<ChapterModel> {
        try {
            if (chapterData.image instanceof File) {
                const uploadResult = await this.uploadRepository.uploadImage(chapterData.image);
                chapterData.image = uploadResult;
            }
            const newChapter = await this.chapterRepository.createChapter(chapterData);
            return newChapter;
        } catch (error) {
            // console.error("Failed to create chapter:", error);
            throw error;
        }
    }

    async getClassData(classId: string): Promise<ClassModel> {
        try {
            const classData = await this.classRepository.getClassById(classId);
            return classData;
        } catch (error) {
            // console.error("Failed to fetch chapters:", error);
            throw error;
        }
    }

    async updateChapter(id: string, chapterData: ChapterRequestModel): Promise<ChapterModel> {
        try {
            if (chapterData.image instanceof File) {
                const uploadResult = await this.uploadRepository.uploadImage(chapterData.image);
                chapterData.image = uploadResult;
            }
            const updatedChapter = await this.chapterRepository.updateChapter(id, chapterData);
            return updatedChapter;
        } catch (error) {
            // console.error(`Failed to update chapter with id ${id}:`, error);
            throw error;
        }
    }

    async deleteChapter(id: string): Promise<void> {
        try {
            await this.chapterRepository.deleteChapter(id);
        } catch (error) {
            // console.error(`Failed to delete class with id ${id}:`, error);
            throw error;
        }
    }
}

export const chapterManagementService: ChapterManagementService = new ChapterManagementService(classRepository, chapterRepository, uploadRepository);