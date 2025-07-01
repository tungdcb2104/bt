import { ClassModel } from "@/models/class_model";
import { classRepository, ClassRepository } from "@/repositories/class_repository";
import { ca } from "date-fns/locale";

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

    async pinClass(id: number) {
        try {
            await this.classRepository.pinClass(id.toString(10));
        } catch (error) {
            throw error
        }
    }

    async unpinClass(id: number) {
        try {
            await this.classRepository.unpinClass(id.toString(10));
        } catch (error) {
            throw error
        }
    }
}

export const classViewService: ClassViewService = new ClassViewService(classRepository);