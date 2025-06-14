import { ClassModel } from "@/models/class_model";
import { chapterRepository, ChapterRepository } from "@/repositories/chapter_repository";
import { classRepository, ClassRepository } from "@/repositories/class_repository";

class ClassViewService {
    private classRepository: ClassRepository;

    constructor(classRepository: ClassRepository) {
        this.classRepository = classRepository;
    }

    async getAllClasses(): Promise<Array<ClassModel>> {
        try {
            const listClasses = await this.classRepository.getClasses();
            return listClasses;
        } catch (error) {
            // console.error("Failed to fetch classes:", error);
            throw error;
        }
    }

    async getClassDetails(id: string): Promise<ClassModel> {
        try {
            const classWithChapters = await this.classRepository.getClassById(id);
            return classWithChapters;
        } catch (error) {
            // console.error(`Failed to fetch class with id ${id}:`, error);
            throw error;
        }
    }
}

export const classViewService: ClassViewService = new ClassViewService(classRepository);